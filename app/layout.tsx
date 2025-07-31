// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Header from './Navbar/page';
import { Prompt } from 'next/font/google';
import { MenuProvider } from './function/MenuContext';
import { AuthProvider } from './lib/auth-context';

const prompt = Prompt({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-prompt',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MyStore - Apple Clone',
  description: 'Apple inspired e-commerce store',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={prompt.variable}>
      <body className={prompt.className}>
        <AuthProvider>
          <MenuProvider>
            <Header />
            {children}
          </MenuProvider>
        </AuthProvider>
      </body>
    </html>
  );
}