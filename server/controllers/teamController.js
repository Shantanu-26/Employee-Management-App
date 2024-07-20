import { User, Team } from "../models/userModel.js";

const createTeam = async (req, res) => {
    const { name, projectName, projectDetails, leaderId, memberIds } = req.body;

    try {
        console.log('Request Body:', req.body);
        const leader = await User.findById(leaderId);

        if (!leader) {
            return res.status(404).json({ message: 'Leader not found' });
        }

        const members = await User.find({ _id: { $in: memberIds }, role: 'employee' });

        const team = new Team({
            name,
            projectName,
            projectDetails,
            leader: leaderId,
            members: members.map(member => member._id)
        });

        await team.save();

        leader.teams.push(team._id);
        await leader.save();

        for (const member of members) {
            member.teams.push(team._id);
            await member.save();
        }

        res.status(201).json({ message: 'Team created successfully', team });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addMember=async(req, res)=>{
    const {teamId, memberId}=req.body;

    try {
        const team=await Team.findById(teamId);

        if(!team){
            return res.status(404).json({message: 'Team not found'});
        }

        const member=await User.findById(memberId);

        if(!member||member.role!='employee'){
            return res.status(404).json({message: 'Employee not found'});
        }

        team.members.push(memberId);
        await team.save();

        member.teams.push(teamId);
        await member.save();

        res.status(200).json({message: 'Member added successfully', team});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const removeMember=async(req, res)=>{
    const {teamId, memberId}=req.body;

    try {
        const team=await User.findById(teamId);

        if(!team){
            return res.status(404).json({message: 'Team not found'});
        }

        team.members=team.members.filter(member=>member.toString()!==memberId);
        await team.save();

        const member=await User.findById(memberId);
        member.teams=member.teams.filter(team=>team.toString()!==teamId);
        await member.save();

        res.status(201).json({message: 'Member removed successfully', team});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getTeamsByUser=async(req, res)=>{
    try {
        const userId=req.user.id;
        const user=await User.findById(userId).populate('teams');

        if(!user){
            return res.status(404).json({message: 'User not found'});
        }

        res.status(200).json(user.teams);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getTeamById=async (req, res) => {
    const {teamId}=req.params;
    try {
        const team=await Team.findById(teamId).populate('members', 'name project');
        if (!team){
            return res.status(404).json({message: 'Team not found'});
        }
        res.status(200).json(team);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error', error: error.message});
    }
};


export {createTeam, addMember, removeMember, getTeamsByUser, getTeamById}