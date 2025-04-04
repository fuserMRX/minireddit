import React, { useState, useEffect } from 'react';
import { RedditComment } from '@/components/reddit/RedditComment';
import RedditCommentComponent from '@/components/reddit/RedditComment';

const RedditComments = ({ postId, subreddit, totalComments }: { postId: string; subreddit: string; totalComments: number }) => {
    const [comments, setComments] = useState<RedditComment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchComments = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/comments?postId=${postId}&subreddit=${subreddit}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch comments');
                }

                const data = await response.json();
                // Reddit API returns an array with post data at index 0 and comments at index 1
                if (data && data[1] && data[1].data && data[1].data.children) {
                    setComments(data[1].data.children);
                }
            } catch (err) {
                console.error('Error fetching comments:', err);
                setError('Failed to load comments');
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [postId, subreddit]);

    if (loading) {
        return (
            <div className="mt-4 p-4 bg-gray-50 rounded-md dark:bg-gray-800">
                <div className="flex justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="mt-4 p-4 text-red-500 text-center" data-testid="error-message">{error}</div>;
    }

    return (
        <div className="mt-4 p-4 bg-gray-50 rounded-md dark:bg-gray-800">
            <h3 className="text-lg font-medium mb-2">Comments ({totalComments})</h3>

            {totalComments > comments.length && (
                <div className="mb-4 p-2 bg-blue-50 text-blue-700 text-xs rounded-md dark:bg-blue-900/30 dark:text-blue-300" data-testid="comments-notification">
                    <p>Showing {comments.length} top-level comments. Visit Reddit to see all {totalComments} comments including replies.</p>
                </div>
            )}

            {comments.length === 0 ? (
                <p className="text-center text-muted-foreground">No comments yet</p>
            ) : (
                <div className="space-y-4">
                    {comments.map((comment) => (
                        <RedditCommentComponent key={comment.data.id} comment={comment} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default RedditComments;