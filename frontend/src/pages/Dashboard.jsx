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
  const overdueTasks = tasks.filter((task) => new Date(task.dueDate) < new Date() && task.status !== 'completed').length;
  const completionRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const recentStudents = students.slice(0, 5);
  const recentTasks = tasks.slice(0, 5);
  const todaysTasks = tasks.filter((task) => {
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    return dueDate.toDateString() === today.toDateString() && task.status !== 'completed';
  }).length;
  const focusLabel =
    overdueTasks > 0
      ? `${overdueTasks} overdue task${overdueTasks === 1 ? '' : 's'} need attention`
      : upcomingTasks > 0
        ? `${upcomingTasks} active deadline${upcomingTasks === 1 ? '' : 's'} coming up`
        : 'Everything is caught up for now';
  const completionMessage =
    completionRate >= 75
      ? 'Strong delivery rhythm across your task board.'
      : completionRate >= 40
        ? 'Momentum is building. A few quick wins will lift this fast.'
        : 'Fresh sprint. Prioritize the next few deliverables to build pace.';
  const upcomingTaskItems = [...tasks]
    .filter((task) => task.status !== 'completed')
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 3);

  const statCards = [
    {
      label: 'Students',
      value: totalStudents,
      helper: 'Active roster in your workspace',
      accent: 'from-cyan-500/20 to-sky-500/10',
    },
    {
      label: 'Open Tasks',
      value: pendingTasks,
      helper: `${upcomingTasks} upcoming deadlines still in motion`,
      accent: 'from-amber-500/20 to-orange-500/10',
    },
    {
      label: 'Completed',
      value: completedTasks,
      helper: `${completionRate}% completion rate across all tasks`,
      accent: 'from-emerald-500/20 to-teal-500/10',
    },
    {
      label: 'Task Volume',
      value: totalTasks,
      helper: 'Total planned assignments and deliverables',
      accent: 'from-violet-500/20 to-fuchsia-500/10',
    },
  ];

  return (
    <div className="dashboard-shell space-y-8">
      <section className="surface-panel-strong dashboard-hero overflow-hidden p-6 sm:p-8 xl:p-10">
        <div className="dashboard-hero__orb dashboard-hero__orb--one" aria-hidden="true" />
        <div className="dashboard-hero__orb dashboard-hero__orb--two" aria-hidden="true" />

        <div className="relative grid gap-8 xl:grid-cols-[minmax(0,1.3fr)_360px] xl:items-end">
          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.26em] text-cyan-600 dark:text-cyan-300">Command Center</p>
              <h1 className="page-title mt-3 text-gray-900 dark:text-white">
                Welcome back, {user?.firstName || user?.username}
              </h1>
              <p className="page-copy">
                Track active students, close out upcoming tasks, and keep your academic workload visible in one place.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="dashboard-chip">
                <span className="dashboard-chip__label">Focus</span>
                <span className="dashboard-chip__value">{focusLabel}</span>
              </div>
              <div className="dashboard-chip">
                <span className="dashboard-chip__label">Today</span>
                <span className="dashboard-chip__value">{todaysTasks} task{todaysTasks === 1 ? '' : 's'} due today</span>
              </div>
              <div className="dashboard-chip">
                <span className="dashboard-chip__label">Completion</span>
                <span className="dashboard-chip__value">{completionMessage}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/students/new" className="primary-button">Add Student</Link>
              <Link to="/tasks/new" className="secondary-button">Plan Task</Link>
            </div>
          </div>

          <div className="dashboard-spotlight animate-fade-up" style={{ animationDelay: '120ms' }}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-700 dark:text-cyan-300">Priority Queue</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">Next Moves</h2>
              </div>
              <div className="rounded-full border border-white/50 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-200">
                {upcomingTaskItems.length} active
              </div>
            </div>

            {upcomingTaskItems.length > 0 ? (
              <ul className="mt-6 space-y-3">
                {upcomingTaskItems.map((task) => (
                  <li key={task._id} className="dashboard-spotlight__item">
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">{task.title}</div>
                      <div className="text-sm text-muted">Due {new Date(task.dueDate).toLocaleDateString()}</div>
                    </div>
                    <span className="dashboard-status-pill">{task.status.replace('-', ' ')}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-6 rounded-[24px] border border-dashed border-slate-300/80 bg-white/50 px-5 py-8 text-center text-sm text-muted dark:border-slate-700 dark:bg-slate-950/40">
                No active tasks yet. Plan your first assignment to populate this queue.
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card, index) => (
          <div
            key={card.label}
            className={`metric-card animate-fade-up bg-gradient-to-br ${card.accent}`}
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-medium text-muted">{card.label}</p>
              <span className="metric-card__spark" aria-hidden="true" />
            </div>
            <p className="mt-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">{card.value}</p>
            <p className="mt-3 text-sm leading-6 text-muted">{card.helper}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(340px,0.95fr)]">
        <div className="surface-panel p-6 animate-fade-up" style={{ animationDelay: '180ms' }}>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Students</h2>
            <Link to="/students" className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">View all</Link>
          </div>
          {recentStudents.length > 0 ? (
            <ul className="space-y-3">
              {recentStudents.map((student) => (
                <li key={student._id} className="dashboard-list-item">
                  <div className="flex items-center gap-4">
                    <div className="dashboard-avatar">
                      {(student.firstName?.[0] || student.username?.[0] || student.email?.[0] || 'S').toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{student.firstName} {student.lastName}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{student.email || 'No email on file'}</div>
                    </div>
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

        <div className="space-y-6 animate-fade-up" style={{ animationDelay: '240ms' }}>
          <div className="surface-panel p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Tasks</h2>
              <Link to="/tasks" className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">View all</Link>
            </div>
            {recentTasks.length > 0 ? (
              <ul className="space-y-3">
                {recentTasks.map((task) => (
                  <li key={task._id} className="dashboard-task-card">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{task.title}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Due: {new Date(task.dueDate).toLocaleDateString()}</div>
                      </div>
                      <div className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
                        {task.priority || 'standard'}
                      </div>
                    </div>
                    <span className={`mt-3 inline-block rounded-full px-2 py-1 text-xs ${
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

          <div className="surface-panel dashboard-snapshot p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-700 dark:text-cyan-300">Snapshot</p>
                <h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">Today at a glance</h3>
              </div>
              <div className="dashboard-snapshot__ring" style={{ '--progress': completionRate }}>
                <span>{completionRate}%</span>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
              <div className="dashboard-snapshot__row">
                <span>Due today</span>
                <strong>{todaysTasks}</strong>
              </div>
              <div className="dashboard-snapshot__row">
                <span>Overdue</span>
                <strong>{overdueTasks}</strong>
              </div>
              <div className="dashboard-snapshot__row">
                <span>Students covered</span>
                <strong>{totalStudents}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
