import { parseHtml } from './htmlParser.js';

describe('HTML Parser Utility', () => {
  describe('Happy Path', () => {
    it('should correctly parse a valid HTML document and extract metrics', () => {
      const sampleHtml = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>My Sample Page Title</title>
            <meta name="description" content="This is the page meta description for SEO purposes.">
          </head>
          <body>
            <h1>First Main Heading</h1>
            <p>Welcome to this beautiful website. It contains some words to count.</p>
            <h1>Second Section Heading</h1>
            <p>Here are more words that should be counted as part of the approximate word count calculation.</p>
            
            <img src="logo.png" alt="Company Logo">
            <img src="banner.jpg">
            <img src="profile.png" alt="">
            
            <script>
              const ignored = "This JavaScript block content should not be counted as words.";
            </script>
            <style>
              body { color: #333; } /* This CSS block should also be ignored */
            </style>
          </body>
        </html>
      `;

      const result = parseHtml(sampleHtml, true);

      expect(result.title).toBe('My Sample Page Title');
      expect(result.metaDescription).toBe('This is the page meta description for SEO purposes.');
      expect(result.h1Count).toBe(2);
      expect(result.totalImages).toBe(3);
      expect(result.imagesMissingAlt).toBe(2); // banner.jpg has no alt, profile.png has alt=""
      expect(result.wordCount).toBeGreaterThan(0);
      
      // Expected visible text word count = 33 words.
      expect(result.wordCount).toBe(33);
    });

    it('should fall back to og:description meta tag when standard description is missing', () => {
      const ogHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta property="og:description" content="OpenGraph description fallback">
          </head>
          <body>
            <h1>Heading</h1>
          </body>
        </html>
      `;

      const result = parseHtml(ogHtml, true);
      expect(result.metaDescription).toBe('OpenGraph description fallback');
    });

    it('should fall back to name="og:description" meta tag when other description formats are missing', () => {
      const nameOgHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta name="og:description" content="Name OpenGraph description fallback">
          </head>
          <body>
            <h1>Heading</h1>
          </body>
        </html>
      `;

      const result = parseHtml(nameOgHtml, true);
      expect(result.metaDescription).toBe('Name OpenGraph description fallback');
    });
  });

  describe('Failure Case 1 - Missing elements', () => {
    it('should return empty values and 0 counts for clean page with missing SEO fields', () => {
      const minimalHtml = `
        <!DOCTYPE html>
        <html>
          <head></head>
          <body>
            <p>Plain body with no title, description, h1 or images.</p>
          </body>
        </html>
      `;

      const result = parseHtml(minimalHtml, true);

      expect(result.title).toBe('');
      expect(result.metaDescription).toBe('');
      expect(result.h1Count).toBe(0);
      expect(result.totalImages).toBe(0);
      expect(result.imagesMissingAlt).toBe(0);
      expect(result.wordCount).toBe(9);
    });
  });

  describe('Failure Case 2 - Empty or malformed HTML', () => {
    it('should handle empty string gracefully and return default object', () => {
      const result = parseHtml('', true);

      expect(result).toEqual({
        title: '',
        metaDescription: '',
        h1Count: 0,
        totalImages: 0,
        imagesMissingAlt: 0,
        wordCount: 0,
      });
    });

    it('should handle null or undefined rawText gracefully and return default object', () => {
      const resultNull = parseHtml(null, true);
      const resultUndefined = parseHtml(undefined, true);

      const expectedDefaults = {
        title: '',
        metaDescription: '',
        h1Count: 0,
        totalImages: 0,
        imagesMissingAlt: 0,
        wordCount: 0,
      };

      expect(resultNull).toEqual(expectedDefaults);
      expect(resultUndefined).toEqual(expectedDefaults);
    });

    it('should handle severely malformed HTML string gracefully and return defaults or best-effort values without crashing', () => {
      const malformedHtml = `
        <<h1<<>>>My Title<<<<
        <img src="incomplete.jpg"
        <h1 Test Malformed Header
        text text text
      `;

      let result;
      expect(() => {
        result = parseHtml(malformedHtml, true);
      }).not.toThrow();

      expect(result).toBeDefined();
      expect(typeof result.title).toBe('string');
      expect(typeof result.h1Count).toBe('number');
      expect(typeof result.totalImages).toBe('number');
      expect(typeof result.imagesMissingAlt).toBe('number');
      expect(typeof result.wordCount).toBe('number');
    });
  });
});
