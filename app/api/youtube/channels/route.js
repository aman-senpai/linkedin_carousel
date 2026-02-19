import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const CHANNELS_FILE = path.join(process.cwd(), 'lib/channels.json');

export async function GET() {
    try {
        const data = await fs.readFile(CHANNELS_FILE, 'utf8');
        return NextResponse.json({ channels: JSON.parse(data) });
    } catch (error) {
        return NextResponse.json({ channels: [] });
    }
}

export async function POST(request) {
    try {
        const channels = await request.json();
        await fs.writeFile(CHANNELS_FILE, JSON.stringify(channels, null, 4));
        return NextResponse.json({ message: 'Channels updated successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update channels' }, { status: 500 });
    }
}
