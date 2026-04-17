import { notFound } from "next/navigation";
import { Suspense } from "react";
import { StoreProductClient } from "@/components/store/StoreProductClient";
import { buildProductPageMetadata } from "@/lib/seo";
import { fetchPublicProductDetail, fetchPublicStore } from "@/lib/server-api";

type Props = {
  params: Promise<{ slug: string; productId: string }>;
  searchParams: Promise<{ locale?: string }>;
};

export async function generateMetadata({ params, searchParams }: Props) {
  const { slug, productId } = await params;
  const { locale } = await searchParams;
  const [detail, store] = await Promise.all([
    fetchPublicProductDetail(slug, productId, locale),
    fetchPublicStore(slug, locale),
  ]);
  if (!detail || !store) return { title: "Product" };
  return buildProductPageMetadata(
    slug,
    productId,
    detail.product,
    store.business.businessName,
    locale,
  );
}

export default async function StoreProductPage({ params, searchParams }: Props) {
  const { slug, productId } = await params;
  const { locale } = await searchParams;
  const [store, detail] = await Promise.all([
    fetchPublicStore(slug, locale),
    fetchPublicProductDetail(slug, productId, locale),
  ]);
  if (!store || !detail) notFound();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center bg-[var(--bg-base)] text-sm text-[var(--text-muted)]">
          Loading…
        </div>
      }
    >
      <StoreProductClient
        slug={slug}
        product={detail.product}
        store={store}
        activeLocales={detail.activeLocales}
        localeApplied={detail.locale}
      />
    </Suspense>
  );
}
