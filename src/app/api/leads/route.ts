import { NextResponse } from "next/server";
import { createLead, type CreateLeadInput } from "@/lib/leads";

export async function POST(request: Request) {
  const input = (await request.json()) as CreateLeadInput;
  const lead = await createLead(input);
  return NextResponse.json(lead);
}
