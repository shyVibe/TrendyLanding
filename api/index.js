// This file serves as the entry point for Vercel's serverless functions
import express from 'express';
import { createServer } from 'http';
import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from 'ws';

// Configure WebSocket support for serverless environment
if (typeof neonConfig !== 'undefined') {
  neonConfig.webSocketConstructor = ws;
}

// Set up Express application
const app = express();
app.use(express.json());

// Import routes - with dynamic import to support ESM in Vercel
let registerRoutes;
try {
  const routesModule = await import('../dist/routes.js');
  registerRoutes = routesModule.registerRoutes;
} catch (error) {
  console.error('Error loading routes:', error);
}

// Export the serverless function handler
export default async function handler(req, res) {
  // Forward the request to the Express app
  const server = createServer(app);
  
  if (registerRoutes) {
    await registerRoutes(app);
  }
  
  // Process the request with the Express app
  return new Promise((resolve) => {
    app(req, res, () => {
      resolve();
    });
  });
}