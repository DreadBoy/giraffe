export function extractImgurId(url: string): string | null {
    try {
        const urlObj = new URL(url);
        if (!urlObj.hostname.includes('imgur.com')) {
            return null;
        }

        // Handle various Imgur URL formats:
        // https://imgur.com/gallery/abc123
        // https://imgur.com/a/abc123
        // https://imgur.com/a/warhammer-aos-more-ossiarch-bonereapers-comics-memes-RCCVYhu
        // https://imgur.com/abc123
        const pathParts = urlObj.pathname.split('/').filter(Boolean);

        if (pathParts.length === 0) {
            return null;
        }

        // If it's /gallery/id or /a/id, return the last part
        if (pathParts[0] === 'gallery' || pathParts[0] === 'a') {
            const slug = pathParts[1] || null;
            if (!slug) return null;

            // Check if slug contains a dash followed by alphanumeric ID at the end
            // Format: title-with-dashes-ID where ID is the last segment after final dash
            const lastDashIndex = slug.lastIndexOf('-');
            if (lastDashIndex !== -1) {
                const potentialId = slug.substring(lastDashIndex + 1);
                // If the part after the last dash looks like an ID (alphanumeric, typically 7 chars)
                if (potentialId.length >= 5 && /^[a-zA-Z0-9]+$/.test(potentialId)) {
                    return potentialId;
                }
            }

            return slug;
        }

        // Otherwise return the first path segment (direct link format)
        return pathParts[0];
    } catch {
        return null;
    }
}
