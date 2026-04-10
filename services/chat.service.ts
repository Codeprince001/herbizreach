import api from "@/lib/axios";
import type {
  Conversation,
  MessagesPage,
  StartConversationResponse,
} from "@/types/chat.types";

export const ChatService = {
  startConversation: (storeSlug: string) =>
    api
      .post<StartConversationResponse>("/chat/conversations/start", { storeSlug })
      .then((r) => r.data),

  listConversations: () =>
    api.get<Conversation[]>("/chat/conversations").then((r) => r.data),

  listMessages: (
    conversationId: string,
    params: { page?: number; limit?: number; guestToken?: string },
  ) =>
    api
      .get<MessagesPage>(`/chat/conversations/${conversationId}/messages`, {
        params,
      })
      .then((r) => r.data),

  sendMessage: (
    conversationId: string,
    body: { body: string; guestToken?: string },
  ) =>
    api
      .post(`/chat/conversations/${conversationId}/messages`, body)
      .then((r) => r.data),

  archive: (conversationId: string) =>
    api.patch(`/chat/conversations/${conversationId}/archive`).then((r) => r.data),
};
