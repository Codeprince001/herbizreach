"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PublicLocaleOption } from "@/types/store.types";

type Props = {
  activeLocales: PublicLocaleOption[] | undefined;
  /** Locale applied to this page, or null for English. */
  currentLocale: string | null | undefined;
  className?: string;
};

export function StoreLanguageSwitcher({ activeLocales, currentLocale, className }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const list = activeLocales ?? [];
  if (list.length === 0) return null;

  const applied = currentLocale ?? null;

  function go(next: string | null) {
    const p = new URLSearchParams(searchParams?.toString() ?? "");
    if (!next) p.delete("locale");
    else p.set("locale", next);
    const q = p.toString();
    router.push(q ? `${pathname}?${q}` : pathname);
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--bg-card)]/80 p-2",
        className,
      )}
      role="navigation"
      aria-label="Store language"
    >
      <span className="px-1 text-xs font-medium uppercase text-[var(--text-muted)]">Language</span>
      <Button
        type="button"
        size="sm"
        variant={applied ? "ghost" : "secondary"}
        className="h-8 min-h-8"
        onClick={() => go(null)}
      >
        English
      </Button>
      {list.map((loc) => (
        <Button
          key={loc.code}
          type="button"
          size="sm"
          variant={applied === loc.code ? "secondary" : "ghost"}
          className="h-8 min-h-8"
          onClick={() => go(loc.code)}
        >
          <span className="sr-only">{loc.labelEnglish}</span>
          <span aria-hidden>{loc.labelNative}</span>
        </Button>
      ))}
    </div>
  );
}
