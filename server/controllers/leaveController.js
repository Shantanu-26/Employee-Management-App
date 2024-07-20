import {User} from '../models/userModel.js'

const submitLeaveRequest=async(req, res)=>{
    const {startDate, endDate, reason}=req.body;
    const userId=req.user.id;

    try {
        const user=await User.findById(userId);

        if(!user){
            return res.status(404).json({message: 'User not found'});
        }

        user.leaves.push({startDate, endDate, reason});
        await user.save();

        res.status(201).json({message: 'Leave request submitted successfully'})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


const getAllLeaveRequests=async(req, res)=>{
    try {
        const users=await User.find({"leaves.0": {$exists: true}}).select('name leaves');
        
        res.status(200).json(users);
    } catch (error) {
        res.status(500),json({message: error.message});
    }
};


const updateLeaveRequestStaus=async(req, res)=>{
    const {userId, leaveId, status, response}=req.body;

    try {
        const user=await User.findById(userId);

        if(!user){
            return res.status(404).json({message: 'User not found'});
        }

        const leave=user.leaves.id(leaveId);

        if(!leave){
            return res.status(404).json({message: 'Leave request not found'});
        }

        leave.status=status;
        leave.response=response;
        
        await user.save();

        res.status(200).json({message: 'Leave request updated successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


const getLeaveRequestForEmployee=async(req, res)=>{
    const userId=req.user.id;

    try {
        const user=await User.findById(userId).select('leaves');

        if(!user){
            return res.status(404).json({message: 'User not found'});
        }

        res.status(200).json({leaveRequests: user.leaves});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


export {submitLeaveRequest, getAllLeaveRequests, updateLeaveRequestStaus, getLeaveRequestForEmployee};