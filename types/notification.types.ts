export type NotificationSeverity = "INFO" | "SUCCESS" | "WARNING" | "ERROR";

export type NotificationType =
  | "SYSTEM"
  | "LEAD"
  | "CHAT"
  | "PRODUCT"
  | "STORE"
  | "SECURITY"
  | "BILLING"
  | "MARKETING";

export type Notification = {
  id: string;
  userId: string;
  type: NotificationType;
  severity: NotificationSeverity;
  title: string;
  body: string | null;
  actionUrl: string | null;
  entityType: string | null;
  entityId: string | null;
  metadata: unknown;
  readAt: string | null;
  archivedAt: string | null;
  createdAt: string;
};

export type NotificationListResponse = {
  items: Notification[];
  total: number;
  page: number;
  limit: number;
  unreadTotal: number;
};

export type ListNotificationsParams = {
  page?: number;
  limit?: number;
  unreadOnly?: boolean;
  includeArchived?: boolean;
  type?: NotificationType;
};
