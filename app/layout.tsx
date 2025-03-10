import React from 'react';
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
            <html lang='en'>
                <body
                    className={`${redhat.variable} antialiased`}
                >
                    {children}
                </body>
            </html>
        </StoreProvider>
    );
}
