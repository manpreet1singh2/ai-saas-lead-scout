import Link from 'next/link';
import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/mock-data';
import { QuoteForm } from '@/components/quote-form';
import { RecommendationTool } from '@/components/recommendation-tool';

export default function HomePage() {
  const featured = products.slice(0, 3);

  return (
    <div>
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-8">
        <div className="space-y-8">
          <div className="inline-flex rounded-full border border-pine-200 bg-white px-4 py-2 text-sm font-medium text-pine-700 shadow-sm">
            Premium plywood supply for residential and commercial projects
          </div>
          <div className="space-y-5">
            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-pine-900 sm:text-6xl">
              Build with reliable sheets, clean finishes, and fast quote response.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              Browse plywood, veneers, and laminates. Send a quote request in seconds, then manage your catalog from the admin dashboard.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/catalog" className="rounded-full bg-pine-700 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-pine-800">
              View catalog
            </Link>
            <Link href="#recommendations" className="rounded-full border border-pine-200 bg-white px-6 py-3 text-sm font-semibold text-pine-800 transition hover:border-pine-300">
              Try recommendations
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {['B2B pricing', 'Bulk availability', 'Quick dispatch'].map((item) => (
              <div key={item} className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-sm backdrop-blur">
                <p className="text-sm font-medium text-pine-700">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/60 bg-white p-6 shadow-soft">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-sand p-4">
              <p className="text-sm text-slate-500">Plywood</p>
              <p className="mt-2 text-2xl font-semibold text-pine-900">ISI Grade</p>
            </div>
            <div className="rounded-2xl bg-pine-50 p-4">
              <p className="text-sm text-slate-500">Veneers</p>
              <p className="mt-2 text-2xl font-semibold text-pine-900">Decorative</p>
            </div>
            <div className="rounded-2xl bg-pine-900 p-4 text-white">
              <p className="text-sm text-pine-100">Laminates</p>
              <p className="mt-2 text-2xl font-semibold">Modern textures</p>
            </div>
            <div className="rounded-2xl border border-pine-100 p-4">
              <p className="text-sm text-slate-500">Support</p>
              <p className="mt-2 text-2xl font-semibold text-pine-900">Quote first</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10 lg:px-8" id="catalog-preview">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-pine-600">Featured products</p>
            <h2 className="mt-2 text-3xl font-semibold text-pine-900">Catalog preview</h2>
          </div>
          <Link href="/catalog" className="text-sm font-semibold text-pine-700 hover:text-pine-900">
            Browse all products →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8" id="recommendations">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-pine-600">Task 1</p>
          <h2 className="mt-2 text-4xl font-semibold text-pine-900">React Product Recommendation System</h2>
          <p className="mt-4 text-slate-600">
            Describe the project, budget, and finish preferences to get the best plywood, veneer, or laminate matches. The app uses OpenAI when the API key is present and falls back to local ranking when it is not.
          </p>
        </div>
        <RecommendationTool />
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:px-8" id="quote">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-pine-600">Request a quote</p>
          <h2 className="text-3xl font-semibold text-pine-900">Tell us what you need, and we’ll route it to the n8n automation.</h2>
          <p className="text-slate-600">
            This skeleton posts quote requests to an n8n webhook endpoint and is ready to connect to a PostgreSQL-backed API.
          </p>
        </div>
        <QuoteForm />
      </section>
    </div>
  );
}
