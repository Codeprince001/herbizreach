import api from "@/lib/axios";
import type { StoreSettings } from "@/types/store.types";

export type UpdateStoreSettingsPayload = {
  whatsAppPhone?: string;
  bannerUrl?: string;
  profileImageUrl?: string;
  accentColor?: string;
  tagline?: string;
  description?: string;
  showChatWidget?: boolean;
};

export const StoreSettingsService = {
  get: () => api.get<StoreSettings>("/store-settings").then((r) => r.data),
  update: (body: UpdateStoreSettingsPayload) =>
    api.patch<StoreSettings>("/store-settings", body).then((r) => r.data),
  uploadProfileImage: (file: File) => {
    const body = new FormData();
    body.append("image", file);
    return api.patch<StoreSettings>("/store-settings/profile-image", body).then((r) => r.data);
  },
  clearProfileImage: () => api.delete<StoreSettings>("/store-settings/profile-image").then((r) => r.data),
};
