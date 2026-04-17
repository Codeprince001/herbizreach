import type { Product } from "@/types/product.types";
import type { PublicLocaleOption, PublicStorePayload } from "@/types/store.types";
import { getDemoProduct, getDemoStorePayload, isDemoStoreSlug } from "@/lib/demo-store";

function apiBase(): string {
  return process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://localhost:4000";
}

function localeQuery(locale?: string | null) {
  const l = locale?.trim();
  if (!l) return "";
  return `?locale=${encodeURIComponent(l)}`;
}

export async function fetchPublicStore(
  slug: string,
  locale?: string | null,
): Promise<PublicStorePayload | null> {
  if (isDemoStoreSlug(slug)) return getDemoStorePayload();
  try {
    const res = await fetch(`${apiBase()}/store/${slug}${localeQuery(locale)}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return (await res.json()) as PublicStorePayload;
  } catch {
    return null;
  }
}

/** Matches `GET /store/:slug/products/:productId` */
type PublicProductApiPayload = {
  business: { id: string; businessName: string; businessSlug: string };
  product: Product;
  locale?: string | null;
  activeLocales?: PublicLocaleOption[];
};

export async function fetchPublicProductDetail(
  slug: string,
  productId: string,
  locale?: string | null,
): Promise<{
  product: Product;
  locale: string | null;
  activeLocales: PublicLocaleOption[];
} | null> {
  if (isDemoStoreSlug(slug)) {
    const p = getDemoProduct(productId);
    if (!p) return null;
    const demo = getDemoStorePayload();
    return {
      product: p,
      locale: null,
      activeLocales: demo.activeLocales ?? [],
    };
  }
  try {
    const res = await fetch(
      `${apiBase()}/store/${slug}/products/${productId}${localeQuery(locale)}`,
      {
        next: { revalidate: 60 },
      },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as PublicProductApiPayload;
    if (!data?.product?.id || !data.product.name) return null;
    return {
      product: data.product,
      locale: data.locale ?? null,
      activeLocales: Array.isArray(data.activeLocales) ? data.activeLocales : [],
    };
  } catch {
    return null;
  }
}

export async function fetchPublicProduct(
  slug: string,
  productId: string,
  locale?: string | null,
): Promise<Product | null> {
  const d = await fetchPublicProductDetail(slug, productId, locale);
  return d?.product ?? null;
}
