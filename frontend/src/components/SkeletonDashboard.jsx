import React from 'react';
import Card from './ui/Card';

export default function SkeletonDashboard() {
  const skeletonCards = Array.from({ length: 8 });

  return (
    <section className="px-4 pb-16 sm:pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 sm:mb-8 text-center">
          <div className="h-6 w-36 bg-slate-200 dark:bg-slate-800 rounded-lg mx-auto animate-pulse mb-2" />
          <div className="h-4 w-56 bg-slate-100 dark:bg-slate-900 rounded-md mx-auto animate-pulse" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skeletonCards.map((_, index) => (
            <Card
              key={index}
              className="p-5 sm:p-6 animate-pulse"
            >
              {/* Icon placeholder */}
              <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-900 mb-3.5" />
              {/* Label placeholder */}
              <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded mb-2" />
              {/* Value placeholder */}
              <div className="h-7 w-28 bg-slate-300 dark:bg-slate-700 rounded mb-1.5" />
              {/* Subtitle placeholder */}
              <div className="h-3 w-36 bg-slate-100 dark:bg-slate-900 rounded" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
