import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const TeamDashboard=()=>{
    const [teamDetails, setTeamDetails]=useState(null);
    const [message, setMessage]=useState('');
    const [projectName, setProjectName]=useState('');
    const { teamId}=useParams();
    const navigate=useNavigate();
    const id=localStorage.getItem('userId');

    useEffect(()=>{
        const fetchTeamDetails=async () => {
        try {
            const token=localStorage.getItem('token');
            const config={
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const {data}=await axios.get(`http://localhost:3000/api/teams/${teamId}`, config);
            console.log('Fetched team details:', data)

            setTeamDetails(data);
            setProjectName(data.projectName);
            } catch (error) {
                setMessage(error.response.data.message||'Something went wrong');
            }
        };

        fetchTeamDetails();
    }, [teamId]);

    if (!teamDetails) {
        return <div>Loading team details...</div>;
    }

    const leaderId=teamDetails.leader?._id||teamDetails.leader;
    const leader=teamDetails.members.find(member => member._id===leaderId);

    return (
        <div className="min-h-screen bg-blue-100 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-center">{teamDetails.name}</h2>
                {message && <p className="text-red-500 mb-4">{message}</p>}
                <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Project Name</h3>
                <p className="mb-4">{teamDetails.projectName}</p>
                <h3 className="text-lg font-semibold mb-2">Project Details</h3>
                <p className="mb-4">{teamDetails.projectDetails}</p>
                <h3 className="text-lg font-semibold mb-2">Team Leader</h3>
                <div className="mb-4">
                    {leader ? (
                        <p className="font-bold">{leader.name}</p>
                    ) : (
                        <p className="font-bold text-red-500">Leader information not available</p>
                )}
                </div>
                <h3 className="text-lg font-semibold mb-2">Team Members</h3>
                <ul>
                    {teamDetails.members
                    .filter(member=>member._id!==leaderId)
                    .map(member=>(
                        <li key={member._id} className="mb-2">
                            <div className="flex items-center justify-between">
                                <p>{member.name}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                </div>
                <button
                    onClick={() => navigate(`/team/${teamId}/task-management`)}
                    className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600 w-full sm:w-64"
                >
                    Task Management
                </button>
                <br />
                <button
                    onClick={() => navigate(`/teams/${id}`)}
                    className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600 w-full sm:w-64"
                >
                    Back to teams page
                </button>
                <br />
                <button
                    onClick={() => navigate(`/dashboard/${id}`)}
                    className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600 w-full sm:w-64"
                >
                    Back to dashboard
                </button>
            </div>
        </div>
    );
    };

export default TeamDashboard;
