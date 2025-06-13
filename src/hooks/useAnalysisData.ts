import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { toast } from '@/hooks/use-toast';
import { Id } from '../../convex/_generated/dataModel';
import { MODEL_API_URL, SCRAPER_API_URL } from '@/lib/api';

const SENTIMENT_EMOTION_PAGE_SIZE = 5;
const SPAM_PAGE_SIZE = 10;

export interface AnalysisResult {
  reviewsCount: number;
  sentimentResult: {
    sentiment_analysis: {
      percentages: {
        Positive: number;
        Neutral: number;
        Negative: number;
      };
      counts: {
        Positive: number;
        Neutral: number;
        Negative: number;
      };
    };
    emotion_analysis: {
      percentages: {
        Neutral: number;
        Happy: number;
        Sad: number;
        Anger: number;
        Fear: number;
        Love: number;
      };
      counts: {
        Neutral: number;
        Happy: number;
        Sad: number;
        Anger: number;
        Fear: number;
        Love: number;
      };
    };
  };
  spamResult: {
    percentages: {
      explicit_spam: number;
      irrelevant_content: number;
    };
    counts: {
      explicit_spam: number;
      irrelevant_content: number;
    };
  };
  sentimentFileUrl: string;
  spamFileUrl: string;
  summary?: string;
}

export interface SentimentDetailResult {
  sentiment_analysis: {
    reviews_by_sentiment: {
      Positive: Array<{ text: string; confidence: number }>;
      Neutral: Array<{ text: string; confidence: number }>;
      Negative: Array<{ text: string; confidence: number }>;
    };
    word_clouds: {
      Positive: Array<{ word: string; count: number }>;
      Neutral: Array<{ word: string; count: number }>;
      Negative: Array<{ word: string; count: number }>;
    };
  };
  emotion_analysis: {
    reviews_by_emotion: {
      Neutral: Array<{ text: string; confidence: number }>;
      Happy: Array<{ text: string; confidence: number }>;
      Sad: Array<{ text: string; confidence: number }>;
      Anger: Array<{ text: string; confidence: number }>;
      Fear: Array<{ text: string; confidence: number }>;
      Love: Array<{ text: string; confidence: number }>;
    };
    word_clouds: {
      Neutral: Array<{ word: string; count: number }>;
      Happy: Array<{ word: string; count: number }>;
      Sad: Array<{ word: string; count: number }>;
      Anger: Array<{ word: string; count: number }>;
      Fear: Array<{ word: string; count: number }>;
      Love: Array<{ word: string; count: number }>;
    };
  };
}

export interface SpamDetailResult {
  reviews_by_category: {
    explicit_spam: Array<{ text: string; confidence: number }>;
    irrelevant_content: Array<{ text: string; confidence: number }>;
  };
}

export function useAnalysisData() {
  // User
  const { user } = useUser();

  // Analysis state
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [showResults, setShowResults] = useState(false);

  // Loading states
  const [loadingStep, setLoadingStep] = useState<
    'idle' | 'fetching-reviews' | 'analyzing' | 'success' | 'error'
  >('idle');
  const [loadingMessage, setLoadingMessage] = useState('');
  const [analysisError, setAnalysisError] = useState('');

  // Detail data states
  const [sentimentDetailReviews, setSentimentDetailReviews] =
    useState<SentimentDetailResult | null>(null);
  const [sentimentDetailLoading, setSentimentDetailLoading] = useState(false);
  const [sentimentDetailError, setSentimentDetailError] = useState('');
  const [spamDetailReviews, setSpamDetailReviews] =
    useState<SpamDetailResult | null>(null);
  const [spamDetailLoading, setSpamDetailLoading] = useState(false);
  const [spamDetailError, setSpamDetailError] = useState('');

  // Pagination states
  const [sentimentPage, setSentimentPage] = useState({
    positive: 1,
    neutral: 1,
    negative: 1,
  });
  const [emotionPage, setEmotionPage] = useState({
    neutral: 1,
    happy: 1,
    sad: 1,
    anger: 1,
    fear: 1,
    love: 1,
  });
  const [spamPage, setSpamPage] = useState(1);
  const [spamFilter, setSpamFilter] = useState('all');

  // Summary state
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState('');

  // Convex mutations and queries
  const createAnalysis = useMutation(api.analysis.createAnalysis);
  const updateSummary = useMutation(api.analysis.updateAnalysisSummary);
  const analyses = useQuery(
    user ? api.analysis.getUserAnalyses : null,
    user ? { userId: user.id } : undefined
  );

  // Initial loading state (true saat analyses masih undefined)
  const isInitialLoading = analyses === undefined;

  // Handler functions for pagination
  const handleSentimentPage = (tab: string, direction: number) => {
    setSentimentPage((prev) => ({
      ...prev,
      [tab]: Math.max(1, prev[tab] + direction),
    }));
  };

  const handleEmotionPage = (tab: string, direction: number) => {
    setEmotionPage((prev) => ({
      ...prev,
      [tab]: Math.max(1, prev[tab] + direction),
    }));
  };

  const handleSpamPage = (direction: number) => {
    setSpamPage((p) => Math.max(1, p + direction));
  };

  // Data fetch functions
  const fetchSentimentDetailReviews = async (fileUrl: string) => {
    setSentimentDetailLoading(true);
    setSentimentDetailError('');
    try {
      const res = await fetch(fileUrl);
      if (!res.ok)
        throw new Error('Gagal mengambil data detail review sentimen');
      const data = await res.json();
      setSentimentDetailReviews(data);
    } catch (err: any) {
      setSentimentDetailError(
        err.message || 'Gagal mengambil data detail review sentimen'
      );
    } finally {
      setSentimentDetailLoading(false);
    }
  };

  const fetchSpamDetailReviews = async (fileUrl: string) => {
    setSpamDetailLoading(true);
    setSpamDetailError('');
    try {
      const res = await fetch(fileUrl);
      if (!res.ok) throw new Error('Gagal mengambil data detail spam');
      const data = await res.json();
      setSpamDetailReviews(data);
    } catch (err: any) {
      setSpamDetailError(err.message || 'Gagal mengambil data detail spam');
    } finally {
      setSpamDetailLoading(false);
    }
  };

  // AI Summary generator
  const generateAndSaveSummary = async (
    analysisId: Id<'analysis'>,
    dataForPrompt: any
  ) => {
    setIsGeneratingSummary(true);
    setSummaryError('');
    try {
      // Kirim dataForPrompt ke backend API ringkasan
      const res = await fetch(
        `${SCRAPER_API_URL}/api/reviews/generate-summary`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: dataForPrompt }),
        }
      );
      if (!res.ok) throw new Error('Gagal memanggil API ringkasan backend');
      const result = await res.json();
      const summary = result.summary;
      if (!summary) throw new Error('Ringkasan kosong dari API backend');
      await updateSummary({ analysisId, summary });
      return true;
    } catch (err: any) {
      setSummaryError(
        'Gagal membuat ringkasan AI. Silakan cek API backend, koneksi internet, atau quota.'
      );
      console.error('Ringkasan AI error:', err);
      return false;
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  // Error state
  const [error, setError] = useState('');

  // Fungsi untuk mengekstrak pesan error dari response API
  const extractApiErrorMessage = async (err: any): Promise<string> => {
    try {
      if (err instanceof Response) {
        const data = await err.json();
        return data?.message || data?.error || '';
      } else if (err && typeof err === 'object' && 'message' in err) {
        return err.message;
      }
    } catch (parseError) {
      console.error('Error parsing API error response', parseError);
    }
    return '';
  };

  // Handle form submission for analysis
  const handleAnalysisSubmit = async (formData: {
    appId: string;
    csvFile: File | null;
    sort: string;
    maxReview: string;
    customMax: string;
    activeSection: 'app' | 'csv' | null;
  }) => {
    const { appId, csvFile, sort, maxReview, customMax, activeSection } =
      formData;

    setError('');
    setAnalysisError('');
    setShowResults(false);

    // Check if user is logged in
    if (!user) {
      setError('Anda harus login untuk melakukan analisis.');
      toast({
        title: 'Gagal',
        description: 'Anda harus login untuk melakukan analisis.',
        variant: 'destructive',
      });
      return;
    }

    // Check limit if enabled (will be handled by UI layer with useLimitCheck hook)
    // The actual blocking is done in the UI components

    setLoadingStep('fetching-reviews');
    setLoadingMessage(
      activeSection === 'app'
        ? `Mengumpulkan data ulasan dari aplikasi ${appId}`
        : csvFile
          ? `Mengumpulkan data ulasan dari file ${csvFile.name}`
          : 'Mengumpulkan data ulasan...'
    );
    setAnalysisResult(null);

    try {
      let reviews = [];
      let inputType = '';
      let inputValue = '';
      let reviewsCount = 0;
      let sentimentFileUrl = '';
      let spamFileUrl = '';

      // 1. Fetch reviews
      if (activeSection === 'app') {
        inputType = 'appId';
        inputValue = appId;
        const res = await fetch(
          `${SCRAPER_API_URL}/api/reviews/google-play-scraper`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              appId,
              sort,
              num: maxReview === 'custom' ? +customMax : +maxReview,
            }),
          }
        );
        const data = await res.json();
        if (!res.ok || data.status !== 'success') {
          const apiError =
            data?.message ||
            data?.error ||
            'Gagal mengambil review dari Google Play';
          throw new Error(apiError);
        }
        reviews = data.reviews;
        reviewsCount = data.reviewsCount || reviews.length;
        setLoadingStep('success');
        setLoadingMessage('Berhasil mengumpulkan data ulasan aplikasi.');
      } else if (activeSection === 'csv' && csvFile) {
        inputType = 'csv';
        inputValue = csvFile.name;
        const formData = new FormData();
        formData.append('file', csvFile);
        const res = await fetch(
          `${SCRAPER_API_URL}/api/reviews/google-play-csv`,
          {
            method: 'POST',
            body: formData,
          }
        );
        const data = await res.json();
        if (!res.ok || data.status !== 'success') {
          const apiError =
            data?.message || data?.error || 'Gagal upload atau proses file CSV';
          throw new Error(apiError);
        }
        reviews = data.reviews;
        reviewsCount = data.reviewsCount || reviews.length;
        setLoadingStep('success');
        setLoadingMessage('Berhasil mengumpulkan data ulasan dari file CSV.');
      }

      if (!reviews || !Array.isArray(reviews) || reviews.length === 0)
        throw new Error('Tidak ada review yang ditemukan.');

      // 2. Fetch analysis
      setLoadingStep('analyzing');
      setLoadingMessage('Menganalisis sentimen, emosi, dan spam...');
      const [spamRes, sentimentRes] = await Promise.all([
        fetch(`${MODEL_API_URL}/api/spam-detection`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reviews }),
        }).then((r) => {
          if (!r.ok) throw new Error('Gagal analisis spam detection');
          return r.json();
        }),
        fetch(`${MODEL_API_URL}/api/sentiment-emotion`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reviews }),
        }).then((r) => {
          if (!r.ok) throw new Error('Gagal analisis sentiment emotion');
          return r.json();
        }),
      ]);

      // 3. Get file URLs from API responses
      sentimentFileUrl = sentimentRes.file_url;
      spamFileUrl = spamRes.file_url;

      // 4. Save to Convex
      const sentimentResultToSave = {
        sentiment_analysis: {
          percentages: sentimentRes.sentiment_analysis.percentages,
          counts: sentimentRes.sentiment_analysis.counts,
        },
        emotion_analysis: {
          percentages: sentimentRes.emotion_analysis.percentages,
          counts: sentimentRes.emotion_analysis.counts,
        },
      };

      const spamResultToSave = {
        percentages: spamRes.percentages,
        counts: spamRes.counts,
      };

      const createResult = await createAnalysis({
        userId: user.id,
        inputType,
        inputValue,
        reviewsCount,
        sentimentResult: sentimentResultToSave,
        spamResult: spamResultToSave,
        sentimentFileUrl,
        spamFileUrl,
        createdAt: Date.now(),
      });

      // 5. Update state
      setAnalysisResult({
        reviewsCount,
        sentimentResult: sentimentResultToSave,
        spamResult: spamResultToSave,
        sentimentFileUrl,
        spamFileUrl,
      });

      // 6. Tampilkan hasil dan update loading modal ke success
      setShowResults(true);
      setLoadingStep('success');
      setLoadingMessage('Berhasil menganalisis ulasan!');

      toast({
        title: `Berhasil menganalisis ${reviews.length} ulasan`,
        description: 'Scroll ke bawah untuk melihat hasil analisis',
        variant: 'default',
      });

      // 7. Generate AI summary di background
      // Fetch detailed reviews for summary
      let detailSentiment = null;
      let detailSpam = null;
      try {
        const [sentimentDetail, spamDetail] = await Promise.all([
          fetch(sentimentFileUrl).then((r) => r.json()),
          fetch(spamFileUrl).then((r) => r.json()),
        ]);
        detailSentiment = sentimentDetail;
        detailSpam = spamDetail;
      } catch (err) {
        console.error('Error fetching detail data for summary', err);
      }

      // Prepare data for prompt
      const dataForPrompt = {
        sentiment: sentimentResultToSave.sentiment_analysis,
        emotion: sentimentResultToSave.emotion_analysis,
        spam: spamResultToSave,
        top_words: {
          positive:
            detailSentiment?.sentiment_analysis?.word_clouds?.Positive?.map(
              (w) => w.word
            ) || [],
          neutral:
            detailSentiment?.sentiment_analysis?.word_clouds?.Neutral?.map(
              (w) => w.word
            ) || [],
          negative:
            detailSentiment?.sentiment_analysis?.word_clouds?.Negative?.map(
              (w) => w.word
            ) || [],
        },
        examples: {
          positive: (
            detailSentiment?.sentiment_analysis?.reviews_by_sentiment
              ?.Positive || []
          )
            .slice(0, 20)
            .map((r) => r.text),
          neutral: (
            detailSentiment?.sentiment_analysis?.reviews_by_sentiment
              ?.Neutral || []
          )
            .slice(0, 20)
            .map((r) => r.text),
          negative: (
            detailSentiment?.sentiment_analysis?.reviews_by_sentiment
              ?.Negative || []
          )
            .slice(0, 20)
            .map((r) => r.text),
          explicit_spam: (detailSpam?.reviews_by_category?.explicit_spam || [])
            .slice(0, 20)
            .map((r) => r.text),
          irrelevant_content: (
            detailSpam?.reviews_by_category?.irrelevant_content || []
          )
            .slice(0, 20)
            .map((r) => r.text),
        },
      };

      // Get ID from createAnalysis result
      const newAnalysisId = createResult;
      if (newAnalysisId) {
        // Jalankan summary di background, tidak mempengaruhi loading modal utama
        generateAndSaveSummary(newAnalysisId, dataForPrompt);
      } else {
        setSummaryError(
          'Gagal mendapatkan ID analisis baru untuk membuat ringkasan.'
        );
        console.error('Tidak ditemukan ID analisis baru', { createResult });
      }

      // Fetch detail data for display
      await Promise.all([
        fetchSentimentDetailReviews(sentimentFileUrl),
        fetchSpamDetailReviews(spamFileUrl),
      ]);
    } catch (err: any) {
      const apiMsg = await extractApiErrorMessage(err);
      const errorMsg = 'Terjadi kesalahan saat analisis.';

      setLoadingStep('error');
      setLoadingMessage(apiMsg ? `${errorMsg} (${apiMsg})` : errorMsg);
      setAnalysisError(apiMsg ? `${errorMsg} (${apiMsg})` : errorMsg);

      toast({
        title: 'Gagal',
        description: apiMsg ? `${errorMsg} (${apiMsg})` : errorMsg,
        variant: 'destructive',
      });
    } finally {
      setTimeout(() => setLoadingStep('idle'), 1200);
    }
  };

  // Effects
  useEffect(() => {
    if (analyses && analyses.length > 0) {
      setAnalysisResult(analyses[0]);
      setShowResults(true);
      // Fetch detail review automatically
      if (analyses[0]?.sentimentFileUrl) {
        fetchSentimentDetailReviews(analyses[0].sentimentFileUrl);
      }
      if (analyses[0]?.spamFileUrl) {
        fetchSpamDetailReviews(analyses[0].spamFileUrl);
      }
    } else {
      setShowResults(false);
      setAnalysisResult(null);
    }
  }, [analyses]);

  useEffect(() => {
    if (!user) {
      setShowResults(false);
      setAnalysisResult(null);
    }
  }, [user]);

  // Fetch detail reviews when showing results
  useEffect(() => {
    if (showResults && analysisResult?.sentimentFileUrl) {
      fetchSentimentDetailReviews(analysisResult.sentimentFileUrl);
    }
    if (showResults && analysisResult?.spamFileUrl) {
      fetchSpamDetailReviews(analysisResult.spamFileUrl);
    }
  }, [
    showResults,
    analysisResult?.sentimentFileUrl,
    analysisResult?.spamFileUrl,
  ]);

  // Calculate derived data for charts
  const sentimentPercentages = analysisResult
    ? analysisResult.sentimentResult.sentiment_analysis.percentages || {}
    : { Positive: 0, Neutral: 0, Negative: 0 };

  const emotionPercentages = analysisResult
    ? analysisResult.sentimentResult.emotion_analysis.percentages || {}
    : { Neutral: 0, Happy: 0, Sad: 0, Anger: 0, Fear: 0, Love: 0 };

  // Return the hook data and functions
  return {
    // State
    user,
    analysisResult,
    showResults,
    loadingStep,
    loadingMessage,
    error,
    analysisError,
    sentimentDetailReviews,
    sentimentDetailLoading,
    sentimentDetailError,
    spamDetailReviews,
    spamDetailLoading,
    spamDetailError,
    sentimentPage,
    emotionPage,
    spamPage,
    spamFilter,
    isGeneratingSummary,
    summaryError,
    sentimentPercentages,
    emotionPercentages,

    // Constants
    SENTIMENT_EMOTION_PAGE_SIZE,
    SPAM_PAGE_SIZE,

    // Functions
    handleAnalysisSubmit,
    handleSentimentPage,
    handleEmotionPage,
    handleSpamPage,
    setSpamFilter,
    setError,

    // Initial loading
    isInitialLoading,
  };
}
