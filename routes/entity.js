import express from 'express';
import database from '../db/database.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const entities = await database.getAll();
        res.json(entities);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const entity = await database.getById(req.params.id);
        if (entity) {
            res.json(entity);
        } else {
            res.status(404).json({ error: 'Entity not found' });
        }
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const newEntity = await database.create(req.body);
        res.status(201).json(newEntity);
    } catch (err) {
        next(err);
    }
});

router.patch('/:id', async (req, res, next) => {
    try {
        const entity = await database.getById(req.params.id);
        if (!entity) {
            return res.status(404).json({ error: 'Entity not found' });
        }
        const updatedEntity = await database.update(req.params.id, req.body);
        res.json(updatedEntity);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const entity = await database.getById(req.params.id);
        if (!entity) {
            return res.status(404).json({ error: 'Entity not found' });
        }
        await database.delete(req.params.id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
});

export default router;
