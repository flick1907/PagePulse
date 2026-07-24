import React from 'react';

export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  icon: Icon,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white shadow-sm hover:shadow-md focus:ring-brand-300 dark:focus:ring-brand-400 dark:focus:ring-offset-slate-950',
    secondary: 'bg-transparent border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-700 dark:hover:text-slate-200 focus:ring-slate-200 dark:focus:ring-slate-800 dark:focus:ring-offset-slate-950',
    ghost: 'bg-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-700 dark:hover:text-slate-200 focus:ring-slate-200 dark:focus:ring-slate-800 dark:focus:ring-offset-slate-950',
    danger: 'bg-red-500 hover:bg-red-600 active:bg-red-700 text-white shadow-sm focus:ring-red-300 dark:focus:ring-red-400 dark:focus:ring-offset-slate-950',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm sm:py-3',
    lg: 'px-6 py-3.5 text-base sm:py-4',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <span className="spinner mr-2 border-t-white" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4 mr-2" strokeWidth={2.5} />}
          {children}
        </>
      )}
    </button>
  );
}
