import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { tasksAPI } from '../services/api';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import '../styles/Dashboard.css';

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [stats, setStats] = useState({ total: 0, byStatus: [] });

  useEffect(() => {
    loadTasks();
    loadStats();
  }, [filter]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const params = filter !== 'all' ? { status: filter } : {};
      const response = await tasksAPI.getTasks(params);
      setTasks(response.data.data);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await tasksAPI.getStats();
      setStats(response.data.data);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      await tasksAPI.createTask(taskData);
      setShowForm(false);
      loadTasks();
      loadStats();
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      await tasksAPI.updateTask(editingTask._id, taskData);
      setEditingTask(null);
      setShowForm(false);
      loadTasks();
      loadStats();
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await tasksAPI.deleteTask(id);
        loadTasks();
        loadStats();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const getStatusCount = (status) => {
    const stat = stats.byStatus.find((s) => s._id === status);
    return stat ? stat.count : 0;
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Task Manager</h1>
          <div className="user-info">
            <span>Welcome, {user?.username}!</span>
            <button onClick={logout} className="btn btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="stats-container">
          <div className="stat-card">
            <h3>{stats.total}</h3>
            <p>Total Tasks</p>
          </div>
          <div className="stat-card pending">
            <h3>{getStatusCount('pending')}</h3>
            <p>Pending</p>
          </div>
          <div className="stat-card in-progress">
            <h3>{getStatusCount('in-progress')}</h3>
            <p>In Progress</p>
          </div>
          <div className="stat-card completed">
            <h3>{getStatusCount('completed')}</h3>
            <p>Completed</p>
          </div>
        </div>

        <div className="tasks-section">
          <div className="tasks-header">
            <div className="filter-buttons">
              <button
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button
                className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
                onClick={() => setFilter('pending')}
              >
                Pending
              </button>
              <button
                className={`filter-btn ${filter === 'in-progress' ? 'active' : ''}`}
                onClick={() => setFilter('in-progress')}
              >
                In Progress
              </button>
              <button
                className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                onClick={() => setFilter('completed')}
              >
                Completed
              </button>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="btn btn-primary"
            >
              + New Task
            </button>
          </div>

          {showForm && (
            <TaskForm
              task={editingTask}
              onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
              onCancel={handleCancelForm}
            />
          )}

          <div className="tasks-list">
            {loading ? (
              <div className="loading">Loading tasks...</div>
            ) : tasks.length === 0 ? (
              <div className="no-tasks">
                <p>No tasks found. Create your first task!</p>
              </div>
            ) : (
              tasks.map((task) => (
                <TaskItem
                  key={task._id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
