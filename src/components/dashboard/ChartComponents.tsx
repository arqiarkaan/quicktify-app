import React, { lazy, Suspense } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

// Skeleton component for loading state
const Skeleton = ({ className = '' }) => (
  <div className={`animate-pulse bg-muted rounded ${className}`} />
);

// Define types for the components
interface PieChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  title: string;
  description: string;
  config: Record<string, { color: string }>;
}

interface BarChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  title: string;
  description: string;
}

// Use dynamic import instead of lazy() for type safety
const LazyPieChart = React.memo((props: PieChartProps) => {
  const { data, title, description, config } = props;
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-80">
          <ChartContainer config={config}>
            <>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={(entry) => `${entry.name}: ${entry.value}%`}
                    labelLine={false}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
              <ChartLegend>
                <ChartLegendContent />
              </ChartLegend>
            </>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
});

// Use React.memo instead of lazy() for the BarChart component
const LazyBarChart = React.memo((props: BarChartProps) => {
  const { data, title, description } = props;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" name="Persentase">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
});

// Define types for exported components
interface ChartComponentProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  loading: boolean;
}

// Wrapped components with Suspense
export const SentimentPieChart: React.FC<ChartComponentProps> = ({
  data,
  loading,
}) => {
  if (loading) {
    return (
      <Card className="overflow-hidden">
        <CardHeader className="pb-0">
          <CardTitle>Analisis Sentimen</CardTitle>
          <CardDescription>
            Distribusi sentimen dari ulasan pengguna aplikasi
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Skeleton className="h-80 w-full" />
        </CardContent>
      </Card>
    );
  }

  const config = {
    positive: { color: '#4ade80' },
    neutral: { color: '#94a3b8' },
    negative: { color: '#f87171' },
  };

  return (
    <Suspense fallback={<Skeleton className="h-80 w-full" />}>
      <LazyPieChart
        data={data}
        title="Analisis Sentimen"
        description="Distribusi sentimen dari ulasan pengguna aplikasi"
        config={config}
      />
    </Suspense>
  );
};

export const EmotionPieChart: React.FC<ChartComponentProps> = ({
  data,
  loading,
}) => {
  if (loading) {
    return (
      <Card className="overflow-hidden">
        <CardHeader className="pb-0">
          <CardTitle>Analisis Emosi</CardTitle>
          <CardDescription>
            Distribusi emosi dari ulasan pengguna aplikasi
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Skeleton className="h-80 w-full" />
        </CardContent>
      </Card>
    );
  }

  const config = {
    neutral: { color: '#94a3b8' },
    happy: { color: '#fbbf24' },
    sad: { color: '#60a5fa' },
    anger: { color: '#f87171' },
    fear: { color: '#a78bfa' },
    love: { color: '#fb7185' },
  };

  return (
    <Suspense fallback={<Skeleton className="h-80 w-full" />}>
      <LazyPieChart
        data={data}
        title="Analisis Emosi"
        description="Distribusi emosi dari ulasan pengguna aplikasi"
        config={config}
      />
    </Suspense>
  );
};

export const SentimentBarChart: React.FC<ChartComponentProps> = ({
  data,
  loading,
}) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Distribusi Bar Chart Sentimen</CardTitle>
          <CardDescription>
            Distribusi bar chart sentimen dalam ulasan pengguna aplikasi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-72 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Suspense fallback={<Skeleton className="h-72 w-full" />}>
      <LazyBarChart
        data={data}
        title="Distribusi Bar Chart Sentimen"
        description="Distribusi bar chart sentimen dalam ulasan pengguna aplikasi"
      />
    </Suspense>
  );
};

export const EmotionBarChart: React.FC<ChartComponentProps> = ({
  data,
  loading,
}) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Distribusi Bar Chart Emosi</CardTitle>
          <CardDescription>
            Distribusi bar chart emosi dalam ulasan pengguna aplikasi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-72 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Suspense fallback={<Skeleton className="h-72 w-full" />}>
      <LazyBarChart
        data={data}
        title="Distribusi Bar Chart Emosi"
        description="Distribusi bar chart emosi dalam ulasan pengguna aplikasi"
      />
    </Suspense>
  );
};
