import React from 'react';
import { Search, RotateCcw, RefreshCw, AlertCircle, Globe } from 'lucide-react';
import Input from './ui/Input';
import Button from './ui/Button';

export default function AuditForm({
  url,
  setUrl,
  onSubmit,
  onReset,
  onRetry,
  loading,
  error,
  hasResults,
}) {
  return (
    <section className="px-4 pb-10 sm:pb-14">
      <div className="max-w-2xl mx-auto">
        {/* Glassmorphic Input Card */}
        <div className="relative rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/40 backdrop-blur-sm shadow-glass p-6 sm:p-8">
          <form onSubmit={onSubmit} className="space-y-4">
            {/* Reusable Input Component */}
            <div>
              <label htmlFor="url-input" className="sr-only">
                Website URL
              </label>
              <Input
                id="url-input"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                disabled={loading}
                error={!!error}
                icon={Globe}
                required
                className="py-3.5 sm:py-4"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
              {/* Analyze Submit Button */}
              <Button
                type="submit"
                variant="primary"
                loading={loading}
                disabled={loading}
                className="flex-1 sm:flex-none"
              >
                {!loading && <Search className="w-4 h-4 mr-2" strokeWidth={2.5} />}
                <span>{loading ? 'Analyzing…' : 'Analyze'}</span>
              </Button>

              {/* Reset Button */}
              {hasResults && !loading && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onReset}
                  className="flex-1 sm:flex-none"
                >
                  <RotateCcw className="w-4 h-4 mr-2" strokeWidth={2} />
                  <span>Reset</span>
                </Button>
              )}
            </div>
          </form>

          {/* Error Banner with Retry Button */}
          {error && (
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3.5 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 animate-fade-in">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" strokeWidth={2} />
                <p className="text-sm text-red-700 dark:text-red-400 leading-relaxed">{error}</p>
              </div>

              {onRetry && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onRetry}
                  disabled={loading}
                  className="
                    self-start sm:self-auto px-3 py-1.5 h-auto text-xs font-semibold
                    text-red-700 dark:text-red-400 bg-red-100/60 dark:bg-red-950/40
                    hover:bg-red-200/60 dark:hover:bg-red-900/40
                  "
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                  <span>Retry</span>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
