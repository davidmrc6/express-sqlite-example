import express from 'express';
import dotenv from 'dotenv';

import teamsRouter from './routes/teams.js';
import database from './db/database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.json());
app.use('/teams', teamsRouter);

app.listen(PORT, async () => {
    console.log(`Listening on port ${PORT}`)
    await database.init(); // Initialize database and create tables
});
