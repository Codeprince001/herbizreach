import { notFound } from "next/navigation";
import { Suspense } from "react";
import { StorePublicView } from "@/components/store/StorePublicView";
import { buildStorePageMetadata } from "@/lib/seo";
import { fetchPublicStore } from "@/lib/server-api";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ locale?: string }>;
};

export async function generateMetadata({ params, searchParams }: Props) {
  const { slug } = await params;
  const { locale } = await searchParams;
  const data = await fetchPublicStore(slug, locale);
  if (!data) return { title: "Store" };
  return buildStorePageMetadata(slug, data, locale);
}

export default async function PublicStorePage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { locale } = await searchParams;
  const data = await fetchPublicStore(slug, locale);
  if (!data) notFound();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center bg-[var(--bg-base)] text-sm text-[var(--text-muted)]">
          Loading store…
        </div>
      }
    >
      <StorePublicView initial={data} />
    </Suspense>
  );
}
