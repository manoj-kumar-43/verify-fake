import { useState } from "react";
import { Search, Loader2, AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { predictNews } from "@/lib/predict";
import { saveToHistory } from "@/lib/history";
import { PredictionResult } from "@/types/prediction";
import ResultCard from "@/components/ResultCard";

interface Props {
  onNewPrediction: () => void;
}

export default function HeroAnalyzer({ onNewPrediction }: Props) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const handleAnalyze = async () => {
    const trimmed = text.trim();
    if (!trimmed) {
      toast.error("Please enter some news text to analyze.");
      return;
    }
    if (trimmed.length < 10) {
      toast.error("Please enter at least 10 characters for a meaningful analysis.");
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      const prediction = await predictNews(trimmed);
      const fullResult: PredictionResult = {
        ...prediction,
        id: crypto.randomUUID(),
        timestamp: new Date(),
      };
      setResult(fullResult);
      saveToHistory(fullResult);
      onNewPrediction();
      toast.success("Analysis complete!");
    } catch {
      toast.error("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setText("");
    setResult(null);
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Hero text */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-display mb-6">
            <AlertTriangle className="w-3 h-3" />
            AI-POWERED DETECTION
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Detect Fake News
            <br />
            <span className="text-gradient-primary">in Seconds</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
            Paste any news article or headline and our ML model will analyze it for authenticity. 
            Powered by TF-IDF and Logistic Regression.
          </p>
        </div>

        {/* Input area */}
        <div className="glass-card p-6 md:p-8 glow-primary animate-scale-in" style={{ animationDelay: "0.2s" }}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste a news article, headline, or any text you want to verify..."
            className="w-full h-40 md:h-48 bg-secondary/50 border border-border/50 rounded-lg p-4 text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all font-body text-sm md:text-base"
            disabled={loading}
          />
          <div className="flex items-center justify-between mt-4">
            <span className="text-xs text-muted-foreground font-display">
              {text.length} characters
            </span>
            <Button
              onClick={handleAnalyze}
              disabled={loading || !text.trim()}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold px-8 py-3 text-sm tracking-wide transition-all duration-300 disabled:opacity-40"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ANALYZING...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  ANALYZE
                </>
              )}
            </Button>
            <Button
              onClick={handleRefresh}
              disabled={loading}
              variant="outline"
              className="font-display font-semibold px-6 py-3 text-sm tracking-wide border-border/50 hover:bg-secondary transition-all duration-300"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              REFRESH
            </Button>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className="mt-8 animate-slide-up">
            <ResultCard result={result} />
          </div>
        )}
      </div>
    </section>
  );
}
