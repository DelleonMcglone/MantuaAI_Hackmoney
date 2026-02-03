import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertChatSessionSchema, 
  insertChatMessageSchema,
  insertUserSchema,
  insertUserPreferencesSchema,
  insertPositionSchema,
  insertAgentActionSchema,
  insertHookEventSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // ============ USERS ============
  app.post("/api/users", async (req, res) => {
    try {
      const data = insertUserSchema.parse(req.body);
      const existing = await storage.getUser(data.walletAddress);
      if (existing) {
        res.json(existing);
        return;
      }
      const user = await storage.createUser(data);
      await storage.createUserPreferences({ walletAddress: data.walletAddress });
      res.json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create user" });
      }
    }
  });

  app.get("/api/users/:walletAddress", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.walletAddress);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  // ============ USER PREFERENCES ============
  app.get("/api/users/:walletAddress/preferences", async (req, res) => {
    try {
      const prefs = await storage.getUserPreferences(req.params.walletAddress);
      if (!prefs) {
        res.status(404).json({ error: "Preferences not found" });
        return;
      }
      res.json(prefs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch preferences" });
    }
  });

  app.patch("/api/users/:walletAddress/preferences", async (req, res) => {
    try {
      const prefs = await storage.updateUserPreferences(req.params.walletAddress, req.body);
      if (!prefs) {
        res.status(404).json({ error: "Preferences not found" });
        return;
      }
      res.json(prefs);
    } catch (error) {
      res.status(500).json({ error: "Failed to update preferences" });
    }
  });

  // ============ CHAT SESSIONS ============
  app.post("/api/chat/sessions", async (req, res) => {
    try {
      const data = insertChatSessionSchema.parse(req.body);
      const session = await storage.createChatSession(data);
      res.json(session);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create chat session" });
      }
    }
  });

  app.get("/api/chat/sessions", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;
      const walletAddress = req.query.wallet as string | undefined;
      const sessions = await storage.getRecentChatSessions(limit, walletAddress);
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch chat sessions" });
    }
  });

  app.get("/api/chat/sessions/:id", async (req, res) => {
    try {
      const session = await storage.getChatSession(req.params.id);
      if (!session) {
        res.status(404).json({ error: "Session not found" });
        return;
      }
      res.json(session);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch chat session" });
    }
  });

  app.delete("/api/chat/sessions/:id", async (req, res) => {
    try {
      await storage.deleteChatSession(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete chat session" });
    }
  });

  // ============ CHAT MESSAGES ============
  app.post("/api/chat/messages", async (req, res) => {
    try {
      const data = insertChatMessageSchema.parse(req.body);
      const message = await storage.createChatMessage(data);
      await storage.updateChatSessionTimestamp(data.sessionId);
      res.json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create message" });
      }
    }
  });

  app.get("/api/chat/messages/:sessionId", async (req, res) => {
    try {
      const messages = await storage.getChatMessages(req.params.sessionId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  // ============ POSITIONS ============
  app.post("/api/positions", async (req, res) => {
    try {
      const data = insertPositionSchema.parse(req.body);
      const position = await storage.createPosition(data);
      res.json(position);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create position" });
      }
    }
  });

  app.get("/api/positions", async (req, res) => {
    try {
      const walletAddress = req.query.wallet as string;
      if (!walletAddress) {
        res.status(400).json({ error: "wallet query parameter required" });
        return;
      }
      const positions = await storage.getPositionsByWallet(walletAddress);
      res.json(positions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch positions" });
    }
  });

  app.get("/api/positions/:id", async (req, res) => {
    try {
      const position = await storage.getPosition(req.params.id);
      if (!position) {
        res.status(404).json({ error: "Position not found" });
        return;
      }
      res.json(position);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch position" });
    }
  });

  app.patch("/api/positions/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      const position = await storage.updatePositionStatus(req.params.id, status);
      if (!position) {
        res.status(404).json({ error: "Position not found" });
        return;
      }
      res.json(position);
    } catch (error) {
      res.status(500).json({ error: "Failed to update position status" });
    }
  });

  // ============ AGENT ACTIONS ============
  app.post("/api/agent-actions", async (req, res) => {
    try {
      const data = insertAgentActionSchema.parse(req.body);
      const action = await storage.createAgentAction(data);
      res.json(action);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create agent action" });
      }
    }
  });

  app.get("/api/agent-actions", async (req, res) => {
    try {
      const walletAddress = req.query.wallet as string;
      const status = req.query.status as string | undefined;
      if (!walletAddress) {
        res.status(400).json({ error: "wallet query parameter required" });
        return;
      }
      const actions = await storage.getAgentActionsByWallet(walletAddress, status);
      res.json(actions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch agent actions" });
    }
  });

  app.get("/api/agent-actions/:id", async (req, res) => {
    try {
      const action = await storage.getAgentAction(req.params.id);
      if (!action) {
        res.status(404).json({ error: "Agent action not found" });
        return;
      }
      res.json(action);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch agent action" });
    }
  });

  app.post("/api/agent-actions/:id/approve", async (req, res) => {
    try {
      const action = await storage.approveAgentAction(req.params.id);
      if (!action) {
        res.status(404).json({ error: "Agent action not found" });
        return;
      }
      res.json(action);
    } catch (error) {
      res.status(500).json({ error: "Failed to approve agent action" });
    }
  });

  app.patch("/api/agent-actions/:id/status", async (req, res) => {
    try {
      const { status, txHash } = req.body;
      const action = await storage.updateAgentActionStatus(req.params.id, status, txHash);
      if (!action) {
        res.status(404).json({ error: "Agent action not found" });
        return;
      }
      res.json(action);
    } catch (error) {
      res.status(500).json({ error: "Failed to update agent action status" });
    }
  });

  // ============ HOOK EVENTS ============
  app.post("/api/hook-events", async (req, res) => {
    try {
      const data = insertHookEventSchema.parse(req.body);
      const event = await storage.createHookEvent(data);
      res.json(event);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create hook event" });
      }
    }
  });

  app.get("/api/hook-events", async (req, res) => {
    try {
      const poolAddress = req.query.pool as string | undefined;
      const hookType = req.query.type as string | undefined;
      
      if (poolAddress) {
        const events = await storage.getHookEventsByPool(poolAddress);
        res.json(events);
        return;
      }
      if (hookType) {
        const events = await storage.getHookEventsByType(hookType);
        res.json(events);
        return;
      }
      res.status(400).json({ error: "pool or type query parameter required" });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch hook events" });
    }
  });

  return httpServer;
}
