import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text } = await req.json();

    if (!text || typeof text !== 'string' || text.trim().length < 10) {
      return new Response(
        JSON.stringify({ error: 'Text must be at least 10 characters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!apiKey) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-lite',
        messages: [
          {
            role: 'system',
            content: `You are a fake news detection expert. Analyze the given text and determine if it is likely "Real" or "Fake" news. Consider these factors:
- Sensationalist or clickbait language
- Unverifiable claims
- Emotional manipulation
- Lack of credible sources
- Logical inconsistencies
- Excessive capitalization or punctuation

Respond ONLY with valid JSON in this exact format:
{"prediction": "Real" or "Fake", "confidence": 0.0 to 1.0, "reasoning": "brief explanation"}

The confidence score should reflect how certain you are. Values closer to 1.0 mean higher certainty.`
          },
          {
            role: 'user',
            content: `Analyze this text for fake news:\n\n${text.trim()}`
          }
        ],
        temperature: 0.3,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', errorText);
      throw new Error(`AI Gateway returned ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('No response from AI model');
    }

    // Parse JSON from response (handle markdown code blocks)
    let cleaned = content.trim();
    if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
    }

    const result = JSON.parse(cleaned);

    return new Response(
      JSON.stringify({
        text: text.trim(),
        prediction: result.prediction === 'Fake' ? 'Fake' : 'Real',
        confidence: Math.max(0.05, Math.min(0.99, Number(result.confidence) || 0.5)),
        reasoning: result.reasoning || '',
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Predict error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to analyze text. Please try again.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
