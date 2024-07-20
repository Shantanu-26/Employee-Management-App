import React, {useState} from "react";
import { Link } from "react-router-dom";

const EmployeeCard=({employee})=>{
    const [expanded, setExpanded]=useState(false);

    const toggleExpand=()=>{
        setExpanded(!expanded);
    }

    return (
        <div className="border border-gray-300 rounded p-4 mb-4 bg-gray-50">
            <div className="flex items-center justify-between cursor-pointer" onClick={toggleExpand}>
                <div className="flex items-center space-x-4">
                    <div>
                        <h3 className="text-lg font-bold text-black">{employee.name}</h3>
                        <p className="text-gray-700">ID: {employee.ID}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Link
                        to={`/edit/${employee._id}`}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Edit Details
                    </Link>
                    <div className="ml-2 text-black">{expanded ? "🔽" : "➡️"}</div>
                </div>
            </div>
            {expanded && (
                <div className="mt-2 text-gray-800">
                    <p><strong className="text-black">Email:</strong> {employee.email}</p>
                    <p><strong className="text-black">Role:</strong> {employee.role}</p>
                    <p><strong className="text-black">Age:</strong> {employee.age}</p>
                    <p><strong className="text-black">Gender:</strong> {employee.gender}</p>
                    <p><strong className="text-black">Contact:</strong> {employee.contact}</p>
                    <p><strong className="text-black">Position:</strong> {employee.position}</p>
                    <p><strong className="text-black">Salary:</strong> {employee.salary}</p>
                    <p><strong className="text-black">Project:</strong> {employee.project}</p>
                </div>
            )}
        </div>
    );
};

export default EmployeeCard;