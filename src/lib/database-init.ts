import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import path from 'path';

export interface DatabaseInitOptions {
  dbPath?: string;
  adminUsername?: string;
  adminPassword?: string;
}

export async function initializeDatabase(options: DatabaseInitOptions = {}) {
  const {
    dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), 'kupdom.db'),
    adminUsername = process.env.ADMIN_USERNAME,
    adminPassword = process.env.ADMIN_PASSWORD
  } = options;

  console.log('🔧 Initializing database...');
  console.log('Database path:', dbPath);
  
  const db = new Database(dbPath);
  
  try {
    console.log('🔧 Creating database tables...');
    
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

    // Add is_admin column to existing users table if it doesn't exist
    try {
      db.exec('ALTER TABLE users ADD COLUMN is_admin BOOLEAN DEFAULT FALSE');
    } catch {
      // Column already exists, ignore error
    }

    // Create admin user if credentials are provided
    if (adminUsername && adminPassword) {
      const passwordHash = bcrypt.hashSync(adminPassword, 10);
      
      // Check if admin user already exists
      const existingUser = db.prepare('SELECT id FROM users WHERE username = ?').get(adminUsername);
      
      if (existingUser) {
        // Update existing user to be admin
        db.prepare('UPDATE users SET password_hash = ?, is_admin = TRUE WHERE username = ?').run(passwordHash, adminUsername);
        console.log(`✅ Updated existing user '${adminUsername}' to admin`);
      } else {
        // Create new admin user
        db.prepare('INSERT INTO users (username, password_hash, is_admin) VALUES (?, ?, TRUE)').run(adminUsername, passwordHash);
        console.log(`✅ Created admin user '${adminUsername}'`);
      }
    } else {
      console.log('⚠️  No admin credentials provided. Admin user not created.');
      console.log('   Set ADMIN_USERNAME and ADMIN_PASSWORD environment variables to create admin user.');
    }
    
    console.log('✅ Database initialized successfully!');
    
    // Show some stats
    const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number };
    const listCount = db.prepare('SELECT COUNT(*) as count FROM shopping_lists').get() as { count: number };
    const itemCount = db.prepare('SELECT COUNT(*) as count FROM items').get() as { count: number };
    
    console.log('📊 Database Statistics:');
    console.log(`   Users: ${userCount.count}`);
    console.log(`   Lists: ${listCount.count}`);
    console.log(`   Items: ${itemCount.count}`);
    
  } catch (error) {
    console.error('❌ Error initializing database:', error instanceof Error ? error.message : String(error));
    throw error;
  } finally {
    db.close();
  }
} 