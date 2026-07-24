import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer({ toasts, onRemove }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`
              pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-lg border backdrop-blur-md
              transition-all duration-300 animate-fade-in-up
              ${
                isSuccess
                  ? 'bg-slate-900 text-emerald-300 border-emerald-500/30'
                  : isError
                  ? 'bg-slate-900 text-red-300 border-red-500/30'
                  : 'bg-slate-900 text-slate-200 border-slate-700'
              }
            `}
          >
            {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />}
            {isError && <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />}
            {!isSuccess && !isError && <Info className="w-5 h-5 text-sky-400 mt-0.5 shrink-0" />}

            <div className="flex-1 text-sm font-medium leading-snug">
              {toast.message}
            </div>

            <button
              onClick={() => onRemove(toast.id)}
              className="text-slate-400 hover:text-white transition-colors p-0.5 rounded-lg shrink-0"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
