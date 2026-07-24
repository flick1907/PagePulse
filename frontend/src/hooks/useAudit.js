import { useState, useCallback, useRef } from 'react';
import { runAudit } from '@/services/auditService';

/**
 * Custom hook to manage the audit lifecycle:
 * URL input state, loading, results, error handling, retry support, and auto-scroll.
 */
export function useAudit(addToast) {
  const [url, setUrl] = useState('');
  const [lastAuditedUrl, setLastAuditedUrl] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const resultsRef = useRef(null);

  const executeAudit = useCallback(async (targetUrl) => {
    const trimmedUrl = targetUrl.trim();
    if (!trimmedUrl) {
      const errMsg = 'Please enter a URL to analyze.';
      setError(errMsg);
      if (addToast) addToast(errMsg, 'error');
      return;
    }

    // Client-side pre-validation
    if (!/^https?:\/\//i.test(trimmedUrl)) {
      const errMsg = 'Invalid URL: Please prefix the URL with http:// or https://';
      setError(errMsg);
      if (addToast) addToast(errMsg, 'error');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);
    setLastAuditedUrl(trimmedUrl);

    // Trigger smooth auto-scroll to dashboard section
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);

    try {
      const data = await runAudit(trimmedUrl);
      setResults(data);
      if (addToast) {
        addToast(`Audit completed in ${data.responseTime}ms!`, 'success');
      }
    } catch (err) {
      if (err.isCanceled) {
        return; // Ignore canceled requests cleanly
      }
      const message =
        err.response?.data?.message ||
        err.message ||
        'Failed to connect to backend server. Please check your connection.';
      setError(message);
      if (addToast) addToast(message, 'error');
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  const handleSubmit = useCallback((e) => {
    e?.preventDefault();
    executeAudit(url);
  }, [executeAudit, url]);

  const handleRetry = useCallback(() => {
    if (lastAuditedUrl) {
      setUrl(lastAuditedUrl);
      executeAudit(lastAuditedUrl);
    }
  }, [executeAudit, lastAuditedUrl]);

  const handleReset = useCallback(() => {
    setUrl('');
    setLastAuditedUrl('');
    setResults(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    url,
    setUrl,
    results,
    loading,
    error,
    resultsRef,
    handleSubmit,
    handleRetry,
    handleReset,
  };
}
