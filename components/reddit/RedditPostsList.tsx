'use client';

import { useState, useEffect } from 'react';
import { useAppSelector } from '@/lib/redux/hooks';
import Image from 'next/image';

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

    return (
        <div className='space-y-6'>
            {postsToDisplay.map((post) => (
                <Card
                    key={post.data.id}
                    className='my-4 w-full sm:max-w-2xl md:max-w-5xl'
                >
                    <CardHeader>
                        <CardTitle className='text-center'>
                            {post.data.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='relative'>
                        {post.data.selftext ? (
                            <div className='mb-4 max-h-60 overflow-y-auto'>
                                <p>{post.data.selftext}</p>
                            </div>
                        ) : null}

                        <div className='relative aspect-[16/9] [&:empty]:hidden'>
                            {renderMedia(post)}
                        </div>
                    </CardContent>
                    <CardFooter className='flex flex-wrap items-center gap-4'>
                        {/* Author info group */}
                        <div className='flex items-center gap-2'>
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
                        </div>

                        {/* Subreddit info */}
                        <p className='text-muted-foreground text-sm'>
                            in{' '}
                            <span className='text-accent-foreground'>
                                {post.data.subreddit}
                            </span>
                        </p>

                        {/* Post metrics - pushed to the right */}
                        <div className='ml-auto flex gap-4 text-sm'>
                            <span>⬆️ {formatLargeNumber(post.data.score)} points</span>
                            <span>{getTimestamp(new Date(post.data.created_utc * 1000))}</span>
                            <span>💬 {post.data.num_comments} comments</span>
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
