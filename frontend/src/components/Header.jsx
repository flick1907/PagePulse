import React from 'react';
import { Activity } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand logo */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-500/10 dark:bg-brand-500/20">
            <Activity className="w-4.5 h-4.5 text-brand-500" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Page<span className="text-brand-500">Pulse</span>
          </span>
        </div>

        {/* Action Toggle */}
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live Status
          </span>
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}
