import siteMetadata from '@/data/siteMetadata';
import { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import { ThemeProviders } from './theme-providers';

import '../css/tailwind.css';
import '../css/card.scss';
import '../css/globals.scss';
import Footer from '@/components/Footer';
import SectionContainer from '@/components/SectionContainer';
import { Analytics, AnalyticsConfig } from 'pliny/analytics';
import { SearchProvider, SearchConfig } from 'pliny/search';
import ScrollToTop from '@/components/helper/scroll-to-top';
import Navbar from '@/components/navbar';
import Header from '@/components/Header';

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang={siteMetadata.language}
      className={`${space_grotesk.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="/static/favicons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/static/favicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/static/favicons/favicon-16x16.png"
      />
      <link rel="manifest" href="/static/favicons/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/static/favicons/safari-pinned-tab.svg"
        color="#5bbad5"
      />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: light)"
        content="#fff"
      />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: dark)"
        content="#000"
      />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <body className="bg-white text-black antialiased dark:bg-gray-950 dark:text-white">
        <ThemeProviders>
          <Analytics
            analyticsConfig={siteMetadata.analytics as AnalyticsConfig}
          />
          <SectionContainer>
            <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
              <main className="relative mx-auto min-h-screen px-6 text-white sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem]">
                <Header />
                {children}
                <ScrollToTop />
              </main>
              <Footer />
            </SearchProvider>
          </SectionContainer>
        </ThemeProviders>
      </body>
    </html>
  );
}
