import api from "@/lib/axios";
import type { UserRole } from "@/types/auth.types";
import type { Product } from "@/types/product.types";
import type { AuthUser } from "@/types/auth.types";
import type { Conversation, Message } from "@/types/chat.types";

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

export const AdminService = {
  metrics: () => api.get("/admin/metrics").then((r) => r.data),
  listUsers: (params: {
    page?: number;
    limit?: number;
    role?: UserRole;
    search?: string;
  }) => api.get<Paginated<AuthUser>>("/admin/users", { params }).then((r) => r.data),
  listProducts: (params: {
    page?: number;
    limit?: number;
    userId?: string;
    search?: string;
  }) => api.get<Paginated<Product>>("/admin/products", { params }).then((r) => r.data),
  listConversations: (params: { page?: number; limit?: number }) =>
    api
      .get<Paginated<Conversation>>("/admin/conversations", { params })
      .then((r) => r.data),
  conversationMessages: (
    id: string,
    params: { page?: number; limit?: number },
  ) =>
    api
      .get<{ items: Message[]; total: number; page: number; limit: number }>(
        `/admin/conversations/${id}/messages`,
        { params },
      )
      .then((r) => r.data),
};
