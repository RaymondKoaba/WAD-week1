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

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});