import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { SoundscapeProvider } from '@/context/SoundscapeContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { Navbar } from '@/components/navigation/Navbar';
import { MobileBottomNav } from '@/components/navigation/MobileBottomNav';
import { Footer } from '@/components/navigation/Footer';
import { AmbientPlayer } from '@/components/soundscape/AmbientPlayer';
import { CartSheet } from '@/components/cart/CartSheet';
import { RazorpayModal } from '@/components/checkout/RazorpayModal';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { SteamLoader } from '@/components/ui/SteamLoader';
import { PageTransition } from '@/components/ui/PageTransition';
import { AIChatWidget } from '@/components/features/AIChatWidget';

export const metadata: Metadata = {
  metadataBase: new URL('https://brewhaven.cafe'),
  title: {
    default: 'Brew Haven — Where Every Cup Tells a Story | India’s Premier Specialty Roastery',
    template: '%s | Brew Haven Roastery India',
  },
  description: 'Experience India’s award-winning specialty coffee, interactive custom brew labs, rare micro-lot single origins, and flagship roasteries in Bengaluru, Mumbai, and New Delhi.',
  keywords: ['Specialty Coffee India', 'Brew Haven', 'Bengaluru Coffee', 'Kala Ghoda Roastery', 'Micro-lot Coffee', 'Table Booking India'],
  authors: [{ name: 'Brew Haven Master Roasters' }],
  creator: 'Brew Haven Roastery India',
  publisher: 'Brew Haven Specialty Cafe',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
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
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://brewhaven.cafe',
    siteName: 'Brew Haven Specialty Roastery India',
    title: 'Brew Haven — Where Every Cup Tells a Story',
    description: 'Experience India’s award-winning specialty coffee, interactive custom brew labs, rare micro-lot single origins, and flagship roasteries in Bengaluru, Mumbai, and New Delhi.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Brew Haven Specialty Coffee India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brew Haven — Specialty Coffee Showcase India',
    description: 'Where Every Cup Tells a Story.',
    site: '@brewhaven',
    creator: '@brewhaven',
    images: ['https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=1200&q=80'],
  },
};

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@type': 'CafeOrCoffeeShop',
  name: 'Brew Haven Specialty Roastery',
  image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=1200&q=80',
  '@id': 'https://brewhaven.cafe',
  url: 'https://brewhaven.cafe',
  telephone: '+91-98765-43210',
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '100ft Road, 12th Main, Indiranagar',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    postalCode: '560038',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 12.9784,
    longitude: 77.6408,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '07:00',
    closes: '23:00',
  },
  hasMenu: 'https://brewhaven.cafe/menu',
  servesCuisine: 'Specialty Coffee & French Pastries',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="bg-bg-primary text-txt-primary min-h-screen flex flex-col antialiased selection:bg-gold selection:text-soft-black pb-16 sm:pb-0">
        
        {/* Skip to main content accessibility link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[300] px-4 py-2 bg-gold text-soft-black font-bold text-xs rounded-lg shadow-lg"
        >
          Skip to Main Content
        </a>

        <ThemeProvider>
          <WishlistProvider>
            <CartProvider>
              <SoundscapeProvider>
                
                {/* First-Visit Session Steam Reveal Loader */}
                <SteamLoader />

                {/* Viewport Top Scroll Progress Bar */}
                <ScrollProgress />

                {/* Global Desktop & Tablet Navbar */}
                <Navbar />

                {/* Main Page Content with 350ms Page Transition */}
                <main id="main-content" className="flex-1">
                  <PageTransition>
                    {children}
                  </PageTransition>
                </main>

                {/* AI Roastery Concierge Chat Assistant */}
                <AIChatWidget />

                {/* Mobile Bottom Single-Thumb Navigation */}
                <MobileBottomNav />

                {/* Global Floating Components */}
                <AmbientPlayer />
                <CartSheet />
                <RazorpayModal />

                {/* Global Footer */}
                <Footer />

              </SoundscapeProvider>
            </CartProvider>
          </WishlistProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
