import mongoose from "mongoose";

const attendanceSchema=new mongoose.Schema({
    date: { 
        type: Date, 
        required: true 
    },
    checkIn: { 
        type: Date
    },
    checkOut: {
         type: Date 
    }
});

const leaveSchema=new mongoose.Schema({
    startDate: {
        type: Date, 
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    response: {
        type: String
    }
});

const teamSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    projectName: {
        type: String,
        required: true
    },
    projectDetails: {
        type: String,
        required: true
    },
    leader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const taskSchema=new mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    progress: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true
});

const userSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ID: {
        type: Number,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    role: {
        type: String,
        required: true,
        enum: ['employee', 'hr']
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    project: {
        type: String,
        required: true
    },
    attendance: [attendanceSchema]   ,
    leaves: [leaveSchema] ,
    tasks:[taskSchema],
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }]
});

const User=mongoose.model('User', userSchema);
const Team=mongoose.model('Team', teamSchema);

export {User, Team};