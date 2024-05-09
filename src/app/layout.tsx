import type { Metadata } from 'next';
import { IBM_Plex_Sans } from 'next/font/google';

import './globals.css';
import Head from 'next/head';

const ibmPlexSans = IBM_Plex_Sans({ weight: ['400', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Solbound',
  description: 'Navigate the Web3 cosmos with us',
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
