import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/mock-data';

export default function CatalogPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-pine-600">Product catalog</p>
        <h1 className="mt-2 text-4xl font-semibold text-pine-900">Plywood, veneers, and laminates</h1>
        <p className="mt-4 text-slate-600">Initial catalog skeleton with category filters ready for backend data.</p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
