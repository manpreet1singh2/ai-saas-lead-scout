import { NextResponse } from 'next/server';
import { products } from '@/lib/mock-data';
import { scoreProducts, type RecommendationPreferences } from '@/lib/recommendations';
import { recommendWithOpenAI } from '@/lib/openai';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const preferences = (await request.json()) as RecommendationPreferences;

  if (!preferences || typeof preferences !== 'object') {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  try {
    const openAI = process.env.OPENAI_API_KEY ? await recommendWithOpenAI(preferences, products) : null;
    const recommendations = openAI?.recommendations?.length ? openAI.recommendations : scoreProducts(products, preferences);

    return NextResponse.json({
      recommendations,
      source: openAI?.recommendations?.length ? 'openai' : 'local',
      model: openAI?.model ?? null
    });
  } catch (error) {
    const recommendations = scoreProducts(products, preferences);
    return NextResponse.json(
      {
        recommendations,
        source: 'local-fallback',
        error: error instanceof Error ? error.message : 'Recommendation generation failed'
      },
      { status: 200 }
    );
  }
}
