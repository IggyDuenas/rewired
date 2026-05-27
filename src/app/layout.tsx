import type { Metadata } from 'next';
import { Syne, DM_Mono, Caveat } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const syne = Syne({
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  subsets: ['latin'],
  display: 'swap',
});

const dmMono = DM_Mono({
  weight: ['300', '400', '500'],
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});

const caveat = Caveat({
  weight: ['400', '600'],
  variable: '--font-caveat',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Rewire',
  description: 'Creative agency for ambitious brands.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmMono.variable} ${caveat.variable}`}>
      <body>
        <Navbar />
        <div
          style={{
            minHeight: '100vh',
            backgroundImage: 'radial-gradient(circle, #c8c6bc 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            backgroundColor: 'var(--bg)',
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
