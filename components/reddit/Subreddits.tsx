'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    getAsyncSubredditInfo,
    selectActiveSubreddit,
    selectSubredditStatus,
    setSubredditStatus
} from '@/lib/redux/features/reddits/redditSlice';

import SubbredditsLoader from '@/components/reddit/SubbredditsLoader';

interface SubredditSelectorProps {
    subredditsData: {
        subredditId: string;
        subredditUrl: string;
    }[];
}

// Color palette for subreddit buttons - background/text color pairs
const buttonColors = [
    'bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/50',
    'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 dark:hover:bg-emerald-800/50',
    'bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-800/50',
    'bg-purple-50 text-purple-700 hover:bg-purple-100 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-800/50',
    'bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-900/30 dark:text-rose-300 dark:hover:bg-rose-800/50',
    'bg-cyan-50 text-cyan-700 hover:bg-cyan-100 dark:bg-cyan-900/30 dark:text-cyan-300 dark:hover:bg-cyan-800/50',
    'bg-fuchsia-50 text-fuchsia-700 hover:bg-fuchsia-100 dark:bg-fuchsia-900/30 dark:text-fuchsia-300 dark:hover:bg-fuchsia-800/50',
    'bg-lime-50 text-lime-700 hover:bg-lime-100 dark:bg-lime-900/30 dark:text-lime-300 dark:hover:bg-lime-800/50',
    'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-800/50',
    'bg-orange-50 text-orange-700 hover:bg-orange-100 dark:bg-orange-900/30 dark:text-orange-300 dark:hover:bg-orange-800/50',
];

const getGlowColor = (subredditId: string): string => {
    // Get the color key from the subreddit hash
    const hash = subredditId.split('').reduce((acc, char) => {
        return acc + char.charCodeAt(0);
    }, 0);

    const colorIndex = hash % buttonColors.length;

    // Return appropriate ring color based on button theme
    const ringColors = [
        'hover:ring-blue-300 dark:hover:ring-blue-500',
        'hover:ring-emerald-300 dark:hover:ring-emerald-500',
        'hover:ring-amber-300 dark:hover:ring-amber-500',
        'hover:ring-purple-300 dark:hover:ring-purple-500',
        'hover:ring-rose-300 dark:hover:ring-rose-500',
        'hover:ring-cyan-300 dark:hover:ring-cyan-500',
        'hover:ring-fuchsia-300 dark:hover:ring-fuchsia-500',
        'hover:ring-lime-300 dark:hover:ring-lime-500',
        'hover:ring-indigo-300 dark:hover:ring-indigo-500',
        'hover:ring-orange-300 dark:hover:ring-orange-500',
    ];

    return ringColors[colorIndex];
};

// Get consistent color for a subreddit
const getSubredditColor = (subredditId: string): string => {
    // Simple hash function to get a consistent number from a string
    const hash = subredditId.split('').reduce((acc, char) => {
        return acc + char.charCodeAt(0);
    }, 0);

    // Use the hash to pick a color from our palette
    return buttonColors[hash % buttonColors.length];
};

const Subreddits = ({ subredditsData }: SubredditSelectorProps) => {
    const dispatch = useAppDispatch();
    const activeSubreddit = useAppSelector(selectActiveSubreddit);
    const subredditStatus = useAppSelector(selectSubredditStatus);

    // Show loading skeleton when subreddit is being loaded
    if (subredditStatus === 'loading') {
        return (
            <SubbredditsLoader />
        );
    }

    return (
        <Card className='my-4 shadow-md transition-shadow duration-300 hover:shadow-lg bg-card' data-testid="subreddits-section">
            <CardHeader className='bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 pb-2 sm:pb-3'>
                <CardTitle className='text-center text-lg sm:text-xl md:text-2xl'>
                    Popular Subreddits
                </CardTitle>
            </CardHeader>
            <CardContent className='p-3 sm:p-4 md:p-5'>
                <div className='grid grid-cols-2 gap-2 md:gap-3 xl:gap-4'>
                    {subredditsData.map((subreddit) => {
                        const colorClasses = getSubredditColor(
                            subreddit.subredditId
                        );
                        const glowColor = getGlowColor(subreddit.subredditId);
                        const activeGlowColor = glowColor.replace('hover:', '');
                        const isActive = subreddit.subredditId === activeSubreddit;

                        return (
                            <Button
                                key={subreddit.subredditId}
                                variant='outline'
                                size='sm'
                                onClick={() => {
                                    if (!isActive) {
                                        // First set the loading status to show the skeleton
                                        dispatch(setSubredditStatus('loading'));
                                        // Then fetch the data
                                        dispatch(getAsyncSubredditInfo(subreddit.subredditId));
                                    }
                                }}
                                className={`w-full justify-start px-2 sm:px-3 ${colorClasses} transition-all
                                    duration-300 ease-in-out hover:shadow-[0_0_10px_rgba(0,0,0,0.1)]
                                    hover:ring-2 hover:ring-offset-1 ${glowColor} cursor-pointer
                                    ${isActive ? `ring-2 ring-offset-1 font-bold ${activeGlowColor}` : ''}
                                    text-xs sm:text-sm md:text-base py-1.5 sm:py-2 md:py-2.5 h-auto`}
                                data-js-url={subreddit.subredditUrl}
                                data-testid="subreddit-button"
                            >
                                <span className='block w-full truncate'>
                                    {subreddit.subredditId}
                                </span>
                            </Button>
                        );
                    })}
                    {subredditsData.length === 0 && (
                        <p className='col-span-full text-center text-gray-500'>
                            No subreddits available
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default Subreddits;
