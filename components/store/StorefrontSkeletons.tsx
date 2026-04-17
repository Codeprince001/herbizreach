import { Skeleton } from "@/components/ui/skeleton";

function StoreProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-card)] shadow-[var(--shadow-sm)]">
      <Skeleton className="aspect-square w-full rounded-none" />
      <div className="space-y-2 p-3 md:p-4">
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
      </div>
    </div>
  );
}

/** Shown while the public catalog route (`/store/[slug]`) resolves (RSC + slow API). */
export function StoreCatalogPageSkeleton() {
  return (
    <div
      className="min-h-screen bg-[var(--bg-base)]"
      aria-busy="true"
      aria-label="Loading store"
    >
      <header className="relative overflow-hidden border-b border-[var(--border-default)]">
        <Skeleton className="h-40 w-full rounded-none md:h-52" />
        <div className="mx-auto max-w-5xl px-4 py-8 md:py-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0 flex-1 space-y-3">
              <Skeleton className="h-9 w-3/4 max-w-md md:h-11" />
              <Skeleton className="h-4 w-full max-w-xl" />
              <Skeleton className="h-4 max-w-lg" style={{ width: "85%" }} />
            </div>
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-11 min-w-[9rem] flex-1 rounded-[var(--radius-md)] md:flex-none" />
              <Skeleton className="h-11 w-32 rounded-[var(--radius-md)]" />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 md:py-10">
        <Skeleton className="mb-6 h-7 w-36" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
          {Array.from({ length: 6 }, (_, i) => (
            <StoreProductCardSkeleton key={i} />
          ))}
        </div>
      </main>
    </div>
  );
}

/** Shown while a public product detail route resolves. */
export function StoreProductPageSkeleton() {
  return (
    <div
      className="min-h-screen bg-[var(--bg-base)]"
      aria-busy="true"
      aria-label="Loading product"
    >
      <header className="border-b border-[var(--border-default)] bg-[var(--bg-subtle)]">
        <div className="mx-auto max-w-5xl px-4 py-6 md:py-8">
          <Skeleton className="mb-4 h-4 w-56 md:w-72" />
          <Skeleton className="h-4 w-full max-w-xl" />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-20 pt-6 md:pb-24 md:pt-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-12">
          <div className="mx-auto w-full max-w-lg space-y-3 lg:mx-0 lg:max-w-none">
            <Skeleton className="aspect-[4/5] w-full rounded-2xl lg:aspect-square" />
            <div className="flex gap-2">
              <Skeleton className="h-14 w-14 shrink-0 rounded-lg" />
              <Skeleton className="h-14 w-14 shrink-0 rounded-lg" />
              <Skeleton className="h-14 w-14 shrink-0 rounded-lg" />
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-9 w-4/5 max-w-md" />
            <Skeleton className="h-7 w-32" />
            <div className="space-y-2 pt-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
            </div>
            <div className="flex flex-wrap gap-2 pt-4">
              <Skeleton className="h-11 w-40 rounded-[var(--radius-md)]" />
              <Skeleton className="h-11 w-36 rounded-[var(--radius-md)]" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
