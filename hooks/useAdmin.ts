import { useQuery } from "@tanstack/react-query";
import { AdminService } from "@/services/admin.service";

export const ADMIN_METRICS_KEY = ["admin", "metrics"] as const;

export function useAdminMetrics() {
  return useQuery({
    queryKey: ADMIN_METRICS_KEY,
    queryFn: () => AdminService.metrics(),
  });
}
