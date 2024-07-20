import express from 'express';
import { checkIn, checkOut, getAttendance } from '../controllers/attendanceController.js';
import {authMiddleware} from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/checkin', authMiddleware, checkIn);
router.post('/checkout', authMiddleware, checkOut);
router.get('/records', authMiddleware, getAttendance);

export default router;
