import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import {
  containerVariants,
  itemVariants,
  textRevealVariants,
} from '@/components/animated-section';

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.25, 0, 1],
    },
  },
};

export function ProblemSection() {
  return (
    <section className="py-16 bg-secondary/50">
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
            Kewalahan Menganalisis Ribuan Ulasan Secara Manual?
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground"
            variants={textRevealVariants}
          >
            Mayoritas pengembang aplikasi menghadapi tantangan yang sama dalam
            mengelola dan menganalisis feedback pengguna.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
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
          <motion.div variants={cardVariants}>
            <Card className="border-quicktify-primary/30 h-full">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">
                  Analisis Manual yang Melelahkan
                </h3>
                <p className="text-muted-foreground">
                  Apakah Anda kesulitan memahami sentimen pengguna dari ratusan
                  komentar setiap hari? Proses manual membutuhkan waktu
                  berjam-jam dan rentan terhadap kesalahan.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card className="border-quicktify-primary/30 h-full">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">
                  Ulasan Spam Merusak Data
                </h3>
                <p className="text-muted-foreground">
                  Bingung membedakan ulasan asli dan spam yang merusak reputasi
                  aplikasi Anda? Tanpa filter otomatis, analisis Anda bisa
                  menjadi tidak akurat.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card className="border-quicktify-primary/30 h-full">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">
                  Prediksi Performa Kompleks
                </h3>
                <p className="text-muted-foreground">
                  Ingin tahu bagaimana performa aplikasi Anda di masa depan
                  tanpa analisis yang rumit? Prediksi manual hampir mustahil
                  dilakukan tanpa AI.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
