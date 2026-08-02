"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, ShieldCheck, UserRound } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { useChatStream } from "@/hooks/useChatStream";

export function ChatWidget({ brandName }: { brandName: string }) {
  const [open, setOpen] = useState(false);
  const { messages, sendMessage, isStreaming, escalated } = useChatStream();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {!open && (
        <Button
          size="icon"
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="flex w-full flex-col p-0 sm:max-w-sm">
          <SheetHeader className="border-b">
            <SheetTitle className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Asistente {brandName}
            </SheetTitle>
            <SheetDescription>
              Pregunta por precios, disponibilidad o recomendaciones clínicas.
            </SheetDescription>
          </SheetHeader>

          {escalated && (
            <div className="mx-4 flex items-center gap-2 rounded-md bg-accent px-3 py-2 text-xs text-accent-foreground">
              <UserRound className="h-3.5 w-3.5 shrink-0" />
              Te estamos conectando con un asesor humano. Un miembro de nuestro equipo revisará esta
              conversación.
            </div>
          )}

          <ScrollArea className="flex-1 px-4">
            <div className="flex flex-col gap-3 py-4">
              {messages.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Hola, soy el asistente de {brandName}. Puedo ayudarte con precios, disponibilidad,
                  políticas de envío y garantía, y recomendaciones según tu necesidad clínica.
                </p>
              )}
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              <div ref={bottomRef} />
            </div>
          </ScrollArea>

          <ChatInput disabled={isStreaming} onSend={sendMessage} />
        </SheetContent>
      </Sheet>
    </>
  );
}
