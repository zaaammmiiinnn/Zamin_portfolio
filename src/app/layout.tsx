import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import SmoothScroll from '@/components/SmoothScroll';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-mono',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Zamin Askari Rizvi | AI Systems Engineer & Full-Stack Architect',
    description: 'Cinematic developer portfolio of Zamin Askari Rizvi — Software Engineer & AI Developer specializing in autonomous agent workflows, deep learning pipelines, and full-stack systems.',
    keywords: ['Zamin Askari Rizvi', 'AI Engineer', 'Machine Learning', 'Full-Stack Developer', 'PyTorch', 'Autonomous Agents', 'Next.js'],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark" suppressHydrationWarning>
            <body
                className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen flex flex-col bg-[#050507] text-[#F5F5F7] overflow-x-hidden`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem={false}
                    forcedTheme="dark"
                    disableTransitionOnChange
                >
                    <SmoothScroll>
                        <div className="min-h-screen selection:bg-blue-600/30 selection:text-white">
                            <main>{children}</main>
                        </div>
                    </SmoothScroll>
                </ThemeProvider>
            </body>
        </html>
    );
}
