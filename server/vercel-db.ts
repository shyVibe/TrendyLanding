// Module for handling database connections in Vercel's serverless environment
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from 'ws';
import * as schema from '@shared/schema';

// Configure Neon for WebSocket support
neonConfig.webSocketConstructor = ws;

// Check for database URL
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL must be set for database connection');
}

// Create a connection pool that can be reused across serverless function invocations
let pool: Pool;

export function getDbPool() {
  if (!pool) {
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
  }
  return pool;
}

// Get a database instance
export function getDb() {
  const currentPool = getDbPool();
  return drizzle({ client: currentPool, schema });
}

// Close all connections when the process terminates
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing database connections');
  if (pool) {
    await pool.end();
  }
});