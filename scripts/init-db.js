#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { initializeDatabase } = require('../src/lib/database-init.cjs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function runInitialization() {
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
  if (fs.existsSync(dbPath)) {
    const overwrite = await question('Database already exists. Overwrite? (y/N): ');
    if (overwrite.toLowerCase() !== 'y' && overwrite.toLowerCase() !== 'yes') {
      console.log('❌ Database initialization cancelled.');
      process.exit(0);
    }
    fs.unlinkSync(dbPath);
    console.log('🗑️  Removed existing database.');
  }
  
  try {
    // Use the shared initialization function
    await initializeDatabase({
      dbPath,
      adminUsername: username,
      adminPassword: password,
      overwrite: true,
      interactive: true
    });
    
    console.log('\n🎉 Database initialization completed successfully!');
    
  } catch (error) {
    console.error('❌ Error during initialization:', error.message);
    process.exit(1);
  } finally {
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

runInitialization().catch(console.error); 