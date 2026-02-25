import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStudents } from '../store/studentSlice';
import { getTasks } from '../store/taskSlice';
import { useNotifications } from '../contexts/NotificationContext';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { students } = useSelector(state => state.students);
  const { tasks } = useSelector(state => state.tasks);
  const { user } = useSelector(state => state.auth);
  const { checkTaskDeadlines } = useNotifications();

  useEffect(() => {
    dispatch(getStudents());
    dispatch(getTasks());
    // Check for task deadlines after tasks are loaded
    if (tasks.length > 0) {
      checkTaskDeadlines(tasks);
    }
  }, [dispatch, tasks, checkTaskDeadlines]);

  // Calculate stats
  const totalStudents = students.length;
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <div className="text-right">
          <p className="text-gray-600 dark:text-gray-300">Welcome back,</p>
          <p className="text-xl font-semibold text-gray-900 dark:text-white">{user?.username}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border border-blue-200 dark:border-blue-700/50">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-blue-200">Total Students</h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{totalStudents}</p>
        </div>
        
        <div className="card bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border border-green-200 dark:border-green-700/50">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-green-200">Total Tasks</h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">{totalTasks}</p>
        </div>
        
        <div className="card bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30 border border-yellow-200 dark:border-yellow-700/50">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-yellow-200">Pending Tasks</h3>
          <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{pendingTasks}</p>
        </div>
        
        <div className="card bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 border border-purple-200 dark:border-purple-700/50">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-purple-200">Completed Tasks</h3>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{completedTasks}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Students */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Students</h2>
          {students.length > 0 ? (
            <ul className="space-y-3">
              {students.slice(0, 5).map(student => (
                <li key={student._id} className="border-b border-gray-200 dark:border-gray-700 pb-2 last:border-0">
                  <div className="font-medium text-gray-900 dark:text-white">{student.firstName} {student.lastName}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{student.email}</div>
                  {student.gradeLevel && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Grade: {student.gradeLevel}</div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-500 dark:text-gray-400 mb-2">No students found</div>
              <a href="/students" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline">
                Add your first student
              </a>
            </div>
          )}
        </div>

        {/* Recent Tasks */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Tasks</h2>
          {tasks.length > 0 ? (
            <ul className="space-y-3">
              {tasks.slice(0, 5).map(task => (
                <li key={task._id} className="border-b border-gray-200 dark:border-gray-700 pb-2 last:border-0">
                  <div className="font-medium text-gray-900 dark:text-white">{task.title}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                    task.status === 'pending' ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200' :
                    task.status === 'in-progress' ? 'bg-blue-200 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200' :
                    'bg-green-200 text-green-800 dark:bg-green-900/30 dark:text-green-200'
                  }`}>
                    {task.status}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-500 dark:text-gray-400 mb-2">No tasks found</div>
              <a href="/tasks" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline">
                Add your first task
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;