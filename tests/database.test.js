import { expect } from 'chai';
import database from '../db/database.js';

describe('Database', () => {
    beforeEach(async () => {
        await database.init();
        // Clear the database before each test
        const db = await import('../db/connection.js').then(m => m.default);
        await db.run(`DELETE FROM ${database.tableName}`);
    });

    it('should create an entity', async () => {
        const data = { name: 'Test Entity', description: 'Test Description' };
        const result = await database.create(data);
        expect(result.data).to.deep.equal(data);
        expect(result.id).to.be.a('number');
    });

    it('should get all entities', async () => {
        const data1 = { name: 'Entity 1' };
        const data2 = { name: 'Entity 2' };
        await database.create(data1);
        await database.create(data2);

        const entities = await database.getAll();
        expect(entities).to.have.lengthOf(2);
        expect(entities[0].data.name).to.equal('Entity 1');
        expect(entities[1].data.name).to.equal('Entity 2');
    });

    it('should get entity by id', async () => {
        const data = { name: 'Test Entity' };
        const created = await database.create(data);
        const retrieved = await database.getById(created.id);
        expect(retrieved.data).to.deep.equal(data);
    });

    it('should update entity', async () => {
        const data = { name: 'Original Name' };
        const created = await database.create(data);
        const updatedData = { name: 'Updated Name' };
        const updated = await database.update(created.id, updatedData);
        expect(updated.data).to.deep.equal(updatedData);
    });

    it('should delete entity', async () => {
        const data = { name: 'Test Entity' };
        const created = await database.create(data);
        await database.delete(created.id);
        const retrieved = await database.getById(created.id);
        expect(retrieved).to.be.null;
    });
});
