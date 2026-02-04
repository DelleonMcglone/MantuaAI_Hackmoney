import type { ChatSession, ChatMessage, InsertChatSession, InsertChatMessage } from "../../../shared/schema";

const API_BASE = "/api";

export async function createChatSession(data: InsertChatSession): Promise<ChatSession> {
  const res = await fetch(`${API_BASE}/chat/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create chat session");
  return res.json();
}

export async function getChatSessions(limit?: number): Promise<ChatSession[]> {
  const url = limit ? `${API_BASE}/chat/sessions?limit=${limit}` : `${API_BASE}/chat/sessions`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch chat sessions");
  return res.json();
}

export async function getChatSession(id: string): Promise<ChatSession> {
  const res = await fetch(`${API_BASE}/chat/sessions/${id}`);
  if (!res.ok) throw new Error("Failed to fetch chat session");
  return res.json();
}

export async function deleteChatSession(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/chat/sessions/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete chat session");
}

export async function createChatMessage(data: InsertChatMessage): Promise<ChatMessage> {
  const res = await fetch(`${API_BASE}/chat/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create message");
  return res.json();
}

export async function getChatMessages(sessionId: string): Promise<ChatMessage[]> {
  const res = await fetch(`${API_BASE}/chat/messages/${sessionId}`);
  if (!res.ok) throw new Error("Failed to fetch messages");
  return res.json();
}
