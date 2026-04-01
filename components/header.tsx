import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/75 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="text-lg font-semibold text-pine-900">
          PineLine Plywood
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/catalog" className="hover:text-pine-800">Catalog</Link>
          <Link href="/admin" className="hover:text-pine-800">Admin</Link>
          <Link href="/#quote" className="rounded-full bg-pine-700 px-4 py-2 text-white hover:bg-pine-800">Request quote</Link>
        </nav>
      </div>
    </header>
  );
}
