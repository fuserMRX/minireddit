import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    console.log('🔥 API ROUTE TRIGGERED:', request.url);
    const searchParams = request.nextUrl.searchParams;
    const postId = searchParams.get('postId');
    const subreddit = searchParams.get('subreddit');

    if (!postId || !subreddit) {
        return NextResponse.json(
            { error: 'Missing postId or subreddit parameter' },
            { status: 400 }
        );
    }

    try {
        // Fetch comments from Reddit API
        const commentsUrl = `https://www.reddit.com/r/${subreddit}/comments/${postId}.json`;
        const response = await fetch(commentsUrl);

        if (!response.ok) {
            throw new Error(`Reddit API responded with status: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching comments:', error);
        return NextResponse.json(
            { error: 'Failed to fetch comments from Reddit' },
            { status: 500 }
        );
    }
}