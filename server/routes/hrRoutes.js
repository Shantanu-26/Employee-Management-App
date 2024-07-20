import express from 'express';
import {getAllEmployees, updateEmployee} from '../controllers/hrController.js';
import {authMiddleware} from '../middleware/authMiddleware.js';

const router=express.Router();

router.get('/employeesdetails', authMiddleware, getAllEmployees);
router.put('/update/:id', authMiddleware, updateEmployee)

export default router;