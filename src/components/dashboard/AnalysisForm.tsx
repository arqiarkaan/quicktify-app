import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LimitMessage } from '@/components/ui/limit-overlay';
import { useLimitCheck } from '@/hooks/useLimitCheck';
import { getDisplayMode } from '@/lib/config';

const SORT_OPTIONS = [
  { value: 'NEWEST', label: 'Terbaru', desc: 'Ulasan terbaru' },
  { value: 'RATING', label: 'Rating', desc: 'Berdasarkan rating tertinggi' },
  {
    value: 'HELPFULNESS',
    label: 'Helpfulness',
    desc: 'Ulasan paling membantu',
  },
];

interface AnalysisFormProps {
  onSubmit: (formData: {
    appId: string;
    csvFile: File | null;
    sort: string;
    maxReview: string;
    customMax: string;
    activeSection: 'app' | 'csv' | null;
  }) => void;
  isLoading: boolean;
  resetForm?: boolean; // Prop untuk menentukan kapan form harus di-reset
}

export const AnalysisForm = ({
  onSubmit,
  isLoading,
  resetForm = false,
}: AnalysisFormProps) => {
  // Check limit status and mode
  const limitCheck = useLimitCheck('analysis');
  const currentMode = getDisplayMode();

  // State Form
  const [appId, setAppId] = useState('');
  const [sort, setSort] = useState('');
  const [maxReview, setMaxReview] = useState('1000');
  const [customMax, setCustomMax] = useState('');
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState<'app' | 'csv' | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const prevLoadingRef = useRef(isLoading);

  // Reset form ketika loading selesai (berhasil atau gagal)
  useEffect(() => {
    // Cek jika loading baru saja selesai (dari true ke false)
    if (prevLoadingRef.current && !isLoading) {
      // Reset form ketika analisis selesai
      resetFormValues();
    }

    // Update referensi state loading sebelumnya
    prevLoadingRef.current = isLoading;
  }, [isLoading]);

  // Reset maxReview jika mode DEMO dan user memilih opsi yang tidak diizinkan
  useEffect(() => {
    if (
      currentMode === 'DEMO' &&
      (maxReview === '5000' || maxReview === '10000' || maxReview === 'custom')
    ) {
      setMaxReview('1000');
      setCustomMax('');
    }
  }, [currentMode, maxReview]);

  // Fungsi untuk me-reset semua nilai form
  const resetFormValues = () => {
    setAppId('');
    setSort('');
    setMaxReview('1000');
    setCustomMax('');
    setCsvFile(null);
    setError('');
    setActiveSection(null);
    // Reset file input jika ada
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  function handleAppIdChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAppId(e.target.value);
    if (e.target.value) {
      setActiveSection('app');
      setCsvFile(null);
    } else if (!csvFile) {
      setActiveSection(null);
    }

    const regex = /^[a-z][a-z0-9_]*(\.[a-z0-9_]+)+[0-9a-z_]$/i;
    if (e.target.value && !regex.test(e.target.value)) {
      setError(
        'Format App ID tidak valid. Contoh: com.example atau com.example.app'
      );
    } else {
      setError('');
    }
  }

  function handleCsvChange(file: File | null) {
    setCsvFile(file);
    if (file) {
      setActiveSection('csv');
      setAppId('');
    } else if (!appId) {
      setActiveSection(null);
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    validateCsv(file);
  }

  function validateCsv(file: File | null) {
    if (!file) return;
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      setError('File harus berformat .csv');
      setCsvFile(null);
      return;
    }
    if (file.size > 32 * 1024 * 1024) {
      setError('Ukuran file maksimal 32MB');
      setCsvFile(null);
      return;
    }
    setError('');
    setCsvFile(file);
    setActiveSection('csv');
    setAppId('');
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      appId,
      csvFile,
      sort,
      maxReview,
      customMax,
      activeSection,
    });
  }

  // Validasi untuk UX tombol dan pesan error
  const isAppIdError = !!(
    appId && !/^[a-z][a-z0-9_]*(\.[a-z0-9_]+)+[0-9a-z_]$/i.test(appId)
  );
  const isSortError = !!(activeSection === 'app' && appId && !sort);
  const isCsvError = !!(
    error && /^(file|csv|berformat|ukuran|32mb)/i.test(error.trim())
  );
  const isGlobalError = !!(
    error &&
    !isAppIdError &&
    !isSortError &&
    !isCsvError
  );

  // Jika limit tercapai, tampilkan LimitMessage
  if (limitCheck.shouldShowLimit && limitCheck.isLimitReached) {
    return <LimitMessage message={limitCheck.limitMessage} />;
  }

  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <span className="bg-quicktify-primary/20 p-2 rounded-full">📊</span>
          Mulai Analisis
        </CardTitle>
        <CardDescription className="text-base mb-12">
          Pilih salah satu metode: masukkan App ID Google Play atau upload file
          CSV ulasan untuk mendapatkan analisis mendalam
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: App ID */}
          <div className="rounded-lg p-6 border border-white/30 dark:border-black/30 bg-gradient-to-br from-quicktify-primary/20 to-white/30 dark:to-black/30 backdrop-blur-lg shadow-lg">
            <fieldset
              disabled={activeSection === 'csv'}
              className={
                activeSection === 'csv'
                  ? 'opacity-60 pointer-events-none space-y-4'
                  : 'space-y-4'
              }
            >
              <Label htmlFor="app-id">Google Play App ID</Label>
              <Input
                id="app-id"
                placeholder="contoh: com.example.app atau com.example.app.id"
                value={appId}
                onChange={handleAppIdChange}
              />
              {/* Error App ID */}
              {isAppIdError && (
                <div className="text-red-500 text-sm mt-1">
                  Format App ID tidak valid. Contoh: com.example.app atau
                  com.example.app.id
                </div>
              )}
              <div>
                <Label htmlFor="sort">Urutkan Ulasan</Label>
                <Select value={sort} onValueChange={setSort} disabled={!appId}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih urutan ulasan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Urutan</SelectLabel>
                      {SORT_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}{' '}
                          <span className="text-xs text-muted-foreground ml-2">
                            {opt.desc}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {/* Error urutan */}
                {isSortError && (
                  <div className="text-red-500 text-sm mt-1">
                    Pilih urutan ulasannya.
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="max-review">
                  Jumlah Maksimum Ulasan
                  {currentMode === 'DEMO' && (
                    <span className="text-xs text-amber-600 dark:text-amber-400 ml-2">
                      (Dibatasi untuk mode demo)
                    </span>
                  )}
                </Label>
                <div className="flex gap-2">
                  <Select
                    value={maxReview}
                    onValueChange={setMaxReview}
                    disabled={!appId}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Pilih jumlah" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1000">1000</SelectItem>
                      <SelectItem
                        value="5000"
                        disabled={currentMode === 'DEMO'}
                        className={
                          currentMode === 'DEMO'
                            ? 'opacity-50 cursor-not-allowed'
                            : ''
                        }
                      >
                        5000{' '}
                        {currentMode === 'DEMO' &&
                          '(Tidak tersedia di mode demo)'}
                      </SelectItem>
                      <SelectItem
                        value="10000"
                        disabled={currentMode === 'DEMO'}
                        className={
                          currentMode === 'DEMO'
                            ? 'opacity-50 cursor-not-allowed'
                            : ''
                        }
                      >
                        10000{' '}
                        {currentMode === 'DEMO' &&
                          '(Tidak tersedia di mode demo)'}
                      </SelectItem>
                      <SelectItem
                        value="custom"
                        disabled={currentMode === 'DEMO'}
                        className={
                          currentMode === 'DEMO'
                            ? 'opacity-50 cursor-not-allowed'
                            : ''
                        }
                      >
                        Custom{' '}
                        {currentMode === 'DEMO' &&
                          '(Tidak tersedia di mode demo)'}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {maxReview === 'custom' && currentMode !== 'DEMO' && (
                    <Input
                      type="number"
                      min={1}
                      max={100000}
                      placeholder="Maks 100000"
                      value={customMax}
                      onChange={(e) => {
                        setCustomMax(e.target.value);
                        const val = +e.target.value;
                        if (e.target.value && (val < 1 || val > 100000)) {
                          setError('Jumlah custom harus antara 1 dan 100000');
                        } else {
                          setError('');
                        }
                      }}
                      className="w-32"
                    />
                  )}
                </div>
                {currentMode === 'DEMO' && (
                  <div className="text-xs text-amber-600 dark:text-amber-400 mt-2 p-2 bg-amber-50 dark:bg-amber-900/20 rounded border border-amber-200 dark:border-amber-800">
                    💡 Mode demo dibatasi maksimal 1000 ulasan untuk mencegah
                    throttling dari Google Play Store
                  </div>
                )}
                {maxReview === 'custom' &&
                  customMax &&
                  error &&
                  error.includes('custom') && (
                    <div className="text-red-500 text-sm mt-1">{error}</div>
                  )}
              </div>
            </fieldset>
          </div>

          {/* OR Divider */}
          <div className="flex items-center my-2">
            <div className="flex-1 h-px bg-muted-foreground/20" />
            <span className="mx-4 text-muted-foreground font-semibold select-none">
              atau
            </span>
            <div className="flex-1 h-px bg-muted-foreground/20" />
          </div>

          {/* Section 2: CSV */}
          <div
            className={
              'rounded-lg p-6 border border-white/30 dark:border-black/30 bg-gradient-to-br from-quicktify-primary/20 to-white/30 dark:to-black/30 backdrop-blur-lg shadow-lg' +
              (error && /^(file|csv|berformat|ukuran|32mb)/i.test(error.trim())
                ? ' border-red-500'
                : '')
            }
          >
            <fieldset
              disabled={activeSection === 'app'}
              className={
                activeSection === 'app'
                  ? 'opacity-60 pointer-events-none space-y-4'
                  : 'space-y-4'
              }
            >
              <Label>Upload File CSV (max 32MB)</Label>
              <div
                className={
                  'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition hover:border-quicktify-primary' +
                  (error &&
                  /^(file|csv|berformat|ukuran|32mb)/i.test(error.trim())
                    ? ' border-red-500'
                    : '')
                }
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
              >
                {csvFile ? (
                  <span className="flex items-center justify-center gap-2">
                    {csvFile.name}
                    <button
                      type="button"
                      className="ml-2 text-red-500 hover:text-red-700 p-1 rounded-full bg-white/60 dark:bg-black/30"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCsvFile(null);
                        setActiveSection(null);
                      }}
                      aria-label="Hapus file"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </span>
                ) : (
                  <span>
                    Drag & drop file CSV di sini, atau klik untuk pilih file
                  </span>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={(e) => validateCsv(e.target.files?.[0] || null)}
                />
              </div>
              <div className="text-xs text-muted-foreground">
                Pastikan file berformat .csv dan ukuran maksimal 32MB.
              </div>
              {/* Pesan error CSV */}
              {isCsvError && (
                <div className="text-red-500 text-sm mt-1">{error}</div>
              )}
            </fieldset>
          </div>

          {/* Error global */}
          {isGlobalError && <div className="text-red-500 text-sm">{error}</div>}

          <Button
            type="submit"
            className="w-full md:w-auto bg-quicktify-primary hover:bg-quicktify-secondary"
            disabled={
              isLoading ||
              (!appId && !csvFile) ||
              isAppIdError ||
              isSortError ||
              isCsvError ||
              limitCheck.isLimitReached
            }
          >
            {isLoading ? 'Menganalisis...' : 'Analisis Sekarang'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AnalysisForm;
