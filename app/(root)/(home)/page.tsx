import type { Metadata } from 'next';

import { popularRedditUrl } from '@/constants/redditUrls';
import RedditPostsList from '@/components/reddit/RedditPostsList';
import Subreddits from '@/components/reddit/Subreddits';
import { extractSubreddits } from '@/lib/utils';
import { ErrorMessage } from '@/components/ErrorMessage';

export default async function HomePage() {
    try {
        // Get base URL with fallback for Vercel
        // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
        //                (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

        // Server-side fetch for initial load
        // const apiUrl = `${baseUrl}/api/redditMainFeed`;
        const apiUrl = 'https://old.reddit.com/r/popular.json';
        console.log('[HomePage] Fetching from:', apiUrl);

        const response = await fetch(apiUrl, {
            headers: {
                'User-Agent': 'reddit:MiniRedditApp:1.0 (by /u/Playful_Yak_1874)',
                'Accept': 'application/json',
            },
            next: { revalidate: 3600 },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('[HomePage] Non-OK response:', response.status, errorText);
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        console.log('[HomePage] API response received successfully');
        const responseData = await response.json();

        // Safely extract children from data
        const children = responseData?.data?.children || [];
        console.log('[HomePage] Found', children.length, 'posts');

        const subredditsData = extractSubreddits(children);
        console.log('[HomePage] Extracted', subredditsData.length, 'subreddits');

        // Add popular subreddit but without isActive property
        subredditsData.push({
            subredditId: popularRedditUrl.subredditId,
            subredditUrl: popularRedditUrl.subredditUrl
        });

        return (
            <div className='mx-auto px-4 py-6 md:py-8 lg:px-6 lg:py-10'>
                <div className='flex flex-col gap-6 lg:flex-row lg:gap-8 lg:justify-between'>
                    {/* Main content area - maximize width */}
                    <div className='w-full lg:w-3/5 xl:w-2/3 2xl:w-7/10'>
                        <RedditPostsList initialPosts={children} />
                    </div>

                    {/* Sidebar - guarantee wider size */}
                    <div className='w-full lg:w-2/5 xl:w-1/3 2xl:w-3/10 lg:sticky lg:top-20 lg:self-start'>
                        <Subreddits subredditsData={subredditsData} />
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error fetching data:', error);
        return (
            <div className='mx-auto max-w-3xl p-6 md:p-8'>
                <ErrorMessage
                    message="We couldn't load the Reddit posts at this time. Please try again later."
                />
            </div>
        );
    }
}

export const metadata: Metadata = {
    title: 'Home | Mini Reddit',
    description: 'Mini Reddit app',
};
