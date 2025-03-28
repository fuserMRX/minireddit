import { createAppSlice } from '@/lib/redux/createAppSlice';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchSubreddit } from '@/lib/redux/features/reddits/subredditAPI';

// Interface for Reddit video data
export interface RedditVideo {
    bitrate_kbps: number;
    fallback_url: string;
    has_audio: boolean;
    height: number;
    width: number;
    scrubber_media_url: string;
    dash_url: string;
    duration: number;
    hls_url: string;
    is_gif: boolean;
    transcoding_status: string;
}

// Interface for Reddit media
export interface RedditMedia {
    reddit_video?: RedditVideo;
    // Other potential media types can be added here
    [key: string]: unknown;
}

// Interface for the data part of a Reddit item
export interface RedditItemData {
    id: string;
    title: string;
    author: string;
    created: number;
    permalink: string;
    url: string;
    subreddit: string;
    score: number;
    num_comments: number;
    selftext?: string;
    thumbnail?: string;
    media?: RedditMedia; // Updated to use the specific RedditMedia type
    created_utc: number;
    subreddit_name_prefixed: string;
    author_fullname?: string;
    url_overridden_by_dest?: string;
    ups: number;
    downs: number;
    upvote_ratio?: number;
    is_video?: boolean;
    [key: string]: unknown; // Allow for additional properties
}

// Interface for a complete Reddit item with kind and data
export interface RedditItem {
    kind: string; // Usually "t3" for links/posts
    data: RedditItemData;
}

export interface RedditSliceState {
    value: RedditItem[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    activeSubreddit: string;
    subredditStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: RedditSliceState = {
    value: [],
    status: 'idle',
    activeSubreddit: 'popular',
    subredditStatus: 'idle',
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const redditSlice = createAppSlice({
    name: 'reddits',
    initialState,
    reducers: (create) => ({
        getAsyncSubredditInfo: create.asyncThunk(
            async (subredditName: string) => {
                const response = await fetchSubreddit(subredditName);

                return {
                    posts: response.data,
                    activeSubreddit: subredditName
                };
            },
            {
                pending: (state) => {
                    state.status = 'loading';
                    state.subredditStatus = 'loading';
                },
                fulfilled: (state, action) => {
                    state.status = 'succeeded';
                    state.subredditStatus = 'succeeded';
                    state.value = action.payload.posts;
                    state.activeSubreddit = action.payload.activeSubreddit;
                },
                rejected: (state) => {
                    state.status = 'failed';
                    state.subredditStatus = 'failed';
                },
            }
        ),
        updateReddits: create.reducer(
            (state, action: PayloadAction<RedditItem[]>) => {
                state.value = action.payload;
            }
        ),
        setSubredditStatus: create.reducer(
            (state, action: PayloadAction<'idle' | 'loading' | 'succeeded' | 'failed'>) => {
                state.subredditStatus = action.payload;
            }
        ),
    }),

    selectors: {
        selectStatus: (reddits) => reddits.status,
        selectReddits: (reddits) => reddits.value,
        selectActiveSubreddit: (reddits) => reddits.activeSubreddit,
        selectSubredditStatus: (reddits) => reddits.subredditStatus,
    },
});

export const { getAsyncSubredditInfo, updateReddits, setSubredditStatus } = redditSlice.actions;
export const { selectStatus, selectReddits, selectActiveSubreddit, selectSubredditStatus } = redditSlice.selectors;
