"use client";

import { ShoppingBag } from "lucide-react";

type DashboardLoadingStateProps = {
  message?: string;
};

export function DashboardLoadingState({
  message = "Setting up your dashboard...",
}: DashboardLoadingStateProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-10">
      <div className="relative w-full max-w-md overflow-hidden rounded-[32px] border border-violet-200/70 bg-gradient-to-br from-white via-violet-50 to-fuchsia-100 px-8 py-12 text-center shadow-[0_24px_80px_rgba(109,40,217,0.18)] dark:border-violet-500/20 dark:from-[#160f29] dark:via-[#24113f] dark:to-[#30114d]">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(196,181,253,0.45),transparent_42%),radial-gradient(circle_at_bottom,rgba(244,114,182,0.18),transparent_35%)]"
        />
        <div className="relative flex flex-col items-center">
          <div className="relative flex size-24 items-center justify-center rounded-full bg-white/80 shadow-[0_18px_50px_rgba(109,40,217,0.22)] ring-1 ring-violet-200/80 backdrop-blur dark:bg-white/10 dark:ring-violet-300/20">
            <div className="absolute inset-0 rounded-full border-2 border-violet-300/60 border-t-violet-600 animate-spin [animation-duration:2.4s] dark:border-violet-400/20 dark:border-t-violet-300" />
            <div className="absolute inset-3 rounded-full border border-fuchsia-300/60 animate-ping opacity-70 dark:border-fuchsia-300/30" />
            <ShoppingBag className="relative z-10 size-10 animate-bounce text-violet-700 [animation-duration:1.6s] dark:text-violet-200" strokeWidth={2.2} />
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.35em] text-violet-700/80 dark:text-violet-200/80">
            Herbiz Reach
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Loading your dashboard
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600 dark:text-violet-100/80">
            {message}
          </p>

          <div className="mt-8 flex items-center gap-2" aria-hidden>
            <span className="size-2 rounded-full bg-violet-500 animate-bounce [animation-delay:-0.25s]" />
            <span className="size-2 rounded-full bg-fuchsia-500 animate-bounce [animation-delay:-0.1s]" />
            <span className="size-2 rounded-full bg-violet-400 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}
