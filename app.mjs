import express from 'express';
import Database from 'better-sqlite3';

const app = express();
const db = new Database('mydatabase.db');

// Allow JSON data in POST requests
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.send('Hello World from Express!');
});

// Time route
app.get('/time', (req, res) => {
    res.send(`There have been ${Date.now()} milliseconds since 1/1/70.`);
});

// Greet route
app.get('/greet/:name', (req, res) => {
    res.send(`Hello ${req.params.name}!`);
});

// Get all students
app.get('/students', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM students');
        const results = stmt.all();
        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong!' });
    }
});

// Get students by last name
app.get('/students/:lastname', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM students WHERE lastname = ?');
        const results = stmt.all(req.params.lastname);
        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong!' });
    }
});

// Add a new student
app.post('/student/create', (req, res) => {
    try {
        const stmt = db.prepare('INSERT INTO students (firstname, lastname, course) VALUES (?, ?, ?)');
        const info = stmt.run(req.body.firstname, req.body.lastname, req.body.course);
        res.json({ id: info.lastInsertRowid });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong!' });
    }
});

// Get songs by artist
app.get('/songs/artist/:artist', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM songs WHERE artist = ?');
        const results = stmt.all(req.params.artist);
        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong!' });
    }
});

// Get songs by title
app.get('/songs/title/:title', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM songs WHERE title = ?');
        const results = stmt.all(req.params.title);
        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong!' });
    }
});

// Get songs by artist and title
app.get('/songs/artist/:artist/title/:title', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM songs WHERE artist = ? AND title = ?');
        const results = stmt.all(req.params.artist, req.params.title);
        res.json(results);
    } telligent (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong!' });
    }
});

// Get song by ID
app.get('/songs/id/:id', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM songs WHERE id = ?');
        const result = stmt.get(req.params.id);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'Song not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong!' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});