import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'kupdom.db');
const db = new Database(dbPath);

// Initialize database tables
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
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Insert admin user if not exists
  const adminExists = db.prepare('SELECT id FROM users WHERE username = ?').get('kupdom');
  if (!adminExists) {
    const passwordHash = bcrypt.hashSync('gZ43vJrbV3Kqt4Pb8nfUipARJL6dpxf3', 10);
    db.prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)').run('kupdom', passwordHash);
  }
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

export function getShoppingListByCode(code: string) {
  return db.prepare(`
    SELECT id, code, title, created_at, updated_at 
    FROM shopping_lists 
    WHERE code = ?
  `).get(code) as any;
}

export function updateShoppingListTitle(id: number, title: string) {
  return db.prepare(`
    UPDATE shopping_lists 
    SET title = ?, updated_at = CURRENT_TIMESTAMP 
    WHERE id = ?
  `).run(title, id);
}

// Item operations
export function getItemsByListId(listId: number) {
  return db.prepare(`
    SELECT id, name, status, position 
    FROM items 
    WHERE list_id = ? 
    ORDER BY position ASC
  `).all(listId) as any[];
}

export function addItem(listId: number, name: string) {
  const maxPosition = db.prepare('SELECT MAX(position) as max_pos FROM items WHERE list_id = ?').get(listId) as any;
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
export function getAllShoppingLists(page: number = 1, limit: number = 10) {
  const offset = (page - 1) * limit;
  const lists = db.prepare(`
    SELECT id, code, title, created_at, updated_at,
           (SELECT COUNT(*) FROM items WHERE list_id = shopping_lists.id) as item_count
    FROM shopping_lists 
    ORDER BY created_at DESC 
    LIMIT ? OFFSET ?
  `).all(limit, offset) as any[];
  
  const total = db.prepare('SELECT COUNT(*) as count FROM shopping_lists').get() as any;
  
  return { lists, total: total.count, page, limit };
}

export function verifyAdminCredentials(username: string, password: string): boolean {
  const user = db.prepare('SELECT password_hash FROM users WHERE username = ?').get(username) as any;
  if (!user) return false;
  return bcrypt.compareSync(password, user.password_hash);
}

// Initialize database on import
initializeDatabase();

export default db; 