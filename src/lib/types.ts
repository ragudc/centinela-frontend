export interface Money {
  amount: number;
  currency: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  brandLine: string;
  description: string;
  indications: string[];
  price: Money;
  stockStatus: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
  category: Category;
  imageUrl: string | null;
}

export type ConversationStatus = "ACTIVE" | "ESCALATED" | "RESOLVED" | "CLOSED";
export type MessageRole = "USER" | "ASSISTANT" | "SYSTEM";
export type EscalationStatus = "OPEN" | "ACKNOWLEDGED" | "RESOLVED";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  citedChunkIds: string[];
  createdAt: string;
}

export interface Conversation {
  id: string;
  customerName: string | null;
  customerEmail: string | null;
  channel: string;
  status: ConversationStatus;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
}

export interface EscalationTicket {
  id: string;
  conversationId: string;
  reason: string;
  status: EscalationStatus;
  createdAt: string;
  resolvedAt: string | null;
  assignedAgent: string | null;
  conversation: Conversation;
}

export interface ProductRecommendation {
  sku: string;
  name: string | null;
  priceCOP: number | null;
  reason: string;
}
