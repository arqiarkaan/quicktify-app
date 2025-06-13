import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          {/* Ilustrasi/ikon lock */}
          <div className="mb-6 flex items-center justify-center bg-gradient-to-br from-quicktify-primary/20 to-quicktify-accent/20 rounded-full w-24 h-24 shadow-lg">
            <svg
              width="56"
              height="56"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="text-quicktify-primary dark:text-quicktify-accent w-14 h-14"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 10V7a4 4 0 10-8 0v3M5 10h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2z"
              />
            </svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-quicktify-primary dark:text-quicktify-accent flex items-center gap-2">
            Login Dulu, Yuk!
          </h1>
          <p className="mb-6 text-center text-muted-foreground max-w-md">
            Untuk mengakses fitur Quicktify, kamu perlu login dulu.
            <br />
            Tenang, prosesnya cepat dan mudah kok!{' '}
            <span role="img" aria-label="smile">
              😄
            </span>
          </p>
          <SignInButton
            mode="modal"
            forceRedirectUrl="/dashboard"
            fallbackRedirectUrl="/dashboard"
          >
            <button className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-br from-quicktify-primary to-quicktify-accent text-white shadow-lg hover:scale-105 transition-transform text-lg">
              Masuk & Mulai Analisis
            </button>
          </SignInButton>
        </div>
      </SignedOut>
    </>
  );
}
