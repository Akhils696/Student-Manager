import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStudents } from '../store/studentSlice';
import { getTasks } from '../store/taskSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { students } = useSelector(state => state.students);
  const { tasks } = useSelector(state => state.tasks);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getStudents());
    dispatch(getTasks());
  }, [dispatch]);

  // Calculate stats
  const totalStudents = students.length;
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Students</h3>
          <p className="text-3xl font-bold text-blue-600">{totalStudents}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Tasks</h3>
          <p className="text-3xl font-bold text-green-600">{totalTasks}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Pending Tasks</h3>
          <p className="text-3xl font-bold text-yellow-600">{pendingTasks}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Completed Tasks</h3>
          <p className="text-3xl font-bold text-purple-600">{completedTasks}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Students */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Students</h2>
          {students.length > 0 ? (
            <ul className="space-y-3">
              {students.slice(0, 5).map(student => (
                <li key={student._id} className="border-b pb-2">
                  <div className="font-medium">{student.firstName} {student.lastName}</div>
                  <div className="text-sm text-gray-600">{student.email}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No students found. <a href="/students" className="text-blue-600 hover:underline">Add your first student</a>.</p>
          )}
        </div>

        {/* Recent Tasks */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Tasks</h2>
          {tasks.length > 0 ? (
            <ul className="space-y-3">
              {tasks.slice(0, 5).map(task => (
                <li key={task._id} className="border-b pb-2">
                  <div className="font-medium">{task.title}</div>
                  <div className="text-sm text-gray-600">Due: {new Date(task.dueDate).toLocaleDateString()}</div>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    task.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                    task.status === 'in-progress' ? 'bg-blue-200 text-blue-800' :
                    'bg-green-200 text-green-800'
                  }`}>
                    {task.status}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tasks found. <a href="/tasks" className="text-blue-600 hover:underline">Add your first task</a>.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;