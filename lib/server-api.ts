import type { PublicStorePayload } from "@/types/store.types";
import type { Product } from "@/types/product.types";

function apiBase(): string {
  return process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://localhost:4000";
}

export async function fetchPublicStore(slug: string): Promise<PublicStorePayload | null> {
  try {
    const res = await fetch(`${apiBase()}/store/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return (await res.json()) as PublicStorePayload;
  } catch {
    return null;
  }
}

export async function fetchPublicProduct(
  slug: string,
  productId: string,
): Promise<Product | null> {
  try {
    const res = await fetch(`${apiBase()}/store/${slug}/products/${productId}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return (await res.json()) as Product;
  } catch {
    return null;
  }
}
