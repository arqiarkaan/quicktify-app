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
import { PlusCircle } from 'lucide-react';

const RatingEstimationHistory = () => {
  const { user } = useUser();
  const ratingEstimations = useQuery(
    user ? api.ratingEstimation.getAll : null,
    user ? { userId: user.id } : undefined
  );
  const navigate = useNavigate();

  const PAGE_SIZE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const sortedEstimations = useMemo(() => {
    if (!ratingEstimations) return [];
    // Sort descending (terbaru di atas)
    return [...ratingEstimations].sort((a, b) => b.createdAt - a.createdAt);
  }, [ratingEstimations]);

  const sortedEstimationsAsc = useMemo(() => {
    if (!ratingEstimations) return [];
    return [...ratingEstimations].sort((a, b) => a.createdAt - b.createdAt);
  }, [ratingEstimations]);

  const totalPages = Math.max(
    1,
    Math.ceil(sortedEstimations.length / PAGE_SIZE)
  );
  const paginatedEstimations = sortedEstimations.slice(
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
            <h1 className="text-3xl font-bold">Riwayat Estimasi Rating</h1>
            <p className="text-muted-foreground mt-2">
              Histori estimasi rating aplikasi yang telah Anda lakukan
              sebelumnya
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard/rating-estimation')}
              className="mt-4 md:mt-0 w-full sm:w-auto"
            >
              <span className="flex items-center gap-2">
                <PlusCircle className="w-4 h-4" />
                Estimasi Baru
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
                <CardTitle>Daftar Estimasi Rating</CardTitle>
                <CardDescription>
                  Semua estimasi rating yang telah Anda lakukan
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {ratingEstimations === undefined ? (
              <AnalysisHistorySkeleton />
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Estimasi ke</TableHead>
                      <TableHead>ID Estimasi</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Estimated Rating</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedEstimations.length > 0 ? (
                      paginatedEstimations.map((item, idx) => {
                        // Nomor estimasi ke = index ascending dari seluruh estimations + 1
                        const estimationNumber =
                          sortedEstimationsAsc.findIndex(
                            (e) => e._id === item._id
                          ) + 1;
                        return (
                          <TableRow key={item._id}>
                            <TableCell className="font-medium">
                              {estimationNumber}
                            </TableCell>
                            <TableCell className="font-medium">
                              {item._id}
                            </TableCell>
                            <TableCell>
                              {new Date(item.createdAt).toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <span
                                className={`font-semibold ${
                                  item.predicted_rating >= 4
                                    ? 'text-green-600 dark:text-green-400'
                                    : item.predicted_rating >= 3
                                      ? 'text-yellow-600 dark:text-yellow-400'
                                      : 'text-red-600 dark:text-red-400'
                                }`}
                              >
                                {item.predicted_rating.toFixed(2)}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  navigate(
                                    `/dashboard/rating-estimation/history/${item._id}`
                                  )
                                }
                              >
                                Lihat Estimasi
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="text-center text-muted-foreground"
                        >
                          Belum ada data estimasi rating.
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

export default RatingEstimationHistory;
