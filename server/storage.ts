import { 
  type ChatSession, 
  type InsertChatSession,
  type ChatMessage,
  type InsertChatMessage,
  chatSessions,
  chatMessages
} from "@shared/schema";
import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
const { Pool } = pkg;
import { eq, desc } from "drizzle-orm";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle({ client: pool });

export interface IStorage {
  createChatSession(session: InsertChatSession): Promise<ChatSession>;
  getChatSession(id: string): Promise<ChatSession | undefined>;
  getRecentChatSessions(limit?: number): Promise<ChatSession[]>;
  deleteChatSession(id: string): Promise<void>;
  
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatMessages(sessionId: string): Promise<ChatMessage[]>;
  
  updateChatSessionTimestamp(id: string): Promise<void>;
}

export class DbStorage implements IStorage {
  async createChatSession(insertSession: InsertChatSession): Promise<ChatSession> {
    const [session] = await db.insert(chatSessions).values(insertSession).returning();
    return session;
  }

  async getChatSession(id: string): Promise<ChatSession | undefined> {
    const [session] = await db.select().from(chatSessions).where(eq(chatSessions.id, id));
    return session;
  }

  async getRecentChatSessions(limit: number = 20): Promise<ChatSession[]> {
    return db.select().from(chatSessions).orderBy(desc(chatSessions.updatedAt)).limit(limit);
  }

  async deleteChatSession(id: string): Promise<void> {
    await db.delete(chatSessions).where(eq(chatSessions.id, id));
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const [message] = await db.insert(chatMessages).values(insertMessage).returning();
    return message;
  }

  async getChatMessages(sessionId: string): Promise<ChatMessage[]> {
    return db.select().from(chatMessages).where(eq(chatMessages.sessionId, sessionId)).orderBy(chatMessages.createdAt);
  }

  async updateChatSessionTimestamp(id: string): Promise<void> {
    await db.update(chatSessions).set({ updatedAt: new Date() }).where(eq(chatSessions.id, id));
  }
}

export const storage = new DbStorage();
