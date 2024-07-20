import {User} from '../models/userModel.js'

const getAllEmployees=async(req, res)=>{
    try {
        const employees=await User.find().select('-password');

        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const updateEmployee=async(req, res)=>{
    try {
        const {id}=req.params;
        const updateData=req.body;

        const updatedEmployee=await User.findByIdAndUpdate(id, updateData, {new: true}).select('-password');
        if(!updatedEmployee){
            return res.status(404).send({message: 'Employee not found'});
        }

        res.send({message: 'Employee Updated Successfully', result: updatedEmployee});
    } catch (error) {
        res.status(500).send({message: error.message})
    }
};

export {getAllEmployees, updateEmployee};