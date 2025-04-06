import { NextResponse } from 'next/server';

export async function GET() {
    console.log('[API] redditMainFeed route handler started');

    try {
        // Define the URL explicitly to avoid parsing issues
        const redditUrl = new URL('https://www.reddit.com/r/popular.json');

        console.log('[API] Attempting to fetch from Reddit API...');

        // Try with a more detailed User-Agent
        const response = await fetch(redditUrl.toString(), {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
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
        console.error('[API] Error details:', error);

        // Try an alternative approach if the main one fails
        try {
            console.log('[API] Attempting alternative fetch approach...');

            // Use a different URL format that might be more reliable
            const alternativeUrl = 'https://www.reddit.com/hot.json';

            const altResponse = await fetch(alternativeUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (compatible; MiniredditBot/1.0)',
                },
                next: { revalidate: 0 },
            });

            console.log('[API] Alternative fetch status:', altResponse.status);

            if (!altResponse.ok) {
                throw new Error(`Alternative fetch failed: ${altResponse.status}`);
            }

            const altData = await altResponse.json();
            console.log('[API] Alternative fetch succeeded, post count:', altData?.data?.children?.length || 0);

            return NextResponse.json(altData);
        } catch (altError) {
            console.error('[API] Alternative approach failed:', altError);

            return NextResponse.json(
                { error: 'Failed to fetch Reddit main feed', details: String(error) },
                { status: 500 }
            );
        }
    }
}
