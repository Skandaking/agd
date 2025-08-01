import mysql from 'mysql2/promise';

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'agd_website',
  connectionLimit: 10,
  charset: 'utf8mb4',
  // Pool options
  waitForConnections: true,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
};

// Create connection pool for better performance
let pool: mysql.Pool;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
  }
  return pool;
}

// Get a single connection from the pool
export async function getConnection() {
  return getPool().getConnection();
}

// Execute a query with parameters
export async function executeQuery<T = unknown>(
  query: string, 
  params: unknown[] = [],
  retries: number = 2
): Promise<T[]> {
  let connection: mysql.PoolConnection | null = null;
  
  try {
    connection = await getConnection();
    const [rows] = await connection.execute(query, params);
    return rows as T[];
  } catch (error: unknown) {
    const dbError = error as { code?: string; message?: string };
    
    // Retry on lock timeout errors
    if (dbError.code === 'ER_LOCK_WAIT_TIMEOUT' && retries > 0) {
      await new Promise(resolve => setTimeout(resolve, 100));
      return executeQuery<T>(query, params, retries - 1);
    }
    
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

// Execute a single query and return first result
export async function executeQuerySingle<T = unknown>(
  query: string, 
  params: unknown[] = []
): Promise<T | null> {
  const results = await executeQuery<T>(query, params);
  return results.length > 0 ? results[0] : null;
}

// Test database connection
export async function testConnection(): Promise<boolean> {
  try {
    const connection = await getConnection();
    connection.release();
    return true;
  } catch {
    return false;
  }
}

// User interface matching your database schema
export interface DatabaseUser {
  id: number;
  email: string;
  password: string;
  full_name: string;
  phone: string | null;
  role: 'user' | 'administrator';
  is_active: boolean;
  login_attempts: number;
  locked_until: Date | null;
  last_login: Date | null;
  created_at: Date;
  updated_at: Date;
} 