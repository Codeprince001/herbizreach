"use client";

import { Eye, RefreshCw, Share2, Sparkles, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { EngagementChart } from "@/components/analytics/EngagementChart";
import { StatCard } from "@/components/analytics/StatCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionError } from "@/components/shared/SectionError";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { useAnalyticsOverview } from "@/hooks/useAnalytics";
import { useLeads } from "@/hooks/useLeads";
import { useProducts } from "@/hooks/useProducts";
import { useAuthStore } from "@/stores/useAuthStore";
import { firstName, formatCurrency } from "@/lib/utils";

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const { data, isLoading, isError, refetch, isFetching } = useAnalyticsOverview();
  const { data: leads } = useLeads();
  const { data: allProducts } = useProducts();

  const views7d = data?.viewsLast7Days.reduce((a, b) => a + b.count, 0) ?? 0;
  const leadCount = leads?.length ?? 0;
  const viewById = useMemo(
    () => new Map(data?.products.map((p) => [p.productId, p.pageViews]) ?? []),
    [data?.products],
  );
  const recent = useMemo(() => {
    if (!allProducts?.length) return [];
    return [...allProducts]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 3);
  }, [allProducts]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError || !data) {
    return <SectionError message="Could not load dashboard." onRetry={() => void refetch()} />;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader
          title={`Welcome back, ${firstName(user?.fullName ?? "friend")} 👋`}
          description="Here is how your store is performing."
        />
        <Button
          type="button"
          variant="secondary"
          className="min-h-11 shrink-0 self-start"
          onClick={() => void refetch()}
          disabled={isFetching}
        >
          <RefreshCw className={`mr-2 size-4 ${isFetching ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          label="Post reach"
          value={data.totals.pageViews}
          icon={Eye}
          hint="All-time views"
          index={0}
        />
        <StatCard
          label="Engagement"
          value={views7d}
          icon={Sparkles}
          hint="Last 7 days"
          index={1}
        />
        <StatCard
          label="Shares"
          value={data.totals.shares}
          icon={Share2}
          index={2}
        />
        <StatCard label="Leads" value={leadCount} icon={Users} index={3} />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button asChild className="min-h-11">
          <Link href="/products/new">Add product</Link>
        </Button>
        <Button asChild variant="secondary" className="min-h-11">
          <Link
            href={
              user?.businessSlug
                ? `/store/${user.businessSlug}`
                : "/settings"
            }
          >
            View store
          </Link>
        </Button>
        <Button asChild variant="secondary" className="min-h-11">
          <Link href="/settings">Share store link</Link>
        </Button>
      </div>

      <EngagementChart data={data.viewsLast7Days} />

      <div>
        <h2 className="mb-4 font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--text-primary)]">
          Recent products
        </h2>
        <div className="space-y-3">
          {recent.map((p) => {
            const views = viewById.get(p.id) ?? 0;
            return (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                className="flex items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-card)] p-3 shadow-[var(--shadow-sm)]"
              >
                <div className="relative size-14 shrink-0 overflow-hidden rounded-[var(--radius-md)] bg-[var(--bg-muted)]">
                  <Image
                    src={p.imageUrl}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-[var(--text-primary)]">{p.name}</p>
                  <p className="text-sm font-semibold text-[var(--brand-primary)]">
                    {formatCurrency(p.price)}
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">{views} views</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
