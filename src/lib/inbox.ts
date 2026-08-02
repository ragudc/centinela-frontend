import { graphqlRequest } from "./graphql-client";
import type { EscalationStatus, EscalationTicket } from "./types";

const TICKET_FIELDS = `
  id conversationId reason status createdAt resolvedAt assignedAgent
  conversation {
    id customerName customerEmail channel status createdAt updatedAt
    messages { id role content citedChunkIds createdAt }
  }
`;

export async function getEscalationTickets(status?: EscalationStatus): Promise<EscalationTicket[]> {
  const data = await graphqlRequest<{ escalationTickets: EscalationTicket[] }>(
    `query($status: EscalationStatus) { escalationTickets(status: $status) { ${TICKET_FIELDS} } }`,
    { status },
  );
  return data.escalationTickets;
}

export async function getEscalationTicket(id: string): Promise<EscalationTicket | null> {
  const data = await graphqlRequest<{ escalationTicket: EscalationTicket | null }>(
    `query($id: ID!) { escalationTicket(id: $id) { ${TICKET_FIELDS} } }`,
    { id },
  );
  return data.escalationTicket;
}

export async function resolveEscalationTicket(id: string): Promise<void> {
  await graphqlRequest(`mutation($id: ID!) { resolveEscalationTicket(id: $id) { id } }`, { id });
}
