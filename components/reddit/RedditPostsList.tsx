'use client';

import { useState, useEffect } from 'react';
import { useAppSelector } from '@/lib/redux/hooks';

import {
    selectReddits,
    selectStatus,
} from '@/lib/redux/features/reddits/redditSlice';
import type { RedditItem } from '@/lib/redux/features/reddits/redditSlice';

interface RedditPostsListProps {
    initialPosts: RedditItem[];
}

export default function RedditPostsList({
    initialPosts,
}: RedditPostsListProps) {
    // Track if we're using Redux data or initial data
    const [usingReduxData, setUsingReduxData] = useState(false);

    // Get data from Redux
    const redditPosts = useAppSelector(selectReddits);
    const loadingStatus = useAppSelector(selectStatus);

    // Determine which posts to display
    const postsToDisplay = usingReduxData ? redditPosts : initialPosts;

    // Switch to Redux data when available
    useEffect(() => {
        if (redditPosts.length > 0) {
            setUsingReduxData(true);
        }
    }, [redditPosts]);

    // If we're loading from Redux, show loading state
    if (usingReduxData && loadingStatus === 'loading') {
        return <div>Loading subreddit posts...</div>;
    }

    return (
        <div className='posts-list'>
            {postsToDisplay.map((post) => (
                <article key={post.data.id} className='post-card'>
                    <h2>{post.data.title}</h2>
                    <p>
                        Posted by u/{post.data.author} in r/
                        {post.data.subreddit}
                    </p>
                    <div className='post-metadata'>
                        <span>{post.data.score} points</span>
                        <span>{post.data.num_comments} comments</span>
                    </div>
                </article>
            ))}
        </div>
    );
}
