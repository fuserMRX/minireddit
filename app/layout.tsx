import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { redhat } from '@/app/fonts';
import { StoreProvider } from '@/app/StoreProvider';
import '@/app/styles/globals.css';

export const metadata: Metadata = {
    title: 'Mini Reddit',
    description: 'Mini Reddit app'
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <StoreProvider>
            <html lang='en' suppressHydrationWarning>
                <head>
                    {/* Inline script to prevent theme flashing */}
                    {/* Suspense is used to prevent the hydration error inside Cypress tests */}
                    <Suspense>
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `
                                    (function() {
                                        function getThemePreference() {
                                            if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
                                                return localStorage.getItem('theme');
                                            }
                                            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                                        }
                                        
                                        const theme = getThemePreference();
                                        
                                        if (theme === 'dark') {
                                            document.documentElement.classList.add('dark');
                                        } else {
                                            document.documentElement.classList.remove('dark');
                                        }
                                        
                                        // Set a visual state to indicate theme is initialized
                                        document.documentElement.setAttribute('data-theme-initialized', 'true');
                                    })();
                                `,
                            }}
                        />
                    </Suspense>
                </head>
                <body
                    className={`${redhat.variable} antialiased`}
                >
                    {children}
                </body>
            </html>
        </StoreProvider>
    );
}
