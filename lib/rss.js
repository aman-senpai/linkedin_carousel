import Parser from 'rss-parser';

const parser = new Parser();

export async function fetchRSSFeed(url) {
    try {
        const feed = await parser.parseURL(url);
        return feed.items.map(item => ({
            id: item.guid || item.link,
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            content: item.contentSnippet || item.content || item.description || '',
            thumbnail: item.enclosure?.url || extractImageFromHtml(item.content || item.description) || null
        }));
    } catch (error) {
        console.error('Error fetching RSS feed:', error);
        throw error;
    }
}

function extractImageFromHtml(html) {
    if (!html) return null;
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    const match = imgRegex.exec(html);
    return match ? match[1] : null;
}
