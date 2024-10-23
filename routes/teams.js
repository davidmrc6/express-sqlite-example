import express from 'express';
import database from '../db/database.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const teams = await database.getAllTeams();
    res.json(teams);
});

router.get('/:id', async (req, res) => {
    const team = await database.getTeamById(req.params.id);
    if (team) {
        res.json(team);
    } else {
        res.status(404).send('Team not found');
    }
});

router.post('/', async (req, res) => {
    const newTeam = await database.addTeam(req.body);
    res.status(201).json(newTeam);
});

router.patch('/:id', async (req, res) => {
    const updatedTeam = await database.updateTeam(req.params.id, req.body);
    res.json(updatedTeam);
});

router.delete('/:id', async (req, res) => {
    await database.deleteTeam(req.params.id);
    res.status(204).send();
});

export default router;
