import type { Metadata } from 'next';

import { redditUrls } from '@/constants/redditUrls';
import RedditPostsList from '@/components/reddit/RedditPostsList';
import SubredditSelector from '@/components/reddit/Subreddits';
import { extractSubreddits } from '@/lib/utils';

export default async function HomePage() {
    try {
        // Server-side fetch for initial load
        const response = await fetch(`${redditUrls.popular}`, {
            next: { revalidate: 3600 },
        });

        const { data: { children } = {} } = await response.json();
        const subredditsData = extractSubreddits(children);

        return (
            <div className='mx-auto px-4 py-6 md:py-8 lg:px-8 lg:py-10'>
                <div className='flex flex-col gap-6 lg:flex-row'>
                    {/* Main content area - maximize width */}
                    <div className='w-full lg:w-3/5 xl:w-2/3'>
                        <RedditPostsList initialPosts={children} />
                    </div>

                    {/* Sidebar - guarantee wider size */}
                    <div className='w-full lg:sticky lg:top-20 lg:w-2/5 lg:self-start xl:w-1/3'>
                        <SubredditSelector subredditsData={subredditsData} />
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error fetching data:', error);
        return <div>Failed to load Reddit posts</div>;
    }
}

export const metadata: Metadata = {
    title: 'Home | Mini Reddit',
    description: 'Mini Reddit app',
};
