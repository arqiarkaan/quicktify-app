// import { useTheme } from "@/components/theme-provider";
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/clerk-react';

import quicktifyLogoTransparent from '@/assets/quicktify-logo-transparent.png';

export function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2">
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

        {/* Desktop Navigation
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#features"
            className="text-sm font-medium hover:text-quicktify-primary"
          >
            Fitur
          </a>
          <a
            href="#pricing"
            className="text-sm font-medium hover:text-quicktify-primary"
          >
            Harga
          </a>
        </nav> */}

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <SignedIn>
            <Button
              asChild
              className="bg-quicktify-primary hover:bg-quicktify-secondary"
            >
              <Link to="/dashboard">Dashboard</Link>
            </Button>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton
              mode="modal"
              forceRedirectUrl="/dashboard"
              fallbackRedirectUrl="/dashboard"
            >
              <Button variant="ghost">Login</Button>
            </SignInButton>
            <SignUpButton
              mode="modal"
              forceRedirectUrl="/dashboard"
              fallbackRedirectUrl="/dashboard"
            >
              <Button className="bg-quicktify-primary hover:bg-quicktify-secondary">
                Coba Quicktify Sekarang
              </Button>
            </SignUpButton>
          </SignedOut>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center md:hidden gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="container md:hidden py-4 animate-fade-in">
          <nav className="flex flex-col gap-4">
            {/* <a
              href="#features"
              className="text-sm font-medium hover:text-quicktify-primary"
              onClick={() => setMenuOpen(false)}
            >
              Fitur
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium hover:text-quicktify-primary"
              onClick={() => setMenuOpen(false)}
            >
              Harga
            </a> */}
            <SignedIn>
              <Button
                asChild
                className="bg-quicktify-primary hover:bg-quicktify-secondary w-full"
              >
                <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                  Dashboard
                </Link>
              </Button>
              <div className="flex justify-center mt-2">
                <UserButton />
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton
                mode="modal"
                forceRedirectUrl="/dashboard"
                fallbackRedirectUrl="/dashboard"
              >
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Button>
              </SignInButton>
              <SignUpButton
                mode="modal"
                forceRedirectUrl="/dashboard"
                fallbackRedirectUrl="/dashboard"
              >
                <Button
                  className="bg-quicktify-primary hover:bg-quicktify-secondary w-full"
                  onClick={() => setMenuOpen(false)}
                >
                  Mulai Uji Coba Gratis
                </Button>
              </SignUpButton>
            </SignedOut>
          </nav>
        </div>
      )}
    </header>
  );
}
