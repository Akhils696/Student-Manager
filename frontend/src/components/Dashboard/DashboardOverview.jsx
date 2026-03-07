import React from 'react';
import { Link } from 'react-router-dom';

const DashboardOverview = ({ stats, recentTasks, recentStudents }) => {
  return (
    <div className="space-y-6">
      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Students</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalStudents}</p>
              <Link to="/students" className="text-sm text-blue-600 hover:underline mt-2 block">
                View all students →
              </Link>
            </div>
            <div className="bg-blue-500 p-4 rounded-full">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Tasks</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalTasks}</p>
              <Link to="/tasks" className="text-sm text-blue-600 hover:underline mt-2 block">
                View all tasks →
              </Link>
            </div>
            <div className="bg-green-500 p-4 rounded-full">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Completed Tasks</p>
              <p className="text-3xl font-bold text-gray-900">{stats.completedTasks}</p>
              <p className="text-sm text-green-600 mt-2">
                {stats.completionRate}% completion rate
              </p>
            </div>
            <div className="bg-yellow-500 p-4 rounded-full">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Pending Tasks</p>
              <p className="text-3xl font-bold text-gray-900">{stats.pendingTasks}</p>
              <p className="text-sm text-red-600 mt-2">
                {stats.overdueTasks} overdue
              </p>
            </div>
            <div className="bg-red-500 p-4 rounded-full">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tasks */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Tasks</h2>
          <div className="space-y-4">
            {recentTasks.map((task) => (
              <div key={task._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{task.title}</p>
                  <p className="text-sm text-gray-600">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  task.status === 'completed' ? 'bg-green-100 text-green-800' :
                  task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {task.status}
                </span>
              </div>
            ))}
          </div>
          <Link to="/tasks" className="text-sm text-blue-600 hover:underline mt-4 block">
            View all tasks →
          </Link>
        </div>

        {/* Recent Students */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Students</h2>
          <div className="space-y-4">
            {recentStudents.map((student) => (
              <div key={student._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center flex-1">
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">
                      {student.firstName[0]}{student.lastName[0]}
                    </span>
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">{student.firstName} {student.lastName}</p>
                    <p className="text-sm text-gray-600">{student.gradeLevel}th Grade</p>
                  </div>
                </div>
                <Link to={`/students/${student._id}`} className="text-sm text-blue-600 hover:underline">
                  View Profile
                </Link>
              </div>
            ))}
          </div>
          <Link to="/students" className="text-sm text-blue-600 hover:underline mt-4 block">
            View all students →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;