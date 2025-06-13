import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { toast } from '@/hooks/use-toast';
import ReactMarkdown from 'react-markdown';
import { MODEL_API_URL, SCRAPER_API_URL } from '@/lib/api';

export interface RatingEstimationInput {
  category: string;
  rating_count: number;
  installs: number;
  size: number;
  content_rating: string;
  ad_supported: boolean;
  in_app_purchases: boolean;
  editors_choice: boolean;
  app_type: string;
}

export interface RatingEstimationResult {
  userId: string;
  input: RatingEstimationInput;
  predicted_rating: number;
  model_used: string;
  confidence_interval?: any;
  input_summary: any;
  feature_importance: any;
  shap_local: any;
  shap_plots: {
    bar_plot_url: string;
    waterfall_plot_url: string;
    force_plot_url: string;
  };
  summary?: string;
  createdAt: number;
}

export function useRatingEstimationData(onSuccess?: () => void) {
  const { user } = useUser();
  const [input, setInput] = useState<RatingEstimationInput | null>(null);
  const [result, setResult] = useState<RatingEstimationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [error, setError] = useState('');
  const [summaryError, setSummaryError] = useState('');

  // Convex
  const createEstimation = useMutation(api.ratingEstimation.create);
  const lastEstimation = useQuery(
    user ? api.ratingEstimation.getLast : null,
    user ? { userId: user.id } : undefined
  );
  const updateSummary = useMutation(api.ratingEstimation.updateSummary);

  // Fetch last estimation on mount
  useEffect(() => {
    if (lastEstimation) {
      setResult(lastEstimation);
    }
  }, [lastEstimation]);

  // Handle form submit
  const handleSubmit = async (formInput: RatingEstimationInput) => {
    setInput(formInput);
    setLoading(true);
    setError('');
    setResult(null);
    setSummaryError('');

    // Check limit if enabled (will be handled by UI layer with useLimitCheck hook)
    // The actual blocking is done in the UI components

    try {
      // 1. Request prediction API
      const model_choice = 'rf_tuned';
      const res = await fetch(
        `${MODEL_API_URL}/api/app-rating-prediction?model_choice=${model_choice}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formInput),
        }
      );
      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        throw new Error('Response API tidak valid (bukan JSON)');
      }
      if (!res.ok || !data.predicted_rating) {
        throw new Error(data?.message || 'Gagal memprediksi rating aplikasi');
      }
      // 2. Simpan ke DB Convex
      const newId = await createEstimation({
        userId: user.id,
        input: formInput,
        predicted_rating: data.predicted_rating,
        model_used: data.model_used,
        confidence_interval: data.confidence_interval,
        input_summary: data.input_summary,
        feature_importance: data.feature_importance,
        shap_local: data.shap_local,
        shap_plots: data.shap_plots,
        createdAt: Date.now(),
      });
      // 3. Set state sementara (tanpa summary)
      const tempResult = {
        userId: user.id,
        input: formInput,
        predicted_rating: data.predicted_rating,
        model_used: data.model_used,
        confidence_interval: data.confidence_interval,
        input_summary: data.input_summary,
        feature_importance: data.feature_importance,
        shap_local: data.shap_local,
        shap_plots: data.shap_plots,
        createdAt: Date.now(),
      };
      setResult(tempResult);
      toast({
        title: 'Berhasil mengestimasi rating aplikasi',
        description: 'Scroll ke bawah untuk melihat hasil estimasi rating',
        variant: 'default',
      });
      setLoading(false);

      // Call reset form callback if provided
      if (onSuccess) {
        onSuccess();
      }
      // 4. Request summary
      setSummaryLoading(true);
      try {
        const resSummary = await fetch(
          `${SCRAPER_API_URL}/api/rating-estimation/summary`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: getSummaryPayload(tempResult) }),
          }
        );
        const dataSummary = await resSummary.json();
        if (
          !resSummary.ok ||
          dataSummary.status !== 'success' ||
          !dataSummary.summary
        ) {
          throw new Error(dataSummary?.message || 'Gagal mengambil summary');
        }
        // 5. Update summary ke DB
        await updateSummary({ id: newId, summary: dataSummary.summary });
        // 6. Set summary ke state
        setResult((prev) =>
          prev ? { ...prev, summary: dataSummary.summary } : prev
        );
      } catch (err: any) {
        setSummaryError(err.message || 'Gagal mengambil summary');
      } finally {
        setSummaryLoading(false);
      }
    } catch (err: any) {
      setError(err.message || 'Gagal memprediksi rating aplikasi');
      toast({
        title: 'Gagal',
        description: err.message || 'Gagal memprediksi rating aplikasi',
        variant: 'destructive',
      });
    }
  };

  // Fungsi untuk mengambil hanya field yang diperlukan untuk summary
  function getSummaryPayload(result) {
    return {
      // input: result.input,
      predicted_rating: result.predicted_rating,
      // model_used: result.model_used,
      confidence_interval: result.confidence_interval,
      input_summary: result.input_summary,
      feature_importance: result.feature_importance,
      shap_local: result.shap_local,
      shap_plots: result.shap_plots,
    };
  }

  // Check if initial data is loading
  const isInitialLoading = user && lastEstimation === undefined;

  return {
    user,
    input,
    setInput,
    result,
    loading,
    summaryLoading,
    error,
    summaryError,
    handleSubmit,
    isInitialLoading,
  };
}
