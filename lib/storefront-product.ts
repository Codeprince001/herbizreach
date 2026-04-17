import type { Product } from "@/types/product.types";

/** Public storefront: prefers API `displayName` / `displayDescription` when `?locale=` is set. */
export function storefrontProductName(product: Product): string {
  return product.displayName ?? product.name;
}

export function storefrontProductDescription(product: Product): string {
  if (product.displayDescription?.trim()) return product.displayDescription.trim();
  return product.descriptionAi?.trim() || product.descriptionRaw?.trim() || "";
}
