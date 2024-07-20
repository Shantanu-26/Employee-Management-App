import {User} from '../models/userModel.js';

const checkIn=async(req, res)=>{
    const userId=req.user.id;
    const currentDate=new Date().toDateString();

    try {
        const user=await User.findById(userId);
        if (!user){
            return res.status(404).json({message: 'User not found'});
        }

        const existingAttendance=user.attendance.find(att => new Date(att.date).toDateString() === currentDate);

        if (existingAttendance){
            return res.status(400).json({message: 'Already checked in today'});
        }

        user.attendance.push({date: new Date(), checkIn: new Date()});
        await user.save();

        res.status(200).json({message: 'Checked in successfully'});
    } catch (error) {
        console.error('Error checking in:', error);
        res.status(500).json({message: 'Server error'});
    }
};


const checkOut=async (req, res) => {
    const userId=req.user.id;
    const currentDate=new Date().toDateString();

    try {
        const user=await User.findById(userId);
        if (!user){
            return res.status(404).json({message: 'User not found'});
        }

        const existingAttendance=user.attendance.find(att=>new Date(att.date).toDateString()===currentDate);

        if (!existingAttendance){
            return res.status(400).json({message: 'No check-in record for today'});
        }

        if (existingAttendance.checkOut){
            return res.status(400).json({message: 'Already checked out today'});
        }

        existingAttendance.checkOut=new Date();
        await user.save();

        res.status(200).json({message: 'Checked out successfully'});
    } catch (error) {
        console.error('Error checking out:', error);
        res.status(500).json({message: 'Server error'});
    }
};


const getAttendance=async (req, res)=>{
    const userId=req.user.id;

    try {
        const user=await User.findById(userId);

        if (!user){
            return res.status(404).json({message: 'User not found'});
        }

        res.status(200).json(user.attendance);
    } catch (error){
        console.error('Error fetching attendance records:', error);
        res.status(500).json({message: 'Server error'});
    }
};


export {checkIn, checkOut, getAttendance}