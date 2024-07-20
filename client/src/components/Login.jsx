import React, {useState} from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Login=()=>{
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [error, setError]=useState('');
    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();

        try {
            const response=await axios.post(`http://localhost:3000/api/auth/login`, {
                email,
                password
            });

            const {token, result}=response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', result._id);
            // navigate(`/dashboard/${result._id}`);

            if(result.role==='hr'){
                navigate('/hrdashboard')
            }else{
                navigate(`/dashboard/${result._id}`)
            }
        } catch (error) {
            setError(error.response.data.message)
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                <label className="block text-gray-700"></label>
                    Email:
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)} 
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"    
                    />
                </div>
                <div>
                <label className="block text-gray-700"></label>
                    Password:
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value)} 
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"    
                    />
                </div>
                <button 
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded:md hover:bg-blue-600 focus:outine-none focus:ring focus:ring-blue-300"    
                >
                    Login
                </button>
            </form>
            <p>Don't have an account? <Link to="/register">Register Here</Link></p> 
            </div>
        </div>
    );
};

export default Login;