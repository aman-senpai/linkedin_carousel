import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css';

export const metadata = {
  title: 'LinkedIn Carousel Designer',
  description: 'Create stunning LinkedIn carousels with AI-powered content generation',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300" suppressHydrationWarning>
        <ThemeProvider>
          {children}
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
