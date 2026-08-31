import { Pool, QueryResult } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

// Load .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const connectionString = process.env.DATABASE_URL || `postgresql://${process.env.PGUSER || 'postgres'}:${process.env.PGPASSWORD || 'postgres'}@${process.env.PGHOST || 'localhost'}:${process.env.PGPORT || 5432}/${process.env.PGDATABASE || 'vua_tieng_nhat_db'}`;

export const pool = new Pool({
  connectionString,
  connectionTimeoutMillis: 3000, // Timeout fast if PostgreSQL server is not running locally
});

let isDbConnected = false;

/**
 * Check if PostgreSQL Database connection is alive
 */
export async function checkDbConnection(): Promise<boolean> {
  try {
    const client = await pool.connect();
    const res = await client.query('SELECT NOW()');
    client.release();
    isDbConnected = true;
    console.log(`✅ [PostgreSQL DB] Kết nối thành công tới csdl '${process.env.PGDATABASE || 'vua_tieng_nhat_db'}' lúc: ${res.rows[0].now}`);
    return true;
  } catch (err: any) {
    isDbConnected = false;
    console.log(`⚠️ [PostgreSQL DB] Chưa thể kết nối PostgreSQL (${err.message}). Tự động kích hoạt Chế độ DB Fallback (Memory Mode).`);
    return false;
  }
}

/**
 * Get DB Connection Status
 */
export function getDbStatus(): { connected: boolean; host: string; database: string } {
  return {
    connected: isDbConnected,
    host: process.env.PGHOST || 'localhost',
    database: process.env.PGDATABASE || 'vua_tieng_nhat_db'
  };
}

/**
 * Execute parameterized query safely
 */
export async function query(text: string, params?: any[]): Promise<QueryResult<any>> {
  return pool.query(text, params);
}
