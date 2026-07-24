import React from 'react';
import Card from './ui/Card';
import Tooltip from './ui/Tooltip';
import AnimatedNumber from './ui/AnimatedNumber';

export default function MetricCard({
  icon: Icon,
  label,
  value,
  subtitle,
  tooltipContent,
  delay = 0,
}) {
  const isNumberValue = typeof value === 'number';

  return (
    <Card
      hoverEffect
      className="p-5 sm:p-6 opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className="flex items-center justify-between mb-3.5">
        {/* Icon wrapper */}
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-brand-50 dark:bg-brand-950/30 text-brand-500 transition-colors duration-200">
          <Icon className="w-[18px] h-[18px]" strokeWidth={2} />
        </div>

        {/* Metric tooltip definition if available */}
        {tooltipContent && (
          <Tooltip content={tooltipContent} position="top" />
        )}
      </div>

      {/* Label */}
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
        {label}
      </p>

      {/* Value (Animated counter or static string) */}
      <p
        className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 leading-tight truncate"
        title={typeof value === 'string' ? value : undefined}
      >
        {isNumberValue ? (
          <AnimatedNumber value={value} />
        ) : (
          value
        )}
      </p>

      {/* Optional subtitle information */}
      {subtitle && (
        <p
          className="mt-1.5 text-xs text-slate-400 dark:text-slate-500 leading-snug line-clamp-2"
          title={subtitle}
        >
          {subtitle}
        </p>
      )}
    </Card>
  );
}
