import { fetchChannelVideos } from '@/lib/youtube';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const channelId = searchParams.get('channelId');

    if (!channelId) {
        return NextResponse.json({ error: 'Channel ID is required' }, { status: 400 });
    }

    try {
        const videos = await fetchChannelVideos(channelId);
        return NextResponse.json({ videos });
    } catch (error) {
        console.error('API Error fetching YouTube feed:', error);
        return NextResponse.json({ error: 'Failed to fetch YouTube feed' }, { status: 500 });
    }
}
