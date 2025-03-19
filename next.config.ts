import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.redd.it',
            },
            {
                protocol: 'https',
                hostname: 'preview.redd.it',
            },
            {
                protocol: 'https',
                hostname: 'external-preview.redd.it',
            },
            {
                protocol: 'https',
                hostname: 'i.imgur.com',
            },
            {
                protocol: 'https',
                hostname: 'media.giphy.com',
            },
        ],
    },
    /* config options here */
    reactStrictMode: false,
};

export default nextConfig;
