import { useState, useCallback, useMemo } from "react";
import Header from "@/components/Header";
import HeroAnalyzer from "@/components/HeroAnalyzer";
import HistorySection from "@/components/HistorySection";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import Footer from "@/components/Footer";
import { getHistory } from "@/lib/history";
import { AnalyticsData, PredictionResult } from "@/types/prediction";

const Index = () => {
  const [history, setHistory] = useState<PredictionResult[]>(getHistory());

  const refreshHistory = useCallback(() => {
    setHistory(getHistory());
  }, []);

  const analytics: AnalyticsData = useMemo(() => {
    const total = history.length;
    const fakeCount = history.filter((h) => h.prediction === "Fake").length;
    const realCount = total - fakeCount;
    return {
      totalPredictions: total,
      fakeCount,
      realCount,
      fakePercentage: total ? Math.round((fakeCount / total) * 100) : 0,
      realPercentage: total ? Math.round((realCount / total) * 100) : 0,
    };
  }, [history]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroAnalyzer onNewPrediction={refreshHistory} />
        <AnalyticsDashboard data={analytics} />
        <HistorySection history={history} onClear={refreshHistory} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
