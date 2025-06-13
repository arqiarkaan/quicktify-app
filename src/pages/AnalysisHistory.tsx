import { DashboardLayout } from '@/components/dashboard-layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useNavigate } from 'react-router-dom';
import AnalysisHistorySkeleton from '@/components/dashboard/AnalysisHistorySkeleton';
import { useState, useMemo } from 'react';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

import { PlusCircle } from 'lucide-react';

const AnalysisHistory = () => {
  const { user } = useUser();
  const analyses = useQuery(
    user ? api.analysis.getUserAnalyses : null,
    user ? { userId: user.id } : undefined
  );
  const navigate = useNavigate();

  const PAGE_SIZE = 10;
  const [filterType, setFilterType] = useState<'all' | 'csv' | 'appId'>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAnalyses = useMemo(() => {
    if (!analyses) return [];
    let arr = [...analyses];
    if (filterType !== 'all') {
      arr = arr.filter((a) => a.inputType === filterType);
    }
    // Sort descending (terbaru di atas)
    arr.sort((a, b) => b.createdAt - a.createdAt);
    return arr;
  }, [analyses, filterType]);

  const sortedAnalysesAsc = useMemo(() => {
    if (!analyses) return [];
    return [...analyses].sort((a, b) => a.createdAt - b.createdAt);
  }, [analyses]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAnalyses.length / PAGE_SIZE)
  );
  const paginatedAnalyses = filteredAnalyses.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <DashboardLayout>
      <div className="container py-6 md:py-10">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <h1 className="text-3xl font-bold">Riwayat Analisis</h1>
            <p className="text-muted-foreground mt-2">
              Histori analisis ulasan yang telah Anda lakukan sebelumnya
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="mt-4 md:mt-0 w-full sm:w-auto"
            >
              <span className="flex items-center gap-2">
                <PlusCircle className="w-4 h-4" />
                Analisis Baru
              </span>
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="mt-4 md:mt-0 w-full sm:w-auto"
            >
              <span className="flex items-center gap-2">
                Kembali ke Dashboard
              </span>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <CardTitle>Daftar Analisis</CardTitle>
                <CardDescription>
                  Semua analisis yang telah Anda lakukan
                </CardDescription>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <Select
                  value={filterType}
                  onValueChange={(v) => {
                    setFilterType(v as any);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-full sm:w-50">
                    <SelectValue placeholder="Filter Input Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua</SelectItem>
                    <SelectItem value="appId">Google Play App ID</SelectItem>
                    <SelectItem value="csv">CSV File</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {analyses === undefined ? (
              <AnalysisHistorySkeleton />
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Analisis ke</TableHead>
                      <TableHead>ID Analisis</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Jumlah Ulasan</TableHead>
                      <TableHead>Sentimen Positif</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Input Type</TableHead>
                      <TableHead>Input Value</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedAnalyses.length > 0 ? (
                      paginatedAnalyses.map((item, idx) => {
                        // Nomor analisis ke = index ascending dari seluruh analyses + 1
                        const analysisNumber =
                          sortedAnalysesAsc.findIndex(
                            (a) => a._id === item._id
                          ) + 1;
                        return (
                          <TableRow key={item._id}>
                            <TableCell className="font-medium">
                              {analysisNumber}
                            </TableCell>
                            <TableCell className="font-medium">
                              {item._id}
                            </TableCell>
                            <TableCell>
                              {new Date(item.createdAt).toLocaleString()}
                            </TableCell>
                            <TableCell>{item.reviewsCount}</TableCell>
                            <TableCell>
                              {item.sentimentResult?.sentiment_analysis
                                ?.percentages?.Positive ?? '-'}
                              %
                            </TableCell>
                            <TableCell>
                              <span className="px-2 py-1 rounded-full text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100">
                                Selesai
                              </span>
                            </TableCell>
                            <TableCell>{item.inputType}</TableCell>
                            <TableCell>{item.inputValue}</TableCell>
                            <TableCell>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  navigate(
                                    `/dashboard/analysis/history/${item._id}`
                                  )
                                }
                              >
                                Lihat Analisis
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={9}
                          className="text-center text-muted-foreground"
                        >
                          Belum ada data analisis.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                <div className="mt-4 flex justify-center">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === 1}
                      onClick={() =>
                        handlePageChange(Math.max(1, currentPage - 1))
                      }
                    >
                      Sebelumnya
                    </Button>
                    <span className="text-xs text-muted-foreground mx-4">
                      Halaman {currentPage} dari {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === totalPages}
                      onClick={() =>
                        handlePageChange(Math.min(totalPages, currentPage + 1))
                      }
                    >
                      Berikutnya
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AnalysisHistory;
