import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Solbound',
  description: 'Solbound description',
};

export interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<Readonly<RootLayoutProps>> = ({ children }) => {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
