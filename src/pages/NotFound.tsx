
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <div className="relative">
          <h1 className="text-9xl font-extrabold tracking-tighter text-quicktify-primary/20">404</h1>
          <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold">
            Halaman Tidak Ditemukan
          </p>
        </div>
        
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Maaf, kami tidak dapat menemukan halaman yang Anda cari. Halaman mungkin telah dipindahkan atau tidak ada lagi.
        </p>
        
        <Button asChild className="bg-quicktify-primary hover:bg-quicktify-secondary">
          <Link to="/">
            Kembali ke Halaman Utama
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
