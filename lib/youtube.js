import Parser from 'rss-parser';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

const parser = new Parser({
    customFields: {
        item: [
            ['yt:videoId', 'videoId'],
        ],
    },
});

export async function fetchChannelVideos(channelId, channelName = 'YouTube', domain = 'General') {
    const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    try {
        const feed = await parser.parseURL(url);
        return feed.items.map(item => {
            const videoId = item.videoId || item.link.split('v=')[1];
            const isShort = item.link.includes('/shorts/') || item.title.toLowerCase().includes('#shorts');
            return {
                id: videoId,
                title: item.title,
                link: item.link,
                pubDate: item.pubDate,
                thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
                channelName,
                domain,
                isShort
            };
        });
    } catch (error) {
        console.error(`Error fetching YouTube feed for ${channelId}:`, error);
        return [];
    }
}

export async function fetchMultipleChannelsContent(channels) {
    const allVideosPromises = channels.map(channel => 
        fetchChannelVideos(channel.channel_id, channel.name, channel.domain)
    );
    
    const results = await Promise.all(allVideosPromises);
    const flattened = results.flat();
    
    // Sort by publication date (newest first)
    return flattened.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
}

export async function getYoutubeTranscript(videoId) {
    // Validate videoId format (alphanumeric, hyphens, underscores only)
    if (!/^[a-zA-Z0-9_-]{6,20}$/.test(videoId)) {
        throw new Error('Invalid video ID format');
    }

    const pyScript = [
        'from youtube_transcript_api import YouTubeTranscriptApi',
        'import json, sys',
        'api = YouTubeTranscriptApi()',
        'try:',
        '    t = api.fetch(sys.argv[1])',
        "    print(json.dumps({'text': ' '.join([s.text for s in t])}))",
        'except Exception as e:',
        "    print(json.dumps({'error': str(e)}))",
        '    sys.exit(1)',
    ].join('\n');

    try {
        const { stdout } = await execFileAsync('uvx', [
            '--from', 'youtube-transcript-api',
            'python3', '-c', pyScript, videoId
        ], { timeout: 30000 });
        
        const result = JSON.parse(stdout.trim());
        if (result.error) throw new Error(result.error);
        return result.text;
    } catch (error) {
        console.error('Error fetching transcript:', error.message);
        throw error;
    }
}
