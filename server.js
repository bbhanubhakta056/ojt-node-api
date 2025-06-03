//import required packages 
const express = require('express'); //USED to make http request
const sqlite3 = require('sqlite3'); //used for database(serverless)

const app = express();
const PORT = 3000;

app.use(express.json()); // For parsing JSON request bodies

// Connect to SQLite (creates db file if not exists)
const db = new sqlite3.Database('./mydb.sqlite', (err) => {
  if (err) return console.error(err.message);
  console.log('Connected to the SQLite database.');
});

// Create a simple "users" table
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    username TEXT,
    password TEXT
  )
`);


// Example API routes
// '/' is default route so we say it home address/route
app.get('/', (req, res) => { 
  res.send('Hello from the API!');
});

// API: Get all users
app.get('/api/users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// API: Add a user
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
  db.run(query, [username, password], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ username, password });
  });
});

// Login route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  if (username === USER.username && password === USER.password) {
    return res.status(200).json({ message: 'Login successful!' });
  } else {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }
});


//listen to the defined port
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
