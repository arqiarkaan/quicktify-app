import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import ReactMarkdown from 'react-markdown';
import { Info } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const RatingEstimationDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();
  const estimations = useQuery(
    user ? api.ratingEstimation.getAll : null,
    user ? { userId: user.id } : undefined
  );
  const [estimation, setEstimation] = useState(null);
  const [estimationIndex, setEstimationIndex] = useState<number | null>(null);
  const [hasTriedFindEstimation, setHasTriedFindEstimation] = useState(false);
  const [openInfoResult, setOpenInfoResult] = useState(false);

  // Fetch estimation by id
  useEffect(() => {
    if (estimations && id) {
      const sorted = [...estimations].sort((a, b) => a.createdAt - b.createdAt);
      const idx = sorted.findIndex((e) => e._id === id);
      setEstimationIndex(idx >= 0 ? idx + 1 : null);
      setEstimation(estimations.find((e) => e._id === id) || null);
      setHasTriedFindEstimation(true);
    }
  }, [estimations, id]);

  // Loading skeleton saat estimations masih loading
  if (estimations === undefined) {
    return (
      <DashboardLayout>
        <div className="container py-6 md:py-10">
          <div className="mt-6">
            <div className="space-y-8">
              <Skeleton className="h-8 w-1/2" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Jika estimation tidak ditemukan setelah estimations ready
  if (hasTriedFindEstimation && !estimation) {
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
                Estimasi Tidak Ditemukan
              </h1>
              <p className="text-muted-foreground text-center mb-6">
                Data estimasi rating yang Anda cari tidak tersedia atau sudah
                dihapus. Silakan kembali ke halaman sebelumnya atau cek riwayat
                estimasi Anda.
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

  // Jika estimation masih null dan proses pencarian belum selesai, jangan render apapun
  if (!estimation) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="container py-6 md:py-10 space-y-8">
        {/* Header detail estimasi */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-1">
                Detail Estimasi Rating
              </h1>
              <p className="text-muted-foreground text-base">
                Tanggal dibuat:{' '}
                <span className="font-semibold">
                  {new Date(estimation.createdAt).toLocaleString()}
                </span>
                <span className="mx-2">|</span>
                Estimasi ke-
                <span className="font-semibold">{estimationIndex}</span>
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard/rating-estimation/history')}
              className="w-full md:w-auto"
            >
              Kembali ke Riwayat Estimasi
            </Button>
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="rounded-lg bg-muted/50 p-4 flex flex-col">
              <span className="text-xs text-muted-foreground mb-1">
                ID Estimasi
              </span>
              <span className="font-mono text-sm break-all select-all">
                {estimation._id}
              </span>
            </div>
            <div className="rounded-lg bg-muted/50 p-4 flex flex-col">
              <span className="text-xs text-muted-foreground mb-1">
                Rating Category
              </span>
              <span
                className={`font-semibold text-sm px-2 py-1 rounded-full text-center ${
                  estimation.predicted_rating >= 4.5
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                    : estimation.predicted_rating >= 4
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                      : estimation.predicted_rating >= 3
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                        : estimation.predicted_rating >= 2
                          ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                }`}
              >
                {estimation.predicted_rating >= 4.5
                  ? 'Excellent'
                  : estimation.predicted_rating >= 4
                    ? 'Very Good'
                    : estimation.predicted_rating >= 3
                      ? 'Good'
                      : estimation.predicted_rating >= 2
                        ? 'Fair'
                        : 'Poor'}
              </span>
            </div>
            <div className="rounded-lg bg-muted/50 p-4 flex flex-col items-center text-center">
              <span className="text-xs text-muted-foreground mb-1">
                Confidence Score
              </span>
              <span className="font-semibold text-lg">
                {(() => {
                  if (!estimation.confidence_interval) return 'N/A';

                  let lower: number, upper: number;

                  if (
                    typeof estimation.confidence_interval === 'string' &&
                    estimation.confidence_interval.includes(',')
                  ) {
                    const parts = estimation.confidence_interval.split(',');
                    lower = parseFloat(parts[0]);
                    upper = parseFloat(parts[1]);
                  } else if (Array.isArray(estimation.confidence_interval)) {
                    lower = estimation.confidence_interval[0];
                    upper = estimation.confidence_interval[1];
                  } else {
                    return String(estimation.confidence_interval);
                  }

                  // Hitung confidence score sebagai persentase
                  const range = upper - lower;
                  const maxRange = 4; // Maksimal range (dari 1 ke 5)
                  const confidencePercentage = Math.max(
                    0,
                    ((maxRange - range) / maxRange) * 100
                  );

                  return `${confidencePercentage.toFixed(1)}%`;
                })()}
              </span>
            </div>
          </div>
        </div>

        {/* Hasil Prediksi */}
        <Card className="bg-gradient-to-br from-quicktify-primary/10 to-background/80 dark:to-background/60 border border-white/30 dark:border-black/30 shadow-lg mb-8 relative">
          {/* Info Button */}
          <button
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors z-10"
            type="button"
            aria-label="Section information"
            onClick={() => setOpenInfoResult(true)}
          >
            <Info className="w-5 h-5 text-muted-foreground" />
          </button>
          {/* Info Dialog */}
          <Dialog open={openInfoResult} onOpenChange={setOpenInfoResult}>
            <DialogContent className="max-w-lg w-[90vw] sm:w-full p-4 sm:p-8 rounded-xl overflow-y-auto max-h-[80vh]">
              <DialogHeader>
                <DialogTitle className="text-lg sm:text-2xl mb-2">
                  Tentang Hasil Estimasi Rating Aplikasi
                </DialogTitle>
                <DialogDescription asChild>
                  <div className="text-sm sm:text-base">
                    <ul className="list-disc pl-5 space-y-2 text-left break-words">
                      <li>
                        <b>Predicted Rating</b>: Rating aplikasi yang
                        diestimasikan berdasarkan data yang Anda masukkan.
                      </li>
                      <li>
                        <b>Confidence Interval</b>: Rentang kemungkinan nilai
                        rating sebenarnya, menunjukkan tingkat kepastian dari
                        prediksi.
                      </li>
                      <li>
                        <b>Input Summary</b>: Ringkasan data yang Anda berikan
                        ke sistem.
                      </li>
                      <li>
                        <b>Feature Importance</b>: Fitur-fitur yang paling
                        berpengaruh untuk prediksi rating, diurutkan berdasarkan
                        tingkat kepentingannya.
                      </li>
                      <li>
                        <b>SHAP Local</b>: Analisis kontribusi setiap fitur
                        terhadap prediksi spesifik Anda (dampak
                        positif/negatif).
                      </li>
                      <li>
                        <b>Bar Plot</b>: Visualisasi dampak fitur-fitur utama
                        terhadap prediksi rating keseluruhan.
                      </li>
                      <li>
                        <b>Waterfall Plot</b>: Visualisasi kontribusi berurutan
                        fitur-fitur dari baseline hingga prediksi akhir.
                      </li>
                      <li>
                        <b>Force Plot</b>: Visualisasi interaktif yang
                        menunjukkan bagaimana fitur-fitur mendorong prediksi
                        naik atau turun dari baseline.
                      </li>
                    </ul>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <CardHeader>
            <CardTitle>Hasil Estimasi Rating</CardTitle>
            <CardDescription>
              Berikut adalah hasil estimasi rating aplikasi Anda berdasarkan
              data yang dimasukkan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Predicted Rating & Confidence Interval */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 items-stretch">
              {estimation.confidence_interval && (
                <div className="flex-shrink-0 w-full md:max-w-xs flex flex-col items-center justify-center">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-8 py-6 rounded-2xl font-mono text-lg font-semibold border border-blue-300 dark:border-blue-700 w-full text-center">
                    {typeof estimation.confidence_interval === 'string' &&
                    estimation.confidence_interval.includes(',')
                      ? estimation.confidence_interval.split(',').join(' s/d ')
                      : Array.isArray(estimation.confidence_interval)
                        ? `${estimation.confidence_interval[0]} s/d ${estimation.confidence_interval[1]}`
                        : String(estimation.confidence_interval)}
                  </span>
                  <span className="mt-3 text-base text-muted-foreground font-medium">
                    Confidence Interval
                  </span>
                </div>
              )}
              <div className="flex-1 flex flex-col items-center justify-center mt-4 md:mt-0 w-full">
                <span
                  className={`w-full text-5xl font-bold py-6 rounded-2xl shadow-lg border-2 transition-colors flex items-center justify-center
                    ${
                      estimation.predicted_rating >= 4
                        ? 'bg-green-500/90 text-white border-green-600'
                        : estimation.predicted_rating >= 3
                          ? 'bg-yellow-400/90 text-black border-yellow-500'
                          : 'bg-red-500/90 text-white border-red-600'
                    }`}
                >
                  {estimation.predicted_rating.toFixed(3)}
                </span>
                <span className="mt-3 text-base font-semibold text-muted-foreground">
                  Predicted Rating
                </span>
              </div>
            </div>
            {/* Input Summary */}
            {estimation.input_summary && (
              <Card className="mb-6 bg-gradient-to-r from-sky-100/60 to-sky-50/40 dark:from-sky-900/40 dark:to-sky-800/30 border border-sky-200 dark:border-sky-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <span role="img" aria-label="info">
                      📝
                    </span>{' '}
                    Input Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {Object.entries(estimation.input_summary).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex flex-col items-start bg-muted/60 dark:bg-muted/30 rounded-xl px-4 py-3 shadow border border-muted-foreground/10"
                        >
                          <span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground mb-1">
                            <span role="img" aria-label="info">
                              🔹
                            </span>{' '}
                            {key.replace(/_/g, ' ')}
                          </span>
                          <span className="text-base font-bold text-foreground">
                            {typeof value === 'boolean'
                              ? value
                                ? 'Yes'
                                : 'No'
                              : String(value)}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
            {/* Feature Importance & SHAP Local */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Feature Importance */}
              <Card className="bg-gradient-to-r from-amber-100/60 to-amber-50/40 dark:from-amber-900/40 dark:to-amber-800/30 border border-amber-200 dark:border-amber-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <span role="img" aria-label="bar">
                      📊
                    </span>{' '}
                    Feature Importance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {Array.isArray(estimation.feature_importance) &&
                      estimation.feature_importance.map((f, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <span className="w-32 font-medium text-muted-foreground">
                            {f.feature}
                          </span>
                          <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-3 rounded-full bg-quicktify-primary transition-all"
                              style={{
                                width: `${(f.importance * 100).toFixed(2)}%`,
                              }}
                            />
                          </div>
                          <span className="font-mono text-xs px-2 py-1 rounded bg-white/80 dark:bg-black/40 border border-muted-foreground/20">
                            {(f.importance * 100).toFixed(2)}%
                          </span>
                        </li>
                      ))}
                  </ul>
                </CardContent>
              </Card>
              {/* SHAP Local */}
              <Card className="bg-gradient-to-r from-green-100/60 to-red-50/40 dark:from-green-900/40 dark:to-red-800/30 border border-green-200 dark:border-red-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <span role="img" aria-label="shap">
                      ⚡
                    </span>{' '}
                    SHAP Local
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {Array.isArray(estimation.shap_local) &&
                      estimation.shap_local.map((s, i) => {
                        const barWidth = Math.min(
                          Math.abs(s.shap_value) * 40,
                          100
                        ); // scale bar width
                        return (
                          <li key={i} className="flex items-center gap-3">
                            <span className="w-32 font-medium text-muted-foreground">
                              {s.feature}
                            </span>
                            <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden relative">
                              {/* Zero-centered bar */}
                              <div
                                className={`h-3 rounded-full transition-all absolute top-0 ${s.direction === 'positive' ? 'bg-green-400' : 'bg-red-400'}`}
                                style={{
                                  left: '50%',
                                  width: `${barWidth}%`,
                                  transform:
                                    s.direction === 'positive'
                                      ? 'none'
                                      : 'translateX(-100%)',
                                }}
                              />
                            </div>
                            <span
                              className={`font-mono text-xs px-2 py-1 rounded border
                              ${s.direction === 'positive' ? 'bg-green-200/80 text-green-800 border-green-400' : 'bg-red-200/80 text-red-800 border-red-400'}`}
                            >
                              {s.shap_value.toFixed(3)} ({s.direction})
                            </span>
                          </li>
                        );
                      })}
                  </ul>
                </CardContent>
              </Card>
            </div>
            {/* Plots */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    Bar Plot
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={estimation.shap_plots.bar_plot_url}
                    alt="Bar Plot"
                    className="w-full h-64 object-contain"
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    Waterfall Plot
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={estimation.shap_plots.waterfall_plot_url}
                    alt="Waterfall Plot"
                    className="w-full h-64 object-contain"
                  />
                </CardContent>
              </Card>
            </div>
            <div className="mb-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    Force Plot
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={estimation.shap_plots.force_plot_url}
                    alt="Force Plot"
                    className="w-full h-64 object-contain"
                  />
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Card summary AI */}
        <Card className="bg-gradient-to-br from-quicktify-primary/20 to-quicktify-accent/20 border-quicktify-primary/50 relative">
          <span
            className="hidden sm:inline-block absolute top-2 right-2 sm:top-4 sm:right-4 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 via-sky-400 to-blue-400 text-white text-xs font-semibold shadow animate-pulse"
            style={{ pointerEvents: 'none' }}
          >
            Dibuat oleh Google Gemini 2.0 Flash 🌟
          </span>
          <CardHeader className="pt-5 pb-5 border-b border-muted-foreground/20 bg-white/60 dark:bg-black/30 rounded-t-xl">
            <h2 className="text-2xl font-bold mb-1">
              Ringkasan Hasil Estimasi{' '}
              <span className="text-quicktify-primary">(AI)</span>
            </h2>
            <CardDescription className="text-base font-medium">
              Kesimpulan dari analisis estimasi rating aplikasi Anda
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-5 pb-5 prose prose-sm dark:prose-invert mx-auto max-w-none">
            {estimation.summary ? (
              <ReactMarkdown>{estimation.summary}</ReactMarkdown>
            ) : (
              <div className="text-muted-foreground">
                Tidak ada ringkasan yang tersedia untuk estimasi ini.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RatingEstimationDetail;
