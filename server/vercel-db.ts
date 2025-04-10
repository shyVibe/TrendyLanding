// Optimized database module for Vercel's serverless environment
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from 'ws';
import * as schema from '@shared/schema';

// Configure Neon for WebSocket support
neonConfig.webSocketConstructor = ws;

// Set pool parameters for serverless environment
// Lower max connections and idle timeout for better serverless performance
const POOL_CONFIG = {
  max: 2, // Limit max connections for serverless
  idleTimeoutMillis: 15000, // Shorter idle timeout
  connectionTimeoutMillis: 5000 // Faster connection timeout
};

// Singleton pattern for connection pool
let pool: Pool | null = null;
let db: ReturnType<typeof drizzle> | null = null;

/**
 * Get database connection pool - optimized for serverless environment
 * Uses connection pooling with minimal connections to reduce cold starts
 */
export function getDbPool(): Pool {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL must be set for database connection');
  }

  if (!pool) {
    pool = new Pool({ 
      connectionString: process.env.DATABASE_URL,
      ...POOL_CONFIG
    });
    
    // Add listeners for connection events
    pool.on('error', (err) => {
      console.error('Unexpected database pool error:', err);
      // Reset pool on error for serverless to get a fresh start on next invocation
      pool = null;
    });
  }
  
  return pool;
}

/**
 * Get database instance with drizzle ORM
 * Efficiently reuses connection pool
 */
export function getDb() {
  if (!db) {
    const currentPool = getDbPool();
    db = drizzle({ client: currentPool, schema });
  }
  return db;
}

// Cleanup handler for serverless environment
if (typeof process !== 'undefined') {
  ['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal, async () => {
      console.log(`${signal} received, closing database connections`);
      if (pool) {
        try {
          await pool.end();
          pool = null;
          db = null;
        } catch (err) {
          console.error('Error during pool cleanup:', err);
        }
      }
    });
  });
}