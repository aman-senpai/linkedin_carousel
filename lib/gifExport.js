import { toPng } from 'html-to-image';

/**
 * Capture animation frames from a DOM element and produce an animated GIF blob.
 * Optimized for professional architectural flow.
 *
 * @param {HTMLElement} element - DOM element to capture
 * @param {object} opts
 */
export async function captureGif(element, opts = {}) {
    const {
        frames = 45,
        interval = 120, // 120ms delay in GIF playback
        width = 800,
        height = 1200,
        onProgress,
    } = opts;

    // Use a higher worker count for faster encoding
    const GIF_LIB = (await import('gif.js')).default;
    const gif = new GIF_LIB({
        workers: 4,
        quality: 10,
        width,
        height,
        workerScript: '/gif.worker.js',
    });

    // Preparation: Let the initial mounting animations settle
    await new Promise(r => setTimeout(r, 1200));

    // To prevent "jumping", we need the browser to have enough time to 
    // compute the next state of the CSS transition/animation between captures.
    const captureDelay = 150; // Delay between capture calls (ms)

    for (let i = 0; i < frames; i++) {
        try {
            const dataUrl = await toPng(element, {
                width,
                height,
                pixelRatio: 1, // Keep it fast for GIF
                backgroundColor: '#ffffff',
                cacheBust: true,
                style: {
                    animationPlayState: 'running',
                }
            });

            const img = new Image();
            img.src = dataUrl;

            await new Promise((resolve) => {
                img.onload = resolve;
                img.onerror = resolve;
            });

            // Add frame with the intended playback speed (interval)
            gif.addFrame(img, { delay: interval, copy: true });

            if (onProgress) {
                onProgress((i + 1) / frames * 0.7);
            }

            // Fixed breather to allow CSS animations to progress smoothly
            await new Promise((resolve) => setTimeout(resolve, captureDelay));
        } catch (err) {
            console.error('Frame capture error:', err);
            // Skip failed frames instead of breaking the loop
        }
    }

    return new Promise((resolve, reject) => {
        gif.on('progress', (p) => {
            if (onProgress) onProgress(0.7 + p * 0.3);
        });
        gif.on('finished', (blob) => resolve(blob));
        gif.on('error', (err) => reject(err));
        gif.render();
    });
}
