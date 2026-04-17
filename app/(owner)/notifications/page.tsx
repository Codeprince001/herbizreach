"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Archive, Check, CheckCheck, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { SectionError } from "@/components/shared/SectionError";
import { Button } from "@/components/ui/button";
import { useNotificationMutations, useNotificationsList } from "@/hooks/useNotifications";
import { cn, formatDate } from "@/lib/utils";
import type { Notification } from "@/types/notification.types";

function severityRing(severity: Notification["severity"]): string {
  switch (severity) {
    case "ERROR":
      return "border-l-[var(--danger)]";
    case "WARNING":
      return "border-l-amber-500";
    case "SUCCESS":
      return "border-l-emerald-500";
    default:
      return "border-l-[var(--brand-primary)]";
  }
}

export default function NotificationsPage() {
  const [page, setPage] = useState(1);
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [includeArchived, setIncludeArchived] = useState(false);
  const limit = 20;

  const params = useMemo(
    () => ({ page, limit, unreadOnly, includeArchived }),
    [page, limit, unreadOnly, includeArchived],
  );

  const { data, isLoading, isError, refetch } = useNotificationsList(params);
  const { markRead, markAllRead, archive, remove } = useNotificationMutations();

  if (isLoading) {
    return <LoadingSkeleton />;
  }
  if (isError || !data) {
    return (
      <SectionError message="Could not load notifications." onRetry={() => void refetch()} />
    );
  }

  const { items, total, unreadTotal } = data;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader
          title="Notification"
          description="Stay on top of leads, messages, and account activity."
        />
        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant={unreadOnly ? "default" : "secondary"}
            size="sm"
            onClick={() => {
              setPage(1);
              setUnreadOnly((u) => !u);
            }}
          >
            Unread only
          </Button>
          <Button
            type="button"
            variant={includeArchived ? "default" : "secondary"}
            size="sm"
            onClick={() => {
              setPage(1);
              setIncludeArchived((a) => !a);
            }}
          >
            Include archived
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={unreadTotal === 0 || markAllRead.isPending}
            onClick={() => void markAllRead.mutateAsync()}
          >
            <CheckCheck className="mr-1.5 size-4" />
            Mark all read
          </Button>
        </div>
      </div>

      {unreadTotal > 0 ? (
        <p className="text-sm text-[var(--text-muted)]">
          {unreadTotal} unread notification{unreadTotal === 1 ? "" : "s"}
        </p>
      ) : null}

      {!items.length ? (
        <EmptyState
          title="You are all caught up"
          description={
            unreadOnly
              ? "No unread notifications right now."
              : "When customers message you or submit a lead, it shows up here."
          }
        />
      ) : (
        <ul className="space-y-3">
          {items.map((n) => (
            <li
              key={n.id}
              className={cn(
                "rounded-[var(--radius-lg)] border border-[var(--border-default)] border-l-4 bg-[var(--bg-card)] p-4 shadow-[var(--shadow-sm)]",
                severityRing(n.severity),
                !n.readAt ? "bg-[var(--bg-muted)]/40" : "",
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-[var(--text-primary)]">{n.title}</p>
                    <span className="rounded-full bg-[var(--bg-muted)] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[var(--text-muted)]">
                      {n.type}
                    </span>
                  </div>
                  {n.body ? (
                    <p className="text-sm text-[var(--text-secondary)]">{n.body}</p>
                  ) : null}
                  <p className="text-xs text-[var(--text-muted)]">{formatDate(n.createdAt)}</p>
                  {n.actionUrl ? (
                    <Link
                      href={n.actionUrl}
                      className="inline-block text-sm font-medium text-[var(--brand-primary)] hover:underline"
                      onClick={() => {
                        if (!n.readAt) {
                          void markRead.mutateAsync(n.id);
                        }
                      }}
                    >
                      Open related page
                    </Link>
                  ) : null}
                </div>
                <div className="flex shrink-0 flex-wrap gap-1">
                  {!n.readAt ? (
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon"
                      className="size-9"
                      aria-label="Mark as read"
                      disabled={markRead.isPending}
                      onClick={() => void markRead.mutateAsync(n.id)}
                    >
                      <Check className="size-4" />
                    </Button>
                  ) : null}
                  {!n.archivedAt ? (
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon"
                      className="size-9"
                      aria-label="Archive"
                      disabled={archive.isPending}
                      onClick={() => void archive.mutateAsync(n.id)}
                    >
                      <Archive className="size-4" />
                    </Button>
                  ) : null}
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="size-9 text-[var(--danger)]"
                    aria-label="Delete"
                    disabled={remove.isPending}
                    onClick={() => void remove.mutateAsync(n.id)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {totalPages > 1 ? (
        <div className="flex items-center justify-center gap-2 pt-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>
          <span className="text-sm text-[var(--text-muted)]">
            Page {page} of {totalPages}
          </span>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </Button>
        </div>
      ) : null}
    </div>
  );
}
