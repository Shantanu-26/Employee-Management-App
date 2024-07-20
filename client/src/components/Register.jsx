import React, {useState} from "react";
import axios from "axios";

const Register=()=>{
    const [name, setName]=useState('');
    const [ID, setID]=useState('');
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [role, setRole]=useState('employee');
    const [age, setAge]=useState('');
    const [gender, setGender]=useState('');
    const [contact, setContact]=useState('');
    const [position, setPosition]=useState('');
    const [salary, setSalary]=useState('');
    const [project, setProject]=useState('');
    const [error, setError]=useState('');

    const handleSubmit=async(e)=>{
        e.preventDefault();

        try {
            const response=await axios.post(`http://localhost:3000/api/auth/register`, {
                name,
                ID,
                email,
                password,
                role,
                age,
                gender,
                contact,
                position,
                salary,
                project
            });

            const {token}=response.data;

            localStorage.setItem('token', token);

            console.log('Registration successful');
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center mb-6">Register:</h2>
            {error && <p className="text-red-500 text-center mb-4">error</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block text-gray-700">
                    Name:
                    <input 
                        type="text"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </label>
                <br />
                <label className="block text-gray-700">
                    ID:
                    <input 
                        type="text"
                        value={ID}
                        onChange={(e)=>setID(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </label>
                <br />
                <label className="block text-gray-700">
                    Email:
                    <input 
                        type="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </label>
                <br />
                <label className="block text-gray-700">
                    Password:
                    <input 
                        type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </label>
                <br />
                <label className="block text-gray-700">
                    Role:
                    <select 
                        value={role} 
                        onChange={(e)=>setRole(e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"    
                    >
                        <option value="employee">employee</option>
                        <option value="hr">HR</option>
                    </select>
                </label>
                <br />
                <label className="block text-gray-700">
                    Age:
                    <input 
                        type="number"
                        value={age}
                        onChange={(e)=>setAge(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </label>
                <br />
                <label className="block text-gray-700">
                    Gender:
                    <input 
                        type="text"
                        value={gender}
                        onChange={(e)=>setGender(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </label>
                <br />
                <label className="block text-gray-700">
                    Contact:
                    <input 
                        type="text"
                        value={contact}
                        onChange={(e)=>setContact(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </label>
                <br />
                <label className="block text-gray-700">
                    Position:
                    <input 
                        type="text"
                        value={position}
                        onChange={(e)=>setPosition(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </label>
                <br />
                <label className="block text-gray-700">
                    Salary:
                    <input 
                        type="number"
                        value={salary}
                        onChange={(e)=>setSalary(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </label>
                <br />
                <label className="block text-gray-700">
                    Project:
                    <input 
                        type="text"
                        value={project}
                        onChange={(e)=>setProject(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </label>
                <br />
                <button 
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                >
                    Register
                </button>
            </form>
            </div>
        </div>
    )
}

export default Register;