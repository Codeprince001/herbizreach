import api from "@/lib/axios";
import type { Product, TranslationSource, UpdateProductDto } from "@/types/product.types";

export type UpsertProductTranslationPayload = {
  name: string;
  description: string;
  nameSource?: TranslationSource;
  descriptionSource?: TranslationSource;
};

export const ProductsService = {
  getAll: () => api.get<Product[]>("/products").then((r) => r.data),
  getOne: (id: string) => api.get<Product>(`/products/${id}`).then((r) => r.data),
  create: (data: FormData) =>
    api.post<Product>("/products", data).then((r) => r.data),
  update: (id: string, data: UpdateProductDto) =>
    api.patch<Product>(`/products/${id}`, data).then((r) => r.data),
  updateImage: (id: string, form: FormData) =>
    api.patch<Product>(`/products/${id}/image`, form).then((r) => r.data),
  appendImages: (id: string, form: FormData) =>
    api.post<Product>(`/products/${id}/images`, form).then((r) => r.data),
  duplicate: (id: string) => api.post<Product>(`/products/${id}/duplicate`).then((r) => r.data),
  delete: (id: string) => api.delete(`/products/${id}`).then((r) => r.data),

  upsertTranslation: (id: string, localeCode: string, body: UpsertProductTranslationPayload) =>
    api
      .put<Product>(
        `/products/${id}/translations/${encodeURIComponent(localeCode)}`,
        body,
      )
      .then((r) => r.data),

  deleteTranslation: (id: string, localeCode: string) =>
    api
      .delete<Product>(`/products/${id}/translations/${encodeURIComponent(localeCode)}`)
      .then((r) => r.data),
};
