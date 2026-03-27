import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
    title: 'Zamin Askari Rizvi | Portfolio',
    description: 'Software Engineer and AI Developer — Building intelligent systems that feel alive.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark" suppressHydrationWarning>
            <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col bg-[#050505]`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem={false}
                    forcedTheme="dark"
                    disableTransitionOnChange
                >
                    <div className="flex flex-col min-h-screen">
                        <main className="flex-grow">{children}</main>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}

