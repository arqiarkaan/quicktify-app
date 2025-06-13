import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { ProtectedRoute } from '@/components/protected-route';
import AnalysisDetail from './pages/AnalysisDetail';
import RatingEstimationDetail from './pages/RatingEstimationDetail';

import Index from './pages/Index';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Dashboard from './pages/Dashboard';
import RatingEstimation from './pages/RatingEstimation';
import AnalysisHistory from './pages/AnalysisHistory';
import RatingEstimationHistory from './pages/RatingEstimationHistory';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/rating-estimation"
              element={
                <ProtectedRoute>
                  <RatingEstimation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/analysis/history"
              element={
                <ProtectedRoute>
                  <AnalysisHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/analysis/history/:id"
              element={
                <ProtectedRoute>
                  <AnalysisDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/rating-estimation/history"
              element={
                <ProtectedRoute>
                  <RatingEstimationHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/rating-estimation/history/:id"
              element={
                <ProtectedRoute>
                  <RatingEstimationDetail />
                </ProtectedRoute>
              }
            />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
