import { Geist, Geist_Mono, Monoton, Red_Hat_Mono } from 'next/font/google';

export const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

export const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const monoton = Monoton({
    weight: '400',
    variable: '--font-monoton',
    subsets: ['latin'],
});

export const redhat = Red_Hat_Mono({
    weight: '400',
    variable: '--font-redhat-mono',
    subsets: ['latin'],
});