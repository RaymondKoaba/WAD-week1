import Database from 'better-sqlite3';

const db = new Database('mydatabase.db');

// Create a students table
const stmtStudents = db.prepare(`
    CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstname TEXT,
        lastname TEXT,
        course TEXT
    )
`);
stmtStudents.run();

// Add sample students
const insertStudent = db.prepare(`
    INSERT INTO students (firstname, lastname, course) VALUES (?, ?, ?)
`);
insertStudent.run('Alice', 'Smith', 'Math');
insertStudent.run('Bob', 'Jones', 'Science');

// Create a songs table
const stmtSongs = db.prepare(`
    CREATE TABLE IF NOT EXISTS songs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        artist TEXT,
        title TEXT,
        year INTEGER
    )
`);
stmtSongs.run();

// Add sample songs
const insertSong = db.prepare(`
    INSERT INTO songs (artist, title, year) VALUES (?, ?, ?)
`);
insertSong.run('The Beatles', 'Hey Jude', 1968);
insertSong.run('Queen', 'Bohemian Rhapsody', 1975);
insertSong.run('The Beatles', 'Let It Be', 1970);

console.log('Database setup complete!');
db.close();