#!/usr/bin/env node

const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function initializeDatabase() {
  console.log('🚀 KupDom Database Initialization\n');
  
  // Get admin credentials
  const username = process.argv.includes('--username') 
    ? process.argv[process.argv.indexOf('--username') + 1]
    : process.env.ADMIN_USERNAME || await question('Enter admin username: ');
  
  const password = process.argv.includes('--password')
    ? process.argv[process.argv.indexOf('--password') + 1]
    : process.env.ADMIN_PASSWORD || await question('Enter admin password: ');
  
  if (!username || !password) {
    console.error('❌ Username and password are required');
    process.exit(1);
  }
  
  console.log(`📋 Admin username: ${username}`);
  console.log(`🔐 Password hash created with bcrypt (salt rounds: 10)\n`);
  
  console.log('Current working directory:', process.cwd());
  const dbPath = path.join(process.cwd(), 'kupdom.db');
  console.log('Database path:', dbPath);
  
  // Remove existing database if it exists
  const fs = require('fs');
  if (fs.existsSync(dbPath)) {
    const overwrite = await question('Database already exists. Overwrite? (y/N): ');
    if (overwrite.toLowerCase() !== 'y' && overwrite.toLowerCase() !== 'yes') {
      console.log('❌ Database initialization cancelled.');
      process.exit(0);
    }
    fs.unlinkSync(dbPath);
    console.log('🗑️  Removed existing database.');
  }
  
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
    } catch (error) {
      // Column already exists, ignore error
    }

    // Hash password
    const passwordHash = bcrypt.hashSync(password, 10);
    
    // Insert admin user
    const existingUser = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
    if (existingUser) {
      // Update existing user to be admin
      db.prepare('UPDATE users SET password_hash = ?, is_admin = TRUE WHERE username = ?').run(passwordHash, username);
      console.log(`✅ Updated existing user '${username}' to admin with new password`);
    } else {
      // Create new admin user
      db.prepare('INSERT INTO users (username, password_hash, is_admin) VALUES (?, ?, TRUE)').run(username, passwordHash);
      console.log(`✅ Created admin user '${username}'`);
    }
    
    console.log('✅ Database initialized successfully!\n');
    
    // Show some stats
    const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
    const listCount = db.prepare('SELECT COUNT(*) as count FROM shopping_lists').get().count;
    const itemCount = db.prepare('SELECT COUNT(*) as count FROM items').get().count;
    
    console.log('📊 Database Statistics:');
    console.log(`   Users: ${userCount}`);
    console.log(`   Lists: ${listCount}`);
    console.log(`   Items: ${itemCount}`);
    
  } catch (error) {
    console.error('❌ Error initializing database:', error.message);
    process.exit(1);
  } finally {
    db.close();
    rl.close();
  }
}

// Handle command line arguments
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
KupDom Database Initialization Script

Usage:
  node scripts/init-db.js [options]

Options:
  --help, -h          Show this help message
  --username <name>   Set admin username
  --password <pass>   Set admin password

Environment Variables:
  ADMIN_USERNAME      Set admin username
  ADMIN_PASSWORD      Set admin password

Examples:
  node scripts/init-db.js
  node scripts/init-db.js --username admin --password mypassword
  ADMIN_USERNAME=admin ADMIN_PASSWORD=mypassword node scripts/init-db.js
`);
  process.exit(0);
}

// Parse command line arguments
for (let i = 2; i < process.argv.length; i++) {
  if (process.argv[i] === '--username' && i + 1 < process.argv.length) {
    process.env.ADMIN_USERNAME = process.argv[i + 1];
    i++;
  } else if (process.argv[i] === '--password' && i + 1 < process.argv.length) {
    process.env.ADMIN_PASSWORD = process.argv[i + 1];
    i++;
  }
}

initializeDatabase().catch(console.error); 