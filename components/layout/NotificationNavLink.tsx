"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNotificationUnreadCount } from "@/hooks/useNotifications";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export function NotificationNavLink({ className }: Props) {
  const { data } = useNotificationUnreadCount();
  const n = data?.count ?? 0;

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn("relative", className)}
      aria-label={n > 0 ? `Notification, ${n} unread` : "Notification"}
      asChild
    >
      <Link href="/notifications">
        <Bell className="size-5 text-[var(--text-muted)]" />
        {n > 0 ? (
          <span className="absolute -right-0.5 -top-0.5 flex min-h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[var(--danger)] px-1 text-[10px] font-bold leading-none text-white">
            {n > 99 ? "99+" : n}
          </span>
        ) : null}
      </Link>
    </Button>
  );
}
