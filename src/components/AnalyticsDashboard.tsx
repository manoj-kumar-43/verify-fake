import { BarChart3, TrendingUp, PieChart } from "lucide-react";
import { AnalyticsData } from "@/types/prediction";

interface Props {
  data: AnalyticsData;
}

export default function AnalyticsDashboard({ data }: Props) {
  if (data.totalPredictions === 0) return null;

  return (
    <section className="py-12 border-t border-border/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-4 h-4 text-primary" />
          <h3 className="font-display text-lg font-semibold tracking-tight">Analytics</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Total */}
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-xs font-display text-muted-foreground uppercase tracking-wider">Total Analyses</span>
            </div>
            <p className="font-display text-3xl font-bold text-foreground">{data.totalPredictions}</p>
          </div>

          {/* Real */}
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-2">
              <PieChart className="w-4 h-4 text-success" />
              <span className="text-xs font-display text-muted-foreground uppercase tracking-wider">Real News</span>
            </div>
            <p className="font-display text-3xl font-bold text-success">{data.realPercentage}%</p>
            <div className="w-full h-1.5 bg-secondary rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-success rounded-full transition-all duration-700" style={{ width: `${data.realPercentage}%` }} />
            </div>
          </div>

          {/* Fake */}
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-2">
              <PieChart className="w-4 h-4 text-danger" />
              <span className="text-xs font-display text-muted-foreground uppercase tracking-wider">Fake News</span>
            </div>
            <p className="font-display text-3xl font-bold text-danger">{data.fakePercentage}%</p>
            <div className="w-full h-1.5 bg-secondary rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-danger rounded-full transition-all duration-700" style={{ width: `${data.fakePercentage}%` }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
