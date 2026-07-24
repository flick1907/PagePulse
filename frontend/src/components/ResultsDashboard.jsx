import React from 'react';
import {
  CheckCircle2,
  Timer,
  FileText,
  Heading1,
  Image,
  ImageOff,
  Type,
  TextQuote,
  Copy,
  Download,
} from 'lucide-react';
import MetricCard from './MetricCard';
import SkeletonDashboard from './SkeletonDashboard';
import Button from './ui/Button';
import { copyJsonToClipboard, downloadJsonReport } from '@/utils/exportUtils';

function formatStatus(code) {
  if (code >= 200 && code < 300) return `${code} OK`;
  if (code >= 300 && code < 400) return `${code} Redirect`;
  if (code >= 400 && code < 500) return `${code} Client Error`;
  if (code >= 500) return `${code} Server Error`;
  return `${code}`;
}

export default function ResultsDashboard({
  results,
  loading,
  resultsRef,
  targetUrl,
  addToast,
}) {
  if (loading) {
    return (
      <div ref={resultsRef}>
        <SkeletonDashboard />
      </div>
    );
  }

  if (!results) return <div ref={resultsRef} />;

  const handleCopy = async () => {
    const success = await copyJsonToClipboard(results);
    if (success && addToast) {
      addToast('Audit JSON report copied to clipboard!', 'success');
    } else if (addToast) {
      addToast('Failed to copy report to clipboard.', 'error');
    }
  };

  const handleDownload = () => {
    downloadJsonReport(results, targetUrl);
    if (addToast) {
      addToast('Report file downloaded successfully.', 'success');
    }
  };

  const metrics = [
    {
      icon: CheckCircle2,
      label: 'Status',
      value: formatStatus(results.status),
      tooltipContent: 'The HTTP status code returned by the server. 200 OK signals a successful delivery.',
    },
    {
      icon: Timer,
      label: 'Response Time',
      value: results.responseTime,
      tooltipContent: 'The time taken (in milliseconds) from sending the request to completing HTML retrieval.',
    },
    {
      icon: FileText,
      label: 'Word Count',
      value: results.wordCount,
      tooltipContent: 'Total visible word tokens inside the document body, ignoring style, script, and meta nodes.',
    },
    {
      icon: Heading1,
      label: 'H1 Tags',
      value: results.h1Count,
      tooltipContent: 'The count of H1 header tags. SEO guidelines recommend exactly one H1 per page.',
    },
    {
      icon: Image,
      label: 'Total Images',
      value: results.totalImages,
      tooltipContent: 'Total HTML img element tags detected on the target webpage.',
    },
    {
      icon: ImageOff,
      label: 'Missing ALT',
      value: results.imagesMissingAlt,
      tooltipContent: 'Images missing alternative descriptive text. Alt descriptions are critical for web accessibility.',
      subtitle: results.totalImages > 0
        ? `${Math.round((results.imagesMissingAlt / results.totalImages) * 100)}% of images lack alt text`
        : 'No images found on page',
    },
    {
      icon: Type,
      label: 'Page Title',
      value: results.title || '—',
      tooltipContent: 'The title element defined in the page head. Critical for SEO search result visibility.',
      subtitle: results.title
        ? `${results.title.length} characters`
        : 'No title tag found',
    },
    {
      icon: TextQuote,
      label: 'Meta Description',
      value: results.metaDescription || '—',
      tooltipContent: 'The descriptive snippet used by search engine result cards.',
      subtitle: results.metaDescription
        ? `${results.metaDescription.length} characters`
        : 'No meta description found',
    },
  ];

  return (
    <section ref={resultsRef} className="px-4 pb-16 sm:pb-20 scroll-mt-20 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b border-slate-100 dark:border-slate-800/80">
          <div className="text-center sm:text-left">
            <h2 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200">
              Audit Results
            </h2>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">
              Analysis complete — here is what we found.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopy}
              className="py-2"
            >
              <Copy className="w-3.5 h-3.5 mr-1.5" />
              <span>Copy JSON</span>
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleDownload}
              className="py-2"
            >
              <Download className="w-3.5 h-3.5 mr-1.5" />
              <span>Download Report</span>
            </Button>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <MetricCard
              key={metric.label}
              icon={metric.icon}
              label={metric.label}
              value={metric.value}
              subtitle={metric.subtitle}
              tooltipContent={metric.tooltipContent}
              delay={50 + index * 50}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
