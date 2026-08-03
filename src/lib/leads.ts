import { graphqlRequest } from "./graphql-client";
import type { Lead, LeadSource, LeadStatus } from "./types";

const LEAD_FIELDS = `
  id fullName email phone company source status notes
  consentEmail consentEmailAt consentSms consentSmsAt consentWhatsapp consentWhatsappAt
  createdAt updatedAt
`;

export async function getLeads(filter?: { status?: LeadStatus; source?: LeadSource }): Promise<Lead[]> {
  const data = await graphqlRequest<{ leads: Lead[] }>(
    `query($status: LeadStatus, $source: LeadSource) { leads(status: $status, source: $source) { ${LEAD_FIELDS} } }`,
    filter,
  );
  return data.leads;
}

export async function getLead(id: string): Promise<Lead | null> {
  const data = await graphqlRequest<{ lead: Lead | null }>(
    `query($id: ID!) { lead(id: $id) { ${LEAD_FIELDS} } }`,
    { id },
  );
  return data.lead;
}

export interface CreateLeadInput {
  fullName: string;
  email?: string;
  phone?: string;
  company?: string;
  source: LeadSource;
  notes?: string;
  consentEmail: boolean;
  consentSms: boolean;
  consentWhatsapp: boolean;
  consentSource: string;
  consentTextVersion: string;
}

export async function createLead(input: CreateLeadInput): Promise<Lead> {
  const data = await graphqlRequest<{ createLead: Lead }>(
    `mutation($input: CreateLeadInput!) { createLead(input: $input) { ${LEAD_FIELDS} } }`,
    { input },
  );
  return data.createLead;
}

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<Lead> {
  const data = await graphqlRequest<{ updateLeadStatus: Lead }>(
    `mutation($id: ID!, $status: LeadStatus!) { updateLeadStatus(id: $id, status: $status) { ${LEAD_FIELDS} } }`,
    { id, status },
  );
  return data.updateLeadStatus;
}

export async function revokeLeadConsent(leadId: string, channel: "email" | "sms" | "whatsapp"): Promise<Lead> {
  const data = await graphqlRequest<{ revokeLeadConsent: Lead }>(
    `mutation($leadId: ID!, $channel: String!) { revokeLeadConsent(leadId: $leadId, channel: $channel) { ${LEAD_FIELDS} } }`,
    { leadId, channel },
  );
  return data.revokeLeadConsent;
}
