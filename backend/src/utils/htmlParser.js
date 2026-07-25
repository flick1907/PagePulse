import * as cheerio from 'cheerio';

/**
 * Parses raw HTML string and extracts key SEO metrics.
 *
 * @param {string} rawText - The raw HTML content.
 * @param {boolean} isHtml - Whether the response headers indicated HTML.
 * @returns {object} The parsed metrics.
 */
export function parseHtml(rawText, isHtml = true) {
  let title = '';
  let metaDescription = '';
  let h1Count = 0;
  let totalImages = 0;
  let imagesMissingAlt = 0;
  let wordCount = 0;

  if (rawText && typeof rawText === 'string' && (isHtml || rawText.trim().startsWith('<'))) {
    const $ = cheerio.load(rawText);

    // 1. Extract Page Title
    title = $('title').first().text().trim() || '';

    // 2. Extract Meta Description (standard name or og:description)
    metaDescription = $('meta[name="description"]').attr('content')?.trim() || 
                            $('meta[property="og:description"]').attr('content')?.trim() || 
                            $('meta[name="og:description"]').attr('content')?.trim() ||
                            '';

    // 3. Count H1 tags
    h1Count = $('h1').length;

    // 4. Count Total Images
    totalImages = $('img').length;

    // 5. Count Images missing ALT or with empty ALT attributes
    imagesMissingAlt = $('img').filter((_, el) => {
      const alt = $(el).attr('alt');
      return alt === undefined || alt.trim() === '';
    }).length;

    // 6. Calculate Approximate Word Count (stripping code & layout nodes)
    const clean$ = cheerio.load(rawText);
    clean$('script, style, noscript, iframe, svg, canvas, path, head, link, meta').remove();
    const textContent = clean$('body').text() || clean$.text() || '';
    wordCount = textContent.trim().split(/\s+/).filter(Boolean).length;
  }

  return {
    title,
    metaDescription,
    h1Count,
    totalImages,
    imagesMissingAlt,
    wordCount,
  };
}
