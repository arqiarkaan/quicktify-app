import { useMemo } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { useAnalysisData } from '@/hooks/useAnalysisData';
import { LimitStatus } from '@/components/ui/limit-status';
import { useLimitCheck } from '@/hooks/useLimitCheck';

// Import semua komponen dashboard dari barrel export
import {
  AnalysisForm,
  LoadingModal,
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
} from '@/components/dashboard';

import AnalysisResultsSkeleton from '@/components/dashboard/AnalysisResultsSkeleton';

type SentimentPercentagesType = {
  Positive: number;
  Neutral: number;
  Negative: number;
};

type EmotionPercentagesType = {
  Neutral: number;
  Happy: number;
  Sad: number;
  Anger: number;
  Fear: number;
  Love: number;
};

const Dashboard = () => {
  // Check limit status for analysis
  const limitCheck = useLimitCheck('analysis');

  // Gunakan custom hook untuk data dan logika
  const {
    // State
    loadingStep,
    loadingMessage,
    analysisResult,
    showResults,
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
    // Initial loading
    isInitialLoading,
  } = useAnalysisData();

  // Mempersiapkan data yang dibutuhkan komponen
  const totalReviews = analysisResult ? analysisResult.reviewsCount : 0;

  // Data untuk chart sentiment
  const sentimentPieData = useMemo(
    () => [
      {
        name: 'Positif',
        value: (sentimentPercentages as SentimentPercentagesType).Positive || 0,
        color: '#4ade80',
      },
      {
        name: 'Netral',
        value: (sentimentPercentages as SentimentPercentagesType).Neutral || 0,
        color: '#94a3b8',
      },
      {
        name: 'Negatif',
        value: (sentimentPercentages as SentimentPercentagesType).Negative || 0,
        color: '#f87171',
      },
    ],
    [sentimentPercentages]
  );

  // Data untuk chart emotion
  const emotionPieData = useMemo(
    () => [
      {
        name: 'Neutral',
        value: (emotionPercentages as EmotionPercentagesType).Neutral || 0,
        color: '#94a3b8',
      },
      {
        name: 'Happy',
        value: (emotionPercentages as EmotionPercentagesType).Happy || 0,
        color: '#fbbf24',
      },
      {
        name: 'Sad',
        value: (emotionPercentages as EmotionPercentagesType).Sad || 0,
        color: '#60a5fa',
      },
      {
        name: 'Anger',
        value: (emotionPercentages as EmotionPercentagesType).Anger || 0,
        color: '#f87171',
      },
      {
        name: 'Fear',
        value: (emotionPercentages as EmotionPercentagesType).Fear || 0,
        color: '#a78bfa',
      },
      {
        name: 'Love',
        value: (emotionPercentages as EmotionPercentagesType).Love || 0,
        color: '#fb7185',
      },
    ],
    [emotionPercentages]
  );

  // Data untuk statistics cards
  const sentimentBarData = useMemo(() => {
    if (!analysisResult) return [];
    return [
      {
        name: 'Positif',
        value:
          analysisResult.sentimentResult.sentiment_analysis.counts?.Positive ||
          0,
        color: '#4ade80',
      },
      {
        name: 'Netral',
        value:
          analysisResult.sentimentResult.sentiment_analysis.counts?.Neutral ||
          0,
        color: '#94a3b8',
      },
      {
        name: 'Negatif',
        value:
          analysisResult.sentimentResult.sentiment_analysis.counts?.Negative ||
          0,
        color: '#f87171',
      },
    ];
  }, [analysisResult]);

  const emotionBarData = useMemo(() => {
    if (!analysisResult) return [];
    return [
      {
        name: 'Neutral',
        value:
          analysisResult.sentimentResult.emotion_analysis.counts?.Neutral || 0,
        color: '#94a3b8',
      },
      {
        name: 'Happy',
        value:
          analysisResult.sentimentResult.emotion_analysis.counts?.Happy || 0,
        color: '#fbbf24',
      },
      {
        name: 'Sad',
        value: analysisResult.sentimentResult.emotion_analysis.counts?.Sad || 0,
        color: '#60a5fa',
      },
      {
        name: 'Anger',
        value:
          analysisResult.sentimentResult.emotion_analysis.counts?.Anger || 0,
        color: '#f87171',
      },
      {
        name: 'Fear',
        value:
          analysisResult.sentimentResult.emotion_analysis.counts?.Fear || 0,
        color: '#a78bfa',
      },
      {
        name: 'Love',
        value:
          analysisResult.sentimentResult.emotion_analysis.counts?.Love || 0,
        color: '#fb7185',
      },
    ];
  }, [analysisResult]);

  const spamBarData = useMemo(() => {
    if (!analysisResult) return [];
    return [
      {
        name: 'Explicit Spam',
        value: analysisResult.spamResult.counts?.explicit_spam || 0,
        color: '#f87171',
      },
      {
        name: 'Irrelevant Content',
        value: analysisResult.spamResult.counts?.irrelevant_content || 0,
        color: '#fbbf24',
      },
    ];
  }, [analysisResult]);

  // Data untuk review tabs
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

  // Data untuk spam table
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

  return (
    <DashboardLayout>
      <LoadingModal loadingStep={loadingStep} loadingMessage={loadingMessage} />

      <div className="container py-6 md:py-10 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard Analisis</h1>
            <p className="text-muted-foreground mt-2">
              Dapatkan insight mendalam tentang ulasan aplikasi Anda
            </p>
          </div>
        </div>

        {/* Limit Status Display */}
        {limitCheck.shouldShowLimit && (
          <LimitStatus
            currentCount={limitCheck.currentCount}
            maxLimit={limitCheck.maxLimit}
            type="analisis"
            className="mb-8"
          />
        )}

        {/* Form Analisis */}
        <AnalysisForm
          onSubmit={handleAnalysisSubmit}
          isLoading={loadingStep !== 'idle'}
        />

        {/* Skeleton Loading */}
        {!showResults &&
          (isInitialLoading ||
            loadingStep === 'analyzing' ||
            loadingStep === 'fetching-reviews') && <AnalysisResultsSkeleton />}

        {showResults && (
          <div className="space-y-8">
            {/* Statistik Jumlah Ulasan */}
            <StatisticsCards
              loading={
                loadingStep === 'analyzing' ||
                loadingStep === 'fetching-reviews'
              }
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
              percentages={sentimentPercentages as SentimentPercentagesType}
              page={sentimentPage}
              onPageChange={handleSentimentPage}
              pageSize={SENTIMENT_EMOTION_PAGE_SIZE}
            />

            <EmotionReviewTabs
              loading={sentimentDetailLoading}
              error={sentimentDetailError}
              reviewData={emotionReviewData}
              percentages={emotionPercentages as EmotionPercentagesType}
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
              onPageChange={handleSpamPage}
            />

            {/* AI Summary */}
            <AISummary
              isGenerating={isGeneratingSummary}
              error={summaryError}
              summary={analysisResult?.summary || null}
            />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
