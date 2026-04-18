import api from "@/lib/axios";
import type { Product } from "@/types/product.types";

export interface ImproveDescriptionResult {
  description_ai: string;
  caption_ai: string;
}

export interface SuggestSkuResult {
  sku: string;
}

export interface SuggestInboxRepliesResult {
  replies: string[];
}

export interface LocalizeProductResult {
  localeCode: string;
  name: string;
  description: string;
}

export const AiService = {
  improveDescription: (body: { descriptionRaw: string; productName?: string }) =>
    api
      .post<ImproveDescriptionResult>("/ai/improve-description", body)
      .then((r) => r.data),

  suggestSku: (body: { productName: string; descriptionRaw?: string }) =>
    api.post<SuggestSkuResult>("/ai/suggest-sku", body).then((r) => r.data),

  suggestInboxReplies: (body: { conversationId: string }) =>
    api
      .post<SuggestInboxRepliesResult>("/ai/suggest-inbox-replies", body)
      .then((r) => r.data),

  localizeProduct: (body: { productId: string; localeCode: string }) =>
    api.post<LocalizeProductResult>("/ai/localize-product", body).then((r) => r.data),

  enhanceProductImage: (body: { productId: string; imageUrl: string }) =>
    api.post<Product>("/ai/enhance-product-image", body).then((r) => r.data),
};
