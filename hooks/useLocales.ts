import { useQuery } from "@tanstack/react-query";
import { LocalesService } from "@/services/locales.service";

export const ACTIVE_LOCALES_KEY = ["locales", "active"] as const;

export function useActiveLocales() {
  return useQuery({
    queryKey: ACTIVE_LOCALES_KEY,
    queryFn: () => LocalesService.listActive(),
  });
}
