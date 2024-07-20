import React from "react";
import {useNavigate} from 'react-router-dom';

const Home=()=>{
    const navigate=useNavigate();

    const handleLogin=()=>{
        navigate('/login');
    }

    const handleRegister=()=>{
        navigate('/register');
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-8">Welcome to Employee Management system</h1>
            <div className="space-x-4">
                <button
                    onClick={handleLogin}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:ng-blue-700"
                >
                    Login
                </button>
                <button
                    onClick={handleRegister}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                >
                    Register
                </button>
            </div>
        </div>
    );
};

export default Home;