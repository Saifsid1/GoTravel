import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';

export const metadata: Metadata = {
  title: {
    default: 'GoTravel - Premium India Travel Experiences',
    template: '%s | GoTravel',
  },
  description: 'Discover incredible India with GoTravel. AI-powered itineraries, fully customizable FIT packages, and seamless booking. Expert-curated tours to Manali, Goa, Kerala, Rajasthan, Ladakh & more.',
  keywords: ['India travel', 'tour packages', 'FIT travel', 'Manali', 'Goa', 'Kerala', 'Rajasthan', 'Ladakh'],
  authors: [{ name: 'GoTravel' }],
  creator: 'GoTravel',
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: 'GoTravel',
    title: 'GoTravel - Premium India Travel Experiences',
    description: 'Discover incredible India with AI-powered travel planning',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'GoTravel' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GoTravel - Premium India Travel',
    description: 'AI-powered India travel packages',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

