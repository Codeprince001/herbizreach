"use client";

import { Archive, Send } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useArchiveConversation, useConversationMessages } from "@/hooks/useChat";
import { useOwnerChatSocket } from "@/hooks/useChatSocket";
import { getSocket } from "@/lib/socket";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import type { Conversation } from "@/types/chat.types";
import { cn, formatDate } from "@/lib/utils";

export function ChatInbox(props: { conversations: Conversation[] | undefined; loading: boolean }) {
  const { conversations, loading } = props;
  const token = useAuthStore((s) => s.token);
  const clearUnread = useChatStore((s) => s.clearUnread);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = useMemo(
    () => conversations?.find((c) => c.id === selectedId) ?? null,
    [conversations, selectedId],
  );

  const { data: messagesData } = useConversationMessages(selectedId, null);
  const archive = useArchiveConversation();
  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useOwnerChatSocket(selectedId);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesData?.items, selectedId]);

  useEffect(() => {
    clearUnread();
  }, [clearUnread]);

  function send() {
    const t = text.trim();
    if (!t || !selectedId || !token) return;
    setText("");
    const socket = getSocket(token);
    if (!socket.connected) {
      socket.connect();
    }
    socket.emit("sendMessage", { conversationId: selectedId, body: t });
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col gap-4 md:flex-row md:gap-0 md:rounded-[var(--radius-lg)] md:border md:border-[var(--border-default)] md:bg-[var(--bg-card)]">
      <aside className="w-full shrink-0 border-b border-[var(--border-default)] md:w-72 md:border-b-0 md:border-r">
        <div className="p-3 font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--text-primary)]">
          Inbox
        </div>
        <ScrollArea className="h-48 md:h-[calc(100vh-10rem)]">
          <div className="space-y-1 p-2">
            {loading ? (
              <p className="px-2 text-sm text-[var(--text-muted)]">Loading…</p>
            ) : !conversations?.length ? (
              <p className="px-2 text-sm text-[var(--text-muted)]">No conversations yet.</p>
            ) : (
              conversations.map((c) => {
                const label =
                  c.customer?.fullName ??
                  (c.guestToken ? "Guest visitor" : "Customer");
                const active = c.id === selectedId;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedId(c.id)}
                    className={cn(
                      "flex w-full min-h-11 flex-col items-start rounded-[var(--radius-md)] px-3 py-2 text-left text-sm transition-colors",
                      active
                        ? "bg-[var(--brand-glow)] text-[var(--brand-primary)]"
                        : "text-[var(--text-primary)] hover:bg-[var(--bg-muted)]",
                    )}
                  >
                    <span className="font-medium">{label}</span>
                    <span className="text-xs text-[var(--text-muted)]">
                      {c.status === "ARCHIVED" ? "Archived" : "Open"}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </ScrollArea>
      </aside>

      <section className="flex flex-1 flex-col">
        {!selected ? (
          <div className="flex flex-1 items-center justify-center p-8 text-sm text-[var(--text-muted)]">
            Select a conversation
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between border-b border-[var(--border-default)] px-4 py-3">
              <div>
                <p className="font-medium text-[var(--text-primary)]">
                  {selected.customer?.fullName ?? "Guest visitor"}
                </p>
                <p className="text-xs text-[var(--text-muted)]">{selected.customer?.email}</p>
              </div>
              {selected.status === "OPEN" ? (
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="min-h-10"
                  onClick={() => archive.mutate(selected.id)}
                  disabled={archive.isPending}
                >
                  <Archive className="mr-1 size-4" />
                  Archive
                </Button>
              ) : null}
            </div>
            <ScrollArea className="min-h-[280px] flex-1 p-4 md:min-h-[400px]">
              <div className="space-y-3 pr-2">
                {messagesData?.items.map((m) => (
                  <div
                    key={m.id}
                    className={cn(
                      "max-w-[90%] rounded-[var(--radius-md)] px-3 py-2 text-sm",
                      m.senderType === "OWNER"
                        ? "ml-auto bg-[var(--brand-primary)] text-[var(--text-inverse)]"
                        : "bg-[var(--bg-muted)] text-[var(--text-primary)]",
                    )}
                  >
                    <p>{m.body}</p>
                    <p className="mt-1 text-[10px] opacity-70">{formatDate(m.createdAt)}</p>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>
            </ScrollArea>
            {selected.status === "OPEN" ? (
              <div className="flex gap-2 border-t border-[var(--border-default)] p-3">
                <Input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Reply…"
                  className="min-h-11"
                  onKeyDown={(e) => e.key === "Enter" && send()}
                />
                <Button type="button" size="icon" onClick={send}>
                  <Send className="size-4" />
                </Button>
              </div>
            ) : null}
          </>
        )}
      </section>
    </div>
  );
}
