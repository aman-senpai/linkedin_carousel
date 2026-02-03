// Utility function to strip markdown formatting from text
export const stripMarkdown = (text) => {
    if (!text || typeof text !== 'string') return text;
    return text
        .replace(/\*\*(.+?)\*\*/g, '$1')
        .replace(/__(.+?)__/g, '$1')
        .replace(/\*(.+?)\*/g, '$1')
        .replace(/_(.+?)_/g, '$1')
        .replace(/`(.+?)`/g, '$1')
        .replace(/\[(.+?)\]\(.+?\)/g, '$1')
        .replace(/~~(.+?)~~/g, '$1')
        .replace(/[*_]/g, '');
};

export const getGradientCSS = (colors, direction = 'to-br') => {
    const dirs = {
        'to-br': 'to bottom right',
        'to-r': 'to right',
        'to-b': 'to bottom',
        'to-tr': 'to top right'
    };
    return `linear-gradient(${dirs[direction] || 'to bottom right'}, ${colors.gradient.from}, ${colors.gradient.to})`;
};
