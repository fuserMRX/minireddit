import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Define the URL explicitly to avoid parsing issues
        const redditUrl = new URL('https://www.reddit.com/r/popular.json');

        const response = await fetch(redditUrl.toString(), {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; MiniredditBot/1.0)',
            },
        });

        if (!response.ok) {
            throw new Error(`Reddit API responded with status: ${response.status}`);
        }

        const data = await response.json();

        return new NextResponse(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching Reddit main feed:', error);
        return new NextResponse(JSON.stringify({ error: 'Failed to fetch Reddit main feed' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
