export default function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-slate-100">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm text-slate-400">
          Built for{' '}
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-slate-500 underline decoration-slate-300 underline-offset-2 hover:text-brand-600 hover:decoration-brand-300 transition-colors duration-200"
          >
            Digital Heroes Training Task
          </a>
        </p>
      </div>
    </footer>
  );
}
