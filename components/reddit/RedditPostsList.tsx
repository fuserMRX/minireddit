'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { useAppSelector } from '@/lib/redux/hooks';
import Image from 'next/image';
import { CircleChevronUp } from 'lucide-react';
import { CircleChevronDown } from 'lucide-react';

import {
    selectReddits,
    selectStatus,
} from '@/lib/redux/features/reddits/redditSlice';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getTimestamp, formatLargeNumber } from '@/lib/utils';
import type { RedditItem } from '@/lib/redux/features/reddits/redditSlice';

interface RedditPostsListProps {
    initialPosts: RedditItem[];
}

// Helper function to render the appropriate media
const renderMedia = (post: RedditItem) => {
    // Handle video posts
    if (post.data.is_video) {
        const { media: { reddit_video: { fallback_url } = {} } = {} } =
            post.data;

        return (
            <video
                className='h-full w-full rounded-md'
                controls
                autoPlay
                muted
                preload='metadata'
                poster={
                    post.data.thumbnail && post.data.thumbnail !== 'self'
                        ? post.data.thumbnail
                        : undefined
                }
            >
                <source src={fallback_url} type='video/mp4' />
                Your browser does not support the video tag.
            </video>
        );
    }

    // Check for image posts - ensure URL is not a Reddit video link
    else if (
        post.data.url &&
        post.data.url.match(/\.(jpeg|jpg|gif|png|webp)$/)
    ) {
        return (
            <Image
                src={`/api/imageProxy?url=${encodeURIComponent(post.data.url)}`}
                alt='Reddit post image'
                fill={true}
                className='rounded-md object-contain'
                sizes='(max-width: 768px) 100vw, 700px'
                onError={(e) => {
                    // Hide the image element if it fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                }}
            />
        );
    } else {
        return null;
    }
};

export default function RedditPostsList({
    initialPosts,
}: RedditPostsListProps) {
    const [usingReduxData, setUsingReduxData] = useState(false);
    const [votes, setVotes] = useState<Record<string, { upvoted: boolean; downvoted: boolean }>>({});

    const redditPosts = useAppSelector(selectReddits);
    const loadingStatus = useAppSelector(selectStatus);
    const postsToDisplay = usingReduxData ? redditPosts : initialPosts;

    useEffect(() => {
        if (redditPosts.length > 0) {
            setUsingReduxData(true);
        }
    }, [redditPosts]);

    if (usingReduxData && loadingStatus === 'loading') {
        return <div>Loading subreddit posts...</div>;
    }

    // Handle voting with proper state management
    const handleVoting = (postId: string, voteType: 'upvote' | 'downvote') => {
        setVotes((prev) => {
            const postVotes = prev[postId] || {
                upvoted: false,
                downvoted: false,
            };

            if (voteType === 'upvote') {
                return {
                    ...prev,
                    [postId]: {
                        upvoted: !postVotes.upvoted,
                        downvoted: false,
                    },
                };
            } else {
                // Toggle downvote, remove upvote if present
                return {
                    ...prev,
                    [postId]: {
                        upvoted: false,
                        downvoted: !postVotes.downvoted,
                    },
                };
            }
        });

        // Here you would make your DB call to update vote count
    };

    return (
        <div className='space-y-6'>
            {postsToDisplay.map((post) => {
                const postId = post.data.id;
                const voteState = votes[postId] || {
                    upvoted: false,
                    downvoted: false,
                };

                return (
                    <Card
                        key={postId}
                        className='my-4 w-full sm:max-w-2xl md:max-w-5xl'
                    >
                        <CardHeader className='relative flex flex-row items-center justify-between px-6'>
                            <div className='flex flex-col items-center gap-4 rounded-md bg-black/5 px-2 py-1 text-sm font-medium'>
                                <CircleChevronUp
                                    onClick={() => handleVoting(postId, 'upvote')}
                                    name='upvote'
                                    className={`h-6 w-6 cursor-pointer ${
                                        voteState.upvoted ? 'text-green-500' : 'text-accent-foreground'
                                    }`}
                                />
                                <span>
                                    {formatLargeNumber(post.data.score)}
                                </span>
                                <CircleChevronDown
                                    onClick={() => handleVoting(postId, 'downvote')}
                                    name='downvote'
                                    className={`h-6 w-6 cursor-pointer ${
                                        voteState.downvoted ? 'text-red-500' : 'text-accent-foreground'
                                    }`}
                                />
                            </div>

                            <CardTitle className='mx-4 flex-1 text-center'>
                                {post.data.title}
                            </CardTitle>
                        </CardHeader>

                        <CardContent className='relative'>
                            {post.data.selftext ? (
                                <div className='mb-4 max-h-60 overflow-y-auto text-center'>
                                    <p>{post.data.selftext}</p>
                                </div>
                            ) : null}

                            <div className='relative aspect-[16/9] [&:empty]:hidden'>
                                {renderMedia(post)}
                            </div>
                        </CardContent>

                        <CardFooter className='flex flex-col items-start gap-4 px-4 sm:flex-row sm:items-center sm:justify-between'>
                            <div className='flex w-full items-center justify-center gap-2 sm:w-auto'>
                                <Avatar>
                                    <AvatarImage
                                        src={`https://robohash.org/randomSeed${post.data.id}`}
                                    />
                                    <AvatarFallback>
                                        {post.data.author}
                                    </AvatarFallback>
                                </Avatar>
                                <span className='text-accent-foreground font-medium'>
                                    {post.data.author}
                                </span>

                                <p className='text-muted-foreground ml-2 text-sm'>
                                    in{' '}
                                    <span className='text-cyan-500'>
                                        {post.data.subreddit}
                                    </span>
                                </p>
                            </div>

                            <div className='flex w-full justify-between gap-4 border-t pt-2 text-sm sm:w-auto sm:justify-end sm:border-0 sm:pt-0'>
                                <span>
                                    {getTimestamp(
                                        new Date(post.data.created_utc * 1000)
                                    )}
                                </span>
                                <span className='cursor-pointer hover:text-cyan-600'>
                                    💬{' '}
                                    {formatLargeNumber(post.data.num_comments)}{' '}
                                    comments
                                </span>
                            </div>
                        </CardFooter>
                    </Card>
                );
            })}
        </div>
    );
}
