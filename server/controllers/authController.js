import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {User} from '../models/userModel.js';


const register=async (req, res) => {
    const {name, ID, email, password, role, age, gender, contact, position, salary, project}=req.body;

    try {
        const existingUser=await User.findOne({ email });

        if(existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword=await bcrypt.hash(password, 12);

        const result=await User.create({
            name,
            ID,
            email,
            password: hashedPassword,
            role,
            age,
            gender,
            contact,
            position,
            salary,
            project
        });

        const token=jwt.sign({ email: result.email, id: result._id }, process.env.JWT_SECRET, { expiresIn: '2h' });

        return res.status(201).json({ result, token });
    } catch (error) {
        console.error("Error during registration:", error.message);
        res.status(500).json({ message: 'Something went wrong' });
    }
};



const login=async(req, res)=>{
    const {email, password}=req.body;

    try {
        const existingUser=await User.findOne({email});

        if(!existingUser){
            return res.status(404).json({message: 'User does not exist'});
        }

        const isPasswordCorrect=await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect){
            return res.status(400).json({message: 'Invalid credentials'});
        }

        const token=jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.JWT_SECRET, {expiresIn: '2h'});

        res.status(200).json({result:existingUser, token});
    } catch (error) {
        res.status(500).json({message: 'Something went wrong'});
    }
};

export {register, login};