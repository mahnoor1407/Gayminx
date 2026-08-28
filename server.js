const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// GET all sessions
app.get('/api/sessions', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM sessions ORDER BY session_date DESC');
        res.json(result.rows);
    } catch (err) {
        console.error('Database error:', err);  
        res.status(500).json({ error: 'Database error' });
    }
});

// POST a new session
app.post('/api/sessions', async (req, res) => {
    const { game, hours, date, platform, rating, notes, thumbnail, genre } = req.body;
    
    try {
        const result = await pool.query(
            'INSERT INTO sessions (game_name, hours_played, session_date, platform, rating, notes, thumbnail, genre) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [game, hours, date, platform, rating, notes, thumbnail, genre]  
        );
        res.json({ 
            message: 'Session logged!', 
            session: result.rows[0] 
        });
    } catch (err) {
    console.error('❌ Full database error:', err);
    console.error('❌ Error message:', err.message);
    console.error('❌ Query parameters:', [game, hours, date, platform, rating, notes, thumbnail, genre]);
    res.status(500).json({ error: 'Database error', details: err.message });
}
});

app.get('/', (req, res) => {
    res.send('🎮 Gamer\'s Hub API is running!<br>Visit <a href="/api/sessions">/api/sessions</a> to see your data.');
});

module.exports = app;

const path = require('path');

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// DELETE a session
app.delete('/api/sessions/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await pool.query('DELETE FROM sessions WHERE id = $1', [id]);
        res.json({ message: 'Session deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// UPDATE a session
app.put('/api/sessions/:id', async (req, res) => {
    const id = req.params.id;
    const { game, hours, date, platform, rating, notes } = req.body;
    try {
        const result = await pool.query(
            'UPDATE sessions SET game_name = $1, hours_played = $2, session_date = $3, platform = $4, rating = $5, notes = $6 WHERE id = $7 RETURNING *',
            [game, hours, date, platform, rating, notes, id]
        );
        res.json({ message: 'Session updated', session: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.get('/api/games', async (req, res) => {
    const { platform, category } = req.query;
    let url = 'https://www.freetogame.com/api/games?';

    if (platform) url += `platform=${platform}&`;
    if (category) url += `category=${category}`;
    // If no filters, just fetch all games

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('FreeToGame API error:', error);
        res.status(500).json({ error: 'Failed to fetch games' });
    }
});
 
app.get('/api/game/:id', async (req, res) => {
    try {
        const response = await fetch(`https://www.freetogame.com/api/game?id=${req.params.id}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('FreeToGame API error:', error);
        res.status(500).json({ error: 'Failed to fetch game details' });
    }
});