import { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { BarChart2, History, LogOut, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import quicktifyLogoTransparent from '@/assets/quicktify-logo-transparent.png';

import { UserButton } from '@clerk/clerk-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-quicktify-primary to-quicktify-accent overflow-hidden">
                <img
                  src={quicktifyLogoTransparent}
                  alt="Quicktify Logo"
                  className="h-7 w-7 object-contain"
                  loading="lazy"
                  draggable={false}
                />
              </div>
              <span className="font-bold text-lg">Quicktify</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" asChild className="hidden md:flex">
              <Link to="/dashboard/analysis/history">
                <History className="mr-2 h-4 w-4" />
                Riwayat Analisis
              </Link>
            </Button>

            <Button variant="outline" asChild className="hidden md:flex">
              <Link to="/dashboard/rating-estimation/history">
                <History className="mr-2 h-4 w-4" />
                Riwayat Estimasi
              </Link>
            </Button>

            <Button variant="outline" asChild className="hidden md:flex">
              <Link to="/dashboard/rating-estimation">
                <BarChart2 className="mr-2 h-4 w-4" />
                Estimasi Rating
              </Link>
            </Button>

            <ThemeToggle />

            <UserButton />

            {/* Mobile navigation for smaller screens */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <span className="sr-only">Open menu</span>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                  >
                    <path
                      d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/analysis/history">
                    <History className="mr-2 h-4 w-4" />
                    Riwayat Analisis
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/rating-estimation/history">
                    <History className="mr-2 h-4 w-4" />
                    Riwayat Estimasi
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/rating-estimation">
                    <BarChart2 className="mr-2 h-4 w-4" />
                    Estimasi Rating
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main content */}
      <motion.main
        className="flex-1"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {children}
      </motion.main>
    </div>
  );
}
