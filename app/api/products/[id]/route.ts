import { NextResponse } from 'next/server';
import { deleteProduct, updateProduct } from '@/lib/store';
import { productSchema } from '@/lib/validation';

export const runtime = 'nodejs';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await request.json();
  const parsed = productSchema.partial().safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const product = await updateProduct(id, parsed.data);
  return NextResponse.json({ product });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  await deleteProduct(id);
  return NextResponse.json({ ok: true });
}
