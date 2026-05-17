import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import Navbar from '@components/layout/Navbar';
import Footer from '@components/layout/Footer';
import { ThemeProvider } from '@/context/ThemeContext';

export const metadata: Metadata = {
  title: 'AnimeStream - Watch Anime Online',
  description: 'Discover and stream thousands of anime titles with the best quality. Your ultimate anime streaming destination.',
  keywords: 'anime, streaming, watch anime, crunchyroll, netflix anime',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className="antialiased">
          <ThemeProvider>
            <div className="min-h-screen bg-background-dark">
              <Navbar />
              <main className="pt-16">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
