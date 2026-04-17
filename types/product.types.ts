export type TranslationSource = "AI" | "MANUAL";

export interface ProductTranslation {
  localeCode: string;
  name: string;
  description: string;
  nameSource: TranslationSource;
  descriptionSource: TranslationSource;
  updatedAt: string;
}

export interface ProductCategory {
  id: string;
  slug: string;
  name: string;
}

export interface Product {
  id: string;
  userId: string;
  name: string;
  price: string;
  sku: string | null;
  stockQuantity: number;
  lowStockThreshold: number | null;
  featured: boolean;
  descriptionRaw: string;
  descriptionAi: string | null;
  captionAi: string | null;
  /** All gallery images (order = display order; first = cover). */
  imageUrls: string[];
  /** Same as imageUrls[0]; kept for simple cards and older code paths. */
  imageUrl: string;
  isPublished: boolean;
  createdAt: string;
  categories: ProductCategory[];
  /** Owner API: localized rows for enabled platform locales. */
  translations?: ProductTranslation[];
  /** Public store when `?locale=` is applied. */
  displayName?: string;
  displayDescription?: string;
}

export interface UpdateProductDto {
  name?: string;
  price?: number;
  descriptionRaw?: string;
  descriptionAi?: string;
  captionAi?: string;
  sku?: string;
  stockQuantity?: number;
  lowStockThreshold?: number;
  featured?: boolean;
  categoryIds?: string[];
  isPublished?: boolean;
  imageUrls?: string[];
}
