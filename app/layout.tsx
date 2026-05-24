import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Legal Lead Generation Tool',
  description: 'Find B2B leads using public databases and open data sources',
  keywords: 'lead generation, business directory, B2B contacts',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-[1100px]">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
