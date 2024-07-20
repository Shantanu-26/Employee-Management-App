import React, {useState, useEffect} from "react";
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';

const Teams=()=>{
    const [teams, setTeams]=useState([]);
    const [message, setMessage]=useState('');
    const navigate=useNavigate();
    const {id}=useParams();

    useEffect(()=>{
        const fetchTeams=async()=>{
            try {
                const token=localStorage.getItem('token');
                
                const config={
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                const {data}=await axios.get(`http://localhost:3000/api/teams/userTeams`, config);

                const uniqueTeams=data.reduce((acc, current)=>{
                    const leader=acc.find(item=>item._id===current._id);
                    if(!leader){
                        return acc.concat([current]);
                    }else{
                        return acc;
                    }
                }, []);


                setTeams(uniqueTeams);
            } catch (error) {
                setMessage(error.response.data.message||'Something went wrong');
            }
        };

        fetchTeams();
    }, []);

    return (
        <div className="min-h-screen bg-blue-100 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-center">Teams:</h2>
                {message&&<p className="text-red-500 mb-4">{message}</p>}
                <ul>
                    {teams.map(team=>(
                        <li key={team._id} className="mb-4 bg-gray-100 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <p className="font-semibold">{team.name}</p>
                                <button
                                    onClick={()=>navigate(`/team/${team._id}`)}
                                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                                >
                                    View Team
                                </button>
                            </div>
                        </li>
                    ))}
                    <button
                        onClick={()=>navigate(`/create-team/${id}`)}
                        className="bg-green-500 text-white px-4 py-2 mt-4 rounded hover:bg-green-600"
                    >
                        Create Team
                    </button>
                    <br />
                    <button
                        onClick={()=>navigate(`/dashboard/${id}`)}
                        className="w-full mt-6 bg-black text-white py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-gray-300"
                    >
                        Back to Dashboard
                    </button>
                </ul>
            </div>
        </div>
    )
};

export default Teams;