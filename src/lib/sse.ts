export interface SseFrame {
  event: string;
  data: string;
}

/** Parses a `text/event-stream` response body, yielding one frame per `event`/`data` pair. */
export async function* parseSseStream(body: ReadableStream<Uint8Array>): AsyncGenerator<SseFrame> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    let separatorIndex: number;
    while ((separatorIndex = buffer.indexOf("\n\n")) !== -1) {
      const rawFrame = buffer.slice(0, separatorIndex);
      buffer = buffer.slice(separatorIndex + 2);

      let event = "message";
      let data = "";
      for (const line of rawFrame.split("\n")) {
        if (line.startsWith("event: ")) event = line.slice("event: ".length);
        if (line.startsWith("data: ")) data = line.slice("data: ".length);
      }
      if (data) yield { event, data };
    }
  }
}
