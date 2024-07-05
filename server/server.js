const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const db= mysql.createConnection({
  host: 'mysql-25ffbacb-tarunid2003-9eea.l.aivencloud.com',
  user: 'avnadmin',
  password: 'AVNS_aMK_KqnYlU9lNUQadTx',
  database: 'defaultdb',
  port:17572,
  SSL:{rejectUnauthorized:false},
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database on Aiven');

  // Function to create tables
  const createTableIfNotExists = (tableName, createTableSQL) => {
    db.query(`SHOW TABLES LIKE '${tableName}'`, (err, results) => {
      if (err) {
        console.error(`Error checking if table ${tableName} exists:`, err);
        return;
      }
      if (results.length === 0) {
        // Table does not exist, create it
        db.query(createTableSQL, (err) => {
          if (err) {
            console.error(`Error creating table ${tableName}:`, err);
            return;
          }
          console.log(`Table ${tableName} created successfully`);
        });
      } else {
        console.log(`Table ${tableName} already exists`);
      }
    });
  };

  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      username VARCHAR(10) PRIMARY KEY,
      password VARCHAR(10)
    );
  `;

  const createBookinglistTable = `
    CREATE TABLE IF NOT EXISTS bookinglist (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255),
      phone VARCHAR(20),
      checkIn DATE,
      checkOut DATE,
      guests INT,
      address TEXT,
      payment VARCHAR(255),
      terms TINYINT(1)
    );
  `;

  const createContactsTable = `
    CREATE TABLE IF NOT EXISTS contacts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255),
      phone VARCHAR(20),
      message TEXT
    );
  `;

  createTableIfNotExists('users', createUsersTable);
  createTableIfNotExists('bookinglist', createBookinglistTable);
  createTableIfNotExists('contacts', createContactsTable);

  
});


app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Database query error');
      return;
    }
    res.json(results);
  });
});

app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  const checkUserQuery = 'SELECT * FROM users WHERE username = ?';
  db.query(checkUserQuery, [username], (checkUserError, results) => {
    if (checkUserError) {
      console.error('Error checking user:', checkUserError);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.length > 0) {
        res.status(409).json({ error: 'Username already exists' });
      } else {
        const insertUserQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.query(insertUserQuery, [username, password], (insertUserError) => {
          if (insertUserError) {
            console.error('Error inserting user:', insertUserError);
            res.status(500).json({ error: 'Internal Server Error' });
          } else {
            res.status(201).json({ message: 'Registration successful' });
          }
        });
      }
    }
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const loginUserQuery = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(loginUserQuery, [username, password], (loginUserError, results) => {
    if (loginUserError) {
      console.error('Error logging in user:', loginUserError);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.length > 0) {
        const userType = results[0].userType; // Assuming user type is stored in the 'userType' column
        res.status(200).json({ message: 'Login successful', userType });
      } else {
        res.status(401).json({ error: 'Invalid username or password' });
      }
    }
  });
});

app.post('/api/bookings', (req, res) => {
    const { name, email, phone, checkIn, checkOut, guests, address, payment, terms } = req.body;

    const query = 'INSERT INTO bookinglist (name, email, phone, checkIn, checkOut, guests, address, payment, terms) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [name, email, phone, checkIn, checkOut, guests, address, payment, terms ? 1 : 0];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error inserting booking:', err);
            res.status(500).json({ error: 'Failed to book' });
            return;
        }
        res.status(200).json({ message: 'Booking successful' });
    });
});


app.post('/api/contact', (req, res) => {
    const { name, email, phone, message } = req.body;

    const query = 'INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)';
    const values = [name, email, phone, message];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error inserting contact message:', err);
            res.status(500).json({ error: 'Failed to send message' });
            return;
        }
        res.status(200).json({ message: 'Message sent successfully' });
    });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
