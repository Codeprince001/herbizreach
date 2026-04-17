const PREFIX = "herbizreach.guestChat.v1";

export type GuestChatSession = {
  conversationId: string;
  guestToken: string;
};

export function guestChatStorageKey(storeSlug: string, productId?: string | null): string {
  const slug = storeSlug.trim();
  if (productId?.trim()) {
    return `${PREFIX}:${slug}:product:${productId.trim()}`;
  }
  return `${PREFIX}:${slug}`;
}

export function readGuestChatSession(key: string): GuestChatSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const data = JSON.parse(raw) as unknown;
    if (!data || typeof data !== "object") return null;
    const conversationId = (data as { conversationId?: unknown }).conversationId;
    const guestToken = (data as { guestToken?: unknown }).guestToken;
    if (typeof conversationId !== "string" || typeof guestToken !== "string") return null;
    const cid = conversationId.trim();
    const tok = guestToken.trim();
    if (!cid || !tok) return null;
    return { conversationId: cid, guestToken: tok };
  } catch {
    return null;
  }
}

export function writeGuestChatSession(key: string, session: GuestChatSession): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(session));
  } catch {
    // private mode / quota
  }
}

export function clearGuestChatSession(key: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}
