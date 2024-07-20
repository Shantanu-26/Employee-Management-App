import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TaskManagement = ({ currentUser }) => {
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);
  const [newTask, setNewTask] = useState({ name: '', assignee: '' });
  const [editTask, setEditTask] = useState({ id: null, name: '', assignee: '' });
  const { teamId } = useParams();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        };
        const response = await axios.get('http://localhost:3000/api/tasks/getAll', config);
        const fetchedTasks = Array.isArray(response.data) ? response.data : [];
        setTasks(fetchedTasks);
      } catch (err) {
        setError(err);
      }
    };

    const fetchMembers = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        };
        const response = await axios.get(`http://localhost:3000/api/teams/${teamId}`, config); // Adjust the route as needed
        setMembers(response.data);
      } catch (err) {
        setError(err);
      }
    };

    if (currentUser?.token) {
      fetchTasks();
      fetchMembers();
    } else {
      setError(new Error("Unauthorized: No token provided"));
    }
  }, [currentUser, teamId]);

  const handleCreateTask = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${currentUser?.token}`,
        },
      };
      const response = await axios.post('http://localhost:3000/api/tasks/create', newTask, config);
      setTasks([...tasks, response.data]);
      setNewTask({ name: '', assignee: '' });
    } catch (err) {
      setError(err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${currentUser?.token}`,
        },
      };
      await axios.delete(`http://localhost:3000/api/tasks/delete/${id}`, config);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError(err);
    }
  };

  const handleEditTask = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${currentUser?.token}`,
        },
      };
      const response = await axios.put(`http://localhost:3000/api/tasks/update/${id}`, editTask, config);
      setTasks(tasks.map(task => (task.id === id ? response.data : task)));
      setEditTask({ id: null, name: '', assignee: '' });
    } catch (err) {
      setError(err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${currentUser?.token}`,
        },
      };
      const response = await axios.put(`http://localhost:3000/api/tasks/update/${id}`, { status: newStatus }, config);
      setTasks(tasks.map(task => (task.id === id ? { ...task, status: newStatus } : task)));
    } catch (err) {
      setError(err);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditTask(prevState => ({ ...prevState, [name]: value }));
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Task Management</h1>

      <div>
        <input
          type="text"
          value={newTask.name}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
          placeholder="New Task"
        />
        <select
          value={newTask.assignee}
          onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
        >
          <option value="">Assign to</option>
          {members.map(member => (
            <option key={member.id} value={member.id}>{member.name}</option>
          ))}
        </select>
        <button onClick={handleCreateTask}>Create Task</button>
      </div>

      {tasks && tasks.length > 0 ? (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              {editTask.id === task.id ? (
                <div>
                  <input
                    type="text"
                    name="name"
                    value={editTask.name}
                    onChange={handleInputChange}
                    placeholder="Edit Task"
                  />
                  <select
                    name="assignee"
                    value={editTask.assignee}
                    onChange={handleInputChange}
                  >
                    <option value="">Assign to</option>
                    {members.map(member => (
                      <option key={member.id} value={member.id}>{member.name}</option>
                    ))}
                  </select>
                  <button onClick={() => handleEditTask(task.id)}>Update Task</button>
                </div>
              ) : (
                <div>
                  {task.name} - Assigned to: {task.assigneeName} - Status: {task.status}
                  {task.assignee === currentUser.id && (
                    <button onClick={() => handleStatusChange(task.id, task.status === 'Pending' ? 'Completed' : 'Pending')}>
                      {task.status === 'Pending' ? 'Mark as Completed' : 'Mark as Pending'}
                    </button>
                  )}
                  <button onClick={() => setEditTask({ id: task.id, name: task.name, assignee: task.assignee })}>Edit</button>
                  <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks available</p>
      )}
    </div>
  );
};

export default TaskManagement;
