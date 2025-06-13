
import { Footer } from "@/components/footer";
import { NavBar } from "@/components/nav-bar";

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar/>
      <main className="flex-1 py-12">
        <div className="container">
          <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Syarat dan Ketentuan Layanan Quicktify</h1>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Pendahuluan</h2>
              <p>
                Selamat datang di Quicktify. Syarat dan Ketentuan Layanan ini mengatur penggunaan Anda atas platform Quicktify, 
                termasuk semua fitur dan layanan yang disediakan melalui platform kami. Dengan mengakses atau menggunakan 
                layanan kami, Anda setuju untuk terikat oleh ketentuan ini. Jika Anda tidak setuju dengan salah satu ketentuan ini, 
                Anda tidak diperkenankan untuk menggunakan layanan kami.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Penggunaan Akun</h2>
              <p>
                Untuk menggunakan layanan Quicktify, Anda mungkin perlu membuat akun. Anda bertanggung jawab untuk menjaga 
                kerahasiaan kredensial akun Anda dan untuk semua aktivitas yang terjadi di bawah akun Anda. Kami berhak untuk 
                menonaktifkan akun apa pun jika kami menganggap bahwa Anda telah melanggar syarat-syarat ini.
              </p>
              <p>
                Anda harus berusia minimal 18 tahun atau usia yang sesuai dengan ketentuan hukum yang berlaku di wilayah 
                Anda untuk membuat akun dan menggunakan layanan kami.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Layanan yang Disediakan</h2>
              <p>
                Quicktify menyediakan platform analisis data untuk ulasan aplikasi di Google Play Store, yang mencakup:
              </p>
              <ul>
                <li>Analisis Sentimen dan Emosi: Mengkategorikan dan menganalisis sentimen dan emosi dari ulasan pengguna.</li>
                <li>Deteksi Spam & Tidak Relevan: Mengidentifikasi dan memfilter ulasan yang berpotensi spam dan tidak relevan.</li>
                <li>Estimasi Rating Aplikasi: Memperkirakan tren rating dan popularitas berdasarkan data historis.</li>
                <li>Ringkasan AI (dengan Gemini 2.0 Flash): Membuat ringkasan dan insight dari data analisis dan estimasi.</li>
              </ul>
              <p>
                Kami mengumpulkan data melalui API Google Play Store atau file CSV yang Anda unggah untuk analisis, dan metadata aplikasi dari input-input yang Anda berikan. 
                Semua fitur di atas tersedia sesuai dengan paket langganan Anda.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Batasan Penggunaan</h2>
              <p>
                Anda setuju untuk tidak:
              </p>
              <ul>
                <li>Menggunakan layanan kami untuk tujuan ilegal atau tidak sah.</li>
                <li>Merusak, menonaktifkan, membebani, atau mengganggu layanan kami.</li>
                <li>Melakukan scraping atau mengumpulkan data dari platform Quicktify tanpa izin tertulis.</li>
                <li>Mengupload virus atau kode berbahaya lainnya.</li>
                <li>Menyalahgunakan layanan kami dengan cara apapun yang dapat merugikan Quicktify atau pengguna lain.</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Pembayaran dan Langganan</h2>
              <p>
                Quicktify menawarkan uji coba gratis 30 hari dan layanan berbayar dengan sistem langganan. Dengan berlangganan, 
                Anda setuju untuk membayar biaya yang berlaku secara tepat waktu. Pembayaran diproses melalui penyedia 
                layanan pembayaran pihak ketiga.
              </p>
              <p>
                Anda dapat membatalkan langganan Anda kapan saja, tetapi tidak ada pengembalian dana untuk periode langganan 
                yang sedang berjalan. Setelah pembatalan, Anda masih dapat menggunakan layanan sampai akhir periode langganan 
                Anda saat ini.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Hak Kekayaan Intelektual</h2>
              <p>
                Platform Quicktify, termasuk semua konten, fitur, dan fungsionalitas, adalah milik Quicktify atau pemberi 
                lisensinya dan dilindungi oleh hukum kekayaan intelektual.
              </p>
              <p>
                Data yang Anda unggah dan hasil analisis yang dihasilkan dari data tersebut tetap menjadi milik Anda. 
                Namun, Anda memberikan Quicktify lisensi untuk menggunakan data tersebut secara anonim untuk tujuan 
                peningkatan layanan dan model AI kami.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Batasan Tanggung Jawab</h2>
              <p>
                Layanan Quicktify disediakan "sebagaimana adanya" dan "sebagaimana tersedia" tanpa jaminan apa pun, 
                baik tersurat maupun tersirat. Kami tidak menjamin bahwa layanan kami akan selalu aman, bebas dari kesalahan, 
                atau tersedia setiap saat.
              </p>
              <p>
                Meskipun kami berusaha memberikan analisis yang akurat, kami tidak dapat menjamin akurasi 100% dari hasil 
                analisis, terutama untuk prediksi yang bersifat estimasi. Keputusan yang Anda ambil berdasarkan analisis 
                tersebut sepenuhnya merupakan tanggung jawab Anda.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Privasi</h2>
              <p>
                Penggunaan informasi pribadi Anda diatur oleh Kebijakan Privasi kami, yang merupakan bagian dari 
                Syarat dan Ketentuan ini. Anda dapat melihat Kebijakan Privasi kami <a href="/privacy-policy" className="text-quicktify-primary hover:underline">di sini</a>.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Pengakhiran Layanan</h2>
              <p>
                Kami berhak untuk menangguhkan atau menghentikan akses Anda ke layanan kami tanpa pemberitahuan jika 
                Anda melanggar Syarat dan Ketentuan ini atau jika kami menganggap tindakan Anda dapat membahayakan platform kami 
                atau pengguna lain.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Perubahan Ketentuan</h2>
              <p>
                Kami berhak untuk mengubah Syarat dan Ketentuan ini dari waktu ke waktu. Perubahan substansial akan 
                diberitahukan kepada Anda melalui email atau notifikasi di platform. Penggunaan berkelanjutan Anda atas 
                layanan kami setelah perubahan tersebut merupakan penerimaan Anda atas ketentuan yang diperbarui.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">11. Hukum yang Berlaku dan Penyelesaian Sengketa</h2>
              <p>
                Syarat dan Ketentuan ini diatur oleh hukum Indonesia. Setiap sengketa yang timbul dari atau sehubungan dengan 
                penggunaan layanan kami akan diselesaikan melalui proses mediasi terlebih dahulu, dan jika tidak berhasil, 
                melalui arbitrase yang diselenggarakan di Jakarta, Indonesia.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">12. Informasi Kontak</h2>
              <p>
                Jika Anda memiliki pertanyaan atau masalah terkait Syarat dan Ketentuan ini, silakan hubungi kami di 
                support@quicktify.com.
              </p>
            </section>
            
            <p className="text-sm text-muted-foreground mt-12">
              Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
