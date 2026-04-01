import { NextResponse } from 'next/server';
import { quoteSchema } from '@/lib/validation';
import { sendQuoteToN8n } from '@/lib/n8n';
import { saveQuote } from '@/lib/store';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = quoteSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const quote = await saveQuote(parsed.data);
  await sendQuoteToN8n(quote);

  return NextResponse.json({ quote }, { status: 201 });
}
