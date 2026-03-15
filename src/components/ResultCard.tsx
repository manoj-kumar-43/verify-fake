import { CheckCircle2, XCircle, Copy } from "lucide-react";
import { PredictionResult } from "@/types/prediction";
import { toast } from "sonner";

interface Props {
  result: PredictionResult;
}

export default function ResultCard({ result }: Props) {
  const isFake = result.prediction === "Fake";
  const confidencePercent = Math.round(result.confidence * 100);

  const handleCopy = () => {
    const text = `VeritasAI Analysis\nPrediction: ${result.prediction}\nConfidence: ${confidencePercent}%\nText: "${result.text.slice(0, 100)}..."`;
    navigator.clipboard.writeText(text);
    toast.success("Result copied to clipboard!");
  };

  return (
    <div className={`glass-card p-6 md:p-8 ${isFake ? "glow-danger" : "glow-success"}`}>
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          {isFake ? (
            <div className="w-12 h-12 rounded-full bg-danger/10 border border-danger/30 flex items-center justify-center">
              <XCircle className="w-6 h-6 text-danger" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-success/10 border border-success/30 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-success" />
            </div>
          )}
          <div>
            <p className="text-xs text-muted-foreground font-display uppercase tracking-wider">Prediction</p>
            <h3 className={`font-display text-2xl font-bold ${isFake ? "text-danger" : "text-success"}`}>
              {result.prediction} News
            </h3>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>

      {/* Confidence bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-display text-muted-foreground uppercase tracking-wider">Confidence Score</span>
          <span className={`font-display font-bold text-lg ${isFake ? "text-danger" : "text-success"}`}>
            {confidencePercent}%
          </span>
        </div>
        <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-out ${isFake ? "bg-danger" : "bg-success"}`}
            style={{ width: `${confidencePercent}%` }}
          />
        </div>
      </div>

      {/* AI Reasoning */}
      {result.reasoning && (
        <div className="mt-4 p-3 bg-primary/5 border border-primary/10 rounded-lg">
          <p className="text-xs text-muted-foreground font-display mb-1 uppercase tracking-wider">AI Analysis</p>
          <p className="text-sm text-foreground/80 font-body">{result.reasoning}</p>
        </div>
      )}

      {/* Analyzed text preview */}
      <div className="mt-4 p-3 bg-secondary/50 rounded-lg">
        <p className="text-xs text-muted-foreground font-display mb-1 uppercase tracking-wider">Analyzed Text</p>
        <p className="text-sm text-foreground/80 font-body line-clamp-3">{result.text}</p>
      </div>
    </div>
  );
}
