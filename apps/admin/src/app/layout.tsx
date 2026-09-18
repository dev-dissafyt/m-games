import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AdminShell } from '@/components/admin-shell';

export const metadata: Metadata = {
  title: 'M-Games Admin HQ | Owner Dispatch & Lead Stream',
  description:
    'Executive dashboard for real-time lead calls, WhatsApp quotes, video ingress audits, and field dispatch approval.',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#10b981',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}
