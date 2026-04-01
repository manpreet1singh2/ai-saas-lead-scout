"use client";

import { useRef, useState, type FormEvent, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import type { ProductRecommendation } from '@/lib/recommendations';

const priorities = ['Durability', 'Moisture', 'Finish', 'Budget', 'Appearance', 'Premium', 'Low-maintenance', 'Versatility'];

export function RecommendationTool() {
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<ProductRecommendation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>(['Durability', 'Moisture']);
  const formRef = useRef<HTMLFormElement | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      projectType: String(formData.get('projectType') ?? ''),
      category: String(formData.get('category') ?? ''),
      budget: String(formData.get('budget') ?? ''),
      finishPreference: String(formData.get('finishPreference') ?? ''),
      notes: String(formData.get('notes') ?? ''),
      priority: selectedPriorities
    };

    const response = await fetch('/api/recommendations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = (await response.json()) as { recommendations?: ProductRecommendation[]; source?: string; error?: string };
    setLoading(false);
    setSource(data.source ?? null);

    if (!response.ok && data.error) {
      setError(data.error);
      setRecommendations([]);
      return;
    }

    setRecommendations(data.recommendations ?? []);
  }

  function togglePriority(priority: string) {
    setSelectedPriorities((current) =>
      current.includes(priority) ? current.filter((item) => item !== priority) : [...current, priority]
    );
  }

  function applySample() {
    setSelectedPriorities(['Durability', 'Moisture']);
    const form = formRef.current;
    if (!form) return;

    const setValue = (name: string, value: string) => {
      const field = form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null;
      if (field) field.value = value;
    };

    setValue('projectType', 'Kitchen cabinets');
    setValue('category', 'Plywood');
    setValue('budget', '2500');
    setValue('finishPreference', 'BWP');
    setValue('notes', 'Need moisture resistance and long-term durability');
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <form ref={formRef} onSubmit={handleSubmit} className="rounded-3xl border border-white/70 bg-white p-6 shadow-soft">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-pine-600">Recommendation engine</p>
            <h3 className="mt-2 text-2xl font-semibold text-pine-900">Find the right sheet fast</h3>
          </div>
          <button
            type="button"
            onClick={applySample}
            className="rounded-full border border-pine-200 bg-pine-50 px-4 py-2 text-xs font-semibold text-pine-800 transition hover:border-pine-300"
          >
            Use sample
          </button>
        </div>

        <div className="grid gap-4">
          <Field label="Project type" name="projectType" placeholder="Kitchen cabinets, wardrobe, wall panel" />
          <Field label="Category" name="category" placeholder="Plywood, Veneers, Laminates" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Budget" name="budget" placeholder="2500" />
            <Field label="Finish preference" name="finishPreference" placeholder="BWP, Matte, Premium natural" />
          </div>
          <FieldArea
            label="Notes"
            name="notes"
            rows={4}
            placeholder="Moisture resistance, scratch resistance, premium look, commercial use"
          />

          <div>
            <span className="mb-2 block text-sm font-medium text-slate-700">Priorities</span>
            <div className="flex flex-wrap gap-2">
              {priorities.map((priority) => {
                const active = selectedPriorities.includes(priority);
                return (
                  <button
                    key={priority}
                    type="button"
                    onClick={() => togglePriority(priority)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition ${active ? 'bg-pine-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >
                    {priority}
                  </button>
                );
              })}
            </div>
          </div>

          <button disabled={loading} className="rounded-full bg-pine-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-pine-800 disabled:opacity-60">
            {loading ? 'Generating…' : 'Get recommendations'}
          </button>
          {source ? <p className="text-sm text-pine-700">Source: {source}</p> : null}
          {error ? <p className="text-sm text-rose-700">{error}</p> : null}
        </div>
      </form>

      <div className="space-y-4 rounded-3xl border border-white/70 bg-white p-6 shadow-soft">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-pine-600">Top matches</p>
          <h3 className="mt-2 text-2xl font-semibold text-pine-900">Recommended products</h3>
        </div>

        {recommendations.length ? (
          <div className="space-y-4">
            {recommendations.map((product) => (
              <article key={product.id} className="rounded-2xl border border-slate-100 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-semibold text-pine-900">{product.name}</h4>
                    <p className="text-sm text-slate-500">{product.category} · {product.finish}</p>
                  </div>
                  <span className="rounded-full bg-pine-50 px-3 py-1 text-xs font-semibold text-pine-700">
                    {product.score}/100
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{product.reason}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
                  {product.highlights.map((item) => (
                    <span key={item} className="rounded-full bg-slate-100 px-3 py-1">{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-sm leading-6 text-slate-500">
            Submit the form to generate product recommendations. The app will use OpenAI when the key is available, otherwise it falls back to a local scoring model.
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label>
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <input {...props} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-pine-400" />
    </label>
  );
}

function FieldArea({ label, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <label>
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <textarea {...props} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-pine-400" />
    </label>
  );
}
