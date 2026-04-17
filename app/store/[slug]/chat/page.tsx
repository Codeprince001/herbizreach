import { notFound } from "next/navigation";
import { Suspense } from "react";
import { StoreGuestChatClient } from "@/components/store/StoreGuestChatClient";
import { storefrontProductName } from "@/lib/storefront-product";
import { SITE_NAME, buildStorePageMetadata } from "@/lib/seo";
import { fetchPublicProduct, fetchPublicStore } from "@/lib/server-api";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ product?: string; locale?: string }>;
};

export async function generateMetadata({ params, searchParams }: Props) {
  const { slug } = await params;
  const { locale } = await searchParams;
  const data = await fetchPublicStore(slug, locale);
  if (!data) return { title: "Chat" };
  const title = `Message ${data.business.businessName}`;
  const description = `Chat with ${data.business.businessName} on ${SITE_NAME}.`;
  const base = buildStorePageMetadata(slug, data, locale);
  return {
    ...base,
    title,
    description,
    openGraph: { ...base.openGraph, title, description },
    twitter: { ...base.twitter, title, description },
  };
}

export default async function StoreGuestChatPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { product: productId, locale } = await searchParams;
  const store = await fetchPublicStore(slug, locale);
  if (!store) notFound();

  let product: { id: string; name: string } | null = null;
  if (productId?.trim()) {
    const p = await fetchPublicProduct(slug, productId.trim(), locale);
    if (p) product = { id: p.id, name: storefrontProductName(p) };
  }

  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center bg-[var(--bg-base)] text-sm text-[var(--text-muted)]">
          Loading chat…
        </div>
      }
    >
      <StoreGuestChatClient
        slug={slug}
        storeName={store.business.businessName}
        accent={store.storeSettings?.accentColor ?? "#7c3aed"}
        chatEnabled={store.storeSettings?.showChatWidget !== false}
        product={product}
      />
    </Suspense>
  );
}
