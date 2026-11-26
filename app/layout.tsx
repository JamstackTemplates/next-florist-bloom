import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { ThemeProvider } from 'jamstacks';
import { ThemeScript } from 'jamstacks/server';
import '@fontsource/yeseva-one/latin-400.css';
import '@fontsource-variable/cabin/wdth.css';
import '@fontsource/nothing-you-could-do/latin-400.css';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import { RevealOnScroll } from '../components/reveal';
import { business } from '../content/business';
import { site } from '../lib/site';
import './tailwind.input.css';

const description = site.description || business.introduction;
const socialImage = site.url
  ? [{ url: `${site.url}/og.png`, width: 1200, height: 630, alt: `${business.name}: an armful of peonies in kraft paper with a same-day swing tag` }]
  : undefined;

export const metadata: Metadata = {
  title: { default: `${business.name} · Melbourne florist & same-day flowers`, template: `%s · ${business.name}` },
  description,
  ...(site.url ? { metadataBase: new URL(`${site.url}/`) } : {}),
  openGraph: { type: 'website', siteName: business.name, title: business.name, description, locale: 'en_AU', images: socialImage },
  twitter: { card: 'summary_large_image', title: business.name, description, images: socialImage?.map(i => i.url) },
};

export const viewport: Viewport = {
  themeColor: [{ media: '(prefers-color-scheme: light)', color: '#F8ECE7' }, { media: '(prefers-color-scheme: dark)', color: '#111A14' }],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en-AU" suppressHydrationWarning>
    <head><ThemeScript /></head>
    <body><ThemeProvider>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader /><main id="main" tabIndex={-1}>{children}</main><SiteFooter />
      <RevealOnScroll />
    </ThemeProvider></body>
  </html>;
}
