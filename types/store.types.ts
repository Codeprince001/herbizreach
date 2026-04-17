import type { Product, TranslationSource } from "./product.types";

export interface PublicBusiness {
  id: string;
  businessName: string;
  businessSlug: string;
  fullName: string;
  phone: string | null;
  createdAt: string;
  avatarUrl: string | null;
}

export interface StoreSettingsTranslation {
  id: string;
  storeSettingsId: string;
  localeCode: string;
  tagline: string | null;
  description: string | null;
  taglineSource: TranslationSource | null;
  descriptionSource: TranslationSource | null;
  updatedAt: string;
}

export interface StoreSettings {
  id: string;
  userId: string;
  whatsAppPhone: string | null;
  bannerUrl: string | null;
  profileImageUrl: string | null;
  accentColor: string | null;
  tagline: string | null;
  description: string | null;
  showChatWidget: boolean;
  translations?: StoreSettingsTranslation[];
}

export interface PublicLocaleOption {
  code: string;
  labelEnglish: string;
  labelNative: string;
}

export interface PublicStorePayload {
  business: PublicBusiness;
  storeSettings: StoreSettings | null;
  products: Product[];
  /** Applied secondary locale, or null when viewing canonical English. */
  locale?: string | null;
  /** Languages admins have left enabled for storefronts. */
  activeLocales?: PublicLocaleOption[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  createdAt: string;
}
