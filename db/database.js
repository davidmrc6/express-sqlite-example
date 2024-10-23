import dbPromise from './connection.js';

class Database {
    async init() {
        const db = await dbPromise;
        await db.exec(`
            CREATE TABLE IF NOT EXISTS teams (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL
            )
        `);
    }

    async getAllTeams() {
        const db = await dbPromise;
        return db.all(`SELECT * FROM teams`);
    }

    async getTeamById(id) {
        const db = await dbPromise;
        return db.get('SELECT * FROM teams WHERE id = ?', id);
    }

    async addTeam(team) {
        const db = await dbPromise;
        const { name, country, founded, league } = team;
        const result = await db.run('INSERT INTO teams (name, country, founded, league) VALUES (?, ?, ?, ?)', [name, country, founded, league]);
        return { id: result.lastID, ...team };
    }

    async updateTeam(id, team) {
        const db = await dbPromise;
        await db.run('UPDATE teams SET name = ?, country = ?, founded = ?, league = ? WHERE id = ?', [team.name, team.country, team.founded, team.league, id]);
        return this.getTeamById(id);
    }

    async deleteTeam(id) {
        const db = await dbPromise;
        await db.run('DELETE FROM teams WHERE id = ?', id);
    }
}

export default new Database();
