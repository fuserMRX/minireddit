import { NextResponse } from 'next/server';

export async function GET() {
    console.log('[API] redditMainFeed route handler started');

    try {
        // Define the URL explicitly to avoid parsing issues
        const redditUrl = new URL('https://old.reddit.com/r/popular.json');

        console.log('[API] Attempting to fetch from Reddit API...');

        // Try with a more detailed User-Agent
        const response = await fetch(redditUrl.toString(), {
            headers: {
                'User-Agent': 'reddit:MiniRedditApp:1.0 (by /u/Playful_Yak_1874)',
                'Accept': 'application/json',
            }
        });

        console.log('[API] Fetch response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`[API] Reddit API error: ${response.status} ${response.statusText}`);
            console.error('[API] Response body:', errorText);
            throw new Error(`Reddit API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('[API] Successfully fetched Reddit data, post count:', data?.data?.children?.length || 0);

        return NextResponse.json(data);
    } catch (error) {
        console.error('[API] Error fetching Reddit main feed:', error);

        // Return an error response with details for debugging
        return NextResponse.json(
          { error: 'Failed to fetch Reddit main feed', details: String(error) },
          { status: 500 }
        );
    }
}
