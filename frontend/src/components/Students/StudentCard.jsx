import React from 'react';
import { Link } from 'react-router-dom';

const StudentCard = ({ student, onViewDetails, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{student.firstName} {student.lastName}</h3>
          <p className="text-gray-600 text-sm">{student.email}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          student.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {student.status}
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Grade:</span> {student.gradeLevel}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Enrolled:</span> {new Date(student.enrollmentDate).toLocaleDateString()}
        </p>
        {student.phone && (
          <p className="text-sm text-gray-600">
            <span className="font-medium">Phone:</span> {student.phone}
          </p>
        )}
      </div>
      
      <div className="flex space-x-2">
        <Link
          to={`/students/${student._id}`}
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

export default StudentCard;