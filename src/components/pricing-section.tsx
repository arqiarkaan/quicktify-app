import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  containerVariants,
  itemVariants,
  textRevealVariants,
  scaleVariants,
} from '@/components/animated-section';

import { SignedIn, SignedOut, SignUpButton } from '@clerk/clerk-react';

export function PricingSection() {
  return (
    <section id="pricing" className="py-16">
      <div className="container">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            variants={textRevealVariants}
          >
            Nikmati Semua Fitur Quicktify Secara Gratis!
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground"
            variants={textRevealVariants}
          >
            Untuk saat ini, Anda dapat mencoba Quicktify tanpa biaya dan
            melakukan analisis ulasan dan estimasi rating hingga{' '}
            <span className="font-semibold text-quicktify-primary">
              30 kali per bulan
            </span>
            .
          </motion.p>
        </motion.div>

        <motion.div
          className="max-w-md mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={scaleVariants}
        >
          <Card className="border-2 border-quicktify-primary overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-quicktify-primary to-quicktify-accent"></div>
            {/* Badge Gratis */}
            <div className="absolute right-4 top-4 z-10">
              <span className="px-3 py-1 rounded-full bg-green-500 text-white font-semibold text-xs shadow-lg animate-pulse">
                Gratis untuk Saat Ini
              </span>
            </div>
            <CardHeader className="text-center pt-10">
              <CardTitle className="text-2xl font-bold">
                Paket Quicktify
              </CardTitle>
              <div className="mt-4 mb-2 flex flex-col items-center gap-1">
                <span className="text-4xl font-bold text-muted-foreground line-through select-none">
                  Rp 50.000
                </span>
                <span className="text-lg font-bold text-quicktify-primary">
                  GRATIS
                </span>
                <span className="text-muted-foreground">/bulan</span>
              </div>
              <CardDescription>
                Coba semua fitur premium Quicktify tanpa biaya, maksimal 30
                analisis ulasan dan estimasi rating per bulan
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-quicktify-primary flex-shrink-0 mt-0.5" />
                  <span>
                    Maksimal 30 analisis ulasan dan estimasi rating per bulan
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-quicktify-primary flex-shrink-0 mt-0.5" />
                  <span>Analisis hingga 100.000 ulasan per analisis</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-quicktify-primary flex-shrink-0 mt-0.5" />
                  <span>Analisis Sentimen & Emosi Ulasan</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-quicktify-primary flex-shrink-0 mt-0.5" />
                  <span>Deteksi Spam dan Tidak Relevan Ulasan</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-quicktify-primary flex-shrink-0 mt-0.5" />
                  <span>Estimasi Rating Aplikasi</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-quicktify-primary flex-shrink-0 mt-0.5" />
                  <span>Ringkasan Gemini</span>
                </li>
                {/* <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-quicktify-primary flex-shrink-0 mt-0.5" />
                  <span>Download hasil analisis (PDF/CSV)</span>
                </li> */}
              </ul>
            </CardContent>

            <CardFooter>
              <SignedOut>
                <SignUpButton
                  mode="modal"
                  forceRedirectUrl="/dashboard"
                  fallbackRedirectUrl="/dashboard"
                >
                  <Button className="w-full bg-quicktify-primary hover:bg-quicktify-secondary">
                    Mulai Analisis Gratis
                  </Button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <Button
                  className="w-full bg-quicktify-primary hover:bg-quicktify-secondary"
                  asChild
                >
                  <Link to="/dashboard">Quicktify Dashboard</Link>
                </Button>
              </SignedIn>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
