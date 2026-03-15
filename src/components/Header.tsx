import { Shield, Zap } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b border-border/50 backdrop-blur-xl bg-background/80 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-lg font-bold tracking-tight">
              VERITAS<span className="text-primary">AI</span>
            </h1>
            <p className="text-xs text-muted-foreground font-body">Fake News Detection</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground font-display">
          <Zap className="w-3 h-3 text-primary" />
          <span>ML-Powered</span>
        </div>
      </div>
    </header>
  );
}
