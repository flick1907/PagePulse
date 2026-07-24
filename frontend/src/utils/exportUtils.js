/**
 * Copies the raw JSON string of the audit results to the user's clipboard.
 * 
 * @param {object} data - The audit result payload.
 * @returns {Promise<boolean>}
 */
export async function copyJsonToClipboard(data) {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    await navigator.clipboard.writeText(jsonString);
    return true;
  } catch (error) {
    console.error('Failed to copy JSON:', error);
    return false;
  }
}

/**
 * Initiates a browser download of the audit result report as a JSON file.
 * 
 * @param {object} data - The audit result payload.
 * @param {string} targetUrl - The target URL audited.
 */
export function downloadJsonReport(data, targetUrl) {
  try {
    const formattedUrl = targetUrl
      .replace(/https?:\/\//, '')
      .replace(/[^a-zA-Z0-9]/g, '_')
      .toLowerCase();
    
    const fileName = `page_pulse_audit_${formattedUrl || 'report'}.json`;
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  } catch (error) {
    console.error('Failed to download report:', error);
  }
}
