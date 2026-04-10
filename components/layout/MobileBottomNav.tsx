"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/stores/useChatStore";
import { ownerNav } from "./nav-config";
import { ThemeToggle } from "./ThemeToggle";

export function MobileBottomNav() {
  const pathname = usePathname();
  const unreadBump = useChatStore((s) => s.unreadBump);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-between border-t border-[var(--border-default)] bg-[var(--bg-card)] px-2 pb-safe shadow-[var(--shadow-md)] md:hidden">
      <div className="flex flex-1 justify-around">
        {ownerNav.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const showDot = item.href === "/chat" && unreadBump > 0;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex min-h-11 min-w-11 flex-col items-center justify-center gap-0.5 rounded-[var(--radius-md)] px-2 text-[10px] font-medium",
                active ? "text-[var(--brand-primary)]" : "text-[var(--text-muted)]",
              )}
            >
              <Icon className="size-5" />
              <span>{item.label}</span>
              {showDot ? (
                <span className="absolute right-1 top-1 size-2 rounded-full bg-[var(--danger)]" />
              ) : null}
            </Link>
          );
        })}
      </div>
      <div className="flex shrink-0 border-l border-[var(--border-default)] pl-1">
        <ThemeToggle />
      </div>
    </nav>
  );
}
