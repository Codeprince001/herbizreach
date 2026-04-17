import { Skeleton } from "@/components/ui/skeleton";

function MetricCardSkeleton() {
  return (
    <div className="min-w-[140px] shrink-0 snap-start rounded-2xl bg-[var(--bg-card)] p-3.5 shadow-[var(--shadow-sm)] ring-1 ring-[var(--border-default)] md:min-w-0">
      <div className="flex items-start justify-between gap-2">
        <Skeleton className="h-3 w-14 rounded-md" />
        <Skeleton className="size-9 shrink-0 rounded-full" />
      </div>
      <Skeleton className="mt-2 h-8 w-16 max-w-[55%]" />
      <Skeleton className="mt-1.5 h-3 w-28 max-w-[90%]" />
    </div>
  );
}

function ProductRowSkeleton() {
  return (
    <div className="flex overflow-hidden rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] shadow-[var(--shadow-sm)]">
      <Skeleton className="h-[5.5rem] w-[min(32%,7.5rem)] shrink-0 rounded-none sm:w-32" />
      <div className="min-w-0 flex-1 space-y-2 p-3">
        <Skeleton className="h-4 w-3/5 max-w-[240px]" />
        <Skeleton className="h-3 w-full max-w-md" />
        <Skeleton className="h-3 w-4/5 max-w-sm" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="mt-2 h-8 w-36 rounded-md" />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div
      className="space-y-6 md:space-y-8"
      aria-busy="true"
      aria-label="Loading dashboard"
    >
      <div className="relative -mx-4 min-h-[200px] overflow-hidden rounded-b-[28px] bg-gradient-to-br from-[#4c1d95] via-[#6d28d9] to-[#a78bfa] px-4 pb-8 pt-4 md:mx-0 md:min-h-[240px] md:rounded-3xl md:px-8 md:pb-10 md:pt-6">
        <div className="mb-6 flex items-center justify-between md:hidden">
          <Skeleton className="h-10 w-36 rounded-lg bg-white/20" />
          <div className="flex items-center gap-1">
            <Skeleton className="size-10 shrink-0 rounded-full bg-white/20" />
            <Skeleton className="size-10 shrink-0 rounded-full bg-white/20" />
          </div>
        </div>

        <div className="relative z-10 max-w-xl pb-2 pr-[42%] md:max-w-2xl md:pr-[min(340px,46%)]">
          <Skeleton className="h-9 w-full max-w-[280px] rounded-lg bg-white/25 md:h-11 md:max-w-md" />
          <Skeleton className="mt-3 h-5 w-full max-w-xs rounded-lg bg-white/20 md:mt-4 md:h-6 md:max-w-lg" />
          <Skeleton className="mt-4 h-9 w-36 rounded-lg bg-white/20" />
        </div>

        <div
          className="pointer-events-none absolute bottom-0 right-0 top-[4.25rem] z-0 w-[52%] max-w-[200px] sm:max-w-[220px] md:bottom-6 md:right-6 md:top-1/2 md:h-[min(300px,calc(100%-3rem))] md:w-[min(42vw,300px)] md:max-w-none md:-translate-y-1/2"
          aria-hidden
        >
          <Skeleton className="ml-auto h-full w-full max-w-[180px] rounded-2xl bg-white/10 md:max-w-[260px]" />
        </div>
      </div>

      <div className="-mx-1">
        <div className="flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-4 md:gap-4 md:overflow-visible [&::-webkit-scrollbar]:hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <MetricCardSkeleton key={i} />
          ))}
        </div>
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <Skeleton className="h-6 w-36 rounded-md" />
          <Skeleton className="h-4 w-24 rounded-md" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <ProductRowSkeleton key={i} />
          ))}
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3">
        <Skeleton className="min-h-[104px] rounded-2xl" />
        <Skeleton className="min-h-[104px] rounded-2xl" />
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-6 w-52 max-w-[85%] rounded-md" />
          <Skeleton className="h-4 w-full max-w-md rounded-md" />
        </div>
        <Skeleton className="h-[220px] w-full rounded-2xl sm:h-[260px] md:h-[300px]" />
      </div>

      <div className="flex flex-wrap gap-2 md:flex">
        <Skeleton className="h-11 min-h-11 w-36 rounded-[var(--radius-md)]" />
        <Skeleton className="h-11 min-h-11 w-28 rounded-[var(--radius-md)]" />
      </div>
    </div>
  );
}
