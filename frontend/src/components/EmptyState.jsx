import React from 'react';
import { ShieldCheck, Zap, BarChart3 } from 'lucide-react';
import Card from './ui/Card';

export default function EmptyState() {
  const steps = [
    {
      icon: Zap,
      title: 'Real-time Metrics',
      desc: 'Measure performance, title attributes, word counts, and response latency instantly.',
    },
    {
      icon: ShieldCheck,
      title: 'SEO Audit',
      desc: 'Detect missing image ALT texts, meta descriptions, and check H1 headings.',
    },
    {
      icon: BarChart3,
      title: 'Clean Reports',
      desc: 'Download your full page analysis report in JSON format for offline sharing.',
    },
  ];

  return (
    <section className="px-4 pb-16 sm:pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <Card
                key={idx}
                className="p-6 text-center md:text-left hoverEffect border-dashed border-2 border-slate-200 dark:border-slate-800"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 text-brand-500 mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
