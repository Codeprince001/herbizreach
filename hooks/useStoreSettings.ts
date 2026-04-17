import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  StoreSettingsService,
  type UpdateStoreSettingsPayload,
} from "@/services/store-settings.service";

export const STORE_SETTINGS_KEY = ["store-settings"] as const;

export function useStoreSettings() {
  return useQuery({
    queryKey: STORE_SETTINGS_KEY,
    queryFn: StoreSettingsService.get,
  });
}

export function useUpdateStoreSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateStoreSettingsPayload) => StoreSettingsService.update(body),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: STORE_SETTINGS_KEY });
      toast.success("Settings saved.");
    },
    onError: () => toast.error("Could not save settings."),
  });
}

export function useUploadStoreProfileImage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => StoreSettingsService.uploadProfileImage(file),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: STORE_SETTINGS_KEY });
      toast.success("Profile picture updated.");
    },
    onError: () => toast.error("Could not upload image."),
  });
}

export function useClearStoreProfileImage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => StoreSettingsService.clearProfileImage(),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: STORE_SETTINGS_KEY });
      toast.success("Profile picture removed.");
    },
    onError: () => toast.error("Could not remove image."),
  });
}
