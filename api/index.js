// This file serves as the entry point for Vercel's serverless functions
import '../dist/index.js';

// Export a default function that can be used as a Vercel serverless function
export default function handler(req, res) {
  // This won't actually be called directly as our Express app
  // in '../dist/index.js' takes over, but we need to export a function
  // to satisfy Vercel's serverless function requirements
  res.status(404).send('Not found');
}