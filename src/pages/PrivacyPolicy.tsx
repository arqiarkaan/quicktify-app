
import { Footer } from "@/components/footer";
import { NavBar } from "@/components/nav-bar";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar/>
      <main className="flex-1 py-12">
        <div className="container">
          <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Kebijakan Privasi Quicktify</h1>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Pendahuluan</h2>
              <p>
                Di Quicktify, kami memahami pentingnya privasi data Anda dan berkomitmen untuk melindunginya. 
                Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi 
                informasi pribadi Anda ketika Anda menggunakan platform kami.
              </p>
              <p>
                Dengan menggunakan layanan Quicktify, Anda menyetujui praktik yang dijelaskan dalam 
                Kebijakan Privasi ini. Jika Anda tidak setuju dengan kebijakan ini, harap jangan gunakan layanan kami.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Data yang Dikumpulkan</h2>
              <h3 className="text-xl font-semibold mb-2">2.1 Data Akun</h3>
              <p>
                Ketika Anda membuat akun Quicktify, kami mengumpulkan informasi berikut:
              </p>
              <ul>
                <li>Nama lengkap</li>
                <li>Alamat email</li>
                <li>Informasi pembayaran (diproses melalui Stripe, kami tidak menyimpan detail kartu kredit Anda)</li>
                <li>Perusahaan atau organisasi (jika berlaku)</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-2">2.2 Data Penggunaan</h3>
              <p>
                Saat Anda menggunakan layanan kami, kami mengumpulkan:
              </p>
              <ul>
                <li>Log aktivitas di platform</li>
                <li>App Id aplikasi Google Play Store yang Anda analisis</li>
                <li>File CSV ulasan yang Anda unggah untuk analisis</li>
                <li>Hasil analisis yang dihasilkan dari data Anda</li>
                <li>Hasil estimasi rating aplikasi yang dihasilkan dari data Anda</li>
                <li>Hasil ringkasan AI yang dihasilkan dari data Anda</li>
                <li>Preferensi dan pengaturan akun Anda</li>
                <li>Metadata aplikasi yang Anda masukkan untuk analisis</li>
                <li>Hasil deteksi spam dan tidak relevan yang dihasilkan dari data Anda</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-2">2.3 Cookies dan Teknologi Pelacakan</h3>
              <p>
                Kami menggunakan cookies dan teknologi serupa untuk mengumpulkan informasi tentang bagaimana Anda berinteraksi 
                dengan layanan kami. Informasi ini membantu kami meningkatkan pengalaman pengguna dan kinerja platform.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Bagaimana Data Digunakan</h2>
              <p>
                Kami menggunakan data yang dikumpulkan untuk:
              </p>
              <ul>
                <li>Menyediakan dan memelihara layanan Quicktify</li>
                <li>Memproses pembayaran dan mengelola langganan Anda</li>
                <li>Berkomunikasi dengan Anda mengenai akun, pembaruan layanan, atau dukungan teknis</li>
                <li>Menganalisis penggunaan layanan untuk meningkatkan platform dan model AI kami</li>
                <li>Mempersonalisasi pengalaman Anda (misalnya, menyimpan histori analisis)</li>
                <li>Mencegah aktivitas penipuan dan melindungi keamanan platform</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Berbagi Data</h2>
              <p>
                Kami mungkin berbagi data Anda dengan:
              </p>
              <ul>
                <li>
                  <strong>Penyedia Layanan Pihak Ketiga:</strong> Kami bekerja sama dengan perusahaan dan individu untuk 
                  memfasilitasi layanan kami (seperti Clerk untuk autentikasi, Convex untuk database, Stripe untuk pemrosesan 
                  pembayaran, dan Gemini API untuk analisis AI).
                </li>
                <li>
                  <strong>Pemenuhan Kewajiban Hukum:</strong> Kami dapat mengungkapkan data Anda jika diwajibkan oleh 
                  hukum atau dalam menanggapi permintaan yang sah dari otoritas publik.
                </li>
              </ul>
              <p>
                <strong>Kami tidak akan menjual data pribadi Anda kepada pihak ketiga untuk tujuan pemasaran.</strong>
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Keamanan Data</h2>
              <p>
                Kami mengimplementasikan langkah-langkah keamanan yang tepat untuk melindungi data Anda dari akses 
                yang tidak sah, perubahan, pengungkapan, atau penghapusan yang tidak sah. Langkah-langkah ini meliputi:
              </p>
              <ul>
                <li>Enkripsi data dalam transit dan saat istirahat</li>
                <li>Kontrol akses ketat untuk sistem dan database kami</li>
                <li>Pemantauan keamanan reguler dan audit sistem</li>
                <li>Pelatihan keamanan untuk karyawan kami</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Penyimpanan Data</h2>
              <p>
                Kami menyimpan data Anda selama diperlukan untuk tujuan yang dijelaskan dalam Kebijakan Privasi ini, kecuali 
                jika periode retensi yang lebih lama disyaratkan atau diizinkan oleh hukum.
              </p>
              <ul>
                <li>Data analisis historis disimpan selama masa langganan Anda aktif</li>
                <li>Data akun disimpan selama Anda mempertahankan akun aktif dengan layanan kami</li>
              </ul>
              <p>
                Setelah Anda menghapus akun Anda, kami akan menghapus atau menganonimkan data Anda dalam periode yang wajar, 
                kecuali jika kami diharuskan untuk menyimpannya oleh hukum yang berlaku.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Hak Pengguna</h2>
              <p>
                Tergantung pada lokasi Anda, Anda mungkin memiliki hak tertentu terkait data pribadi Anda, termasuk:
              </p>
              <ul>
                <li>Akses ke data pribadi yang kami simpan tentang Anda</li>
                <li>Koreksi data yang tidak akurat</li>
                <li>Penghapusan data Anda (dengan batasan tertentu)</li>
                <li>Pembatasan atau keberatan atas pengolahan data Anda</li>
                <li>Portabilitas data Anda</li>
              </ul>
              <p>
                Untuk menggunakan hak-hak ini, silakan hubungi kami di privacy@quicktify.com.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Privasi Anak-Anak</h2>
              <p>
                Layanan kami tidak ditujukan untuk anak di bawah usia 18 tahun, dan kami tidak dengan sengaja mengumpulkan 
                informasi pribadi dari anak-anak di bawah 18 tahun. Jika Anda mengetahui bahwa anak telah memberikan 
                kami informasi pribadi tanpa persetujuan orang tua, silakan hubungi kami untuk menghapus informasi tersebut.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Perubahan Kebijakan Privasi</h2>
              <p>
                Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu untuk mencerminkan perubahan dalam praktik 
                informasi kami. Kami akan memberi tahu Anda tentang perubahan signifikan dengan memposting pemberitahuan 
                yang jelas di platform kami atau mengirimkan email ke alamat yang terdaftar.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Informasi Kontak</h2>
              <p>
                Jika Anda memiliki pertanyaan, kekhawatiran, atau permintaan terkait data Anda atau Kebijakan Privasi kami, 
                silakan hubungi:
              </p>
              <p>
                Tim Privasi Quicktify<br />
                Email: privacy@quicktify.com
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

export default PrivacyPolicy;
