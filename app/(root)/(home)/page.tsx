import type { Metadata } from 'next';

import { popularRedditUrl } from '@/constants/redditUrls';
import RedditPostsList from '@/components/reddit/RedditPostsList';
import Subreddits from '@/components/reddit/Subreddits';
import { extractSubreddits } from '@/lib/utils';
import { ErrorMessage } from '@/components/ErrorMessage';

export default async function HomePage() {
    try {
        // Server-side fetch for initial load
        const response = await fetch(`${popularRedditUrl.subredditUrl}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; MiniredditBot/1.0)',
                'Accept': 'application/json'
            },
            next: { revalidate: 3600 },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Non-OK response:', response.status, errorText);
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const { data: { children } = {} } = await response.json();
        const subredditsData = extractSubreddits(children);

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
                    onRetry={() => window.location.reload()}
                />
            </div>
        );
    }
}

export const metadata: Metadata = {
    title: 'Home | Mini Reddit',
    description: 'Mini Reddit app',
};
