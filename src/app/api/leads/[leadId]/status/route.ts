import { NextResponse } from "next/server";
import { updateLeadStatus } from "@/lib/leads";
import type { LeadStatus } from "@/lib/types";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ leadId: string }> },
) {
  const { leadId } = await params;
  const { status } = (await request.json()) as { status: LeadStatus };
  const lead = await updateLeadStatus(leadId, status);
  return NextResponse.json(lead);
}
