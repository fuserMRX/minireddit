'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getAsyncSubredditInfo, selectActiveSubreddit } from '@/lib/redux/features/reddits/redditSlice';

interface SubredditSelectorProps {
    subredditsData: {
        subredditId: string;
        subredditUrl: string;
    }[];
}

// Color palette for subreddit buttons - background/text color pairs
const buttonColors = [
    'bg-blue-50 text-blue-700 hover:bg-blue-100',
    'bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
    'bg-amber-50 text-amber-700 hover:bg-amber-100',
    'bg-purple-50 text-purple-700 hover:bg-purple-100',
    'bg-rose-50 text-rose-700 hover:bg-rose-100',
    'bg-cyan-50 text-cyan-700 hover:bg-cyan-100',
    'bg-fuchsia-50 text-fuchsia-700 hover:bg-fuchsia-100',
    'bg-lime-50 text-lime-700 hover:bg-lime-100',
    'bg-indigo-50 text-indigo-700 hover:bg-indigo-100',
    'bg-orange-50 text-orange-700 hover:bg-orange-100',
];

const getGlowColor = (subredditId: string): string => {
    // Get the color key from the subreddit hash
    const hash = subredditId.split('').reduce((acc, char) => {
        return acc + char.charCodeAt(0);
    }, 0);

    const colorIndex = hash % buttonColors.length;

    // Return appropriate ring color based on button theme
    const ringColors = [
        'hover:ring-blue-300',
        'hover:ring-emerald-300',
        'hover:ring-amber-300',
        'hover:ring-purple-300',
        'hover:ring-rose-300',
        'hover:ring-cyan-300',
        'hover:ring-fuchsia-300',
        'hover:ring-lime-300',
        'hover:ring-indigo-300',
        'hover:ring-orange-300',
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

    return (
        <Card className='my-4 shadow-md transition-shadow duration-300 hover:shadow-lg'>
            <CardHeader className='bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-gray-800 dark:to-gray-900'>
                <CardTitle className='text-center text-xl'>
                    Popular Subreddits
                </CardTitle>
            </CardHeader>
            <CardContent className='p-4'>
                <div className='grid grid-cols-2 gap-2'>
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
                                        dispatch(getAsyncSubredditInfo(subreddit.subredditId));
                                    }
                                }}
                                className={`w-full justify-start px-3 ${colorClasses} transition-all
                                    duration-300 ease-in-out hover:shadow-[0_0_10px_rgba(0,0,0,0.1)]
                                    hover:ring-2 hover:ring-offset-1 ${glowColor} cursor-pointer
                                    ${isActive ? `ring-2 ring-offset-1 font-bold ${activeGlowColor}` : ''}`}
                                data-js-url={subreddit.subredditUrl}
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
