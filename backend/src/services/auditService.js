import * as cheerio from 'cheerio';

/**
 * Performs a dynamic audit on any target website URL.
 * Fetches live webpage content, measures response latency, validates content types,
 * and parses HTML metrics using Cheerio.
 * 
 * @param {string} url 
 * @returns {Promise<object>}
 */
export async function performAudit(url) {
  const startTime = performance.now();
  
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(10000), // 10-second timeout limit
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    const endTime = performance.now();
    const responseTime = Math.round(endTime - startTime);

    // Validate Content-Type for 2xx/3xx responses
    const contentType = response.headers.get('content-type') || '';
    const isHtml = contentType.toLowerCase().includes('text/html') || contentType.toLowerCase().includes('application/xhtml+xml');

    if (response.status < 400 && !isHtml) {
      const error = new Error('Rejection: Non-HTML content type returned by target URL');
      error.statusCode = 400;
      throw error;
    }

    const rawText = await response.text();
    
    // If response is HTML, parse with Cheerio
    let title = '';
    let metaDescription = '';
    let h1Count = 0;
    let totalImages = 0;
    let imagesMissingAlt = 0;
    let wordCount = 0;

    if (isHtml || rawText.trim().startsWith('<')) {
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
      success: true,
      status: response.status,
      responseTime,
      title,
      metaDescription,
      h1Count,
      totalImages,
      imagesMissingAlt,
      wordCount,
    };

  } catch (error) {
    // Rethrow custom validation errors
    if (error.statusCode) {
      throw error;
    }

    const elapsed = Math.round(performance.now() - startTime);
    let message = 'Failed to fetch the target URL';
    let statusCode = 500;

    if (error.name === 'TimeoutError' || error.name === 'AbortError') {
      message = 'Request timeout: Target website took too long to respond (limit: 10s)';
      statusCode = 504;
    } else if (error.cause) {
      const code = error.cause.code;
      if (code === 'ENOTFOUND' || code === 'EAI_AGAIN') {
        message = 'DNS failure: Hostname could not be resolved';
        statusCode = 502;
      } else if (
        [
          'CERT_HAS_EXPIRED',
          'DEPTH_ZERO_SELF_SIGNED_CERT',
          'ERR_TLS_CERT_ALTNAME_INVALID',
          'UNABLE_TO_VERIFY_LEAF_SIGNATURE',
        ].includes(code) || 
        error.message.toLowerCase().includes('self-signed') || 
        error.message.toLowerCase().includes('expired')
      ) {
        message = 'SSL failure: Secure connection could not be established';
        statusCode = 502;
      } else if (code === 'ECONNREFUSED') {
        message = 'Connection refused: Target host actively rejected the connection';
        statusCode = 502;
      } else if (code === 'ECONNRESET') {
        message = 'Connection reset: Host closed the connection prematurely';
        statusCode = 502;
      }
    } else if (error.message.toLowerCase().includes('redirect') || error.message.toLowerCase().includes('loop')) {
      message = 'Redirect loop detected: Exceeded max redirect limit';
      statusCode = 502;
    }

    const appError = new Error(message);
    appError.statusCode = statusCode;
    appError.originalError = error.message;
    appError.responseTime = elapsed;
    throw appError;
  }
}
