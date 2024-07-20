import mongoose from 'mongoose';
import {User} from '../models/userModel.js';

const getEmployeeDetails=async(req, res)=>{
    const {id}=req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message: 'Invalid employee ID'});
        }

        const employee = await User.findOne({_id: id}).select('-password');

        if (!employee){
            return res.status(404).json({message: 'Employee not found'});
        }

        res.status(200).json({result: employee});
    } catch (error) {
        console.error('Error fetching employee details:', error);
        res.status(500).json({message: 'Something went wrong'});
    }
};

export { getEmployeeDetails };
