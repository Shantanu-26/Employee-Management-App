import express from 'express';
import { getEmployeeDetails } from '../controllers/employeeController.js';
import {authMiddleware} from '../middleware/authMiddleware.js';

const router=express.Router();

router.get('/:id', authMiddleware, getEmployeeDetails);

export default router;