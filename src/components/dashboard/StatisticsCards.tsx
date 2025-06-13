import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => (
  <div className={`animate-pulse bg-muted rounded ${className}`} />
);

interface StatisticsCardsProps {
  loading: boolean;
  totalReviews: number;
  sentimentData: {
    name: string;
    value: number;
    color: string;
  }[];
  emotionData: {
    name: string;
    value: number;
    color: string;
  }[];
  spamData: {
    name: string;
    value: number;
    color: string;
  }[];
}

export const StatisticsCards: React.FC<StatisticsCardsProps> = ({
  loading,
  totalReviews,
  sentimentData,
  emotionData,
  spamData,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistik Ulasan</CardTitle>
        <CardDescription>
          Ringkasan jumlah ulasan yang dianalisis per kategori
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <>
              <Skeleton className="h-24 w-full mb-4" />
              <Skeleton className="h-24 w-full mb-4" />
              <Skeleton className="h-24 w-full mb-4" />
              <Skeleton className="h-24 w-full mb-4" />
            </>
          ) : (
            <>
              {/* Total Ulasan */}
              <div className="flex flex-col items-center justify-center rounded-lg p-6 bg-gradient-to-br from-quicktify-primary/10 to-white/30 dark:to-black/30 shadow-sm">
                <span className="text-sm font-semibold text-muted-foreground mb-1">
                  Total Ulasan
                </span>
                <span className="text-3xl font-bold mb-2">{totalReviews}</span>
                <span className="text-xs text-muted-foreground">
                  Jumlah seluruh ulasan
                </span>
              </div>

              {/* Sentimen Bar Chart */}
              <div className="flex flex-col items-center justify-center rounded-lg p-6 bg-gradient-to-br from-quicktify-primary/10 to-white/30 dark:to-black/30 shadow-sm w-full">
                <span className="text-sm font-semibold text-muted-foreground mb-4">
                  Sentimen
                </span>
                <ResponsiveContainer width="100%" height={120}>
                  <BarChart
                    data={sentimentData}
                    layout="vertical"
                    margin={{ left: 10, right: 10, top: 0, bottom: 0 }}
                    barCategoryGap={16}
                  >
                    <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                    <XAxis type="number" hide tick={false} axisLine={false} />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={70}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip formatter={(v) => `${v} ulasan`} />
                    <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                      {sentimentData.map((d, idx) => (
                        <Cell key={d.color} fill={d.color} />
                      ))}
                      {/* Show value at end of bar */}
                      {sentimentData.map((d, idx) => (
                        <text
                          key={idx}
                          x={d.value * 2 + 10}
                          y={24 * idx + 32}
                          textAnchor="start"
                          alignmentBaseline="middle"
                          fontSize="13"
                          fill="#334155"
                          style={{ fontWeight: 600 }}
                        >
                          {d.value}
                        </text>
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <span className="text-xs text-muted-foreground mt-2">
                  Jumlah ulasan per sentimen
                </span>
              </div>

              {/* Emosi Bar Chart */}
              <div className="flex flex-col items-center justify-center rounded-lg p-6 bg-gradient-to-br from-quicktify-primary/10 to-white/30 dark:to-black/30 shadow-sm w-full">
                <span className="text-sm font-semibold text-muted-foreground mb-4">
                  Emosi
                </span>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart
                    data={emotionData}
                    layout="vertical"
                    margin={{ left: 10, right: 10, top: 0, bottom: 0 }}
                    barCategoryGap={10}
                  >
                    <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                    <XAxis type="number" hide tick={false} axisLine={false} />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={70}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip formatter={(v) => `${v} ulasan`} />
                    <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                      {emotionData.map((d, idx) => (
                        <Cell key={d.color} fill={d.color} />
                      ))}
                      {/* Show value at end of bar */}
                      {emotionData.map((d, idx) => (
                        <text
                          key={idx}
                          x={d.value * 2 + 10}
                          y={24 * idx + 32}
                          textAnchor="start"
                          alignmentBaseline="middle"
                          fontSize="13"
                          fill="#334155"
                          style={{ fontWeight: 600 }}
                        >
                          {d.value}
                        </text>
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <span className="text-xs text-muted-foreground mt-2">
                  Jumlah ulasan per emosi
                </span>
              </div>

              {/* Spam Bar Chart */}
              <div className="flex flex-col items-center justify-center rounded-lg p-6 bg-gradient-to-br from-quicktify-primary/10 to-white/30 dark:to-black/30 shadow-sm w-full">
                <span className="text-sm font-semibold text-muted-foreground mb-4">
                  Spam
                </span>
                <ResponsiveContainer width="100%" height={90}>
                  <BarChart
                    data={spamData}
                    layout="vertical"
                    margin={{ left: 10, right: 10, top: 0, bottom: 0 }}
                    barCategoryGap={16}
                  >
                    <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                    <XAxis type="number" hide tick={false} axisLine={false} />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={110}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip formatter={(v) => `${v} ulasan`} />
                    <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                      {spamData.map((d, idx) => (
                        <Cell key={d.color} fill={d.color} />
                      ))}
                      {/* Show value at end of bar */}
                      {spamData.map((d, idx) => (
                        <text
                          key={idx}
                          x={d.value * 2 + 10}
                          y={24 * idx + 32}
                          textAnchor="start"
                          alignmentBaseline="middle"
                          fontSize="13"
                          fill="#334155"
                          style={{ fontWeight: 600 }}
                        >
                          {d.value}
                        </text>
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <span className="text-xs text-muted-foreground mt-2">
                  Jumlah ulasan spam
                </span>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatisticsCards;
