import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EmployeeDashboard=()=>{
    const { id }=useParams();
    const [employee, setEmployee]=useState(null);
    const [error, setError]=useState('');
    const navigate=useNavigate();

    useEffect(() => {
        const fetchEmployee=async () => {
            try {
                const token=localStorage.getItem('token');
                if (!token) {
                    setError('Token not found');
                    return;
                }

                const config={
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                const response=await axios.get(`http://localhost:3000/api/employee/${id}`, config);
                console.log('Employee data:', response.data);
                setEmployee(response.data.result);
            } catch (error) {
                setError(error.response.data.message);
            }
        };

        fetchEmployee();
    }, [id]);

    const handleLogout=()=>{
        localStorage.removeItem('token');
        navigate('/');
    }

    const handleMarkAttendance=()=>{
        navigate(`/attendance/${id}`)
    }

    const handleLeaves=()=>{
        navigate(`/submit-leave/${id}`)
    }

    const handleTeams=()=>{
        navigate(`/teams/${id}`)
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!employee) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-blue-100">
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center mb-6 text-black">Employee Dashboard</h2>
                <div className="space-y-4">
                    <p className="text-gray-800"><strong className="text-black">Name:</strong> {employee.name}</p>
                    <p className="text-gray-800"><strong className="text-black">ID:</strong> {employee.ID}</p>
                    <p className="text-gray-800"><strong className="text-black">Email:</strong> {employee.email}</p>
                    <p className="text-gray-800"><strong className="text-black">Role:</strong> {employee.role}</p>
                    <p className="text-gray-800"><strong className="text-black">Age:</strong> {employee.age}</p>
                    <p className="text-gray-800"><strong className="text-black">Gender:</strong> {employee.gender}</p>
                    <p className="text-gray-800"><strong className="text-black">Contact:</strong> {employee.contact}</p>
                    <p className="text-gray-800"><strong className="text-black">Position:</strong> {employee.position}</p>
                    <p className="text-gray-800"><strong className="text-black">Salary:</strong> {employee.salary}</p>
                    <p className="text-gray-800"><strong className="text-black">Project:</strong> {employee.project}</p>
                </div>
                <div className="flex justify-between mt-6">
                    <button
                        onClick={handleMarkAttendance}
                        className="w-full px-4 bg-black text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-gray-300"
                >
                        Mark Attendance
                    </button>
                </div>
                <br />
                <div>
                <button
                        onClick={handleLeaves}
                        className="w-full px-4 bg-black text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-gray-300"
                >
                        Leave Application
                    </button>
                </div>
                <button 
                    onClick={handleTeams}
                    className="w-full mt-6 bg-black text-white py-2 rounded-md hover:bg-blue-800 focus:outline-none focus:ring focus:ring-gray-300"
                >
                    Teams
                </button>
                <button 
                    onClick={handleLogout}
                    className="w-full mt-6 bg-black text-white py-2 rounded-md hover:bg-blue-800 focus:outline-none focus:ring focus:ring-gray-300"
                >
                    Logout
                </button>
            </div>
        </div>
    );``
};

export default EmployeeDashboard;