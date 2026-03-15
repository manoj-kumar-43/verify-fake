import { supabase } from "@/integrations/supabase/client";
import { PredictionResult } from "@/types/prediction";

export async function predictNews(text: string): Promise<Omit<PredictionResult, "id" | "timestamp"> & { reasoning?: string }> {
  const { data, error } = await supabase.functions.invoke('predict', {
    body: { text },
  });

  if (error) {
    console.error('Prediction error:', error);
    throw new Error('Failed to analyze text');
  }

  if (data.error) {
    throw new Error(data.error);
  }

  return {
    text: data.text,
    prediction: data.prediction,
    confidence: data.confidence,
    reasoning: data.reasoning,
  };
}
