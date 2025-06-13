import React, { memo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';

// Skeleton component for loading state
const Skeleton = ({ className = '' }) => (
  <div className={`animate-pulse bg-muted rounded ${className}`} />
);

interface AISummaryProps {
  isGenerating: boolean;
  error: string;
  summary: string | null;
}

const AISummary = memo(({ isGenerating, error, summary }: AISummaryProps) => {
  return (
    <Card className="bg-gradient-to-br from-quicktify-primary/20 to-quicktify-accent/20 border-quicktify-primary/50 relative">
      {/* Animated Gemini Badge */}
      <span
        className="hidden sm:inline-block absolute top-2 right-2 sm:top-4 sm:right-4 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 via-sky-400 to-blue-400 text-white text-xs font-semibold shadow animate-pulse"
        style={{ pointerEvents: 'none' }}
      >
        Dibuat oleh Google Gemini 2.0 Flash 🌟
      </span>
      <CardHeader className="pt-5 pb-5 border-b border-muted-foreground/20 bg-white/60 dark:bg-black/30 rounded-t-xl">
        <h2 className="text-2xl font-bold mb-1">
          Ringkasan Hasil Analisis{' '}
          <span className="text-quicktify-primary">(AI)</span>
        </h2>
        <CardDescription className="text-base font-medium">
          Kesimpulan dari analisis ulasan aplikasi Anda
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-5 pb-5 prose prose-sm dark:prose-invert mx-auto max-w-none">
        {isGenerating ? (
          <div>
            <Skeleton className="h-8 w-1/2 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-2/3 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-2" />
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : summary ? (
          <ReactMarkdown>{summary}</ReactMarkdown>
        ) : (
          <div className="text-muted-foreground">
            Ringkasan akan dihasilkan setelah analisis selesai.
          </div>
        )}
      </CardContent>
    </Card>
  );
});

export default AISummary;
