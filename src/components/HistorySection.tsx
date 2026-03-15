import { Clock, Trash2, CheckCircle2, XCircle } from "lucide-react";
import { PredictionResult } from "@/types/prediction";
import { clearHistory } from "@/lib/history";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { format } from "date-fns";

interface Props {
  history: PredictionResult[];
  onClear: () => void;
}

export default function HistorySection({ history, onClear }: Props) {
  if (history.length === 0) return null;

  const handleClear = () => {
    clearHistory();
    onClear();
    toast.success("History cleared");
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <h3 className="font-display text-lg font-semibold tracking-tight">Recent Analyses</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="text-xs text-muted-foreground hover:text-danger font-display"
          >
            <Trash2 className="w-3 h-3 mr-1" />
            Clear
          </Button>
        </div>
        <div className="space-y-3">
          {history.slice(0, 10).map((item) => (
            <div
              key={item.id}
              className="glass-card p-4 flex items-center gap-4 hover:border-primary/20 transition-colors"
            >
              {item.prediction === "Fake" ? (
                <XCircle className="w-5 h-5 text-danger shrink-0" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-body truncate text-foreground/80">{item.text}</p>
                <p className="text-xs text-muted-foreground font-display mt-1">
                  {format(item.timestamp, "MMM d, yyyy · h:mm a")} · {Math.round(item.confidence * 100)}% confidence
                </p>
              </div>
              <span
                className={`text-xs font-display font-semibold px-2 py-1 rounded-md ${
                  item.prediction === "Fake"
                    ? "bg-danger/10 text-danger"
                    : "bg-success/10 text-success"
                }`}
              >
                {item.prediction}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
