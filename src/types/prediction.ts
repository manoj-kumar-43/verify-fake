export interface PredictionResult {
  id: string;
  text: string;
  prediction: "Real" | "Fake";
  confidence: number;
  reasoning?: string;
  timestamp: Date;
}

export interface AnalyticsData {
  totalPredictions: number;
  fakeCount: number;
  realCount: number;
  fakePercentage: number;
  realPercentage: number;
}
