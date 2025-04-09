import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css'; // Assuming you have a CSS file for styling

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'pending', dueDate: '' });
  const [editTaskId, setEditTaskId] = useState(null);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editTaskId) {
        await API.put(`/tasks/${editTaskId}`, newTask);
        setEditTaskId(null);
      } else {
        await API.post('/tasks', newTask);
      }
      setNewTask({ title: '', description: '', status: 'pending', dueDate: '' });
      fetchTasks();
    } catch (err) {
      console.error('Error submitting task:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const handleEdit = (task) => {
    setNewTask({
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate: task.dueDate.split('T')[0],
    });
    setEditTaskId(task.id);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Task Dashboard</h2>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      <div className="task-form">
        <h3>{editTaskId ? 'Edit Task' : 'Add Task'}</h3>
        <input
          name="title"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          name="description"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <select
          value={newTask.status}
          onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In-Progress</option>
          <option value="completed">Completed</option>
        </select>
        <input
          type="date"
          name="dueDate"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
        />
        <button onClick={handleSubmit}>{editTaskId ? 'Update Task' : 'Add Task'}</button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li className="task-item" key={task.id}>
            <div>
              <strong>{task.title}</strong> - {task.description} - {task.status} - {task.dueDate.split('T')[0]}
            </div>
            
            <div className="task-item-actions">
              <button className="edit-btn" onClick={() => handleEdit(task)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
