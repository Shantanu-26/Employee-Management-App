import { User, Team } from '../models/userModel.js';

export const createTask = async (req, res) => {
    try {
        const { taskName, assignedTo, progress, teamId } = req.body;

        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(400).json({ message: 'Team not found' });
        }

        const user = await User.findById(assignedTo);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const newTask = {
            taskName,
            assignedTo,
            progress,
            team: teamId,
        };

        user.tasks.push(newTask);
        await user.save();

        res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getTasks = async (req, res) => {
    try {
        const tasks = await User.find().select('tasks');
        res.json({ tasks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getTaskById = async (req, res) => {
    try {
        const taskId = req.params.id;
        const user = await User.findOne({ 'tasks._id': taskId });
        const task = user.tasks.id(taskId);
        res.json({ task });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const { taskName, assignedTo, progress, teamId } = req.body;

        const user = await User.findOne({ 'tasks._id': taskId });
        const task = user.tasks.id(taskId);

        task.taskName = taskName;
        task.assignedTo = assignedTo;
        task.progress = progress;
        task.team = teamId;

        await user.save();
        res.json({ message: 'Task updated successfully', task });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const user = await User.findOne({ 'tasks._id': taskId });
        user.tasks.id(taskId).remove();
        await user.save();
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
