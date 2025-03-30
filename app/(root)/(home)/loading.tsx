import React from 'react';
import RedditPostsListLoader from '@/components/reddit/RedditPostsListLoader';
import SubbredditsLoader from '@/components/reddit/SubbredditsLoader';

export default function HomePageLoading() {
    return (
        <div className='mx-auto px-4 py-6 md:py-8 lg:px-6 lg:py-10'>
            <div className='flex flex-col gap-6 lg:flex-row lg:gap-8 lg:justify-between'>
                {/* Main content area - Reddit posts loading skeletons */}
                <div className='w-full lg:w-3/5 xl:w-2/3 2xl:w-7/10'>
                    <RedditPostsListLoader />
                </div>

                {/* Sidebar - Subreddits loading skeleton */}
                <div className='w-full lg:w-2/5 xl:w-1/3 2xl:w-3/10 lg:sticky lg:top-20 lg:self-start'>
                    <SubbredditsLoader />
                </div>
            </div>
        </div>
    );
}
