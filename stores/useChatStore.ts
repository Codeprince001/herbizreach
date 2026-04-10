import { create } from "zustand";

interface ChatState {
  unreadBump: number;
  bumpUnread: () => void;
  clearUnread: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  unreadBump: 0,
  bumpUnread: () => set((s) => ({ unreadBump: s.unreadBump + 1 })),
  clearUnread: () => set({ unreadBump: 0 }),
}));
