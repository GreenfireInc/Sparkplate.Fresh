
import initSqlJs from 'sql.js';

let db: any = null;
const DB_STORAGE_KEY = 'my_contacts_db';

// Saves the database to localStorage
export function saveDatabase() {
  if (db) {
    const data = db.export();
    // Use a more efficient method to store binary data
    let binary = '';
    const len = data.length;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(data[i]);
    }
    localStorage.setItem(DB_STORAGE_KEY, btoa(binary));
  }
}

export async function initDatabase() {
  if (db) {
    return;
  }
  const SQL = await initSqlJs({
    locateFile: file => `https://sql.js.org/dist/${file}`
  });

  // Try to load from localStorage
  const savedDbStr = localStorage.getItem(DB_STORAGE_KEY);
  if (savedDbStr) {
    try {
        const binary = atob(savedDbStr);
        const len = binary.length;
        const dbArray = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            dbArray[i] = binary.charCodeAt(i);
        }
        db = new SQL.Database(dbArray);
    } catch (e) {
        // Handle potential corruption
        console.error("Failed to load database from localStorage", e);
        localStorage.removeItem(DB_STORAGE_KEY);
        db = new SQL.Database(); // Create a fresh one
    }
  } else {
    db = new SQL.Database();
  }

  // Always ensure tables exist
  const createQuery = `
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT,
      firstname TEXT,
      lastname TEXT,
      company TEXT,
      email TEXT,
      notes TEXT
    );
    CREATE TABLE IF NOT EXISTS wallets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      contactId INTEGER,
      coinTicker TEXT,
      address TEXT,
      FOREIGN KEY (contactId) REFERENCES contacts(id) ON DELETE CASCADE
    );
  `;
  db.exec(createQuery);
  saveDatabase(); // Save the state after ensuring tables are there
}

export function getDb() {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
}
