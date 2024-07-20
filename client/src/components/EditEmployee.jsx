import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditEmployee=()=>{
    const {id}=useParams();
    const [employee, setEmployee]=useState(null);
    const navigate=useNavigate();
    const [editEmployeeData, setEditEmployeeData]=useState({
        name: "",
        email: "",
        role: "",
        age: "",
        gender: "",
        contact: "",
        position: "",
        salary: "",
        project: ""
    })

    useEffect(()=>{
        const fetchEmployee=async()=>{
            try {
                const token=localStorage.getItem('token');

                if(!token){
                    throw new Error('Token not found')
                }

                const config={
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

                const response=await axios.get(
                    `http://localhost:3000/api/employee/${id}`,
                    config
                )

                setEmployee(response.data.result);
                setEditEmployeeData(response.data.result);
            } catch (error) {
                console.error("Error fetching employee:", error.message);
            }
        };

        fetchEmployee();
    }, [id]);

    const handleChange=(e)=>{
        const {name, value}=e.target;
        setEditEmployeeData({...editEmployeeData, [name]:value});
    };

    const backToDashboard=()=>{
        navigate('/hrdashboard')
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();

        try {
            const token=localStorage.getItem('token');

            if(!token){
                throw new Error('Token not found');
            }

            const config={
                headers: {
                    Authorization:`Bearer ${token}`
                },
            };

            const response=await axios.put(
                `http://localhost:3000/api/hr/update/${id}`,
                editEmployeeData,
                config
            )

            console.log("Updated Employee:", response.data.result);
        } catch (error) {
            console.error("Error updating employee:", error.message)
        }
    };

    if(!employee){
        return <p>Loading...</p>;
    }

    return (
        <div className="max-w-md mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Edit Employee Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={editEmployeeData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div>
                    <label>ID:</label>
                    <input
                        type="text"
                        name="id"
                        value={editEmployeeData.ID}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        readOnly
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={editEmployeeData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div>
                    <label>Role:</label>
                    <select
                        name="role"
                        value={editEmployeeData.role}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    >
                        <option value="Employee">Employee</option>
                        <option value="HR">HR</option>
                    </select>
                </div>
                <div>
                    <label>Age:</label>
                    <input
                        type="number"
                        name="age"
                        value={editEmployeeData.age}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div>
                    <label>Gender:</label>
                    <input
                        type="text"
                        name="gender"
                        value={editEmployeeData.gender}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div>
                    <label>Contact:</label>
                    <input
                        type="text"
                        name="contact"
                        value={editEmployeeData.contact}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div>
                    <label>Position:</label>
                    <input
                        type="text"
                        name="position"
                        value={editEmployeeData.position}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div>
                    <label>Salary:</label>
                    <input
                        type="text"
                        name="salary"
                        value={editEmployeeData.salary}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div>
                    <label>Project:</label>
                    <input
                        type="text"
                        name="project"
                        value={editEmployeeData.project}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                >
                    Update Employee
                </button>
            </form>
            <br />
            <button 
                onClick={backToDashboard}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"    
            >
                Back to Dashboard
            </button>
        </div>
    )
};

export default EditEmployee;