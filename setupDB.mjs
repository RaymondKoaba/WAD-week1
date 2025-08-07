import Database from 'better-sqlite3';

const db = new Database('mydatabase.db');

// Create a students table
const stmt = db.prepare(`
    CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstname TEXT,
        lastname TEXT,
        course TEXT
    )
`);
stmt.run();

// Add sample students
const insert = db.prepare(`
    INSERT INTO students (firstname, lastname, course) VALUES (?, ?, ?)
`);
insert.run('Alice', 'Smith', 'Math');
insert.run('Bob', 'Jones', 'Science');

console.log('Database setup complete!');
db.close();