import express from 'express';
import dotenv from 'dotenv';

import entityRouter from './routes/entity.js';
import database from './db/database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.json());
app.use('/api/entities', entityRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

// Start the server
const server = app.listen(PORT, async () => {
    console.log(`Listening on port ${PORT}`)
    await database.init(); // Initialize database and create tables
});

export { app, server }
