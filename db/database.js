import dbPromise from "./connection.js";

class Database {
    constructor(tableName = 'entities') {
        this.tableName = tableName;
    }

    async init() {
        const db = await dbPromise;
        await db.exec(`
        CREATE TABLE IF NOT EXISTS ${this.tableName} (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          data TEXT NOT NULL
        )
      `);
    }

    // Get all entities from the database
    async getAll() {
        const db = await dbPromise;
        const results = await db.all(`SELECT * FROM ${this.tableName}`);
        return results.map(row => ({ ...row, data: JSON.parse(row.data) }));
    }

    // Get a single entity by its ID from the database
    async getById(id) {
        const db = await dbPromise;
        const result = await db.get(`SELECT * FROM ${this.tableName} WHERE id = ?`, id);
        return result ? { ...result, data: JSON.parse(result.data) } : null;
    }

    // Create a new entity in the database
    async create(data) {
        const db = await dbPromise;
        const result = await db.run(
            `INSERT INTO ${this.tableName} (data) VALUES (?)`,
            [JSON.stringify(data)]
        );
        return this.getById(result.lastID);
    }

    // Update an entity in the database
    async update(id, data) {
        const db = await dbPromise;
        await db.run(
            `UPDATE ${this.tableName} SET data = ? WHERE id = ?`,
            [JSON.stringify(data), id]
        );
        return this.getById(id);
    }

    // Delete an entity from the database
    async delete(id) {
        const db = await dbPromise;
        await db.run(`DELETE FROM ${this.tableName} WHERE id = ?`, id);
    }
}

export default new Database();
