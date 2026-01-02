import React from 'react';
import '../styles/TaskItem.css';

function TaskItem({ task, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getPriorityClass = (priority) => {
    return `priority-${priority}`;
  };

  const getStatusClass = (status) => {
    return `status-${status}`;
  };

  return (
    <div className={`task-item ${getStatusClass(task.status)}`}>
      <div className="task-header">
        <h3>{task.title}</h3>
        <div className="task-badges">
          <span className={`badge ${getPriorityClass(task.priority)}`}>
            {task.priority}
          </span>
          <span className={`badge ${getStatusClass(task.status)}`}>
            {task.status.replace('-', ' ')}
          </span>
        </div>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-footer">
        <span className="task-date">Due: {formatDate(task.dueDate)}</span>
        <div className="task-actions">
          <button
            onClick={() => onEdit(task)}
            className="btn-icon"
            title="Edit task"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="btn-icon"
            title="Delete task"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
