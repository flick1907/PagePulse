import React from 'react';
import { HelpCircle } from 'lucide-react';
import Button from './ui/Button';

export default function NotFound({ onGoHome }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-500 mb-6">
        <HelpCircle className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
        Page Not Found
      </h2>
      <p className="max-w-md mx-auto text-slate-500 dark:text-slate-400 mb-6">
        The resource or route you are looking for does not exist.
      </p>
      {onGoHome && (
        <Button variant="primary" onClick={onGoHome}>
          Go back to Audit
        </Button>
      )}
    </div>
  );
}
