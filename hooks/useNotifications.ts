import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NotificationsService } from "@/services/notifications.service";
import type { ListNotificationsParams } from "@/types/notification.types";

const notificationsRoot = ["notifications"] as const;

export const notificationsKeys = {
  all: notificationsRoot,
  list: (p: ListNotificationsParams) => [...notificationsRoot, "list", p] as const,
  unread: [...notificationsRoot, "unread"] as const,
};

export function useNotificationUnreadCount(enabled = true) {
  return useQuery({
    queryKey: notificationsKeys.unread,
    queryFn: NotificationsService.unreadCount,
    enabled,
    refetchInterval: 45_000,
  });
}

export function useNotificationsList(params: ListNotificationsParams) {
  return useQuery({
    queryKey: notificationsKeys.list(params),
    queryFn: () => NotificationsService.list(params),
  });
}

export function useNotificationMutations() {
  const qc = useQueryClient();

  const invalidate = () =>
    Promise.all([
      qc.invalidateQueries({ queryKey: notificationsKeys.all }),
    ]);

  const markRead = useMutation({
    mutationFn: NotificationsService.markRead,
    onSuccess: invalidate,
  });

  const markAllRead = useMutation({
    mutationFn: NotificationsService.markAllRead,
    onSuccess: invalidate,
  });

  const archive = useMutation({
    mutationFn: NotificationsService.archive,
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: NotificationsService.remove,
    onSuccess: invalidate,
  });

  return { markRead, markAllRead, archive, remove };
}
