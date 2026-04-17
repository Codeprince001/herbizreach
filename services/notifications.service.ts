import api from "@/lib/axios";
import type {
  ListNotificationsParams,
  Notification,
  NotificationListResponse,
} from "@/types/notification.types";

export const NotificationsService = {
  list: (params?: ListNotificationsParams) =>
    api.get<NotificationListResponse>("/notifications", { params }).then((r) => r.data),

  unreadCount: () =>
    api.get<{ count: number }>("/notifications/unread-count").then((r) => r.data),

  markRead: (id: string) => api.patch<Notification>(`/notifications/${id}/read`).then((r) => r.data),

  markAllRead: () =>
    api.patch<{ updated: number }>("/notifications/read-all").then((r) => r.data),

  archive: (id: string) =>
    api.patch<Notification>(`/notifications/${id}/archive`).then((r) => r.data),

  remove: (id: string) => api.delete<{ ok: true }>(`/notifications/${id}`).then((r) => r.data),
};
