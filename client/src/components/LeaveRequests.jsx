import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const LeaveRequests=()=>{
    const [leaveRequests, setLeaveRequests]=useState([]);
    const [message, setMessage]=useState('');
    const {id}=useParams();
    const navigate=useNavigate();

    const fetchLeaveRequests=async()=>{
        try {
            const token=localStorage.getItem('token');
            const config={
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const {data}=await axios.get(`http://localhost:3000/api/leaves/get`, config);

            const filteredLeaveRequests=data.filter(user=>
                user.leaves.some(leave=>new Date(leave.expiryDate)>new Date)
            )
            
            setLeaveRequests(data);
        } catch (error) {
            setMessage(error.response.data.message||'Something went wrong');
        }
    };


    const updateLeaveStatus=async(userId, leaveId, status)=>{
        try {
            const token=localStorage.getItem('token');
            
            const config={
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-type': 'application/json'
                }
            };

            console.log('Updating leave status:', userId, leaveId, status);

            const {data}=await axios.put(`http://localhost:3000/api/leaves/update`, {userId, leaveId, status}, config);
            console.log('update leave request status:', DataTransferItemList);

            setMessage(data.message);
            fetchLeaveRequests();
        } catch (error) {
            setMessage(error.response.data.message||'Something went wrong');
        }
    };

    useEffect(()=>{
        fetchLeaveRequests();
    }, []);

    return (
        <div className="min-h-screen bg-blue-100 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-center">Leave Requests</h2>
                {message && <p className="text-red-500 mb-4">{message}</p>}
                <ul>
                    {leaveRequests.map((user)=>(
                        <li key={user._id} className="mb-6 bg-gray-100 rounded-lg p-4">
                            <div className="border-b-2 border-gray-200 pb-4">
                                <h3 className="text-lg fontsemibold mb-2">{user.name}</h3>
                                    <ul className="ml-4">
                                        {user.leaves.map((leave)=>(
                                            <li key={leave._id} className="mb-8">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                    <p className="font-semibold">Start Date: {new Date(leave.startDate).toLocaleDateString()}</p>
                                                    <p className="font-semibold">End Date: {new Date(leave.endDate).toLocaleDateString()}</p>
                                                    <p className="font-semibold">Reason: {leave.reason}</p>
                                                    <p className="font-semibold">Status: 
                                                        <span className={`ml-2 ${leave.status==='Approved'?'text-green-500':leave.status=='Rejected'?'text-red-500': ''}`}>
                                                            {leave.status}
                                                        </span>
                                                    </p>
                                                    </div>
                                                    {leave.status==='Pending'&&(
                                                        <div className="flex">
                                                            <button onClick={()=>updateLeaveStatus(user._id, leave._id, 'Approved')} className="bg-green-500 text-white px-4 py-1 rounded mr-2 hover:bg-green-600 focus:outline-none focus:bg-green-600">
                                                                Approve
                                                            </button>
                                                            <button onClick={()=>updateLeaveStatus(user._id, leave._id, 'Rejected')} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red=600 focus:outline-none focus:bg-red-600">
                                                                Reject
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                            </div>
                        </li>
                    ))}
                </ul>
                <button
                    onClick={()=>navigate(`/hrdashboard`)}
                    className="bg-gray-800 text-white px-4 py-2 mt-4 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                    Return to Dashboard
                </button>
            </div>
        </div>
    )
};

export default LeaveRequests;