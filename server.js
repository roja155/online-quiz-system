const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 8000;

const db = mysql.createConnection({
    host: 'localhost',
    user: '.....', // Replace with your MySQL username
    password: '.....', // Replace with your MySQL password
    database: 'quizdb'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Register API
app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;
  
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
  
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(query, [username, email, password], (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err.stack);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
  
        res.json({ success: true, message: 'User registered successfully' });
    });
  });
  // Login API
  app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
  
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err.stack);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
  
        if (results.length === 1) {
            res.json({ success: true, message: 'Login successful' });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    });
  });
    
// Get all quiz questions
app.get('/questions', (req, res) => {
    db.query('SELECT * FROM quiz_questions', (err, results) => {
        if (err) {
            console.error('Error retrieving questions from MySQL:', err);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }

        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
