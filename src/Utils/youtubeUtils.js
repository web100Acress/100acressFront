// Utility functions for handling YouTube videos
export function parseYouTubeVideoId(url) {
  if (!url) return '';
  
  // Handle youtu.be links
  const youtuBeMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:shorts\/|embed\/|v\/|.*[&?]v=))([^&\n?#]+)/);
  
  if (youtuBeMatch && youtuBeMatch[1]) {
    // Extract just the video ID (remove any query parameters)
    return youtuBeMatch[1].split('?')[0];
  }
  
  // Handle direct video ID (11 characters, alphanumeric with - and _)
  const directIdMatch = url.match(/^[a-zA-Z0-9_-]{11}$/);
  if (directIdMatch) {
    return directIdMatch[0];
  }
  
  return '';
}

export function getEmbedUrl(videoId) {
  if (!videoId) return '';
  return `https://www.youtube.com/embed/${videoId}?autoplay=0&mute=1&loop=1&playlist=${videoId}&controls=1&modestbranding=1&playsinline=1&rel=0`;
}
