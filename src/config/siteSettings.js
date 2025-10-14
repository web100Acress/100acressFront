// Simple site settings storage using localStorage
// Keys
const SHORTS_VIDEO_ID_KEY = 'homeShortsVideoId';

// Extract a YouTube video ID from various URL formats or raw IDs
export function parseYouTubeVideoId(input) {
  if (!input) return '';
  const str = String(input).trim();

  // If looks like a plain ID
  if (/^[a-zA-Z0-9_-]{6,}$/.test(str) && !str.includes('http')) return str;

  try {
    const url = new URL(str);
    // youtu.be/<id>
    if (url.hostname.includes('youtu.be')) {
      return url.pathname.replace('/', '').split('?')[0];
    }
    // youtube.com/watch?v=<id>
    const v = url.searchParams.get('v');
    if (v) return v;
    // youtube.com/shorts/<id>
    const parts = url.pathname.split('/').filter(Boolean);
    const shortsIndex = parts.findIndex((p) => p === 'shorts');
    if (shortsIndex !== -1 && parts[shortsIndex + 1]) return parts[shortsIndex + 1];
  } catch (_) {
    // not a URL, fallthrough
  }
  return str;
}

export function getShortsVideoId(defaultId = '') {
  if (typeof window === 'undefined') return defaultId;
  const saved = localStorage.getItem(SHORTS_VIDEO_ID_KEY);
  return saved || defaultId;
}

export function setShortsVideoId(id) {
  if (typeof window === 'undefined') return;
  const clean = parseYouTubeVideoId(id);
  if (clean) {
    localStorage.setItem(SHORTS_VIDEO_ID_KEY, clean);
  } else {
    localStorage.removeItem(SHORTS_VIDEO_ID_KEY);
  }
}

export function clearShortsVideoId() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(SHORTS_VIDEO_ID_KEY);
}
