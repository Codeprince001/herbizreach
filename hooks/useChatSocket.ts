"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { getSocket, resetSocket } from "@/lib/socket";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import { CHAT_CONVERSATIONS_KEY } from "@/hooks/useChat";
import type { Message } from "@/types/chat.types";

export function useOwnerChatSocket(activeConversationId: string | null) {
  const token = useAuthStore((s) => s.token);
  const role = useAuthStore((s) => s.user?.role);
  const bumpUnread = useChatStore((s) => s.bumpUnread);
  const qc = useQueryClient();

  useEffect(() => {
    if (!token || role !== "OWNER") return;

    const socket = getSocket(token);
    socket.connect();

    const onMessage = (msg: Message) => {
      void qc.invalidateQueries({ queryKey: CHAT_CONVERSATIONS_KEY });
      void qc.invalidateQueries({ queryKey: ["chat", "messages"] });
      if (msg.senderType !== "OWNER") {
        bumpUnread();
      }
    };

    socket.on("message", onMessage);

    return () => {
      socket.off("message", onMessage);
      socket.disconnect();
      resetSocket();
    };
  }, [token, role, bumpUnread, qc]);

  useEffect(() => {
    if (!token || role !== "OWNER" || !activeConversationId) return;
    const socket = getSocket(token);
    if (!socket.connected) {
      socket.once("connect", () => {
        socket.emit("join", { conversationId: activeConversationId });
      });
      return;
    }
    socket.emit("join", { conversationId: activeConversationId });
  }, [token, role, activeConversationId]);
}
