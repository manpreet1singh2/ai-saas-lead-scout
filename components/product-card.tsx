import type { Product } from '@/lib/types';

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-soft">
      <div className="h-40 bg-gradient-to-br from-pine-200 via-pine-100 to-sand" />
      <div className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-pine-900">{product.name}</h3>
            <p className="mt-1 text-sm text-slate-500">{product.category}</p>
          </div>
          <span className="rounded-full bg-pine-50 px-3 py-1 text-xs font-semibold text-pine-700">{product.finish}</span>
        </div>
        <p className="text-sm leading-6 text-slate-600">{product.description}</p>
        <div className="flex flex-wrap gap-2 text-xs text-slate-500">
          {product.attributes.map((attribute) => (
            <span key={attribute} className="rounded-full bg-slate-100 px-3 py-1">{attribute}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
