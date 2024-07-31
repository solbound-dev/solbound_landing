import type { Metadata } from 'next';
import { IBM_Plex_Sans } from 'next/font/google';
import 'swiper/css';
import 'swiper/css/effect-fade';

import './globals.css';

const ibmPlexSans = IBM_Plex_Sans({ weight: ['300', '400', '600', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'solbound.dev',
  description: 'Launch your Solana journey',
  openGraph: {
    title: 'solbound.dev',
    description: 'Launch your Solana journey',
    images: ['assets/images/common/solbound.png'],
  },
  twitter: {
    title: 'solbound.dev',
    description: 'Launch your Solana journey',
    images: ['assets/images/common/solbound.png'],
  },
};

export interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<Readonly<RootLayoutProps>> = ({ children }) => {
  return (
    <html lang='en'>
      <body className={ibmPlexSans.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
