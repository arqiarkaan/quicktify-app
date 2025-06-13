import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { useEffect, useState, useMemo } from 'react';
import {
  StatisticsCards,
  SentimentPieChart,
  EmotionPieChart,
  SentimentBarChart,
  EmotionBarChart,
  SentimentReviewTabs,
  EmotionReviewTabs,
  SpamTable,
  SentimentWordCloud,
  EmotionWordCloud,
  AISummary,
  AnalysisResultsSkeleton,
} from '@/components/dashboard';

const SENTIMENT_EMOTION_PAGE_SIZE = 5;
const SPAM_PAGE_SIZE = 10;

const AnalysisDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();
  const analyses = useQuery(
    user ? api.analysis.getUserAnalyses : null,
    user ? { userId: user.id } : undefined
  );
  const [analysis, setAnalysis] = useState(null);
  const [analysisIndex, setAnalysisIndex] = useState<number | null>(null);
  const [sentimentDetailReviews, setSentimentDetailReviews] = useState(null);
  const [sentimentDetailLoading, setSentimentDetailLoading] = useState(false);
  const [sentimentDetailError, setSentimentDetailError] = useState('');
  const [spamDetailReviews, setSpamDetailReviews] = useState(null);
  const [spamDetailLoading, setSpamDetailLoading] = useState(false);
  const [spamDetailError, setSpamDetailError] = useState('');
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
  const [hasTriedFindAnalysis, setHasTriedFindAnalysis] = useState(false);

  // Fetch analysis by id
  useEffect(() => {
    if (analyses && id) {
      const sorted = [...analyses].sort((a, b) => a.createdAt - b.createdAt);
      const idx = sorted.findIndex((a) => a._id === id);
      setAnalysisIndex(idx >= 0 ? idx + 1 : null);
      setAnalysis(analyses.find((a) => a._id === id) || null);
      setHasTriedFindAnalysis(true);
    }
  }, [analyses, id]);

  // Fetch detail reviews
  useEffect(() => {
    async function fetchSentimentDetailReviews(fileUrl) {
      setSentimentDetailLoading(true);
      setSentimentDetailError('');
      try {
        const res = await fetch(fileUrl);
        if (!res.ok)
          throw new Error('Gagal mengambil data detail review sentimen');
        const data = await res.json();
        setSentimentDetailReviews(data);
      } catch (err) {
        setSentimentDetailError(
          err.message || 'Gagal mengambil data detail review sentimen'
        );
      } finally {
        setSentimentDetailLoading(false);
      }
    }
    async function fetchSpamDetailReviews(fileUrl) {
      setSpamDetailLoading(true);
      setSpamDetailError('');
      try {
        const res = await fetch(fileUrl);
        if (!res.ok) throw new Error('Gagal mengambil data detail spam');
        const data = await res.json();
        setSpamDetailReviews(data);
      } catch (err) {
        setSpamDetailError(err.message || 'Gagal mengambil data detail spam');
      } finally {
        setSpamDetailLoading(false);
      }
    }
    if (analysis?.sentimentFileUrl) {
      fetchSentimentDetailReviews(analysis.sentimentFileUrl);
    }
    if (analysis?.spamFileUrl) {
      fetchSpamDetailReviews(analysis.spamFileUrl);
    }
  }, [analysis?.sentimentFileUrl, analysis?.spamFileUrl]);

  // Prepare derived data for components
  const totalReviews = analysis ? analysis.reviewsCount : 0;
  const sentimentPercentages = analysis
    ? analysis.sentimentResult.sentiment_analysis.percentages || {}
    : { Positive: 0, Neutral: 0, Negative: 0 };
  const emotionPercentages = analysis
    ? analysis.sentimentResult.emotion_analysis.percentages || {}
    : { Neutral: 0, Happy: 0, Sad: 0, Anger: 0, Fear: 0, Love: 0 };
  const sentimentBarData = useMemo(() => {
    if (!analysis) return [];
    return [
      {
        name: 'Positif',
        value:
          analysis.sentimentResult.sentiment_analysis.counts?.Positive || 0,
        color: '#4ade80',
      },
      {
        name: 'Netral',
        value: analysis.sentimentResult.sentiment_analysis.counts?.Neutral || 0,
        color: '#94a3b8',
      },
      {
        name: 'Negatif',
        value:
          analysis.sentimentResult.sentiment_analysis.counts?.Negative || 0,
        color: '#f87171',
      },
    ];
  }, [analysis]);
  const emotionBarData = useMemo(() => {
    if (!analysis) return [];
    return [
      {
        name: 'Neutral',
        value: analysis.sentimentResult.emotion_analysis.counts?.Neutral || 0,
        color: '#94a3b8',
      },
      {
        name: 'Happy',
        value: analysis.sentimentResult.emotion_analysis.counts?.Happy || 0,
        color: '#fbbf24',
      },
      {
        name: 'Sad',
        value: analysis.sentimentResult.emotion_analysis.counts?.Sad || 0,
        color: '#60a5fa',
      },
      {
        name: 'Anger',
        value: analysis.sentimentResult.emotion_analysis.counts?.Anger || 0,
        color: '#f87171',
      },
      {
        name: 'Fear',
        value: analysis.sentimentResult.emotion_analysis.counts?.Fear || 0,
        color: '#a78bfa',
      },
      {
        name: 'Love',
        value: analysis.sentimentResult.emotion_analysis.counts?.Love || 0,
        color: '#fb7185',
      },
    ];
  }, [analysis]);
  const spamBarData = useMemo(() => {
    if (!analysis) return [];
    return [
      {
        name: 'Explicit Spam',
        value: analysis.spamResult.counts?.explicit_spam || 0,
        color: '#f87171',
      },
      {
        name: 'Irrelevant Content',
        value: analysis.spamResult.counts?.irrelevant_content || 0,
        color: '#fbbf24',
      },
    ];
  }, [analysis]);
  const sentimentPieData = useMemo(
    () => [
      {
        name: 'Positif',
        value: sentimentPercentages.Positive || 0,
        color: '#4ade80',
      },
      {
        name: 'Netral',
        value: sentimentPercentages.Neutral || 0,
        color: '#94a3b8',
      },
      {
        name: 'Negatif',
        value: sentimentPercentages.Negative || 0,
        color: '#f87171',
      },
    ],
    [sentimentPercentages]
  );
  const emotionPieData = useMemo(
    () => [
      {
        name: 'Neutral',
        value: emotionPercentages.Neutral || 0,
        color: '#94a3b8',
      },
      {
        name: 'Happy',
        value: emotionPercentages.Happy || 0,
        color: '#fbbf24',
      },
      {
        name: 'Sad',
        value: emotionPercentages.Sad || 0,
        color: '#60a5fa',
      },
      {
        name: 'Anger',
        value: emotionPercentages.Anger || 0,
        color: '#f87171',
      },
      {
        name: 'Fear',
        value: emotionPercentages.Fear || 0,
        color: '#a78bfa',
      },
      {
        name: 'Love',
        value: emotionPercentages.Love || 0,
        color: '#fb7185',
      },
    ],
    [emotionPercentages]
  );
  // Review data for tabs
  const sentimentReviewData = useMemo(() => {
    if (!sentimentDetailReviews)
      return { positive: [], neutral: [], negative: [] };
    return {
      positive:
        sentimentDetailReviews.sentiment_analysis?.reviews_by_sentiment?.Positive?.map(
          (r) => ({ review: r.text, score: r.confidence })
        ) || [],
      neutral:
        sentimentDetailReviews.sentiment_analysis?.reviews_by_sentiment?.Neutral?.map(
          (r) => ({ review: r.text, score: r.confidence })
        ) || [],
      negative:
        sentimentDetailReviews.sentiment_analysis?.reviews_by_sentiment?.Negative?.map(
          (r) => ({ review: r.text, score: r.confidence })
        ) || [],
    };
  }, [sentimentDetailReviews]);
  const emotionReviewData = useMemo(() => {
    if (!sentimentDetailReviews) {
      return { neutral: [], happy: [], sad: [], anger: [], fear: [], love: [] };
    }
    return {
      neutral:
        sentimentDetailReviews.emotion_analysis?.reviews_by_emotion?.Neutral?.map(
          (r) => ({ review: r.text, score: r.confidence })
        ) || [],
      happy:
        sentimentDetailReviews.emotion_analysis?.reviews_by_emotion?.Happy?.map(
          (r) => ({ review: r.text, score: r.confidence })
        ) || [],
      sad:
        sentimentDetailReviews.emotion_analysis?.reviews_by_emotion?.Sad?.map(
          (r) => ({ review: r.text, score: r.confidence })
        ) || [],
      anger:
        sentimentDetailReviews.emotion_analysis?.reviews_by_emotion?.Anger?.map(
          (r) => ({ review: r.text, score: r.confidence })
        ) || [],
      fear:
        sentimentDetailReviews.emotion_analysis?.reviews_by_emotion?.Fear?.map(
          (r) => ({ review: r.text, score: r.confidence })
        ) || [],
      love:
        sentimentDetailReviews.emotion_analysis?.reviews_by_emotion?.Love?.map(
          (r) => ({ review: r.text, score: r.confidence })
        ) || [],
    };
  }, [sentimentDetailReviews]);
  // Word cloud data
  const sentimentWordCloudData = useMemo(() => {
    if (!sentimentDetailReviews)
      return { positive: [], neutral: [], negative: [] };
    return {
      positive:
        sentimentDetailReviews.sentiment_analysis?.word_clouds?.Positive || [],
      neutral:
        sentimentDetailReviews.sentiment_analysis?.word_clouds?.Neutral || [],
      negative:
        sentimentDetailReviews.sentiment_analysis?.word_clouds?.Negative || [],
    };
  }, [sentimentDetailReviews]);
  const emotionWordCloudData = useMemo(() => {
    if (!sentimentDetailReviews) {
      return { neutral: [], happy: [], sad: [], anger: [], fear: [], love: [] };
    }
    return {
      neutral:
        sentimentDetailReviews.emotion_analysis?.word_clouds?.Neutral || [],
      happy: sentimentDetailReviews.emotion_analysis?.word_clouds?.Happy || [],
      sad: sentimentDetailReviews.emotion_analysis?.word_clouds?.Sad || [],
      anger: sentimentDetailReviews.emotion_analysis?.word_clouds?.Anger || [],
      fear: sentimentDetailReviews.emotion_analysis?.word_clouds?.Fear || [],
      love: sentimentDetailReviews.emotion_analysis?.word_clouds?.Love || [],
    };
  }, [sentimentDetailReviews]);
  // Spam reviews
  const spamReviews = useMemo(() => {
    if (!spamDetailReviews) return [];
    return [
      ...(spamDetailReviews.reviews_by_category?.explicit_spam?.map((r) => ({
        review: r.text,
        category: 'Explicit Spam',
        score: r.confidence,
      })) || []),
      ...(spamDetailReviews.reviews_by_category?.irrelevant_content?.map(
        (r) => ({
          review: r.text,
          category: 'Irrelevant Content',
          score: r.confidence,
        })
      ) || []),
    ];
  }, [spamDetailReviews]);

  // Handler functions for pagination (sama seperti di Dashboard)
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

  // Loading skeleton saat analyses masih loading
  if (analyses === undefined) {
    return (
      <DashboardLayout>
        <div className="container py-6 md:py-10">
          <div className="mt-6">
            <AnalysisResultsSkeleton />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Jika analysis tidak ditemukan setelah analyses ready
  if (hasTriedFindAnalysis && !analysis) {
    return (
      <DashboardLayout>
        <div className="container py-6 md:py-10 flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-full max-w-lg">
            <div className="rounded-lg border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950 p-8 shadow-md flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-red-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                />
              </svg>
              <h1 className="text-2xl font-bold text-red-700 dark:text-red-300 mb-2 text-center">
                Analisis Tidak Ditemukan
              </h1>
              <p className="text-muted-foreground text-center mb-6">
                Data analisis yang Anda cari tidak tersedia atau sudah dihapus.
                Silakan kembali ke halaman sebelumnya atau cek riwayat analisis
                Anda.
              </p>
              <Button variant="outline" onClick={() => navigate(-1)}>
                Kembali
              </Button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Jika analysis masih null dan proses pencarian belum selesai, jangan render apapun
  if (!analysis) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="container py-6 md:py-10 space-y-8">
        {/* Tombol kembali ke riwayat analisis */}
        {/* Header detail analisis */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-1">Detail Analisis</h1>
              <p className="text-muted-foreground text-base">
                Tanggal dibuat:{' '}
                <span className="font-semibold">
                  {new Date(analysis.createdAt).toLocaleString()}
                </span>
                <span className="mx-2">|</span>
                Analisis ke-
                <span className="font-semibold">{analysisIndex}</span>
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard/analysis/history')}
              className="w-full md:w-auto"
            >
              Kembali ke Riwayat Analisis
            </Button>
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-lg bg-muted/50 p-4 flex flex-col">
              <span className="text-xs text-muted-foreground mb-1">
                ID Analisis
              </span>
              <span className="font-mono text-sm break-all select-all">
                {analysis._id}
              </span>
            </div>
            <div className="rounded-lg bg-muted/50 p-4 flex flex-col">
              <span className="text-xs text-muted-foreground mb-1">
                Sumber Data
              </span>
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-semibold
                ${
                  analysis.inputType === 'appId'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                    : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                }`}
              >
                {analysis.inputType === 'appId'
                  ? 'Google Play App ID'
                  : 'CSV File'}
              </span>
            </div>
            <div className="rounded-lg bg-muted/50 p-4 flex flex-col col-span-1 sm:col-span-2">
              <span className="text-xs text-muted-foreground mb-1">
                {analysis.inputType === 'csv' ? 'File' : 'Aplikasi'}
              </span>
              <span className="font-mono text-sm break-all select-all">
                {analysis.inputValue}
              </span>
            </div>
          </div>
        </div>
        {/* Statistik Cards */}
        <StatisticsCards
          loading={sentimentDetailLoading || spamDetailLoading}
          totalReviews={totalReviews}
          sentimentData={sentimentBarData}
          emotionData={emotionBarData}
          spamData={spamBarData}
        />
        {/* Pie Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SentimentPieChart
            data={sentimentPieData}
            loading={sentimentDetailLoading}
          />
          <EmotionPieChart
            data={emotionPieData}
            loading={sentimentDetailLoading}
          />
        </div>
        {/* Bar Charts */}
        <SentimentBarChart
          data={sentimentPieData}
          loading={sentimentDetailLoading}
        />
        <EmotionBarChart
          data={emotionPieData}
          loading={sentimentDetailLoading}
        />
        {/* Review Tabs */}
        <SentimentReviewTabs
          loading={sentimentDetailLoading}
          error={sentimentDetailError}
          reviewData={sentimentReviewData}
          percentages={sentimentPercentages}
          page={sentimentPage}
          onPageChange={handleSentimentPage}
          pageSize={SENTIMENT_EMOTION_PAGE_SIZE}
        />
        <EmotionReviewTabs
          loading={sentimentDetailLoading}
          error={sentimentDetailError}
          reviewData={emotionReviewData}
          percentages={emotionPercentages}
          page={emotionPage}
          onPageChange={handleEmotionPage}
          pageSize={SENTIMENT_EMOTION_PAGE_SIZE}
        />
        {/* Word Clouds */}
        <SentimentWordCloud
          wordData={sentimentWordCloudData}
          loading={sentimentDetailLoading}
        />
        <EmotionWordCloud
          wordData={emotionWordCloudData}
          loading={sentimentDetailLoading}
        />
        {/* Spam Table */}
        <SpamTable
          loading={spamDetailLoading}
          spamReviews={spamReviews}
          filter={spamFilter}
          currentPage={spamPage}
          pageSize={SPAM_PAGE_SIZE}
          onFilterChange={setSpamFilter}
          onPageChange={setSpamPage}
        />
        {/* AI Summary */}
        <AISummary
          isGenerating={false}
          error={''}
          summary={analysis?.summary || null}
        />
      </div>
    </DashboardLayout>
  );
};

export default AnalysisDetail;
