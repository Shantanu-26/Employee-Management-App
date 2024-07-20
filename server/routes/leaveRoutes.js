import express from 'express';
import { submitLeaveRequest, getAllLeaveRequests, updateLeaveRequestStaus, getLeaveRequestForEmployee } from '../controllers/leaveController.js';
import { authMiddleware, admin } from '../middleware/authMiddleware.js';

const router=express.Router();

router.post('/submit', authMiddleware, submitLeaveRequest);
router.get('/get', authMiddleware, getAllLeaveRequests);
router.put('/update', authMiddleware, updateLeaveRequestStaus);
router.get('/my-leaves/:id', authMiddleware, getLeaveRequestForEmployee);

export default router;