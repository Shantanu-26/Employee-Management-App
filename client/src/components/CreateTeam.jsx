import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CreateTeam=()=>{
    const [employees, setEmployees]=useState([]);
    const [selectedEmployees, setSelectedEmployees]=useState([]);
    const [projectName, setProjectName]=useState('');
    const [projectDetails, setProjectDetails]=useState('');
    const [teamName, setTeamName]=useState('');
    const [message, setMessage]=useState('');
    const navigate=useNavigate();
    const { id }=useParams();

    useEffect(()=>{
        const fetchEmployees=async()=>{
            try {
                const token=localStorage.getItem('token');
                const config={
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                const {data}=await axios.get('http://localhost:3000/api/hr/employeesdetails', config);
                setEmployees(data.filter(user=>user.role==='employee'));
            } catch (error) {
                setMessage(error.response.data.message||'Something went wrong');
            }
        };

        fetchEmployees();
    }, []);

    const handleCreateTeam=async()=>{
        try {
            const token=localStorage.getItem('token');
            const config={
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const leaderId=localStorage.getItem('userId');
            const {data}=await axios.post('http://localhost:3000/api/teams/create', {
                name: teamName,
                projectName,
                projectDetails,
                leaderId,
                memberIds: selectedEmployees
            }, config);

            console.log('Response Data:', data); // Log the response data
            navigate(`/teams/${data.team._id}`);
        } catch (error) {
            setMessage(error.response.data.message||'Something went wrong');
        }
    };

    const handleCheckboxChange=(employeeId)=>{
        setSelectedEmployees(prevSelectedEmployees=>{
            if (prevSelectedEmployees.includes(employeeId)){
                return prevSelectedEmployees.filter(id=>id!==employeeId);
            }else{
                return [...prevSelectedEmployees, employeeId];
            }
        });
    };

    return (
        <div className="min-h-screen bg-blue-100 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Create Team</h2>
                {message && <p className="text-red-500 mb-4">{message}</p>}
                <input 
                    type="text"
                    placeholder="Team Name"
                    value={teamName}
                    onChange={(e)=>setTeamName(e.target.value)}
                    className="w-full p-2 border-gray-300 rounded mb-4"
                />
                <input 
                    type="text"
                    placeholder="Project Name"
                    value={projectName}
                    onChange={(e)=>setProjectName(e.target.value)}
                    className="w-full p-2 border-gray-300 rounded mb-4"
                />
                <textarea 
                    placeholder="Project Details"
                    value={projectDetails}
                    onChange={(e)=>setProjectDetails(e.target.value)}
                    className="w-full p-2 border-gray-300 rounded mb-4"
                />
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Select Employees</h3>
                    {employees.map(employee=>(
                        <div key={employee._id} className="mb-2">
                            <input
                                type="checkbox"
                                id={employee._id}
                                checked={selectedEmployees.includes(employee._id)}
                                onChange={()=>handleCheckboxChange(employee._id)}
                                className="mr-2"
                            />
                            <label htmlFor={employee._id}>{employee.name}</label>
                        </div>
                    ))}
                </div>
                <div
                    onClick={handleCreateTeam}
                    className="bg-green-500 text-white px-4 py-2 mt-4 rounded hover:bg-green-600"
                >
                    Create Team
                </div>
            </div>
        </div>
    );
};

export default CreateTeam;
