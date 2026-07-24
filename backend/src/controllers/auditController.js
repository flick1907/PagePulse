import { isValidUrl } from '../utils/urlValidator.js';
import { performAudit } from '../services/auditService.js';

/**
 * Handles site auditing request.
 * POST /api/audit
 * 
 * Request body: { "url": "https://example.com" }
 */
export async function auditUrl(req, res) {
  const { url } = req.body;

  // 1. Validate empty or non-existent request body
  if (!url) {
    return res.status(400).json({
      success: false,
      message: 'Empty request: The "url" parameter is required.',
    });
  }

  // 2. Validate URL structure and scheme
  if (!isValidUrl(url)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid URL: Please provide a valid URL starting with http:// or https://.',
    });
  }

  try {
    // 3. Trigger audit service
    const result = await performAudit(url);
    return res.status(200).json(result);
  } catch (error) {
    // 4. Catch and format classification errors gracefully without crashing
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message,
      ...(error.responseTime !== undefined && { responseTime: error.responseTime }),
      ...(process.env.NODE_ENV === 'development' && { originalError: error.originalError }),
    });
  }
}
