"use client";

import { cn } from "@/lib/utils";

export function EngagementChart({
  data,
}: {
  data: { date: string; count: number }[];
}) {
  const max = Math.max(1, ...data.map((d) => d.count));
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-card)] p-4">
      <h3 className="mb-4 font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--text-primary)]">
        Views (last 7 days)
      </h3>
      <div className="flex h-32 items-end gap-1">
        {data.map((d) => (
          <div
            key={d.date}
            className="flex flex-1 flex-col items-center gap-1"
            title={`${d.date}: ${d.count}`}
          >
            <div
              className={cn(
                "w-full max-w-[24px] rounded-t-[var(--radius-sm)] bg-[var(--brand-primary)] opacity-90",
              )}
              style={{ height: `${(d.count / max) * 100}%`, minHeight: d.count ? "4px" : "0" }}
            />
            <span className="text-[10px] text-[var(--text-muted)]">
              {d.date.slice(5)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
