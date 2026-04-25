/**
 * Normalizes an external media URL by determining its source and generating a thumbnail if applicable.
 */
export function normalizeMediaUrl(url: string) {
  let source_type = 'image';
  let thumbnail_url = url;
  let validation_status = 'pending';

  if (!url) {
    return { source_type: 'unknown', original_url: '', thumbnail_url: '/placeholder.jpg', validation_status: 'failed' };
  }

  try {
    const parsedUrl = new URL(url);

    // 1. Check YouTube
    if (parsedUrl.hostname.includes('youtube.com') || parsedUrl.hostname.includes('youtu.be')) {
      source_type = 'youtube';
      let videoId = '';
      if (parsedUrl.hostname.includes('youtu.be')) {
        videoId = parsedUrl.pathname.slice(1);
      } else {
        videoId = parsedUrl.searchParams.get('v') || '';
      }
      
      if (videoId) {
        thumbnail_url = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        validation_status = 'verified';
      } else {
        validation_status = 'failed';
        thumbnail_url = '/placeholder.jpg';
      }
    } 
    // 2. Check Image URLs & Generic domains
    else if (parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:') {
      // Basic image check for common extensions, else assumes it's an image API giving it an exception
      if (/\.(jpg|jpeg|png|webp|gif|svg)$/i.test(parsedUrl.pathname) || parsedUrl.hostname.includes('unsplash') || parsedUrl.hostname.includes('githubusercontent')) {
        source_type = 'image';
        thumbnail_url = url;
        validation_status = 'verified';
      } else {
        // Unknown type, maybe dynamic endpoint? Treat as unverified image.
        source_type = 'image';
        thumbnail_url = url;
        validation_status = 'pending';
      }
    } 
    else {
      validation_status = 'failed';
      thumbnail_url = '/placeholder.jpg';
    }
  } catch {
    validation_status = 'failed';
    thumbnail_url = '/placeholder.jpg';
  }

  return { source_type, original_url: url, thumbnail_url, validation_status };
}
