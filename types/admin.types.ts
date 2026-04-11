import type { UserRole } from "./auth.types";
import type { ConversationStatus } from "./chat.types";
import type { Product } from "./product.types";

export interface AdminUserListItem {
  id: string;
  email: string;
  fullName: string;
  businessName: string | null;
  businessSlug: string | null;
  role: UserRole;
  disabledAt: string | null;
  createdAt: string;
  avatarUrl: string | null;
}

export interface AdminUserDetail extends AdminUserListItem {
  phone: string | null;
  emailVerifiedAt: string | null;
  _count: {
    products: number;
    conversationsAsStore: number;
    leadsReceived: number;
  };
}

export interface AdminProductOwner {
  id: string;
  email: string;
  businessName: string | null;
  businessSlug: string | null;
}

/** Product row from admin list/detail with owner info */
export type AdminProduct = Product & { owner: AdminProductOwner };

export interface AuditLogEntry {
  id: string;
  actorUserId: string;
  action: string;
  entityType: string;
  entityId: string | null;
  metadata: unknown;
  createdAt: string;
  actor: {
    id: string;
    email: string;
    fullName: string;
    role: UserRole;
  };
}

export interface AdminUpdateUserPayload {
  role?: UserRole;
  disabled?: boolean;
}

export interface AdminUpdateProductPayload {
  name?: string;
  price?: number;
  isPublished?: boolean;
  featured?: boolean;
}

/** Admin list conversations — store owner preview is business-focused (no fullName). */
export interface AdminConversationRow {
  id: string;
  storeUserId: string;
  customerUserId: string | null;
  guestToken: string | null;
  status: ConversationStatus;
  lastMessageAt: string | null;
  createdAt: string;
  storeOwner?: {
    id: string;
    businessName: string | null;
    businessSlug: string | null;
    email: string | null;
  } | null;
  customer?: { id: string; fullName: string; email: string | null } | null;
}
