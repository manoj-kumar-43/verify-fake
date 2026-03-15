import { PredictionResult } from "@/types/prediction";

const STORAGE_KEY = "fakenews_history";

export function getHistory(): PredictionResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw).map((item: any) => ({
      ...item,
      timestamp: new Date(item.timestamp),
    }));
  } catch {
    return [];
  }
}

export function saveToHistory(result: PredictionResult) {
  const history = getHistory();
  history.unshift(result);
  // Keep last 50
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 50)));
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
}
