import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { getTimestamp, formatLargeNumber } from '@/lib/utils';

export interface RedditComment {
    kind: string;
    data: {
        id: string;
        author: string;
        body: string;
        created_utc: number;
        score: number;
        replies?: {
            data?: {
                children: RedditComment[];
            };
        };
    };
}

const RedditComment = ({ comment, depth = 0 }: { comment: RedditComment; depth?: number }) => {
    const [showReplies, setShowReplies] = useState(depth < 2); // Auto-expand first two levels

    if (!comment.data) { return null;}

    const hasReplies = comment.data.replies &&
                      typeof comment.data.replies === 'object' &&
                      comment.data.replies?.data &&
                      Array.isArray(comment.data.replies.data.children) &&
                      comment.data.replies.data.children.length > 0;

    const replies = hasReplies && comment.data.replies?.data?.children
        ? comment.data.replies.data.children.filter(reply => reply.kind === 't1')
        : [];

    return (
        <div className={`mt-3 pl-3 border-l-2 ${depth % 2 === 0 ? 'border-blue-200' : 'border-purple-200'}`} data-testid="comment">
            <div className="flex items-start gap-2">
                <Avatar className="h-6 w-6">
                    <AvatarImage src={`https://robohash.org/randomSeed${comment.data.id}`} />
                    <AvatarFallback>{comment.data.author ? comment.data.author.substring(0, 2) : 'author'}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <span className="font-medium text-sm" data-testid="comment-author">{comment.data.author}</span>
                        <span className="text-xs text-muted-foreground">
                            {getTimestamp(new Date(comment.data.created_utc * 1000))}
                        </span>
                        <span className="text-xs text-muted-foreground ml-auto">
                            {comment.data.score !== undefined ? formatLargeNumber(comment.data.score) : '0'} points
                        </span>
                    </div>
                    <div className="text-sm mt-1" data-testid="comment-body">{comment.data.body}</div>

                    {hasReplies && replies.length > 0 && (
                        <div className="mt-2">
                            <button
                                onClick={() => setShowReplies(!showReplies)}
                                className="flex items-center text-xs text-blue-500 hover:text-blue-700"
                                data-testid="show-replies-button"
                            >
                                {showReplies ? <ChevronUp className="h-3 w-3 mr-1" /> : <ChevronDown className="h-3 w-3 mr-1" />}
                                {showReplies ? 'Hide' : 'Show'} {replies.length} {replies.length === 1 ? 'reply' : 'replies'}
                            </button>

                            {showReplies && (
                                <div className="mt-1" data-testid="replies-container">
                                    {replies.map((reply) => (
                                        <RedditComment key={reply.data.id} comment={reply} depth={depth + 1} />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RedditComment;