import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { RedditItem, RedditItemData } from '@/lib/redux/features/reddits/redditSlice';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getTimestamp = (createdAt: Date): string => {
    const now = new Date();
    const diffInSeconds = Math.floor(
        (now.getTime() - new Date(createdAt).getTime()) / 1000
    );

    const timeIntervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'week', seconds: 604800 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
        { label: 'second', seconds: 1 },
    ];

    for (const interval of timeIntervals) {
        const count = Math.floor(diffInSeconds / interval.seconds);

        if (count > 0) {
            return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
        }
    }

    return 'just now';
};

export const formatLargeNumber = (num: number): string => {
    if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1)}M`; // Divide by 1,000,000 for millions
    } else if (num >= 1_000) {
        return `${(num / 1000).toFixed(1)}k`; // Divide by 1,000 for thousands
    } else {
        return num.toString(); // Return the number as it is if less than 1,000
    }
};

export const extractSubreddits = (redditItems: RedditItem[]) => {
    const allSubreddits = redditItems.map(
        ({ data }: { data: RedditItemData }) => ({
            subredditId: data.subreddit,
            subredditUrl: `https://www.reddit.com/r/${data.subreddit}.json`,
        })
    );

    const uniqueIds = new Set<string>();

    // Filter to keep only unique subreddits
    const uniqueSubreddits = allSubreddits.filter((subreddit) => {
        if (uniqueIds.has(subreddit.subredditId)) {
            return false;
        }

        uniqueIds.add(subreddit.subredditId);

        return true;
    });

    return uniqueSubreddits;
};
