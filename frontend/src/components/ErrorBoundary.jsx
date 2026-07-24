import React from 'react';
import { AlertOctagon } from 'lucide-react';
import Button from './ui/Button';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-50 dark:bg-red-950/20 text-red-500 mb-6">
            <AlertOctagon className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Something went wrong
          </h2>
          <p className="max-w-md mx-auto text-slate-500 dark:text-slate-400 mb-6">
            An unexpected error occurred in the application view. Please reload or click the button below to recover.
          </p>
          <Button
            variant="primary"
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
          >
            Reload Application
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
