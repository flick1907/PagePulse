import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="
        p-2 rounded-xl border border-slate-200 dark:border-slate-800
        bg-white dark:bg-slate-900/60 text-slate-500 dark:text-slate-400
        hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-700 dark:hover:text-slate-200
        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-400
      "
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 animate-fade-in text-amber-400" />
      ) : (
        <Moon className="w-5 h-5 animate-fade-in text-slate-600" />
      )}
    </button>
  );
}
