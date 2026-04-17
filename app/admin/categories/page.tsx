"use client";

import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionError } from "@/components/shared/SectionError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { useAdminCategories, useAdminCreateCategory } from "@/hooks/useAdmin";
import type { AdminCategoryRow } from "@/types/admin.types";

const columnHelper = createColumnHelper<AdminCategoryRow>();

export default function AdminCategoriesPage() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const { data, isLoading, isError, refetch } = useAdminCategories();
  const createCategory = useAdminCreateCategory();

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => <span className="font-medium text-[var(--text-primary)]">{info.getValue()}</span>,
      }),
      columnHelper.accessor("slug", {
        header: "Slug",
        cell: (info) => (
          <code className="rounded bg-[var(--bg-muted)] px-1.5 py-0.5 text-xs">{info.getValue()}</code>
        ),
      }),
      columnHelper.accessor("createdAt", {
        header: "Created",
        cell: (info) => format(new Date(info.getValue()), "MMM d, yyyy"),
      }),
      columnHelper.display({
        id: "products",
        header: "Products",
        cell: ({ row }) => (
          <span>
            {row.original.stats.publishedProductCount} pub · {row.original.stats.productCount} total
          </span>
        ),
      }),
      columnHelper.display({
        id: "views",
        header: "Views",
        cell: ({ row }) => (
          <span>
            {row.original.stats.pageViewsTotal}
            <span className="text-[var(--text-muted)]"> ({row.original.stats.pageViewsLast7Days} / 7d)</span>
          </span>
        ),
      }),
      columnHelper.display({
        id: "shares",
        header: "Shares",
        cell: ({ row }) => row.original.stats.shareEventsTotal,
      }),
      columnHelper.display({
        id: "newProducts",
        header: "New products (7d)",
        cell: ({ row }) => row.original.stats.newProductsLast7Days,
      }),
    ],
    [],
  );

  const table = useReactTable({
    data: data?.items ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const n = name.trim();
    if (n.length < 2) {
      toast.error("Name should be at least 2 characters.");
      return;
    }
    createCategory.mutate(
      { name: n, ...(slug.trim() ? { slug: slug.trim() } : {}) },
      {
        onSuccess: () => {
          toast.success("Category created.");
          setName("");
          setSlug("");
        },
        onError: (err: unknown) => {
          const msg =
            err && typeof err === "object" && "response" in err
              ? String((err as { response?: { data?: { message?: string } } }).response?.data?.message)
              : "Could not create category.";
          toast.error(msg || "Could not create category.");
        },
      },
    );
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError || !data) {
    return (
      <SectionError message="Could not load categories." onRetry={() => void refetch()} />
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        className="!px-0"
        title="Categories"
        description="Create marketplace categories and review how products and traffic map to each one."
      />

      <section className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-card)] p-4 sm:p-6">
        <h2 className="text-sm font-semibold text-[var(--text-primary)]">Add category</h2>
        <p className="mt-1 text-xs text-[var(--text-muted)]">
          Slug is optional; we generate a URL-safe slug from the name if you leave it blank.
        </p>
        <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1 space-y-2">
            <Label htmlFor="cat-name">Display name</Label>
            <Input
              id="cat-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Wellness"
              autoComplete="off"
            />
          </div>
          <div className="flex-1 space-y-2">
            <Label htmlFor="cat-slug">Slug (optional)</Label>
            <Input
              id="cat-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="wellness"
              autoComplete="off"
            />
          </div>
          <Button type="submit" disabled={createCategory.isPending}>
            {createCategory.isPending ? "Saving…" : "Create"}
          </Button>
        </form>
      </section>

      <section className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">Usage & analytics</h2>
          <Link
            href="/admin"
            className="text-xs font-medium text-[var(--brand-primary)] hover:underline"
          >
            ← Platform overview
          </Link>
        </div>
        <AdminDataTable table={table} emptyMessage="No categories yet." />
      </section>
    </div>
  );
}
