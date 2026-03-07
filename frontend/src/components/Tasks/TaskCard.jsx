import React from 'react';
import { Link } from 'react-router-dom';

const TaskCard = ({ task, studentName, onViewDetails, onEdit, onDelete }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex-1">{task.title}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        <p className="text-sm text-gray-600 line-clamp-2">{task.description}</p>
        
        {studentName && (
          <p className="text-sm text-gray-600">
            <span className="font-medium">Student:</span> {studentName}
          </p>
        )}
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(task.status)}`}>
            {task.status}
          </span>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <Link
          to={`/tasks/${task._id}`}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-center text-sm"
        >
          View Details
        </Link>
        <button
          onClick={onEdit}
          className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;