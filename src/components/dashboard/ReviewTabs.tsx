import React, { memo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Skeleton component for loading state
const Skeleton = ({ className = '' }) => (
  <div className={`animate-pulse bg-muted rounded ${className}`} />
);

interface ReviewTabsProps {
  loading: boolean;
  error: string;
  reviewData: {
    positive: Array<{ review: string; score: number }>;
    neutral: Array<{ review: string; score: number }>;
    negative: Array<{ review: string; score: number }>;
  };
  percentages: {
    Positive: number;
    Neutral: number;
    Negative: number;
  };
  page: {
    positive: number;
    neutral: number;
    negative: number;
  };
  onPageChange: (tab: string, direction: number) => void;
  pageSize: number;
}

// Optimized with memo to prevent unnecessary re-renders
export const SentimentReviewTabs = memo(
  ({
    loading,
    error,
    reviewData,
    percentages,
    page,
    onPageChange,
    pageSize,
  }: ReviewTabsProps) => {
    // Helper function to sort by score
    const sortByScoreDesc = (arr: Array<{ review: string; score: number }>) => {
      return arr.slice().sort((a, b) => (b.score || 0) - (a.score || 0));
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle>Ulasan Berdasarkan Sentimen</CardTitle>
          <CardDescription>
            Contoh ulasan untuk setiap kategori sentimen dengan skor kepercayaan
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>
              {[...Array(pageSize)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full mb-2" />
              ))}
            </div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <Tabs defaultValue="positive">
              <div className="w-full overflow-x-auto">
                <TabsList className="grid w-max min-w-full grid-cols-3 lg:w-full">
                  <TabsTrigger
                    value="positive"
                    className="text-xs sm:text-sm whitespace-nowrap px-2 sm:px-4"
                  >
                    Positif ({percentages.Positive || 0}%)
                  </TabsTrigger>
                  <TabsTrigger
                    value="neutral"
                    className="text-xs sm:text-sm whitespace-nowrap px-2 sm:px-4"
                  >
                    Netral ({percentages.Neutral || 0}%)
                  </TabsTrigger>
                  <TabsTrigger
                    value="negative"
                    className="text-xs sm:text-sm whitespace-nowrap px-2 sm:px-4"
                  >
                    Negatif ({percentages.Negative || 0}%)
                  </TabsTrigger>
                </TabsList>
              </div>
              {['positive', 'neutral', 'negative'].map((tab) => {
                const reviews = reviewData[tab] || [];
                const totalPages = Math.ceil(reviews.length / pageSize) || 1;
                const startIdx = (page[tab] - 1) * pageSize;
                const endIdx = startIdx + pageSize;

                return (
                  <TabsContent key={tab} value={tab} className="mt-4 space-y-4">
                    {sortByScoreDesc(reviews)
                      .slice(startIdx, endIdx)
                      .map((example, idx) => (
                        <div
                          key={idx}
                          className="p-4 border rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0"
                        >
                          <p className="text-sm md:text-base">
                            {example.review}
                          </p>
                          <span
                            className={
                              tab === 'positive'
                                ? 'text-sm font-medium px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full ml-2 whitespace-nowrap'
                                : tab === 'neutral'
                                  ? 'text-sm font-medium px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-full ml-2 whitespace-nowrap'
                                  : 'text-sm font-medium px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded-full ml-2 whitespace-nowrap'
                            }
                          >
                            Confidence: {example.score.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={page[tab] === 1}
                        onClick={() => onPageChange(tab, -1)}
                      >
                        Sebelumnya
                      </Button>
                      <span className="text-xs text-muted-foreground">
                        Halaman {page[tab]} dari {totalPages}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={page[tab] === totalPages}
                        onClick={() => onPageChange(tab, 1)}
                      >
                        Berikutnya
                      </Button>
                    </div>
                  </TabsContent>
                );
              })}
            </Tabs>
          )}
        </CardContent>
      </Card>
    );
  }
);

interface EmotionReviewTabsProps {
  loading: boolean;
  error: string;
  reviewData: {
    neutral: Array<{ review: string; score: number }>;
    happy: Array<{ review: string; score: number }>;
    sad: Array<{ review: string; score: number }>;
    anger: Array<{ review: string; score: number }>;
    fear: Array<{ review: string; score: number }>;
    love: Array<{ review: string; score: number }>;
  };
  percentages: {
    Neutral: number;
    Happy: number;
    Sad: number;
    Anger: number;
    Fear: number;
    Love: number;
  };
  page: {
    neutral: number;
    happy: number;
    sad: number;
    anger: number;
    fear: number;
    love: number;
  };
  onPageChange: (tab: string, direction: number) => void;
  pageSize: number;
}

export const EmotionReviewTabs = memo(
  ({
    loading,
    error,
    reviewData,
    percentages,
    page,
    onPageChange,
    pageSize,
  }: EmotionReviewTabsProps) => {
    // Helper function to sort by score
    const sortByScoreDesc = (arr: Array<{ review: string; score: number }>) => {
      return arr.slice().sort((a, b) => (b.score || 0) - (a.score || 0));
    };

    const tabs = ['neutral', 'happy', 'sad', 'anger', 'fear', 'love'];

    return (
      <Card>
        <CardHeader>
          <CardTitle>Ulasan Berdasarkan Emosi</CardTitle>
          <CardDescription>
            Contoh ulasan untuk setiap kategori emosi dengan skor kepercayaan
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>
              {[...Array(pageSize)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full mb-2" />
              ))}
            </div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <Tabs defaultValue="neutral">
              <div className="w-full overflow-x-auto">
                <TabsList className="grid w-max min-w-full grid-cols-6 lg:w-full">
                  {tabs.map((tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab}
                      className="text-xs sm:text-sm whitespace-nowrap px-2 sm:px-3"
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)} (
                      {percentages[
                        tab.charAt(0).toUpperCase() + tab.slice(1)
                      ] || 0}
                      %)
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              {tabs.map((tab) => {
                const reviews = reviewData[tab] || [];
                const totalPages = Math.ceil(reviews.length / pageSize) || 1;
                const startIdx = (page[tab] - 1) * pageSize;
                const endIdx = startIdx + pageSize;

                // Get badge color based on emotion
                const getBadgeClass = (emotion) => {
                  switch (emotion) {
                    case 'neutral':
                      return 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100';
                    case 'happy':
                      return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100';
                    case 'sad':
                      return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100';
                    case 'anger':
                      return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100';
                    case 'fear':
                      return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100';
                    case 'love':
                      return 'bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-100';
                    default:
                      return 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100';
                  }
                };

                return (
                  <TabsContent key={tab} value={tab} className="mt-4 space-y-4">
                    {sortByScoreDesc(reviews)
                      .slice(startIdx, endIdx)
                      .map((example, idx) => (
                        <div
                          key={idx}
                          className="p-4 border rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0"
                        >
                          <p className="text-sm md:text-base">
                            {example.review}
                          </p>
                          <span
                            className={`text-sm font-medium px-3 py-1 ${getBadgeClass(tab)} rounded-full ml-2 whitespace-nowrap`}
                          >
                            Confidence: {example.score.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={page[tab] === 1}
                        onClick={() => onPageChange(tab, -1)}
                      >
                        Sebelumnya
                      </Button>
                      <span className="text-xs text-muted-foreground">
                        Halaman {page[tab]} dari {totalPages}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={page[tab] === totalPages}
                        onClick={() => onPageChange(tab, 1)}
                      >
                        Berikutnya
                      </Button>
                    </div>
                  </TabsContent>
                );
              })}
            </Tabs>
          )}
        </CardContent>
      </Card>
    );
  }
);

interface SpamReview {
  review: string;
  category: string;
  score: number;
}

interface SpamTableProps {
  loading: boolean;
  spamReviews: SpamReview[];
  filter: string;
  currentPage: number;
  pageSize: number;
  onFilterChange: (filter: string) => void;
  onPageChange: (direction: number) => void;
}

export const SpamTable = memo(
  ({
    loading,
    spamReviews,
    filter,
    currentPage,
    pageSize,
    onFilterChange,
    onPageChange,
  }: SpamTableProps) => {
    // Filter reviews based on the selected filter
    const filteredReviews =
      filter === 'all'
        ? spamReviews
        : spamReviews.filter(
            (r) =>
              r.category ===
              (filter === 'explicit' ? 'Explicit Spam' : 'Irrelevant Content')
          );

    // Sort by score in descending order
    const sortedReviews = filteredReviews
      .slice()
      .sort((a, b) => b.score - a.score);

    const totalSpam = filteredReviews.length;
    const totalPages = Math.ceil(totalSpam / pageSize) || 1;
    const startIdx = (currentPage - 1) * pageSize;
    const endIdx = startIdx + pageSize;

    return (
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <CardTitle>Ulasan Tidak Relevan/Spam</CardTitle>
              <CardDescription>
                {totalSpam} ulasan{' '}
                {filter === 'all'
                  ? 'tidak relevan dan spam '
                  : filter === 'explicit'
                    ? 'spam '
                    : 'tidak relevan '}
                telah disaring dari analisis
              </CardDescription>
            </div>
            <Select value={filter} onValueChange={onFilterChange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Semua Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                <SelectItem value="explicit">Explicit Spam</SelectItem>
                <SelectItem value="irrelevant">Irrelevant Content</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>
              {[...Array(pageSize)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full mb-2" />
              ))}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50%]">Ulasan</TableHead>
                      <TableHead className="text-right">Kategori</TableHead>
                      <TableHead className="text-right">Confidence</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedReviews
                      .slice(startIdx, endIdx)
                      .map((review, idx) => (
                        <TableRow
                          key={idx}
                          className="sm:table-row gap-2 p-2 border-b sm:border-0"
                        >
                          <TableCell className="font-medium sm:table-cell">
                            <span className="block sm:hidden text-xs text-muted-foreground font-semibold mb-1">
                              Ulasan
                            </span>
                            {review.review}
                          </TableCell>
                          <TableCell className="sm:table-cell text-right">
                            <span
                              className={`px-2 py-1 rounded-full text-xs border whitespace-nowrap inline-block ${
                                review.category === 'Explicit Spam'
                                  ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 border-red-300 dark:border-red-800'
                                  : 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-100 border-amber-300 dark:border-amber-800'
                              }`}
                            >
                              {review.category}
                            </span>
                          </TableCell>
                          <TableCell className="text-right sm:table-cell">
                            <span className="block sm:hidden text-xs text-muted-foreground font-semibold mb-1">
                              Confidence
                            </span>
                            {review.score.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
              <div className="border-t border-muted-foreground/20 mt-8 mb-2" />
              <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => onPageChange(-1)}
                >
                  Sebelumnya
                </Button>
                <span className="text-xs text-muted-foreground">
                  Halaman {currentPage} dari {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => onPageChange(1)}
                >
                  Berikutnya
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    );
  }
);
