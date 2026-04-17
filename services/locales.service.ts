import api from "@/lib/axios";
import type { PublicLocaleOption } from "@/types/store.types";

/** Public list — no auth required. */
export const LocalesService = {
  listActive: () =>
    api.get<{ items: PublicLocaleOption[] }>("/locales/active").then((r) => r.data.items),
};
