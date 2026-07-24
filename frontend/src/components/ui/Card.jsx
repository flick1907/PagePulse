import React from 'react';

export default function Card({
  children,
  className = '',
  hoverEffect = false,
  ...props
}) {
  return (
    <div
      className={`
        rounded-2xl border border-slate-200/80 dark:border-slate-800/80
        bg-white dark:bg-slate-900/60
        shadow-card transition-all duration-300 ease-out
        ${hoverEffect ? 'hover:shadow-card-hover hover:-translate-y-0.5' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
