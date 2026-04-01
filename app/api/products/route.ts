import { NextResponse } from 'next/server';
import { createProduct, listProducts } from '@/lib/store';
import { productSchema } from '@/lib/validation';

export const runtime = 'nodejs';

export async function GET() {
  const data = await listProducts();
  return NextResponse.json({ products: data });
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = productSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const product = await createProduct(parsed.data);
  return NextResponse.json({ product }, { status: 201 });
}
