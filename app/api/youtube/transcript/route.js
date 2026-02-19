import { getYoutubeTranscript } from '@/lib/youtube';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const videoId = searchParams.get('videoId');

    if (!videoId) {
        return NextResponse.json({ error: 'Video ID is required' }, { status: 400 });
    }

    try {
        const transcript = await getYoutubeTranscript(videoId);
        return NextResponse.json({ transcript });
    } catch (error) {
        console.error('API Error fetching transcript:', error);
        return NextResponse.json({ error: 'Failed to fetch transcript' }, { status: 500 });
    }
}
