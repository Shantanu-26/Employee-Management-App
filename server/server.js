import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import hrRoutes from './routes/hrRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import leaveRoutes from './routes/leaveRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();

const app=express();

connectDB().catch((error)=>{
    console.error('Database connection failed:', error);
    process.exit(1);
});

app.use(cors());

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/hr', hrRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/tasks', taskRoutes);

const PORT=3000;

app.listen(PORT, ()=>console.log(`Server running on ${PORT}`));