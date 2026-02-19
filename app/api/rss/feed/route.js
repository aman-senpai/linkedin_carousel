import { fetchRSSFeed } from '@/lib/rss';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
        return NextResponse.json({ error: 'RSS URL is required' }, { status: 400 });
    }

    try {
        const items = await fetchRSSFeed(url);
        return NextResponse.json({ items });
    } catch (error) {
        console.error('API Error fetching RSS feed:', error);
        return NextResponse.json({ error: 'Failed to fetch RSS feed. Please check the URL.' }, { status: 500 });
    }
}
