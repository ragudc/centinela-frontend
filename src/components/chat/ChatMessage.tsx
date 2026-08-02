import { cn } from "@/lib/utils";
import { ProductCard } from "./ProductCard";
import type { ChatWidgetMessage } from "@/hooks/useChatStream";

export function ChatMessage({ message }: { message: ChatWidgetMessage }) {
  const isUser = message.role === "user";
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-lg px-3 py-2 text-sm",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
        )}
      >
        <p className="whitespace-pre-wrap">{message.content || "…"}</p>
        {message.recommendation && <ProductCard recommendation={message.recommendation} />}
      </div>
    </div>
  );
}
