import { Card, CardContent } from '@/components/ui/card';
import { BarChart2, AlertCircle, TrendingUp, Code } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import {
  containerVariants,
  itemVariants,
  textRevealVariants,
} from '@/components/animated-section';

const cardContentVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const iconVariants: Variants = {
  hidden: {
    scale: 0,
    rotate: -180,
  },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 200,
      damping: 15,
    },
  },
};

const chartBarVariants: Variants = {
  hidden: {
    scaleY: 0,
    opacity: 0,
  },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.25, 0, 1] as const,
    },
  },
};

const tagVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const spamItemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
    },
  },
};

const pulseVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      repeat: Infinity,
      repeatType: 'reverse' as const,
      repeatDelay: 1,
    },
  },
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 bg-secondary/50">
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
            Fitur Unggulan Quicktify untuk Pertumbuhan Aplikasi Anda
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground"
            variants={textRevealVariants}
          >
            Solusi lengkap untuk memahami pengguna dan meningkatkan performa
            aplikasi Anda
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          <motion.div variants={itemVariants}>
            <Card className="border-quicktify-primary/30 overflow-hidden h-full">
              <div className="p-1 bg-gradient-to-r from-quicktify-primary to-quicktify-accent"></div>
              <CardContent className="pt-6">
                <motion.div
                  className="flex items-start gap-4"
                  variants={cardContentVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="bg-quicktify-primary/20 p-3 rounded-lg"
                    variants={iconVariants}
                  >
                    <BarChart2 className="h-6 w-6 text-quicktify-primary" />
                  </motion.div>
                  <div>
                    <motion.h3
                      className="text-xl font-semibold mb-3"
                      variants={textRevealVariants}
                    >
                      Analisis Sentimen & Emosi
                    </motion.h3>
                    <motion.p
                      className="text-muted-foreground mb-4"
                      variants={textRevealVariants}
                    >
                      Pahami perasaan pengguna Anda secara mendalam.
                      Visualisasikan persentase sentimen (positif, negatif,
                      netral) dan emosi (senang, marah, sedih, netral, cinta,
                      takut) melalui grafik interaktif dan <em>word cloud</em>{' '}
                      yang intuitif.
                    </motion.p>
                    <motion.div
                      className="mt-4 bg-muted/50 rounded-lg p-4"
                      variants={itemVariants}
                    >
                      <div className="space-y-4">
                        <motion.div variants={itemVariants}>
                          <div className="mb-2 text-sm font-medium">
                            Analisis Sentimen
                          </div>
                          <motion.div
                            className="flex gap-2"
                            variants={{
                              hidden: {},
                              visible: {
                                transition: {
                                  staggerChildren: 0.1,
                                },
                              },
                            }}
                          >
                            <motion.div
                              className="h-20 w-1/3 bg-green-400/20 rounded-lg relative overflow-hidden"
                              variants={chartBarVariants}
                            >
                              <motion.div
                                className="absolute bottom-0 w-full h-3/4 bg-green-400/40 rounded-b-lg"
                                variants={chartBarVariants}
                                style={{ originY: 1 }}
                              />
                              <div className="absolute top-2 left-0 right-0 text-center text-xs font-medium">
                                Positive
                              </div>
                            </motion.div>
                            <motion.div
                              className="h-20 w-1/3 bg-yellow-400/20 rounded-lg relative overflow-hidden"
                              variants={chartBarVariants}
                            >
                              <motion.div
                                className="absolute bottom-0 w-full h-1/3 bg-yellow-400/40 rounded-b-lg"
                                variants={chartBarVariants}
                                style={{ originY: 1 }}
                              />
                              <div className="absolute top-2 left-0 right-0 text-center text-xs font-medium">
                                Neutral
                              </div>
                            </motion.div>
                            <motion.div
                              className="h-20 w-1/3 bg-red-400/20 rounded-lg relative overflow-hidden"
                              variants={chartBarVariants}
                            >
                              <motion.div
                                className="absolute bottom-0 w-full h-1/5 bg-red-400/40 rounded-b-lg"
                                variants={chartBarVariants}
                                style={{ originY: 1 }}
                              />
                              <div className="absolute top-2 left-0 right-0 text-center text-xs font-medium">
                                Negative
                              </div>
                            </motion.div>
                          </motion.div>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                          <div className="mb-2 text-sm font-medium">
                            Analisis Emosi
                          </div>
                          <motion.div
                            className="grid grid-cols-3 gap-2"
                            variants={{
                              hidden: {},
                              visible: {
                                transition: {
                                  staggerChildren: 0.05,
                                },
                              },
                            }}
                          >
                            {[
                              {
                                emotion: 'Neutral',
                                bgColor: 'rgba(59, 130, 246, 0.2)',
                                barColor: 'rgba(59, 130, 246, 0.4)',
                                height: '66.67%',
                              },
                              {
                                emotion: 'Happy',
                                bgColor: 'rgba(34, 197, 94, 0.2)',
                                barColor: 'rgba(34, 197, 94, 0.4)',
                                height: '83.33%',
                              },
                              {
                                emotion: 'Anger',
                                bgColor: 'rgba(239, 68, 68, 0.2)',
                                barColor: 'rgba(239, 68, 68, 0.4)',
                                height: '33.33%',
                              },
                              {
                                emotion: 'Fear',
                                bgColor: 'rgba(147, 51, 234, 0.2)',
                                barColor: 'rgba(147, 51, 234, 0.4)',
                                height: '16.67%',
                              },
                              {
                                emotion: 'Sad',
                                bgColor: 'rgba(107, 114, 128, 0.2)',
                                barColor: 'rgba(107, 114, 128, 0.4)',
                                height: '50%',
                              },
                              {
                                emotion: 'Love',
                                bgColor: 'rgba(236, 72, 153, 0.2)',
                                barColor: 'rgba(236, 72, 153, 0.4)',
                                height: '66.67%',
                              },
                            ].map((item, index) => (
                              <motion.div
                                key={item.emotion}
                                className="h-12 rounded-lg relative overflow-hidden"
                                style={{ backgroundColor: item.bgColor }}
                                variants={chartBarVariants}
                              >
                                <motion.div
                                  className="absolute bottom-0 w-full rounded-b-lg"
                                  style={{
                                    backgroundColor: item.barColor,
                                    height: item.height,
                                    originY: 1,
                                  }}
                                  variants={chartBarVariants}
                                />
                                <div className="absolute top-1 left-0 right-0 text-center text-xs">
                                  {item.emotion}
                                </div>
                              </motion.div>
                            ))}
                          </motion.div>
                        </motion.div>

                        <motion.div
                          className="flex flex-wrap gap-2"
                          variants={{
                            hidden: {},
                            visible: {
                              transition: {
                                staggerChildren: 0.1,
                                delayChildren: 0.8,
                              },
                            },
                          }}
                        >
                          {[
                            { word: 'bagus', opacity: 30 },
                            { word: 'keren', opacity: 40 },
                            { word: 'mantap', opacity: 50 },
                            { word: 'baik', opacity: 35 },
                            { word: 'sempurna', opacity: 45 },
                            { word: 'luar biasa', opacity: 25 },
                            { word: 'suka', opacity: 55 },
                            { word: 'berfungsi', opacity: 40 },
                          ].map((item, index) => (
                            <motion.span
                              key={item.word}
                              className="text-xs py-1 px-2 rounded-full"
                              style={{
                                backgroundColor: `hsl(var(--primary) / ${
                                  item.opacity / 100
                                })`,
                                color:
                                  item.opacity > 40
                                    ? 'white'
                                    : 'hsl(var(--primary))',
                              }}
                              variants={tagVariants}
                            >
                              {item.word}
                            </motion.span>
                          ))}
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-quicktify-primary/30 overflow-hidden h-full">
              <div className="p-1 bg-gradient-to-r from-quicktify-primary to-quicktify-accent"></div>
              <CardContent className="pt-6">
                <motion.div
                  className="flex items-start gap-4"
                  variants={cardContentVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="bg-quicktify-primary/20 p-3 rounded-lg"
                    variants={iconVariants}
                  >
                    <AlertCircle className="h-6 w-6 text-quicktify-primary" />
                  </motion.div>
                  <div>
                    <motion.h3
                      className="text-xl font-semibold mb-3"
                      variants={textRevealVariants}
                    >
                      Deteksi Spam & Tidak Relevan
                    </motion.h3>
                    <motion.p
                      className="text-muted-foreground mb-4"
                      variants={textRevealVariants}
                    >
                      Saring kebisingan secara otomatis. Identifikasi dan
                      isolasi ulasan yang berpotensi spam untuk menjaga
                      integritas data analisis Anda.
                    </motion.p>
                    <motion.div
                      className="mt-4 bg-muted/50 rounded-lg p-4"
                      variants={itemVariants}
                    >
                      <motion.div
                        className="space-y-2"
                        variants={{
                          hidden: {},
                          visible: {
                            transition: {
                              staggerChildren: 0.1,
                              delayChildren: 0.3,
                            },
                          },
                        }}
                      >
                        {[
                          {
                            text: 'solusi masalah keuangan anda! dana cair cepat tanpa jaminan! wa ke 0877xxxxxxxx',
                            type: 'Explicit Spam',
                            color: 'red',
                          },
                          {
                            text: 'mengapa lagi ini hmmbikin boros kuota ga ya?',
                            type: 'Irrelevant',
                            color: 'orange',
                          },
                          {
                            text: 'KERJA SAMPINGAN GAJI HARIAN! CUKUP MAIN GAME BISA DAPET DUIT!',
                            type: 'Explicit Spam',
                            color: 'red',
                          },
                          {
                            text: 'enak dipake sambil rebahan hehe',
                            type: 'Irrelevant',
                            color: 'orange',
                          },
                          {
                            text: 'jual akun netflix premium murah legal garansi! cuma 20rb/bulan!',
                            type: 'Explicit Spam',
                            color: 'red',
                          },
                          {
                            text: 'lagi nonton drakor apa nih gaes rekomen dong?',
                            type: 'Irrelevant',
                            color: 'orange',
                          },
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            className={`flex items-center justify-between p-2 bg-${item.color}-400/20 rounded-lg`}
                            variants={spamItemVariants}
                          >
                            <div className="text-xs">{item.text}</div>
                            <motion.div
                              className={`text-xs font-medium bg-${item.color}-400/30 py-1 px-2 rounded`}
                              variants={tagVariants}
                            >
                              {item.type}
                            </motion.div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-quicktify-primary/30 overflow-hidden h-full">
              <div className="p-1 bg-gradient-to-r from-quicktify-primary to-quicktify-accent"></div>
              <CardContent className="pt-6">
                <motion.div
                  className="flex items-start gap-4"
                  variants={cardContentVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="bg-quicktify-primary/20 p-3 rounded-lg"
                    variants={iconVariants}
                  >
                    <TrendingUp className="h-6 w-6 text-quicktify-primary" />
                  </motion.div>
                  <div>
                    <motion.h3
                      className="text-xl font-semibold mb-3"
                      variants={textRevealVariants}
                    >
                      Estimasi Rating
                    </motion.h3>
                    <motion.p
                      className="text-muted-foreground mb-4"
                      variants={textRevealVariants}
                    >
                      Dapatkan perkiraan rating aplikasi Anda berdasarkan
                      atribut-atribut yang Anda masukkan, tanpa perlu menunggu
                      data historis terkumpul atau mengira-ngira dengan data
                      yang tidak relevan.
                    </motion.p>
                    <motion.div
                      className="mt-4 bg-muted/50 rounded-lg p-4"
                      variants={itemVariants}
                    >
                      <div className="space-y-3">
                        <motion.div
                          className="grid grid-cols-2 gap-3"
                          variants={{
                            hidden: {},
                            visible: {
                              transition: {
                                staggerChildren: 0.1,
                                delayChildren: 0.2,
                              },
                            },
                          }}
                        >
                          {[
                            'Feature 1',
                            'Feature 2',
                            'Feature 3',
                            'Feature 4',
                          ].map((feature, index) => (
                            <motion.div
                              key={feature}
                              className="bg-white/20 dark:bg-black/20 p-2 rounded-md"
                              variants={itemVariants}
                            >
                              <div className="text-xs mb-1 text-muted-foreground">
                                {feature}
                              </div>
                              <motion.div
                                className="h-6 w-full rounded bg-quicktify-primary/20"
                                variants={pulseVariants}
                              />
                            </motion.div>
                          ))}
                        </motion.div>
                        <motion.div
                          className="flex justify-center items-center mt-4 gap-3"
                          variants={{
                            hidden: {},
                            visible: {
                              transition: {
                                staggerChildren: 0.2,
                                delayChildren: 0.6,
                              },
                            },
                          }}
                        >
                          <motion.div
                            className="text-center"
                            variants={itemVariants}
                          >
                            <div className="text-sm font-medium mb-1">
                              Estimasi Rating
                            </div>
                            <motion.div
                              className="h-16 w-16 rounded-full flex items-center justify-center bg-gradient-to-br from-quicktify-accent to-quicktify-primary text-xl font-bold"
                              variants={{
                                hidden: { scale: 0, rotate: -180 },
                                visible: {
                                  scale: 1,
                                  rotate: 0,
                                  transition: {
                                    type: 'spring' as const,
                                    stiffness: 150,
                                    damping: 10,
                                  },
                                },
                              }}
                            >
                              4.7
                            </motion.div>
                          </motion.div>
                          <motion.div
                            className="flex"
                            variants={{
                              hidden: {},
                              visible: {
                                transition: {
                                  staggerChildren: 0.1,
                                },
                              },
                            }}
                          >
                            {[1, 2, 3, 4, 5].map((star) => (
                              <motion.div
                                key={star}
                                className="text-yellow-400"
                                variants={{
                                  hidden: { opacity: 0, scale: 0 },
                                  visible: {
                                    opacity: 1,
                                    scale: 1,
                                    transition: {
                                      type: 'spring' as const,
                                      stiffness: 300,
                                      damping: 20,
                                    },
                                  },
                                }}
                              >
                                ★
                              </motion.div>
                            ))}
                          </motion.div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-quicktify-primary/30 overflow-hidden h-full">
              <div className="p-1 bg-gradient-to-r from-quicktify-primary to-quicktify-accent"></div>
              <CardContent className="pt-6">
                <motion.div
                  className="flex items-start gap-4"
                  variants={cardContentVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="bg-quicktify-primary/20 p-3 rounded-lg"
                    variants={iconVariants}
                  >
                    <Code className="h-6 w-6 text-quicktify-primary" />
                  </motion.div>
                  <div>
                    <motion.h3
                      className="text-xl font-semibold mb-3"
                      variants={textRevealVariants}
                    >
                      Ringkasan Insight Cerdas (didukung Gemini 2.0 Flash)
                    </motion.h3>
                    <motion.p
                      className="text-muted-foreground mb-4"
                      variants={textRevealVariants}
                    >
                      Dapatkan rangkuman dan insight cerdas dari semua temuan
                      analisis dan estimasi. Teknologi AI Gemini kami menyajikan
                      poin-poin penting dan rekomendasi actionable secara
                      otomatis.
                    </motion.p>
                    <motion.div
                      className="mt-4 bg-muted/50 rounded-lg p-4"
                      variants={itemVariants}
                    >
                      <motion.div
                        className="space-y-3"
                        variants={{
                          hidden: {},
                          visible: {
                            transition: {
                              staggerChildren: 0.2,
                              delayChildren: 0.3,
                            },
                          },
                        }}
                      >
                        {[1, 2, 3].map((item) => (
                          <motion.div
                            key={item}
                            className="flex items-center gap-2"
                            variants={spamItemVariants}
                          >
                            <motion.div
                              className="h-6 w-6 rounded-full bg-quicktify-accent/30 flex items-center justify-center"
                              variants={iconVariants}
                            >
                              <motion.div
                                className="h-3 w-3 rounded-full bg-quicktify-accent"
                                variants={pulseVariants}
                              />
                            </motion.div>
                            <motion.div
                              className="h-3 flex-1 bg-quicktify-primary/20 rounded animate-pulse"
                              variants={itemVariants}
                            />
                          </motion.div>
                        ))}
                        <motion.div
                          className="mt-2 p-2 border border-dashed border-quicktify-accent/40 rounded bg-quicktify-accent/10"
                          variants={{
                            hidden: { opacity: 0, scale: 0.9 },
                            visible: {
                              opacity: 1,
                              scale: 1,
                              transition: {
                                delay: 1,
                                duration: 0.5,
                              },
                            },
                          }}
                        >
                          <p className="text-xs text-center font-medium">
                            Rekomendasi Perbaikan Aplikasi
                          </p>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
