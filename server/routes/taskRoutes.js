// import express from 'express';
// import { createTask, getTeamTasks, updateTaskProgress, deleteTask} from '../controllers/taskController.js';
// import {authMiddleware} from '../middleware/authMiddleware.js';

// const router=express.Router();

// router.post('/create', authMiddleware, createTask);
// router.get('/team/:teamId', authMiddleware, getTeamTasks);
// router.patch('/update/:taskId', authMiddleware, updateTaskProgress);
// router.delete('/delete/:taskId', authMiddleware, deleteTask);

// export default router;








import express from 'express';
import { createTask, getTasks, getTaskById, updateTask, deleteTask } from '../controllers/taskController.js';

const router = express.Router();

router.post('/create', createTask);
router.get('/getAll', getTasks);
router.get('/getOne/:id', getTaskById);
router.put('/update/:id', updateTask);
router.delete('/delete/:id', deleteTask);

export default router;
