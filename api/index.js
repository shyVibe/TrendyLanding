// Optimized serverless function for Vercel deployment
import express from 'express';
import { createServer } from 'http';
import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

// Configure Neon database with WebSocket support for serverless environment
neonConfig.webSocketConstructor = ws;

// Initialize express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Shared server instance
let server;
let routesRegistered = false;

// Export the serverless function handler
export default async function handler(req, res) {
  if (!server) {
    server = createServer(app);
  }
  
  // Register routes only once
  if (!routesRegistered) {
    try {
      // Dynamic import for ESM compatibility in Vercel
      const { registerRoutes } = await import('../dist/routes.js');
      await registerRoutes(app);
      routesRegistered = true;
    } catch (error) {
      console.error('Error setting up routes:', error);
      return res.status(500).json({ error: 'Server initialization failed' });
    }
  }

  // Handle the request
  return new Promise((resolve) => {
    app(req, res, () => {
      resolve();
    });
  });
}