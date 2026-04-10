"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { SectionError } from "@/components/shared/SectionError";
import { useAdminMetrics } from "@/hooks/useAdmin";

export default function AdminDashboardPage() {
  const { data, isLoading, isError, refetch } = useAdminMetrics();

  if (isLoading) {
    return <LoadingSkeleton />;
  }
  if (isError || !data) {
    return <SectionError message="Could not load admin metrics." onRetry={() => void refetch()} />;
  }

  const d = data as {
    users: { total: number; owners: number; customers: number; admins: number };
    products: { total: number; published: number };
    engagement: { pageViews: number; shareEvents: number; conversations: number; leads: number };
  };

  return (
    <div className="space-y-8">
      <PageHeader title="Platform overview" description="Aggregate stats across all tenants." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-card)] p-4">
          <p className="text-xs font-medium uppercase text-[var(--text-muted)]">Users</p>
          <p className="mt-1 text-2xl font-bold text-[var(--text-primary)]">{d.users.total}</p>
          <p className="text-xs text-[var(--text-muted)]">
            {d.users.owners} owners · {d.users.customers} customers · {d.users.admins} admins
          </p>
        </div>
        <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-card)] p-4">
          <p className="text-xs font-medium uppercase text-[var(--text-muted)]">Products</p>
          <p className="mt-1 text-2xl font-bold text-[var(--text-primary)]">{d.products.total}</p>
          <p className="text-xs text-[var(--text-muted)]">{d.products.published} published</p>
        </div>
        <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-card)] p-4">
          <p className="text-xs font-medium uppercase text-[var(--text-muted)]">Engagement</p>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            {d.engagement.pageViews} views · {d.engagement.shareEvents} shares
          </p>
          <p className="text-sm text-[var(--text-secondary)]">
            {d.engagement.conversations} chats · {d.engagement.leads} leads
          </p>
        </div>
      </div>
    </div>
  );
}
