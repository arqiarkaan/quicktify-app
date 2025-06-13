import React, { memo, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// Skeleton component for loading state
const Skeleton = ({ className = '' }) => (
  <div className={`animate-pulse bg-muted rounded ${className}`} />
);

// Interface for WordCloudItem props
interface WordCloudItemProps {
  word: string;
  count: number;
  index: number;
  minCount: number;
  maxCount: number;
  colorTheme: 'green' | 'red' | 'slate' | 'yellow' | 'blue' | 'purple' | 'pink';
}

// Optimize word cloud rendering with memo
const WordCloudItem = memo(
  ({
    word,
    count,
    index,
    minCount,
    maxCount,
    colorTheme,
  }: WordCloudItemProps) => {
    const style = useMemo(() => {
      // Color palette based on theme
      const palette =
        colorTheme === 'green'
          ? ['#16a34a', '#22c55e', '#4ade80', '#bbf7d0']
          : colorTheme === 'red'
            ? ['#dc2626', '#f87171', '#fca5a5', '#fee2e2']
            : colorTheme === 'slate'
              ? ['#334155', '#64748b', '#94a3b8', '#cbd5e1']
              : colorTheme === 'yellow'
                ? ['#f59e42', '#fbbf24', '#fde68a', '#fef9c3']
                : colorTheme === 'blue'
                  ? ['#2563eb', '#60a5fa', '#93c5fd', '#dbeafe']
                  : colorTheme === 'purple'
                    ? ['#7c3aed', '#a78bfa', '#c4b5fd', '#ede9fe']
                    : colorTheme === 'pink'
                      ? ['#db2777', '#fb7185', '#fbcfe8', '#f9a8d4']
                      : ['#334155', '#64748b', '#94a3b8', '#cbd5e1'];

      const color = palette[index % palette.length];
      // Font size: scale between 1rem and 2.5rem (16px - 40px)
      const minFont = 16,
        maxFont = 40;
      const size =
        minCount === maxCount
          ? maxFont
          : minFont +
            ((count - minCount) / (maxCount - minCount)) * (maxFont - minFont);

      return {
        color,
        fontSize: `${size}px`,
        fontWeight: 600,
      };
    }, [count, index, minCount, maxCount, colorTheme]);

    return (
      <span style={style} className="transition-all">
        {word}
      </span>
    );
  }
);

// Helper function to get top words
function topWords(arr, max = 20) {
  return arr
    .slice()
    .sort((a, b) => (b.count || 0) - (a.count || 0))
    .slice(0, max);
}

interface WordCloudProps {
  words: Array<{ word: string; count: number }>;
  loading: boolean;
  title: string;
  description: string;
  colorTheme: 'green' | 'red' | 'slate' | 'yellow' | 'blue' | 'purple' | 'pink';
}

// Memoized single word cloud card
const SingleWordCloudCard = memo(
  ({ words, loading, title, description, colorTheme }: WordCloudProps) => {
    // Memoize processed words to avoid recalculation
    const processedWords = useMemo(() => {
      const topWordsList = topWords(words, 20);
      const counts = topWordsList.map((w) => w.count || 1);
      const minCount = Math.min(...counts);
      const maxCount = Math.max(...counts);

      return { topWordsList, minCount, maxCount };
    }, [words]);

    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="min-h-[120px] md:min-h-[192px] flex items-center justify-center overflow-x-auto">
            <div className="text-cloud p-4 flex flex-wrap gap-2 justify-center max-w-full break-words">
              {loading ? (
                <Skeleton className="h-12 w-full mb-2" />
              ) : (
                processedWords.topWordsList.map((word, idx) => (
                  <WordCloudItem
                    key={word.word}
                    word={word.word}
                    count={word.count}
                    index={idx}
                    minCount={processedWords.minCount}
                    maxCount={processedWords.maxCount}
                    colorTheme={colorTheme}
                  />
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);

interface SentimentWordCloudProps {
  wordData: {
    positive: Array<{ word: string; count: number }>;
    neutral: Array<{ word: string; count: number }>;
    negative: Array<{ word: string; count: number }>;
  };
  loading: boolean;
}

// Sentiment Word Cloud Component
export const SentimentWordCloud = memo(
  ({ wordData, loading }: SentimentWordCloudProps) => {
    return (
      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Word Cloud Sentimen</CardTitle>
          <CardDescription>
            Visualisasi kata-kata yang sering muncul dalam ulasan berdasarkan
            kategori sentimen
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SingleWordCloudCard
              words={wordData.positive}
              loading={loading}
              title="Word Cloud: Sentimen Positif"
              description="Kata-kata yang sering muncul dalam ulasan positif"
              colorTheme="green"
            />
            <SingleWordCloudCard
              words={wordData.neutral}
              loading={loading}
              title="Word Cloud: Sentimen Netral"
              description="Kata-kata yang sering muncul dalam ulasan netral"
              colorTheme="slate"
            />
            <SingleWordCloudCard
              words={wordData.negative}
              loading={loading}
              title="Word Cloud: Sentimen Negatif"
              description="Kata-kata yang sering muncul dalam ulasan negatif"
              colorTheme="red"
            />
          </div>
        </CardContent>
      </Card>
    );
  }
);

interface EmotionWordCloudProps {
  wordData: {
    neutral: Array<{ word: string; count: number }>;
    happy: Array<{ word: string; count: number }>;
    sad: Array<{ word: string; count: number }>;
    anger: Array<{ word: string; count: number }>;
    fear: Array<{ word: string; count: number }>;
    love: Array<{ word: string; count: number }>;
  };
  loading: boolean;
}

// Emotion Word Cloud Component
export const EmotionWordCloud = memo(
  ({ wordData, loading }: EmotionWordCloudProps) => {
    return (
      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Word Cloud Emosi</CardTitle>
          <CardDescription>
            Visualisasi kata-kata yang sering muncul dalam ulasan berdasarkan
            kategori emosi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SingleWordCloudCard
              words={wordData.neutral}
              loading={loading}
              title="Word Cloud: Emosi Neutral"
              description="Kata-kata yang sering muncul dalam ulasan emosi neutral"
              colorTheme="slate"
            />
            <SingleWordCloudCard
              words={wordData.happy}
              loading={loading}
              title="Word Cloud: Emosi Happy"
              description="Kata-kata yang sering muncul dalam ulasan emosi happy"
              colorTheme="yellow"
            />
            <SingleWordCloudCard
              words={wordData.sad}
              loading={loading}
              title="Word Cloud: Emosi Sad"
              description="Kata-kata yang sering muncul dalam ulasan emosi sad"
              colorTheme="blue"
            />
            <SingleWordCloudCard
              words={wordData.anger}
              loading={loading}
              title="Word Cloud: Emosi Anger"
              description="Kata-kata yang sering muncul dalam ulasan emosi anger"
              colorTheme="red"
            />
            <SingleWordCloudCard
              words={wordData.fear}
              loading={loading}
              title="Word Cloud: Emosi Fear"
              description="Kata-kata yang sering muncul dalam ulasan emosi fear"
              colorTheme="purple"
            />
            <SingleWordCloudCard
              words={wordData.love}
              loading={loading}
              title="Word Cloud: Emosi Love"
              description="Kata-kata yang sering muncul dalam ulasan emosi love"
              colorTheme="pink"
            />
          </div>
        </CardContent>
      </Card>
    );
  }
);
