import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import path from 'path';
import type { ShoppingList, ShoppingItem, ShoppingListWithItemCount, PaginatedLists } from '@/types/database';

const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), 'kupdom.db');
const db = new Database(dbPath);

// Initialize database tables (without admin user creation)
export function initializeDatabase() {
  // Create shopping_lists table
  db.exec(`
    CREATE TABLE IF NOT EXISTS shopping_lists (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create items table
  db.exec(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      list_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'bought', 'unavailable')),
      position INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (list_id) REFERENCES shopping_lists (id) ON DELETE CASCADE
    )
  `);

  // Create users table for admin
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      is_admin BOOLEAN DEFAULT FALSE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Note: Admin user creation is now handled by the init-db.js script
  // This prevents hardcoded passwords in the source code
}

// Generate a random 6-character code (alphanumeric)
export function generateListCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Shopping list operations
export function createShoppingList(title: string): { id: number; code: string } {
  let code: string;
  let attempts = 0;
  
  do {
    code = generateListCode();
    attempts++;
    if (attempts > 100) {
      throw new Error('Unable to generate unique code');
    }
  } while (db.prepare('SELECT id FROM shopping_lists WHERE code = ?').get(code));

  const result = db.prepare('INSERT INTO shopping_lists (code, title) VALUES (?, ?)').run(code, title);
  return { id: result.lastInsertRowid as number, code };
}

export function getShoppingListByCode(code: string): ShoppingList | undefined {
  return db.prepare(`
    SELECT id, code, title, created_at, updated_at 
    FROM shopping_lists 
    WHERE code = ?
  `).get(code) as ShoppingList | undefined;
}

export function updateShoppingListTitle(id: number, title: string) {
  return db.prepare(`
    UPDATE shopping_lists 
    SET title = ?, updated_at = CURRENT_TIMESTAMP 
    WHERE id = ?
  `).run(title, id);
}

// Item operations
export function getItemsByListId(listId: number): ShoppingItem[] {
  return db.prepare(`
    SELECT id, name, status, position 
    FROM items 
    WHERE list_id = ? 
    ORDER BY position ASC
  `).all(listId) as ShoppingItem[];
}

export function addItem(listId: number, name: string) {
  const maxPosition = db.prepare('SELECT MAX(position) as max_pos FROM items WHERE list_id = ?').get(listId) as { max_pos: number | null };
  const newPosition = (maxPosition?.max_pos || 0) + 1;
  
  return db.prepare(`
    INSERT INTO items (list_id, name, position) 
    VALUES (?, ?, ?)
  `).run(listId, name, newPosition);
}

export function updateItemStatus(itemId: number, status: 'pending' | 'bought' | 'unavailable') {
  return db.prepare('UPDATE items SET status = ? WHERE id = ?').run(status, itemId);
}

export function updateItemName(itemId: number, name: string) {
  return db.prepare('UPDATE items SET name = ? WHERE id = ?').run(name, itemId);
}

export function deleteItem(itemId: number) {
  return db.prepare('DELETE FROM items WHERE id = ?').run(itemId);
}

// Admin operations
export function getAllShoppingLists(page: number = 1, limit: number = 10): PaginatedLists {
  const offset = (page - 1) * limit;
  const lists = db.prepare(`
    SELECT id, code, title, created_at, updated_at,
           (SELECT COUNT(*) FROM items WHERE list_id = shopping_lists.id) as item_count
    FROM shopping_lists 
    ORDER BY created_at DESC 
    LIMIT ? OFFSET ?
  `).all(limit, offset) as ShoppingListWithItemCount[];
  
  const total = db.prepare('SELECT COUNT(*) as count FROM shopping_lists').get() as { count: number };
  
  return { lists, total: total.count, page, limit };
}

export function verifyAdminCredentials(username: string, password: string): boolean {
  const user = db.prepare('SELECT password_hash FROM users WHERE username = ? AND is_admin = TRUE').get(username) as { password_hash: string } | undefined;
  if (!user) return false;
  
  return bcrypt.compareSync(password, user.password_hash);
}

// NOTE: Call initializeDatabase() from your app entry point (e.g., in API handler or _app.tsx)

export default db; 