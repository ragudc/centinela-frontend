"use client";

import { useCallback, useRef, useState } from "react";
import { parseSseStream } from "@/lib/sse";
import type { ProductRecommendation } from "@/lib/types";

export interface ChatWidgetMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  recommendation?: ProductRecommendation;
}

export function useChatStream() {
  const [messages, setMessages] = useState<ChatWidgetMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [escalated, setEscalated] = useState(false);
  const conversationIdRef = useRef<string | undefined>(undefined);

  const sendMessage = useCallback(async (text: string) => {
    const userMessage: ChatWidgetMessage = { id: crypto.randomUUID(), role: "user", content: text };
    const assistantMessageId = crypto.randomUUID();
    setMessages((current) => [
      ...current,
      userMessage,
      { id: assistantMessageId, role: "assistant", content: "" },
    ]);
    setIsStreaming(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ conversationId: conversationIdRef.current, message: text }),
      });
      if (!response.body) throw new Error("No stream in response");

      for await (const frame of parseSseStream(response.body)) {
        const payload = JSON.parse(frame.data);

        if (frame.event === "conversation") {
          conversationIdRef.current = payload.conversationId;
        } else if (frame.event === "delta") {
          setMessages((current) =>
            current.map((message) =>
              message.id === assistantMessageId
                ? { ...message, content: message.content + payload.text }
                : message,
            ),
          );
        } else if (frame.event === "recommendation") {
          setMessages((current) =>
            current.map((message) =>
              message.id === assistantMessageId ? { ...message, recommendation: payload } : message,
            ),
          );
        } else if (frame.event === "escalation") {
          setEscalated(true);
        } else if (frame.event === "error") {
          setMessages((current) =>
            current.map((message) =>
              message.id === assistantMessageId ? { ...message, content: payload.message } : message,
            ),
          );
        }
      }
    } catch {
      setMessages((current) =>
        current.map((message) =>
          message.id === assistantMessageId
            ? { ...message, content: "No se pudo conectar con el asistente. Intenta de nuevo." }
            : message,
        ),
      );
    } finally {
      setIsStreaming(false);
    }
  }, []);

  return { messages, sendMessage, isStreaming, escalated };
}
