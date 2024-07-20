import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./components/Home.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import EmployeeDashboard from "./components/EmployeeDashboard.jsx";
import HRDashboard from "./components/HRDashboard.jsx";
import EditEmployee from "./components/EditEmployee.jsx";
import AttendancePage from "./components/AttendancePage.jsx";
import SubmitLeaveRequest from "./components/SubmitLeaveRequest.jsx";
import LeaveRequests from "./components/LeaveRequests.jsx";
import Teams from "./components/Teams.jsx";
import CreateTeam from "./components/CreateTeam.jsx";
import TeamDashboard from "./components/TeamDashboard.jsx";
import TaskManagement from "./components/TaskManagement.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/:id" element={<EmployeeDashboard />} />
        <Route path='/hrdashboard' element={<HRDashboard />} />
        <Route path="/edit/:id" element={<EditEmployee />} />
        <Route path="/attendance/:id" element={<AttendancePage />} />
        <Route path="/submit-leave/:id" element={<SubmitLeaveRequest />} />
        <Route path="/leave-requests" element={<LeaveRequests />} />
        <Route path="/teams/:id" element={<Teams />} />
        <Route path="/create-team/:id" element={<CreateTeam />} />
        <Route path="/team/:teamId" element={<TeamDashboard />} />
        <Route path="/team/:teamId/task-management" element={<TaskManagement />} />
      </Routes>
    </Router>
  )
}

export default App;