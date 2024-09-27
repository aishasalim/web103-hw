const express = require('express');
const app = express();
const path = require('path');
const pool = require('./db'); // Import the database configuration
require('dotenv').config(); // Load environment variables

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Route to render the index page with tips from the database
app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tips');
        res.render('index', { tips: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to search tips by title
app.get('/search', async (req, res) => {
    const query = req.query.query; // Get the search term from the query string
    try {
        const result = await pool.query('SELECT * FROM tips WHERE title ILIKE $1', [`%${query}%`]);
        res.render('index', { tips: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to render detail page for a specific tip
app.get('/tips/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tips WHERE id = $1', [req.params.id]);
        const tip = result.rows[0];
        if (tip) {
            res.render('detail', { tip });
        } else {
            res.status(404).render('404');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Handle 404 errors for unmatched routes
app.use((req, res) => {
    res.status(404).render('404');
});
