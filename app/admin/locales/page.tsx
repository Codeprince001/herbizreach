"use client";

import { Languages } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { SectionError } from "@/components/shared/SectionError";
import { Switch } from "@/components/ui/switch";
import { useAdminLocales, usePatchAdminLocale } from "@/hooks/useAdmin";
import { toast } from "sonner";

export default function AdminLocalesPage() {
  const { data: locales, isLoading, isError, refetch } = useAdminLocales();
  const patch = usePatchAdminLocale();

  if (isLoading) {
    return <LoadingSkeleton />;
  }
  if (isError || !locales) {
    return <SectionError message="Could not load languages." onRetry={() => void refetch()} />;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        className="!px-0"
        title="Storefront languages"
        description="Turn optional languages on or off for the whole platform. English stays the canonical catalog language; sellers add translations only for enabled locales."
      />

      <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-card)]">
        <div className="flex items-center gap-2 border-b border-[var(--border-default)] px-4 py-3">
          <Languages className="size-5 text-[var(--brand-primary)]" aria-hidden />
          <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--text-primary)]">
            Optional locales
          </h2>
        </div>
        <ul className="divide-y divide-[var(--border-default)]">
          {locales.map((row) => (
            <li
              key={row.code}
              className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p className="font-mono text-xs font-medium uppercase text-[var(--text-muted)]">
                  {row.code}
                </p>
                <p className="mt-0.5 text-sm font-medium text-[var(--text-primary)]">{row.labelEnglish}</p>
                <p className="text-sm text-[var(--text-secondary)]">{row.labelNative}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-[var(--text-muted)]">
                  {row.isEnabled ? "Enabled" : "Disabled"}
                </span>
                <Switch
                  checked={row.isEnabled}
                  disabled={patch.isPending}
                  onCheckedChange={(next) => {
                    patch.mutate(
                      { code: row.code, isEnabled: next },
                      {
                        onError: () => toast.error("Could not update language."),
                      },
                    );
                  }}
                  aria-label={`${row.isEnabled ? "Disable" : "Enable"} ${row.labelEnglish}`}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
