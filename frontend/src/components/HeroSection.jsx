import { Activity } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="pt-20 pb-10 sm:pt-28 sm:pb-14 px-4 text-center">
      <div className="flex items-center justify-center gap-2.5 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-500/10">
          <Activity className="w-5 h-5 text-brand-500" strokeWidth={2.5} />
        </div>
        <span className="text-sm font-semibold tracking-wide text-brand-600 uppercase">
          Website Auditor
        </span>
      </div>

      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-4">
        Page{' '}
        <span className="bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">
          Pulse
        </span>
      </h1>

      <p className="max-w-lg mx-auto text-base sm:text-lg text-slate-500 leading-relaxed font-normal">
        Instantly analyze any webpage for performance, SEO,
        <br className="hidden sm:block" />
        and accessibility insights.
      </p>
    </section>
  );
}
