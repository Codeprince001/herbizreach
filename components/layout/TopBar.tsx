"use client";

import { Bell, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuthStore } from "@/stores/useAuthStore";
import { ownerNav, ownerNavExtra } from "./nav-config";
import { ThemeToggle } from "./ThemeToggle";

const titles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/products": "Products",
  "/products/new": "New product",
  "/analytics": "Analytics",
  "/leads": "Leads",
  "/chat": "Messages",
  "/settings": "Store settings",
};

function titleForPath(path: string): string {
  if (path.startsWith("/products/") && path !== "/products/new") {
    return "Edit product";
  }
  return titles[path] ?? "HerBizReach";
}

export function TopBar() {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const mobileTitle = titleForPath(pathname);

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-3 border-b border-[var(--border-default)] bg-[var(--bg-base)]/95 px-4 backdrop-blur-md md:h-16 md:px-6">
      <div className="flex min-w-0 items-center gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="gap-4">
            <Link
              href="/dashboard"
              className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--brand-primary)]"
            >
              HerBizReach
            </Link>
            <nav className="flex flex-col gap-1 pt-4">
              {[...ownerNav, ...ownerNavExtra].map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex min-h-11 items-center gap-3 rounded-[var(--radius-md)] px-3 text-sm font-medium ${
                      active
                        ? "bg-[var(--brand-glow)] text-[var(--brand-primary)]"
                        : "text-[var(--text-secondary)] hover:bg-[var(--bg-muted)]"
                    }`}
                  >
                    <Icon className="size-5 shrink-0" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
        <Link
          href="/dashboard"
          className="hidden font-[family-name:var(--font-display)] text-lg font-bold text-[var(--brand-primary)] md:block"
        >
          HerBizReach
        </Link>
        <span className="truncate font-[family-name:var(--font-display)] text-base font-semibold text-[var(--text-primary)] md:hidden">
          {mobileTitle}
        </span>
      </div>

      <div className="flex items-center gap-1">
        <Button type="button" variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="size-5 text-[var(--text-muted)]" />
        </Button>
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-full border border-[var(--border-default)]"
              aria-label="Account"
            >
              <span className="text-xs font-bold text-[var(--brand-primary)]">
                {user?.fullName?.slice(0, 1).toUpperCase() ?? "?"}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <div className="px-2 py-1.5 text-xs text-[var(--text-muted)]">{user?.email}</div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                logout();
                window.location.href = "/login";
              }}
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
