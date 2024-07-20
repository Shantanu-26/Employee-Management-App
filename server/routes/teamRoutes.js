import express from 'express';
import { createTeam, addMember, removeMember, getTeamsByUser, getTeamById } from '../controllers/teamController.js';
import {authMiddleware} from '../middleware/authMiddleware.js';

const router=express.Router();

router.post('/create', authMiddleware, createTeam);
router.put('/add-member', authMiddleware, addMember);
router.put('/remove-member', authMiddleware, removeMember);
router.get('/userTeams', authMiddleware, getTeamsByUser);
router.get('/:teamId', authMiddleware, getTeamById);

export default router;