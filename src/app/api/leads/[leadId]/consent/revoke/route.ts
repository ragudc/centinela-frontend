import { NextResponse } from "next/server";
import { revokeLeadConsent } from "@/lib/leads";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ leadId: string }> },
) {
  const { leadId } = await params;
  const { channel } = (await request.json()) as { channel: "email" | "sms" | "whatsapp" };
  const lead = await revokeLeadConsent(leadId, channel);
  return NextResponse.json(lead);
}
