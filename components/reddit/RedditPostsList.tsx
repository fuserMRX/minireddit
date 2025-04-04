'use client';

import React from 'react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import { CircleChevronUp, CircleChevronDown, MessageCircle } from 'lucide-react';

import RedditPostsListLoader from '@/components/reddit/RedditPostsListLoader';
import {
    selectReddits,
    selectStatus,
    updateReddits,
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
import RedditComments from '@/components/reddit/RedditComments';

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
    const dispatch = useAppDispatch();
    const [votes, setVotes] = useState<Record<string, { upvoted: boolean; downvoted: boolean }>>({});
    const [expandedComments, setExpandedComments] = useState<string | null>(null);

    const redditPosts = useAppSelector(selectReddits);
    const loadingStatus = useAppSelector(selectStatus);

    // Initialize Redux with initialPosts to prevent layout shift
    useEffect(() => {
        // Only update Redux if it's empty and we have initialPosts
        if (redditPosts.length === 0 && initialPosts.length) {
            dispatch(updateReddits(initialPosts));
        }
    }, [initialPosts, redditPosts.length, dispatch]);

    // Always use redditPosts after initialization
    const postsToDisplay = redditPosts.length ? redditPosts : initialPosts;

    // Show loading skeleton only when explicitly loading from Redux actions (like subreddit switching)
    if (redditPosts.length > 0 && loadingStatus === 'loading') {
        return <RedditPostsListLoader />;
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
        <div className='space-y-6 w-full'>
            {postsToDisplay.map((post) => {
                const postId = post.data.id;
                const voteState = votes[postId] || {
                    upvoted: false,
                    downvoted: false,
                };

                const isCommentsExpanded = expandedComments === postId;

                return (
                    <Card
                        key={postId}
                        className='my-4 w-full border-gray-200 transition-all duration-200 hover:shadow-2xl'
                        data-testid="reddit-post"
                    >
                        <CardHeader className='relative flex flex-row items-center justify-between px-3 sm:px-6'>
                            <div className='flex flex-col items-center gap-2 sm:gap-4 rounded-md bg-black/5 px-1 sm:px-2 py-1 text-sm font-medium'>
                                <CircleChevronUp
                                    onClick={() =>
                                        handleVoting(postId, 'upvote')
                                    }
                                    name='upvote'
                                    className={`h-5 w-5 sm:h-6 sm:w-6 cursor-pointer ${
                                        voteState.upvoted
                                            ? 'text-green-500'
                                            : 'text-accent-foreground'
                                    }`}
                                />
                                <span>
                                    {formatLargeNumber(post.data.score)}
                                </span>
                                <CircleChevronDown
                                    onClick={() =>
                                        handleVoting(postId, 'downvote')
                                    }
                                    name='downvote'
                                    className={`h-5 w-5 sm:h-6 sm:w-6 cursor-pointer ${
                                        voteState.downvoted
                                            ? 'text-red-500'
                                            : 'text-accent-foreground'
                                    }`}
                                />
                            </div>

                            <CardTitle className='mx-2 sm:mx-4 flex-1 text-center text-base sm:text-lg md:text-xl'>
                                {post.data.title}
                            </CardTitle>
                        </CardHeader>

                        <CardContent className='relative px-3 sm:px-6'>
                            {post.data.selftext ? (
                                <div className='mb-4 max-h-60 overflow-auto text-center text-wrap text-sm sm:text-base'>
                                    <p>{post.data.selftext}</p>
                                </div>
                            ) : null}

                            <div className='relative aspect-[16/9] w-full [&:empty]:hidden'>
                                {renderMedia(post)}
                            </div>
                        </CardContent>

                        <CardFooter className='flex flex-col items-start gap-4 px-3 sm:px-4 pb-3 sm:flex-row sm:items-center sm:justify-between'>
                            <div className='flex w-full items-center justify-center gap-2 sm:w-auto'>
                                <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                                    <AvatarImage
                                        src={`https://robohash.org/randomSeed${post.data.id}`}
                                    />
                                    <AvatarFallback>
                                        {post.data.author}
                                    </AvatarFallback>
                                </Avatar>
                                <span className='text-accent-foreground font-medium text-sm sm:text-base'>
                                    {post.data.author}
                                </span>

                                <p className='text-muted-foreground ml-2 text-xs sm:text-sm'>
                                    in{' '}
                                    <span className='text-cyan-500'>
                                        {post.data.subreddit}
                                    </span>
                                </p>
                            </div>

                            <div className='flex w-full justify-between gap-4 border-t pt-2 text-xs sm:text-sm sm:w-auto sm:justify-end sm:border-0 sm:pt-0'>
                                <span>
                                    {getTimestamp(
                                        new Date(post.data.created_utc * 1000)
                                    )}
                                </span>
                                <button
                                    className={`flex items-center cursor-pointer hover:text-cyan-600 ${isCommentsExpanded ? 'text-cyan-600' : ''}`}
                                    onClick={() => setExpandedComments(isCommentsExpanded ? null : postId)}
                                    data-testid="comment-button"
                                >
                                    <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                    {formatLargeNumber(post.data.num_comments)}{' '}
                                    comments
                                </button>
                            </div>
                        </CardFooter>

                        {/* Comments section - only shown when expanded */}
                        {isCommentsExpanded && (
                            <div className="px-3 sm:px-4 pb-4" data-testid="comments-section">
                                <RedditComments
                                    postId={postId}
                                    subreddit={post.data.subreddit}
                                    totalComments={post.data.num_comments}
                                />
                            </div>
                        )}
                    </Card>
                );
            })}
        </div>
    );
}
