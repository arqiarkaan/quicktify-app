
import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary/50 py-8 border-t">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Quicktify. All rights reserved.
            </p>
          </div>
          
          <div className="flex gap-6">
            <Link to="/terms-of-service" className="text-sm text-muted-foreground hover:text-quicktify-primary">
              Terms of Service
            </Link>
            <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-quicktify-primary">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
