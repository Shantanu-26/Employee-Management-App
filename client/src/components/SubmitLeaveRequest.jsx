import React, {useEffect, useState} from "react";
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';

const SubmitLeaveRequest=()=>{
    const {id}=useParams();
    const navigate=useNavigate();
    const [startDate, setStartDate]=useState('');
    const [endDate, setEndDate]=useState('');
    const [reason, setReason]=useState('');
    const [message, setMessage]=useState('');
    const [leaveRequests, setLeaveRequests]=useState([]);

    const fetchLeaveRequests=async()=>{
        try {
            const token=localStorage.getItem('token');
            console.log('Token from local storage:', token);

            const config={
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-type': 'application/json',
                }
            };

            const {data}=await axios.get(`http://localhost:3000/api/leaves/my-leaves/${id}`, config);
            setLeaveRequests(data.leaveRequests);
        } catch (error) {
            console.error('Error fetching leave requests:', error);
        };
    }


    useEffect(()=>{
            fetchLeaveRequests();
    }, [id]);

    

    const submitLeaveRequest=async(e)=>{
        e.preventDefault();

        try {
            const token=localStorage.getItem('token');

            const config={
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-type':'application/json'
                }
            };

            const {data}=await axios.post(`http://localhost:3000/api/leaves/submit`, {startDate, endDate, reason}, config);

            setMessage(data.message);
            setStartDate('');
            setEndDate('');
            setReason('');

            alert('Leave request submitted successfully')

            fetchLeaveRequests();
        } catch (error) {
            setMessage(error.response.data.message || 'Something went wrong'); 
        }
    };

    
    return (
        <div className="flex justify-center items-center min-h-screen bg-blue-100">
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center mb-6 text-black">Submit Leave Request</h2>
                <form onSubmit={submitLeaveRequest} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Start Date:</label>
                        <input 
                            type="date"
                            value={startDate}
                            onChange={(e)=>setStartDate(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="block text-gray-700">
                        <label>End Date:</label>
                        <input 
                            type="date"
                            value={endDate}
                            onChange={(e)=>setEndDate(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Reason:</label>
                        <textarea
                            value={reason}
                            onChange={(e)=>setReason(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>
                    <button 
                        type="submit"
                        className="w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-300"
                    >Submit request</button>
                </form>
                {message && <p className="mt-4 text-center text-red-500">message</p>}
                <button
                    onClick={()=>navigate(`/dashboard/${id}`)}
                    className="w-full mt-6 bg-black text-white py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-gray-300"
                >
                    Back to Dashboard
                </button>

                <h3 className="text-2xl font-bold text-center mt-8 text-black">Past Leave Requests</h3>
                <ul className="space-y-4 mt-4">
                    {leaveRequests.map(request=>(
                        <li key={request._id} className="bg-gray-100 p-4 rounded-md shadow-sm">
                        <p className="text-gray-800"><strong className="text-black">Start Date: </strong>{new Date(request.startDate).toLocaleDateString()}</p>
                        <p className="text-gray-800"><strong className="text-black">End Date: </strong>{new Date(request.endDate).toLocaleDateString()}</p>
                        <p className="text-gray-800"><strong className="text-black">Reason: </strong>{request.reason}</p>
                        <p className="text-gray-800"><strong className="text-black">Status: </strong>{request.status}</p>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    )
};

export default SubmitLeaveRequest;