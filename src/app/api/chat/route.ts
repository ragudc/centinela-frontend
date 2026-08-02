export const dynamic = "force-dynamic";

const ENGAGEMENT_CHAT_STREAM_URL =
  process.env.ENGAGEMENT_CHAT_STREAM_URL ?? "http://localhost:4002/chat/stream";

export async function POST(request: Request) {
  const body = await request.text();

  const upstream = await fetch(ENGAGEMENT_CHAT_STREAM_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
  });

  if (!upstream.body) {
    return new Response("Upstream did not return a stream", { status: 502 });
  }

  return new Response(upstream.body, {
    status: upstream.status,
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
