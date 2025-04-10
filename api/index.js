import express from 'express';
import { createServer } from 'http';
import { registerRoutes } from '../server/routes.js';

const app = express();
app.use(express.json());

// Export the serverless function handler
export default async function handler(req, res) {
  const server = createServer(app);
  await registerRoutes(app);

  return new Promise((resolve) => {
    app(req, res, () => {
      resolve();
    });
  });
}