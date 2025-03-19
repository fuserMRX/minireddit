import type { Metadata } from 'next';
import { redditUrls } from '@/constants/redditUrls';
import RedditPostsList from '@/components/reddit/RedditPostsList';
import SubredditSelector from '@/components/reddit/Subreddits';

export default async function HomePage() {
    try {
        // Server-side fetch for initial load
        const response = await fetch(`${redditUrls.popular}`, {
            next: { revalidate: 3600 },
        });

        const { data: { children } = {} } = await response.json();
        console.log(children);

        return (
            <div className='mx-auto flex w-full items-center justify-between max-sm:pt-10'>
                <RedditPostsList initialPosts={children} />
                <SubredditSelector />
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
