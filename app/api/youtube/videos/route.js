import { fetchMultipleChannelsContent } from '@/lib/youtube';
import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const CHANNELS_FILE = path.join(process.cwd(), 'lib/channels.json');

export async function GET() {
    try {
        const data = await fs.readFile(CHANNELS_FILE, 'utf8');
        const channels = JSON.parse(data);
        const videos = await fetchMultipleChannelsContent(channels);
        return NextResponse.json({ videos });
    } catch (error) {
        console.error('API Error fetching aggregated videos:', error);
        return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
    }
}
