import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

function StatCardSkeleton() {
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-card)] p-4">
      <Skeleton className="h-3 w-16" />
      <Skeleton className="mt-3 h-8 w-20 max-w-[55%]" />
      <Skeleton className="mt-2 h-3 w-full max-w-[90%]" />
      <Skeleton className="mt-1.5 h-3 w-4/5 max-w-[75%]" />
    </div>
  );
}

function ChartPanelSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-card)] p-4 sm:p-5",
        className,
      )}
    >
      <Skeleton className="h-5 w-48 max-w-[70%]" />
      <Skeleton className="mt-2 h-3 w-64 max-w-[85%]" />
      <Skeleton className="mt-4 h-[220px] w-full sm:h-[260px] md:h-[300px] rounded-[var(--radius-md)]" />
    </div>
  );
}

/** Mirrors the admin layout shell while auth state hydrates. */
export function AdminShellSkeleton() {
  return (
    <div className="flex min-h-screen bg-[var(--bg-base)]" aria-busy="true" aria-label="Loading admin">
      <aside
        className="hidden w-[240px] shrink-0 flex-col border-r border-[var(--border-default)] bg-[var(--bg-card)] lg:flex"
        aria-hidden
      >
        <div className="flex h-14 items-center gap-2 border-b border-[var(--border-default)] px-4">
          <Skeleton className="size-6 shrink-0 rounded-md" />
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="flex flex-1 flex-col gap-1.5 p-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-11 w-full rounded-[var(--radius-md)]" />
          ))}
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-[var(--border-default)] bg-[var(--bg-card)]/95 px-4 backdrop-blur-md md:px-6">
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
            <Skeleton className="size-10 shrink-0 rounded-[var(--radius-md)] lg:hidden" />
            <Skeleton className="h-8 w-32 rounded-md sm:w-40" />
            <Skeleton className="hidden h-5 w-14 shrink-0 rounded sm:block" />
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Skeleton className="size-10 rounded-[var(--radius-md)]" />
            <Skeleton className="h-10 w-24 rounded-[var(--radius-md)]" />
          </div>
        </header>
        <main className="flex-1 px-4 py-6 md:px-6 md:py-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-8 w-56 max-w-[80%] md:h-9" />
              <Skeleton className="h-4 w-full max-w-xl" />
              <Skeleton className="h-4 max-w-lg" style={{ width: "72%" }} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Skeleton className="h-28 rounded-[var(--radius-lg)]" />
              <Skeleton className="h-28 rounded-[var(--radius-lg)]" />
            </div>
            <Skeleton className="h-48 w-full rounded-[var(--radius-lg)] md:h-56" />
          </div>
        </main>
      </div>
    </div>
  );
}

/** Placeholder for /admin overview while metrics load — matches stat cards + chart grids. */
export function AdminDashboardSkeleton() {
  return (
    <div className="space-y-8" aria-busy="true" aria-label="Loading dashboard">
      <div className="space-y-2">
        <Skeleton className="h-9 w-48 max-w-[90%] sm:w-56" />
        <Skeleton className="h-4 w-full max-w-2xl" />
        <Skeleton className="h-4 max-w-xl" style={{ width: "88%" }} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      <div className="space-y-8">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          <ChartPanelSkeleton />
          <ChartPanelSkeleton />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-card)] p-4 sm:p-5">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="mt-2 h-3 w-52 max-w-full" />
            <div className="mx-auto mt-6 flex max-w-xs justify-center">
              <Skeleton className="aspect-square w-[min(100%,200px)] rounded-full" />
            </div>
          </div>
          <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-card)] p-4 sm:p-5">
            <Skeleton className="h-5 w-40" />
            <ul className="mt-4 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <li
                  key={i}
                  className="flex justify-between gap-4 border-b border-[var(--border-default)] pb-2 last:border-0"
                >
                  <Skeleton className="h-4 flex-1 max-w-[60%]" />
                  <Skeleton className="h-4 w-10 shrink-0" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
