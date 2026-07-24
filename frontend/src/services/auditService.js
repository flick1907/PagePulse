import api from './api';

let activeController = null;

/**
 * Calls the backend audit endpoint with in-flight request deduplication and cancellation.
 * 
 * @param {string} url - The target URL to audit.
 * @returns {Promise<object>} The audit results.
 */
export async function runAudit(url) {
  // Cancel prior pending request if a new submission arrives
  if (activeController) {
    activeController.abort();
  }

  activeController = new AbortController();

  try {
    const response = await api.post(
      '/audit',
      { url },
      { signal: activeController.signal }
    );
    activeController = null;
    return response.data;
  } catch (error) {
    if (axiosIsCancel(error) || activeController?.signal.aborted) {
      const cancelError = new Error('Canceled duplicate request');
      cancelError.isCanceled = true;
      throw cancelError;
    }
    activeController = null;
    throw error;
  }
}

function axiosIsCancel(error) {
  return error.name === 'CanceledError' || error.name === 'AbortError';
}
