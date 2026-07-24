import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AuditForm from '@/components/AuditForm';
import ResultsDashboard from '@/components/ResultsDashboard';
import EmptyState from '@/components/EmptyState';
import Footer from '@/components/Footer';
import ToastContainer from '@/components/Toast';
import ErrorBoundary from '@/components/ErrorBoundary';
import NotFound from '@/components/NotFound';
import { ThemeProvider } from '@/context/ThemeContext';
import { useAudit } from '@/hooks/useAudit';
import { useToast } from '@/hooks/useToast';

function AppContent() {
  const { toasts, addToast, removeToast } = useToast();
  const {
    url,
    setUrl,
    results,
    loading,
    error,
    resultsRef,
    handleSubmit,
    handleRetry,
    handleReset,
  } = useAudit(addToast);

  const [path, setPath] = React.useState(window.location.pathname);

  React.useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigateHome = () => {
    window.history.pushState({}, '', '/');
    setPath('/');
  };

  const mainContent = (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AuditForm
          url={url}
          setUrl={setUrl}
          onSubmit={handleSubmit}
          onReset={handleReset}
          onRetry={handleRetry}
          loading={loading}
          error={error}
          hasResults={!!results}
        />
        
        {/* Render Results Dashboard or Empty State */}
        {results || loading ? (
          <ResultsDashboard
            results={results}
            loading={loading}
            resultsRef={resultsRef}
            targetUrl={url}
            addToast={addToast}
          />
        ) : (
          <EmptyState />
        )}
      </main>
      <Footer />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );

  return path === '/' ? mainContent : <NotFound onGoHome={navigateHome} />;
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </ErrorBoundary>
  );
}
