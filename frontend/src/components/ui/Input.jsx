import React from 'react';

export default function Input({
  id,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  disabled = false,
  error = false,
  className = '',
  icon: Icon,
  ...props
}) {
  return (
    <div className="relative w-full">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
          <Icon className="w-5 h-5" strokeWidth={2} />
        </div>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`
          w-full rounded-xl text-base text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500
          bg-slate-50/80 dark:bg-slate-900/60 border shadow-input outline-none transition-all duration-200
          focus:bg-white dark:focus:bg-slate-900 focus:ring-2 disabled:opacity-60 disabled:cursor-not-allowed
          ${Icon ? 'pl-11' : 'px-4'}
          ${
            error
              ? 'border-red-300 dark:border-red-950 focus:border-red-400 focus:ring-red-100 dark:focus:ring-red-950/50'
              : 'border-slate-200 dark:border-slate-800/80 focus:border-brand-400 focus:ring-brand-100 dark:focus:ring-brand-950/30'
          }
          ${className}
        `}
        {...props}
      />
    </div>
  );
}
