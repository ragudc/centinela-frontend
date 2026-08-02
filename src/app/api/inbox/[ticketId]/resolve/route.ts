import { NextResponse } from "next/server";
import { resolveEscalationTicket } from "@/lib/inbox";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ ticketId: string }> },
) {
  const { ticketId } = await params;
  await resolveEscalationTicket(ticketId);
  return NextResponse.json({ ok: true });
}
