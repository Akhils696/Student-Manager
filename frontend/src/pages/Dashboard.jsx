import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getStudents } from '../store/studentSlice';
import { getTasks } from '../store/taskSlice';
import { useNotifications } from '../contexts/NotificationContext';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.students);
  const { tasks } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.auth);
  const { checkTaskDeadlines } = useNotifications();

  useEffect(() => {
    dispatch(getStudents());
    dispatch(getTasks());
  }, [dispatch]);

  useEffect(() => {
    if (tasks.length > 0) {
      checkTaskDeadlines(tasks);
    }
  }, [tasks, checkTaskDeadlines]);

  const totalStudents = students.length;
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((task) => task.status === 'pending').length;
  const completedTasks = tasks.filter((task) => task.status === 'completed').length;
  const upcomingTasks = tasks.filter((task) => new Date(task.dueDate) >= new Date() && task.status !== 'completed').length;
  const completionRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const recentStudents = students.slice(0, 5);
  const recentTasks = tasks.slice(0, 5);

  return (
    <div className="space-y-8">
      <section className="surface-panel-strong overflow-hidden p-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.26em] text-cyan-600 dark:text-cyan-300">Command Center</p>
            <h1 className="page-title mt-3 text-gray-900 dark:text-white">
              Welcome back, {user?.firstName || user?.username}
            </h1>
            <p className="page-copy">
              Track active students, close out upcoming tasks, and keep your academic workload visible in one place.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link to="/students/new" className="primary-button">Add Student</Link>
            <Link to="/tasks/new" className="secondary-button">Plan Task</Link>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="metric-card">
          <p className="text-sm text-muted">Students</p>
          <p className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">{totalStudents}</p>
          <p className="mt-2 text-sm text-muted">Active roster in your workspace</p>
        </div>
        <div className="metric-card">
          <p className="text-sm text-muted">Open Tasks</p>
          <p className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">{pendingTasks}</p>
          <p className="mt-2 text-sm text-muted">{upcomingTasks} upcoming deadlines still in motion</p>
        </div>
        <div className="metric-card">
          <p className="text-sm text-muted">Completed</p>
          <p className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">{completedTasks}</p>
          <p className="mt-2 text-sm text-muted">{completionRate}% completion rate across all tasks</p>
        </div>
        <div className="metric-card">
          <p className="text-sm text-muted">Task Volume</p>
          <p className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">{totalTasks}</p>
          <p className="mt-2 text-sm text-muted">Total planned assignments and deliverables</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="surface-panel p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Students</h2>
            <Link to="/students" className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">View all</Link>
          </div>
          {recentStudents.length > 0 ? (
            <ul className="space-y-3">
              {recentStudents.map((student) => (
                <li key={student._id} className="flex items-center justify-between rounded-2xl border border-slate-200/70 bg-white/60 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/60">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{student.firstName} {student.lastName}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{student.email || 'No email on file'}</div>
                  </div>
                  {student.gradeLevel ? (
                    <div className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-200">
                      Grade {student.gradeLevel}
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-12 text-center text-muted">
              <p>No students yet.</p>
              <Link to="/students/new" className="mt-2 inline-block font-semibold text-cyan-700 hover:underline dark:text-cyan-300">
                Add your first student
              </Link>
            </div>
          )}
        </div>

        <div className="surface-panel p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Tasks</h2>
            <Link to="/tasks" className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">View all</Link>
          </div>
          {recentTasks.length > 0 ? (
            <ul className="space-y-3">
              {recentTasks.map((task) => (
                <li key={task._id} className="rounded-2xl border border-slate-200/70 bg-white/60 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/60">
                  <div className="font-medium text-gray-900 dark:text-white">{task.title}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Due: {new Date(task.dueDate).toLocaleDateString()}</div>
                  <span className={`mt-2 inline-block rounded-full px-2 py-1 text-xs ${
                    task.status === 'pending'
                      ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200'
                      : task.status === 'in-progress'
                        ? 'bg-blue-200 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'
                        : 'bg-green-200 text-green-800 dark:bg-green-900/30 dark:text-green-200'
                  }`}>
                    {task.status}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-12 text-center text-muted">
              <p>No tasks yet.</p>
              <Link to="/tasks/new" className="mt-2 inline-block font-semibold text-cyan-700 hover:underline dark:text-cyan-300">
                Add your first task
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
