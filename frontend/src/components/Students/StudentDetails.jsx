import React from 'react';
import { Link } from 'react-router-dom';

const StudentDetails = ({ student, onEdit, onDelete }) => {
  if (!student) {
    return <div className="text-center py-8">Student not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">{student.firstName} {student.lastName}</h1>
              <p className="text-blue-100">{student.email}</p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
              student.status === 'active' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}>
              {student.status}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Phone Number</h3>
              <p className="text-gray-900">{student.phone || 'Not provided'}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Grade Level</h3>
              <p className="text-gray-900">{student.gradeLevel}th Grade</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Enrollment Date</h3>
              <p className="text-gray-900">{new Date(student.enrollmentDate).toLocaleDateString()}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Last Updated</h3>
              <p className="text-gray-900">{new Date(student.updatedAt).toLocaleDateString()}</p>
            </div>
            
            {student.address && (
              <div className="md:col-span-2">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Address</h3>
                <p className="text-gray-900">{student.address}</p>
              </div>
            )}
          </div>

          {/* Statistics */}
          <div className="border-t pt-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Academic Progress</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-2xl font-bold text-blue-600">{student.taskCount || 0}</p>
                <p className="text-sm text-gray-600">Total Tasks</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-2xl font-bold text-green-600">{student.completedTasks || 0}</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4">
                <p className="text-2xl font-bold text-yellow-600">{student.pendingTasks || 0}</p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4">
            <Link
              to={`/students/${student._id}/tasks`}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              View Tasks
            </Link>
            <button
              onClick={onEdit}
              className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Edit Profile
            </button>
            <button
              onClick={onDelete}
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Delete Student
            </button>
            <Link
              to="/students"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Back to List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;