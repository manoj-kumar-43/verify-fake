import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/30 py-8 mt-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span className="font-display text-sm font-semibold">
              VERITAS<span className="text-primary">AI</span>
            </span>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground font-body">
              Built for students, journalists, researchers & the general public.
            </p>
            <p className="text-xs text-muted-foreground/60 font-body mt-1">
              ML Model: TF-IDF + Logistic Regression · Mock predictions for demo
            </p>
          </div>
          <p className="text-xs text-muted-foreground/40 font-display">
            © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
