"use client";

import { useState, type FormEvent, type InputHTMLAttributes } from 'react';

export function QuoteForm() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      company: String(formData.get('company') ?? ''),
      category: String(formData.get('category') ?? 'Plywood'),
      quantity: Number(formData.get('quantity') ?? 1),
      notes: String(formData.get('notes') ?? '')
    };

    const response = await fetch('/api/quotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    setLoading(false);
    setStatus(response.ok ? 'Quote request sent.' : 'Could not send quote request.');
    if (response.ok) {
      event.currentTarget.reset();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-white/70 bg-white p-6 shadow-soft">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" placeholder="Dimple Singh" />
        <Field label="Email" name="email" type="email" placeholder="dimple@example.com" />
        <Field label="Phone" name="phone" placeholder="+91 9XXXXXXXXX" />
        <Field label="Company" name="company" placeholder="Business name" />
        <Field label="Category" name="category" placeholder="Plywood" />
        <Field label="Quantity" name="quantity" type="number" placeholder="50" />
      </div>
      <label className="mt-4 block">
        <span className="mb-2 block text-sm font-medium text-slate-700">Notes</span>
        <textarea name="notes" rows={4} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-pine-400" placeholder="Thickness, grade, delivery city, and timing" />
      </label>
      <button disabled={loading} className="mt-5 rounded-full bg-pine-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-pine-800 disabled:opacity-60">
        {loading ? 'Sending…' : 'Send quote request'}
      </button>
      {status ? <p className="mt-4 text-sm text-pine-700">{status}</p> : null}
    </form>
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
