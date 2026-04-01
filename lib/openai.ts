import type { Product } from './types';
import type { ProductRecommendation, RecommendationPreferences } from './recommendations';

export async function recommendWithOpenAI(
  preferences: RecommendationPreferences,
  products: Product[]
): Promise<{ recommendations: ProductRecommendation[]; model?: string }> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured');
  }

  const model = process.env.OPENAI_MODEL ?? 'gpt-4o-mini';
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model,
      temperature: 0.3,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            'You are a product recommendation assistant for a plywood and interiors catalog. Return only valid JSON with a recommendations array of up to 3 items. Each item must include id, score (0-100), reason, and highlights (array of strings). Do not invent products. Choose only from the provided catalog.'
        },
        {
          role: 'user',
          content: JSON.stringify({ preferences, products })
        }
      ]
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OpenAI request failed with status ${response.status}: ${text}`);
  }

  const json = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> };
  const content = json.choices?.[0]?.message?.content ?? '{}';
  const parsed = JSON.parse(content) as { recommendations?: ProductRecommendation[] };

  const byId = new Map(products.map((product) => [product.id, product]));
  const recommendations = (parsed.recommendations ?? [])
    .map((item) => {
      const product = byId.get(item.id);
      if (!product) return null;
      return {
        ...product,
        score: Math.max(0, Math.min(100, Math.round(Number(item.score) || 0))),
        reason: String(item.reason ?? 'Recommended by OpenAI'),
        highlights: Array.isArray(item.highlights) ? item.highlights.map(String).slice(0, 6) : product.attributes
      };
    })
    .filter((item): item is ProductRecommendation => Boolean(item))
    .slice(0, 3);

  return { recommendations, model };
}
