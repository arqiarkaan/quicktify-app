import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import {
  useRatingEstimationData,
  RatingEstimationInput,
} from '@/hooks/useRatingEstimationData';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Info } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { LoadingModal } from '@/components/dashboard/LoadingModal';
import { LimitMessage } from '@/components/ui/limit-overlay';
import { LimitStatus } from '@/components/ui/limit-status';
import { useLimitCheck } from '@/hooks/useLimitCheck';

const CATEGORY_CHOICES = [
  'Adventure',
  'Tools',
  'Productivity',
  'Communication',
  'Social',
  'Libraries & Demo',
  'Lifestyle',
  'Personalization',
  'Racing',
  'Maps & Navigation',
  'Travel & Local',
  'Food & Drink',
  'Books & Reference',
  'Medical',
  'Puzzle',
  'Entertainment',
  'Arcade',
  'Auto & Vehicles',
  'Photography',
  'Health & Fitness',
  'Education',
  'Shopping',
  'Board',
  'Music & Audio',
  'Sports',
  'Beauty',
  'Business',
  'Educational',
  'Finance',
  'News & Magazines',
  'Casual',
  'Art & Design',
  'House & Home',
  'Card',
  'Events',
  'Trivia',
  'Weather',
  'Strategy',
  'Word',
  'Video Players & Editors',
  'Action',
  'Simulation',
  'Music',
  'Dating',
  'Role Playing',
  'Casino',
  'Comics',
  'Parenting',
];
const CONTENT_RATING_CHOICES = [
  'Everyone',
  'Teen',
  'Mature 17+',
  'Everyone 10+',
  'Adults only 18+',
  'Unrated',
];
const APP_TYPE_CHOICES = ['Free', 'Paid'];
const INSTALL_CHOICES = [
  0, 1, 5, 10, 50, 100, 500, 1000, 5000, 10000, 50000, 100000, 500000, 1000000,
  5000000, 10000000, 50000000, 100000000, 500000000, 1000000000,
];

const initialForm: RatingEstimationInput = {
  category: '',
  rating_count: 0,
  installs: 0,
  size: 0,
  content_rating: '',
  ad_supported: null,
  in_app_purchases: null,
  editors_choice: null,
  app_type: '',
};

const RatingEstimation = () => {
  const navigate = useNavigate();
  // Check limit status
  const limitCheck = useLimitCheck('estimation');

  const [form, setForm] = useState<RatingEstimationInput>(initialForm);
  const [inputRatingCount, setInputRatingCount] = useState('');
  const [inputSize, setInputSize] = useState('');
  const [openInfoInput, setOpenInfoInput] = useState(false);
  const [openInfoResult, setOpenInfoResult] = useState(false);

  // Reset form function
  const resetForm = () => {
    setForm(initialForm);
    setInputRatingCount('');
    setInputSize('');
  };

  const {
    result,
    loading,
    summaryLoading,
    error,
    summaryError,
    handleSubmit,
    isInitialLoading,
  } = useRatingEstimationData(resetForm);

  // Validasi: semua field harus terisi
  const isFormValid =
    form.category &&
    form.rating_count > 0 &&
    form.installs > 0 &&
    form.size > 0 &&
    form.content_rating &&
    form.app_type &&
    form.ad_supported !== null &&
    form.in_app_purchases !== null &&
    form.editors_choice !== null;

  // Handler untuk select dan input
  const handleSelectChange = (name: string, value: string | number) => {
    // Untuk boolean select (yes/no)
    if (['ad_supported', 'in_app_purchases', 'editors_choice'].includes(name)) {
      setForm((prev) => ({
        ...prev,
        [name]: value === 'yes' ? true : value === 'no' ? false : null,
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else if (name === 'rating_count') {
      // Hilangkan leading zero kecuali hanya 0
      let newValue = value.replace(/^0+(?!$)/, '');
      // Hanya angka
      if (/^\d*$/.test(newValue)) {
        if (newValue && Number(newValue) > 56025424) newValue = '56025424';
        setInputRatingCount(newValue);
        setForm((prev) => ({
          ...prev,
          rating_count: newValue ? Number(newValue) : 0,
        }));
      }
    } else if (name === 'size') {
      let newValue = value.replace(/^0+(?!$)/, '');
      if (/^\d*$/.test(newValue)) {
        if (newValue && Number(newValue) > 1500) newValue = '1500';
        setInputSize(newValue);
        setForm((prev) => ({ ...prev, size: newValue ? Number(newValue) : 0 }));
      }
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === 'number' ? Number(value) : value,
      }));
    }
  };

  // Untuk select installs, pastikan max value
  const handleInstallsChange = (value: string) => {
    if (value === '>1000000000') {
      setForm((prev) => ({ ...prev, installs: 1000000000 }));
      return;
    }
    let num = Number(value);
    if (num > 1000000000) num = 1000000000;
    setForm((prev) => ({ ...prev, installs: num }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Convert null values to false for submission and ensure consistent field order
    const submitForm: RatingEstimationInput = {
      category: form.category,
      rating_count: form.rating_count,
      installs: form.installs,
      size: form.size,
      content_rating: form.content_rating,
      ad_supported: form.ad_supported ?? false,
      in_app_purchases: form.in_app_purchases ?? false,
      editors_choice: form.editors_choice ?? false,
      app_type: form.app_type,
    };
    handleSubmit(submitForm);
  };

  // Inisialisasi inputRatingCount dan inputSize dari initialForm saat mount
  useEffect(() => {
    setInputRatingCount(
      initialForm.rating_count ? String(initialForm.rating_count) : ''
    );
    setInputSize(initialForm.size ? String(initialForm.size) : '');
  }, []);

  return (
    <DashboardLayout>
      {/* Loading Modal hanya untuk proses utama, bukan summary */}
      <LoadingModal
        loadingStep={loading ? 'analyzing' : 'idle'}
        loadingMessage={loading ? 'Memproses estimasi rating aplikasi...' : ''}
      />
      <div className="container py-6 md:py-10 space-y-8">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <h1 className="text-3xl font-bold">Estimasi Rating Aplikasi</h1>
            <p className="text-muted-foreground mt-2">
              Dapatkan estimasi rating yang akurat berdasarkan karakteristik
              aplikasi Anda
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="mt-4 md:mt-0"
            >
              Kembali ke Dashboard
            </Button>
          </div>
        </div>

        {/* Limit Status Display */}
        {limitCheck.shouldShowLimit && (
          <LimitStatus
            currentCount={limitCheck.currentCount}
            maxLimit={limitCheck.maxLimit}
            type="estimasi"
            className="mb-8"
          />
        )}

        {/* Form Input */}
        {limitCheck.shouldShowLimit && limitCheck.isLimitReached ? (
          <LimitMessage message={limitCheck.limitMessage} />
        ) : (
          <Card className="bg-gradient-to-br from-quicktify-primary/10 to-background/80 dark:to-background/60 border border-white/30 dark:border-black/30 shadow-lg mb-8 relative">
            {/* Info Button */}
            <button
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors z-10"
              type="button"
              aria-label="Section information"
              onClick={() => setOpenInfoInput(true)}
            >
              <Info className="w-5 h-5 text-muted-foreground" />
            </button>
            {/* Info Dialog */}
            <Dialog open={openInfoInput} onOpenChange={setOpenInfoInput}>
              <DialogContent className="max-w-lg w-[90vw] sm:w-full p-4 sm:p-8 rounded-xl overflow-y-auto max-h-[80vh]">
                <DialogHeader>
                  <DialogTitle className="text-lg sm:text-2xl mb-2">
                    Tentang Form Estimasi Rating Aplikasi
                  </DialogTitle>
                  <DialogDescription asChild>
                    <div className="text-sm sm:text-base">
                      <ul className="list-disc pl-5 space-y-2 text-left break-words">
                        <li>
                          <b>Category</b>: Kategori aplikasi yang terdaftar di
                          Play Store.
                        </li>
                        <li>
                          <b>Rating Count</b>: Total jumlah rating yang diterima
                          aplikasi Anda.
                        </li>
                        <li>
                          <b>Installs</b>: Perkiraan jumlah kali aplikasi Anda
                          diinstal.
                        </li>
                        <li>
                          <b>Size (MB)</b>: Ukuran aplikasi Anda dalam megabyte.
                        </li>
                        <li>
                          <b>Content Rating</b>: Rating usia untuk aplikasi
                          Anda.
                        </li>
                        <li>
                          <b>App Type</b>: Apakah aplikasi Anda Gratis atau
                          Berbayar.
                        </li>
                        <li>
                          <b>Ad Supported</b>: Apakah aplikasi Anda menampilkan
                          iklan.
                        </li>
                        <li>
                          <b>In App Purchases</b>: Apakah aplikasi Anda
                          menawarkan pembelian dalam aplikasi.
                        </li>
                        <li>
                          <b>Editors Choice</b>: Apakah aplikasi Anda telah
                          menerima badge "Editor's Choice" di Play Store.
                        </li>
                      </ul>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <span className="bg-quicktify-primary/20 p-2 rounded-full">
                  📝
                </span>
                Mulai Estimasi
              </CardTitle>
              <CardDescription className="text-base mb-12">
                Lengkapi semua informasi berikut untuk mendapatkan estimasi
                rating yang akurat
              </CardDescription>

              {/* Progress Indicator */}
              <div className="pt-8 pb-4 space-y-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Progress Pengisian Form</span>
                  <span>
                    {Math.round(
                      (((form.category ? 1 : 0) +
                        (form.rating_count > 0 ? 1 : 0) +
                        (form.installs > 0 ? 1 : 0) +
                        (form.size > 0 ? 1 : 0) +
                        (form.content_rating ? 1 : 0) +
                        (form.app_type ? 1 : 0) +
                        (form.ad_supported !== null ? 1 : 0) +
                        (form.in_app_purchases !== null ? 1 : 0) +
                        (form.editors_choice !== null ? 1 : 0)) /
                        9) *
                        100
                    )}
                    %
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-quicktify-primary to-quicktify-accent h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.round((((form.category ? 1 : 0) + (form.rating_count > 0 ? 1 : 0) + (form.installs > 0 ? 1 : 0) + (form.size > 0 ? 1 : 0) + (form.content_rating ? 1 : 0) + (form.app_type ? 1 : 0) + (form.ad_supported !== null ? 1 : 0) + (form.in_app_purchases !== null ? 1 : 0) + (form.editors_choice !== null ? 1 : 0)) / 9) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <form onSubmit={onSubmit} className="space-y-8">
                {/* Card 1: Basic App Information */}
                <Card className="bg-gradient-to-br from-blue-50/50 to-indigo-50/30 dark:from-blue-950/30 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-lg">
                      <span className="bg-blue-500/20 p-2 rounded-full text-blue-600 dark:text-blue-400">
                        ℹ️
                      </span>
                      Informasi Dasar Aplikasi
                    </CardTitle>
                    <CardDescription>
                      Data fundamental tentang aplikasi Anda
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 font-medium text-sm">
                          <span className="text-blue-600 dark:text-blue-400">
                            🏷️
                          </span>
                          Category
                          <span className="text-red-500">*</span>
                        </label>
                        <Select
                          value={form.category}
                          onValueChange={(v) =>
                            handleSelectChange('category', v)
                          }
                        >
                          <SelectTrigger className="w-full border-blue-200 dark:border-blue-800 focus:border-blue-400">
                            <SelectValue placeholder="Pilih kategori aplikasi" />
                          </SelectTrigger>
                          <SelectContent>
                            {CATEGORY_CHOICES.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          Kategori Play Store untuk aplikasi Anda
                        </p>
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center gap-2 font-medium text-sm">
                          <span className="text-blue-600 dark:text-blue-400">
                            💰
                          </span>
                          App Type
                          <span className="text-red-500">*</span>
                        </label>
                        <Select
                          value={form.app_type}
                          onValueChange={(v) =>
                            handleSelectChange('app_type', v)
                          }
                        >
                          <SelectTrigger className="w-full border-blue-200 dark:border-blue-800 focus:border-blue-400">
                            <SelectValue placeholder="Pilih tipe aplikasi" />
                          </SelectTrigger>
                          <SelectContent>
                            {APP_TYPE_CHOICES.map((at) => (
                              <SelectItem key={at} value={at}>
                                <span className="flex items-center gap-2">
                                  {at === 'Free' ? '🆓' : '💳'} {at}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          Model monetisasi aplikasi
                        </p>
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center gap-2 font-medium text-sm">
                          <span className="text-blue-600 dark:text-blue-400">
                            📦
                          </span>
                          Size (MB)
                          <span className="text-red-500">*</span>
                        </label>
                        <Input
                          name="size"
                          type="text"
                          value={inputSize}
                          onChange={handleInputChange}
                          required
                          placeholder="Ukuran dalam MB"
                          className="border-blue-200 dark:border-blue-800 focus:border-blue-400"
                        />
                        <p className="text-xs text-muted-foreground">
                          Ukuran file APK (maksimal 1500 MB)
                        </p>
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center gap-2 font-medium text-sm">
                          <span className="text-blue-600 dark:text-blue-400">
                            🔞
                          </span>
                          Content Rating
                          <span className="text-red-500">*</span>
                        </label>
                        <Select
                          value={form.content_rating}
                          onValueChange={(v) =>
                            handleSelectChange('content_rating', v)
                          }
                        >
                          <SelectTrigger className="w-full border-blue-200 dark:border-blue-800 focus:border-blue-400">
                            <SelectValue placeholder="Pilih rating konten" />
                          </SelectTrigger>
                          <SelectContent>
                            {CONTENT_RATING_CHOICES.map((cr) => (
                              <SelectItem key={cr} value={cr}>
                                <span className="flex items-center gap-2">
                                  {cr === 'Everyone'
                                    ? '👶'
                                    : cr === 'Everyone 10+'
                                      ? '👧'
                                      : cr === 'Teen'
                                        ? '👦'
                                        : cr === 'Mature 17+'
                                          ? '🧑'
                                          : cr === 'Adults only 18+'
                                            ? '👨'
                                            : '❓'}{' '}
                                  {cr}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          Rating usia untuk konten aplikasi
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Card 2: User Engagement Metrics */}
                <Card className="bg-gradient-to-br from-emerald-50/50 to-green-50/30 dark:from-emerald-950/30 dark:to-green-950/20 border-emerald-200 dark:border-emerald-800 hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-lg">
                      <span className="bg-emerald-500/20 p-2 rounded-full text-emerald-600 dark:text-emerald-400">
                        📊
                      </span>
                      Metrik Engagement Pengguna
                    </CardTitle>
                    <CardDescription>
                      Data interaksi dan popularitas aplikasi
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 font-medium text-sm">
                          <span className="text-emerald-600 dark:text-emerald-400">
                            ⭐
                          </span>
                          Rating Count
                          <span className="text-red-500">*</span>
                        </label>
                        <Input
                          name="rating_count"
                          type="text"
                          value={inputRatingCount}
                          onChange={handleInputChange}
                          required
                          placeholder="Jumlah rating"
                          className="border-emerald-200 dark:border-emerald-800 focus:border-emerald-400"
                        />
                        <p className="text-xs text-muted-foreground">
                          Total pengguna yang memberikan rating
                        </p>
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center gap-2 font-medium text-sm">
                          <span className="text-emerald-600 dark:text-emerald-400">
                            📥
                          </span>
                          Installs
                          <span className="text-red-500">*</span>
                        </label>
                        <Select
                          value={form.installs ? String(form.installs) : ''}
                          onValueChange={handleInstallsChange}
                        >
                          <SelectTrigger className="w-full border-emerald-200 dark:border-emerald-800 focus:border-emerald-400">
                            <SelectValue placeholder="Pilih jumlah instalasi" />
                          </SelectTrigger>
                          <SelectContent className="max-h-60 overflow-y-auto">
                            {INSTALL_CHOICES.map((num) => (
                              <SelectItem key={num} value={String(num)}>
                                📱 {num.toLocaleString()}
                              </SelectItem>
                            ))}
                            <SelectItem key=">1000000000" value=">1000000000">
                              🚀 {'>'} 1,000,000,000
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          Perkiraan total unduhan aplikasi
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Card 3: Monetization & Features */}
                <Card className="bg-gradient-to-br from-amber-50/50 to-orange-50/30 dark:from-amber-950/30 dark:to-orange-950/20 border-amber-200 dark:border-amber-800 hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-lg">
                      <span className="bg-amber-500/20 p-2 rounded-full text-amber-600 dark:text-amber-400">
                        ⚙️
                      </span>
                      Monetisasi & Fitur Khusus
                    </CardTitle>
                    <CardDescription>
                      Strategi monetisasi dan keunggulan aplikasi
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 font-medium text-sm">
                          <span className="text-amber-600 dark:text-amber-400">
                            📺
                          </span>
                          Ad Supported
                          <span className="text-red-500">*</span>
                        </label>
                        <Select
                          value={
                            form.ad_supported === null
                              ? ''
                              : form.ad_supported
                                ? 'yes'
                                : 'no'
                          }
                          onValueChange={(v) =>
                            handleSelectChange('ad_supported', v)
                          }
                        >
                          <SelectTrigger className="w-full border-amber-200 dark:border-amber-800 focus:border-amber-400">
                            <SelectValue placeholder="Apakah ada iklan?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">
                              <span className="flex items-center gap-2">
                                ✅ Yes
                              </span>
                            </SelectItem>
                            <SelectItem value="no">
                              <span className="flex items-center gap-2">
                                ❌ No
                              </span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          Apakah aplikasi menampilkan iklan
                        </p>
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center gap-2 font-medium text-sm">
                          <span className="text-amber-600 dark:text-amber-400">
                            🛒
                          </span>
                          In App Purchases
                          <span className="text-red-500">*</span>
                        </label>
                        <Select
                          value={
                            form.in_app_purchases === null
                              ? ''
                              : form.in_app_purchases
                                ? 'yes'
                                : 'no'
                          }
                          onValueChange={(v) =>
                            handleSelectChange('in_app_purchases', v)
                          }
                        >
                          <SelectTrigger className="w-full border-amber-200 dark:border-amber-800 focus:border-amber-400">
                            <SelectValue placeholder="Ada fitur beli premium?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">
                              <span className="flex items-center gap-2">
                                ✅ Yes
                              </span>
                            </SelectItem>
                            <SelectItem value="no">
                              <span className="flex items-center gap-2">
                                ❌ No
                              </span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          Tersedia pembelian dalam aplikasi
                        </p>
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center gap-2 font-medium text-sm">
                          <span className="text-amber-600 dark:text-amber-400">
                            🏆
                          </span>
                          Editors Choice
                          <span className="text-red-500">*</span>
                        </label>
                        <Select
                          value={
                            form.editors_choice === null
                              ? ''
                              : form.editors_choice
                                ? 'yes'
                                : 'no'
                          }
                          onValueChange={(v) =>
                            handleSelectChange('editors_choice', v)
                          }
                        >
                          <SelectTrigger className="w-full border-amber-200 dark:border-amber-800 focus:border-amber-400">
                            <SelectValue placeholder="Dapat badge editor?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">
                              <span className="flex items-center gap-2">
                                ✅ Yes
                              </span>
                            </SelectItem>
                            <SelectItem value="no">
                              <span className="flex items-center gap-2">
                                ❌ No
                              </span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          Badge pilihan editor Play Store
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <span className="text-red-500">*</span>
                      Field wajib diisi
                    </span>
                    {isFormValid && (
                      <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                        ✅ Semua data lengkap
                      </span>
                    )}
                  </div>
                  <Button
                    type="submit"
                    disabled={
                      !isFormValid || loading || limitCheck.isLimitReached
                    }
                    className="px-8 py-3 text-base font-semibold bg-gradient-to-r from-quicktify-primary to-quicktify-accent hover:from-quicktify-primary/90 hover:to-quicktify-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin">⏳</span>
                        Memproses...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        🚀 Estimasi Sekarang
                      </span>
                    )}
                  </Button>
                </div>
              </form>
              {error && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                    <span>❌</span>
                    <span className="font-medium">Error:</span>
                    <span>{error}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Hasil Prediksi */}
        {loading || isInitialLoading ? (
          <Card className="mb-8">
            <CardHeader>
              <Skeleton className="h-8 w-1/2 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-2" />
              <Skeleton className="h-4 w-2/3 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-2" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
              <Skeleton className="h-8 w-full mt-6" />
              <Skeleton className="h-4 w-2/3 mt-2" />
            </CardContent>
          </Card>
        ) : result ? (
          <>
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
                            <b>Confidence Interval</b>: Rentang kemungkinan
                            nilai rating sebenarnya, menunjukkan tingkat
                            kepastian dari prediksi.
                          </li>
                          <li>
                            <b>Input Summary</b>: Ringkasan data yang Anda
                            berikan ke sistem.
                          </li>
                          <li>
                            <b>Feature Importance</b>: Fitur-fitur yang paling
                            berpengaruh untuk prediksi rating, diurutkan
                            berdasarkan tingkat kepentingannya.
                          </li>
                          <li>
                            <b>SHAP Local</b>: Analisis kontribusi setiap fitur
                            terhadap prediksi spesifik Anda (dampak
                            positif/negatif).
                          </li>
                          <li>
                            <b>Bar Plot</b>: Visualisasi dampak fitur-fitur
                            utama terhadap prediksi rating keseluruhan.
                          </li>
                          <li>
                            <b>Waterfall Plot</b>: Visualisasi kontribusi
                            berurutan fitur-fitur dari baseline hingga prediksi
                            akhir.
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
                  {result.confidence_interval && (
                    <div className="flex-shrink-0 w-full md:max-w-xs flex flex-col items-center justify-center">
                      <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-8 py-6 rounded-2xl font-mono text-lg font-semibold border border-blue-300 dark:border-blue-700 w-full text-center">
                        {typeof result.confidence_interval === 'string' &&
                        result.confidence_interval.includes(',')
                          ? result.confidence_interval.split(',').join(' s/d ')
                          : Array.isArray(result.confidence_interval)
                            ? `${result.confidence_interval[0]} s/d ${result.confidence_interval[1]}`
                            : String(result.confidence_interval)}
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
                          result.predicted_rating >= 4
                            ? 'bg-green-500/90 text-white border-green-600'
                            : result.predicted_rating >= 3
                              ? 'bg-yellow-400/90 text-black border-yellow-500'
                              : 'bg-red-500/90 text-white border-red-600'
                        }`}
                    >
                      {result.predicted_rating.toFixed(3)}
                    </span>
                    <span className="mt-3 text-base font-semibold text-muted-foreground">
                      Predicted Rating
                    </span>
                  </div>
                </div>
                {/* Input Summary */}
                {result.input_summary && (
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
                        {Object.entries(result.input_summary).map(
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
                        {Array.isArray(result.feature_importance) &&
                          result.feature_importance.map((f, i) => (
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
                        {Array.isArray(result.shap_local) &&
                          result.shap_local.map((s, i) => {
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
                        src={result.shap_plots.bar_plot_url}
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
                        src={result.shap_plots.waterfall_plot_url}
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
                        src={result.shap_plots.force_plot_url}
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
                  Ringkasan Hasil Analisis{' '}
                  <span className="text-quicktify-primary">(AI)</span>
                </h2>
                <CardDescription className="text-base font-medium">
                  Kesimpulan dari analisis estimasi rating aplikasi Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-5 pb-5 prose prose-sm dark:prose-invert mx-auto max-w-none">
                {summaryLoading ? (
                  <div>
                    <Skeleton className="h-8 w-1/2 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6 mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-2" />
                  </div>
                ) : summaryError ? (
                  <div className="text-red-500">{summaryError}</div>
                ) : result.summary ? (
                  <ReactMarkdown>{result.summary}</ReactMarkdown>
                ) : (
                  <div className="text-muted-foreground">
                    Ringkasan akan dihasilkan setelah analisis selesai.
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        ) : null}
      </div>
    </DashboardLayout>
  );
};

export default RatingEstimation;
