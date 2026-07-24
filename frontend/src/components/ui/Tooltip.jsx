import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

export default function Tooltip({ content, position = 'top', children }) {
  const [visible, setVisible] = useState(false);

  const positionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowStyles = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-slate-900 dark:border-t-slate-800',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-slate-900 dark:border-b-slate-800',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-slate-900 dark:border-l-slate-800',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-slate-900 dark:border-r-slate-800',
  };

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <button
        type="button"
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none"
        aria-label="More information"
      >
        {children || <HelpCircle className="w-3.5 h-3.5" />}
      </button>

      {visible && (
        <div
          role="tooltip"
          className={`
            absolute z-50 px-3 py-2 text-xs font-normal text-white bg-slate-900 dark:bg-slate-800
            rounded-lg shadow-lg w-52 pointer-events-none leading-relaxed transition-opacity duration-150 animate-fade-in
            ${positionStyles[position]}
          `}
        >
          {content}
          <div
            className={`
              absolute border-[5px] border-transparent
              ${arrowStyles[position]}
            `}
          />
        </div>
      )}
    </div>
  );
}
