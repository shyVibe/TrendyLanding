import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadValidationSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // PUT application routes here
  // prefix all routes with /api

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Lead submission endpoint
  app.post("/api/leads", async (req, res) => {
    try {
      // Validate request body
      const leadData = insertLeadValidationSchema.parse(req.body);
      
      // Store the lead
      const newLead = await storage.createLead(leadData);
      
      // Return success
      res.status(201).json({ 
        success: true, 
        message: "Lead submitted successfully",
        lead: newLead
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: validationError.details
        });
      } else {
        console.error("Error creating lead:", error);
        res.status(500).json({ 
          success: false, 
          message: "An error occurred while processing your request" 
        });
      }
    }
  });

  // Get all leads (for admin/testing purposes)
  app.get("/api/leads", async (req, res) => {
    try {
      const leads = await storage.getLeads();
      res.json({ leads });
    } catch (error) {
      console.error("Error fetching leads:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while fetching leads" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
