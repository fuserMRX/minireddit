import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // This prevents static caching of this route

export async function GET() {
    try {
        // Define the URL explicitly to avoid parsing issues
        const redditUrl = new URL('https://www.reddit.com/r/popular.json');

        console.log('Attempting to fetch from Reddit API...');

        // Try with a more detailed User-Agent
        const response = await fetch(redditUrl.toString(), {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
                'Accept': 'application/json',
            },
            cache: 'no-store', // Prevent caching
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Reddit API error: ${response.status} ${response.statusText}`);
            console.error('Response body:', errorText);
            throw new Error(`Reddit API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Successfully fetched Reddit data');

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error details:', error);

        // Try an alternative approach if the main one fails
        try {
            console.log('Attempting alternative fetch approach...');

            // Use a different URL format that might be more reliable
            const alternativeUrl = 'https://www.reddit.com/hot.json';

            const altResponse = await fetch(alternativeUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (compatible; MiniredditBot/1.0)',
                },
                cache: 'no-store',
            });

            if (!altResponse.ok) {
                throw new Error(`Alternative fetch failed: ${altResponse.status}`);
            }

            const altData = await altResponse.json();
            console.log('Alternative fetch succeeded');

            return NextResponse.json(altData);
        } catch (altError) {
            console.error('Alternative approach failed:', altError);

            return NextResponse.json(
                { error: 'Failed to fetch Reddit main feed', details: String(error) },
                { status: 500 }
            );
        }
    }
}
