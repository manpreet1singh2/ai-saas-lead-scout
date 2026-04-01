import './globals.css';
import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'PineLine Plywood',
  description: 'Plywood, veneers, and laminates for builders, dealers, and interiors.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
