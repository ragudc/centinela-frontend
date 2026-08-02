import { cn } from "@/lib/utils";
import type { Conversation } from "@/lib/types";

const ROLE_LABEL: Record<string, string> = {
  USER: "Comprador",
  ASSISTANT: "Asistente",
  SYSTEM: "Sistema",
};

export function TicketTranscript({ conversation }: { conversation: Conversation }) {
  return (
    <div className="space-y-4">
      {conversation.messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "rounded-lg border p-3 text-sm",
            message.role === "USER" ? "bg-background" : "bg-muted",
          )}
        >
          <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-medium">{ROLE_LABEL[message.role] ?? message.role}</span>
            <span>{new Date(message.createdAt).toLocaleString("es-CO")}</span>
          </div>
          <p className="whitespace-pre-wrap">{message.content}</p>
          {message.citedChunkIds.length > 0 && (
            <p className="mt-2 text-xs text-muted-foreground">
              Fuentes citadas: {message.citedChunkIds.length}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
