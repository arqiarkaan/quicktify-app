import { Button } from '@/components/ui/button';
import { SignedIn, SignedOut, SignUpButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  containerVariants,
  itemVariants,
  textRevealVariants,
  scaleVariants,
} from '@/components/animated-section';
// import { Skeleton } from "@/components/ui/skeleton";

export function HeroSection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-quicktify-primary/10 to-transparent dark:from-quicktify-primary/5"></div>

      <div className="container relative z-10">
        <motion.div
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-quicktify-primary to-quicktify-accent bg-clip-text text-transparent"
            variants={textRevealVariants}
          >
            Dapatkan Insight Mendalam dari Ulasan Aplikasi Anda di Google Play
            Store dalam Sekejap!{' '}
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl mb-10 text-muted-foreground max-w-3xl"
            variants={textRevealVariants}
          >
            Platform analisis cerdas yang membantu pengembang aplikasi memahami
            sentimen dan emosi pengguna, mendeteksi spam, hingga mengestimasikan
            rating aplikasi menggunakan teknologi AI canggih.
          </motion.p>

          <motion.div variants={itemVariants}>
            <SignedOut>
              <SignUpButton
                mode="modal"
                forceRedirectUrl="/dashboard"
                fallbackRedirectUrl="/dashboard"
              >
                <Button
                  size="lg"
                  className="bg-quicktify-primary hover:bg-quicktify-secondary text-lg py-6 px-8"
                >
                  Coba Quicktify Sekarang, Gratis!
                </Button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <Button
                asChild
                size="lg"
                className="bg-quicktify-primary hover:bg-quicktify-secondary text-lg py-6 px-8"
              >
                <Link to="/dashboard" className="flex items-center gap-2">
                  Quicktify Dashboard
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </Button>
            </SignedIn>
          </motion.div>

          <motion.div
            className="mt-16 relative w-full max-w-5xl"
            variants={scaleVariants}
          >
            <div className="w-full aspect-[16/9] rounded-lg overflow-hidden bg-gradient-to-tr from-quicktify-primary/20 via-quicktify-accent/10 to-quicktify-primary/5 shadow-lg border border-quicktify-primary/20">
              <div className="w-full h-full flex flex-col gap-4 items-center justify-center p-8">
                <div className="w-full flex justify-between items-center p-4 bg-quicktify-primary/10 rounded-lg border border-quicktify-primary/20">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-quicktify-primary/40 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-quicktify-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <span className="font-semibold">Dashboard Analisis</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-quicktify-accent/70 animate-pulse"></div>
                    <div className="h-4 w-4 rounded-full bg-quicktify-primary/70 animate-pulse"></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                  <div className="bg-white/10 dark:bg-black/10 backdrop-blur-sm p-4 rounded-lg border border-quicktify-primary/20">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold">Sentimen & Emosi</h3>
                      <div className="h-4 w-4 rounded-full bg-quicktify-accent/50"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs mb-1">Sentimen</div>
                      <div className="flex justify-between gap-2">
                        <div className="h-12 w-1/3 bg-green-500/50 rounded-md animate-pulse"></div>
                        <div className="h-12 w-1/3 bg-yellow-500/50 rounded-md animate-pulse"></div>
                        <div className="h-12 w-1/3 bg-red-500/50 rounded-md animate-pulse"></div>
                      </div>
                      <div className="text-xs mb-1 mt-2">Emosi</div>
                      <div className="grid grid-cols-6 gap-1">
                        <div className="h-8 bg-blue-400/50 rounded-md animate-pulse"></div>
                        <div className="h-8 bg-green-400/50 rounded-md animate-pulse"></div>
                        <div className="h-8 bg-red-500/50 rounded-md animate-pulse"></div>
                        <div className="h-8 bg-purple-400/50 rounded-md animate-pulse"></div>
                        <div className="h-8 bg-gray-400/50 rounded-md animate-pulse"></div>
                        <div className="h-8 bg-pink-400/50 rounded-md animate-pulse"></div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        <span className="inline-block px-1.5 py-0.5 bg-white/10 rounded text-[10px]">
                          neutral
                        </span>
                        <span className="inline-block px-1.5 py-0.5 bg-white/10 rounded text-[10px]">
                          happy
                        </span>
                        <span className="inline-block px-1.5 py-0.5 bg-white/10 rounded text-[10px]">
                          anger
                        </span>
                        <span className="inline-block px-1.5 py-0.5 bg-white/10 rounded text-[10px]">
                          fear
                        </span>
                        <span className="inline-block px-1.5 py-0.5 bg-white/10 rounded text-[10px]">
                          sad
                        </span>
                        <span className="inline-block px-1.5 py-0.5 bg-white/10 rounded text-[10px]">
                          love
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 dark:bg-black/10 backdrop-blur-sm p-4 rounded-lg border border-quicktify-primary/20">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold">Deteksi Spam</h3>
                      <div className="h-4 w-4 rounded-full bg-quicktify-primary/50"></div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="p-2 bg-red-400/20 rounded-md flex justify-between items-center">
                        <div className="text-[10px] truncate pr-1">
                          solusi masalah keuangan anda! dana cair cepat tanpa
                          jaminan!
                        </div>
                        <span className="text-[10px] px-1 py-0.5 bg-red-400/30 rounded">
                          Explicit Spam
                        </span>
                      </div>
                      <div className="p-2 bg-orange-400/20 rounded-md flex justify-between items-center">
                        <div className="text-[10px] truncate pr-1">
                          kalo dibandingin sama app sebelah yg ini kaya begitu
                        </div>
                        <span className="text-[10px] px-1 py-0.5 bg-orange-400/30 rounded">
                          Irrelevant
                        </span>
                      </div>
                      <div className="p-2 bg-orange-400/20 rounded-md flex justify-between items-center">
                        <div className="text-[10px] truncate pr-1">
                          enak dipake sambil rebahan hehe
                        </div>
                        <span className="text-[10px] px-1 py-0.5 bg-orange-400/30 rounded">
                          Irrelevant
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 dark:bg-black/10 backdrop-blur-sm p-4 rounded-lg border border-quicktify-primary/20">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold">Estimasi Rating</h3>
                      <div className="h-4 w-4 rounded-full bg-quicktify-accent/70"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-center">
                        <div className="h-20 w-20 rounded-full flex items-center justify-center bg-gradient-to-br from-quicktify-accent to-quicktify-primary text-2xl font-bold">
                          4.8
                        </div>
                      </div>
                      <div className="flex justify-center text-lg text-yellow-400">
                        ★★★★★
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full bg-white/10 dark:bg-black/10 backdrop-blur-sm p-4 rounded-lg border border-quicktify-primary/20">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold">Insight Cerdas</h3>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-quicktify-accent">
                        Powered by
                      </span>
                      <span className="font-semibold text-sm">Gemini 2.0</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-quicktify-primary/20 rounded animate-pulse"></div>
                    <div className="h-3 w-5/6 bg-quicktify-primary/20 rounded animate-pulse"></div>
                    <div className="h-3 w-4/5 bg-quicktify-primary/20 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
