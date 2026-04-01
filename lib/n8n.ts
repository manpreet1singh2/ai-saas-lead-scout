import type { QuoteRequest } from './types';

export async function sendQuoteToN8n(quote: QuoteRequest & { id: string; createdAt: string }) {
  const url = process.env.N8N_WEBHOOK_URL;
  if (!url) return { skipped: true };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(process.env.N8N_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.N8N_WEBHOOK_TOKEN}` } : {})
    },
    body: JSON.stringify({ quote })
  });

  if (!response.ok) {
    throw new Error(`n8n webhook failed with status ${response.status}`);
  }

  return { ok: true };
}
