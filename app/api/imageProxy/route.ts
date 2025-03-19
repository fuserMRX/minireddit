import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');

    if (!imageUrl) {
        return new NextResponse('Missing image URL', { status: 400 });
    }

    try {
        const imageResponse = await fetch(imageUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; MiniredditBot/1.0)'
            }
        });

        // Check if the response is actually an image
        const contentType = imageResponse.headers.get('content-type') || '';

        if (!contentType.startsWith('image/')) {
            console.log(`Not an image: ${imageUrl}, content type: ${contentType}`);
            return NextResponse.json({ error: 'Not an image' }, { status: 400 });
        }

        const imageData = await imageResponse.arrayBuffer();

        return new NextResponse(imageData, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
            },
        });
    } catch (error) {
        console.error('Image proxy error:', error);
        return new NextResponse('Failed to fetch image', { status: 500 });
    }
}
