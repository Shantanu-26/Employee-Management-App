import React, {useState, useEffect} from "react";
import axios from 'axios'
import EmployeeCard from "./EmployeeCard.jsx";
import { useNavigate } from "react-router-dom";

const HRDashboard=()=>{
    const [employees, setEmployees]=useState([]);
    const navigate=useNavigate();
    

    useEffect(()=>{
        const fetchEmployees=async()=>{
            try {
                const token=localStorage.getItem('token');

                if(!token){
                    throw new Error('Token not found');
                }

                const config={
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                const response=await axios.get(`http://localhost:3000/api/hr/employeesdetails`, config);
                setEmployees(response.data);
            } catch (error) {
                console.error("Error fetching employees:", error.message);
            }
        };

        fetchEmployees();
    }, []);

    const handleLogout=()=>{
        localStorage.removeItem('token');
        navigate('/');
    }

    const handleLeaveRequests=()=>{
        navigate('/leave-requests')
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-blue-100">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center mb-6 text-black">HR Dashboard</h2>
                <div className="space-y-4">
                    {employees.map((employee) => (
                        <EmployeeCard key={employee._id} employee={employee} />
                    ))}
                </div>
                <button 
                    onClick={handleLogout}
                    className="w-full mt-6 bg-black text-white py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-300"
                >
                    Logout
                </button>
                <br />
                <button 
                    onClick={handleLeaveRequests}
                    className="w-full mt-6 bg-black text-white py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-300"
                >
                    Track Leave Requests
                </button>
            </div>
        </div>
    );
};

export default HRDashboard;