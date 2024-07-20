import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AttendancePage = () => {
    const {id}=useParams();
    const [message, setMessage] = useState('');
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [checkedIn, setCheckedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAttendanceRecords = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    throw new Error('Token not found');
                }

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                const response = await axios.get('http://localhost:3000/api/attendance/records', config);
                setAttendanceRecords(response.data);

                const today = new Date().setHours(0, 0, 0, 0);
                const todayRecord = response.data.find(record => new Date(record.date).getTime() === today);
                if (todayRecord && todayRecord.checkIn && !todayRecord.checkOut) {
                    setCheckedIn(true);
                }
            } catch (error) {
                console.error('Error fetching attendance records:', error);
            }
        };

        fetchAttendanceRecords();
    }, []);

    const handleMarkAttendance = async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error('Token not found');
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await axios.post('http://localhost:3000/api/attendance/checkin', {}, config);
            setMessage(response.data.message);
            setCheckedIn(true);
            setAttendanceRecords([...attendanceRecords, { date: new Date(), checkIn: new Date() }]);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error marking attendance');
        }
    };

    const handleCheckOut = async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error('Token not found');
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await axios.post('http://localhost:3000/api/attendance/checkout', {}, config);
            setMessage(response.data.message);
            setCheckedIn(false);
            const updatedRecords = attendanceRecords.map(record => {
                if (new Date(record.date).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)) {
                    record.checkOut = new Date();
                }
                return record;
            });
            setAttendanceRecords(updatedRecords);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error checking out');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-blue-100">
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center mb-6 text-black">Mark Attendance</h2>
                <div className="text-center mb-4">
                    <button
                        onClick={handleMarkAttendance}
                        disabled={checkedIn}
                        className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none ${checkedIn && 'opacity-50 cursor-not-allowed'}`}
                    >
                        Check In
                    </button>
                    <button
                        onClick={handleCheckOut}
                        disabled={!checkedIn}
                        className={`bg-red-500 text-white px-4 py-2 ml-2 rounded-md hover:bg-red-600 focus:outline-none ${!checkedIn && 'opacity-50 cursor-not-allowed'}`}
                    >
                        Check Out
                    </button>
                </div>
                {message && <p className="text-center text-red-500">{message}</p>}
                <table className="w-full text-left table-auto mt-6">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Check In</th>
                            <th className="px-4 py-2">Check Out</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceRecords.map((record, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{new Date(record.date).toLocaleDateString()}</td>
                                <td className="border px-4 py-2">{record.checkIn ? new Date(record.checkIn).toLocaleTimeString() : 'N/A'}</td>
                                <td className="border px-4 py-2">{record.checkOut ? new Date(record.checkOut).toLocaleTimeString() : 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="text-center mt-4">
                    <button
                        onClick={() => navigate(`/dashboard/${id}`)}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AttendancePage;
