/**
 * Validates whether a given string is a syntactically valid URL
 * supporting only http: and https: protocols.
 * 
 * @param {string} urlString 
 * @returns {boolean}
 */
export function isValidUrl(urlString) {
  if (!urlString || typeof urlString !== 'string') {
    return false;
  }
  
  try {
    const parsed = new URL(urlString.trim());
    return ['http:', 'https:'].includes(parsed.protocol) && !!parsed.hostname;
  } catch (error) {
    return false;
  }
}
