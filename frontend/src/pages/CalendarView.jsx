import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTasks } from '../store/taskSlice';

const CalendarView = () => {
  const dispatch = useDispatch();
  const { tasks, isLoading, isError, errorMessage } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const groupedDates = useMemo(() => {
    const groups = tasks.reduce((accumulator, task) => {
      const key = new Date(task.dueDate).toDateString();
      if (!accumulator[key]) {
        accumulator[key] = [];
      }
      accumulator[key].push(task);
      return accumulator;
    }, {});

    return Object.entries(groups)
      .map(([dateKey, groupedTasks]) => ({
        dateKey,
        tasks: groupedTasks.sort((a, b) => {
          const priorityRank = { high: 0, medium: 1, low: 2 };
          return (priorityRank[a.priority] ?? 3) - (priorityRank[b.priority] ?? 3);
        }),
      }))
      .sort((a, b) => new Date(a.dateKey) - new Date(b.dateKey));
  }, [tasks]);

  const upcomingCount = tasks.filter((task) => {
    const dueDate = new Date(task.dueDate);
    return dueDate >= new Date() && task.status !== 'completed';
  }).length;

  const overdueCount = tasks.filter((task) => {
    const dueDate = new Date(task.dueDate);
    return dueDate < new Date() && task.status !== 'completed';
  }).length;

  return (
    <div className="space-y-6">
      <section className="surface-panel-strong p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.26em] text-cyan-600 dark:text-cyan-300">Timeline</p>
            <h1 className="page-title mt-2 text-slate-900 dark:text-white">Calendar View</h1>
            <p className="page-copy">Review deadlines in chronological order and act quickly on high-priority items.</p>
          </div>
          <Link to="/tasks/new" className="primary-button">
            Add Task
          </Link>
        </div>
      </section>

      {isError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200">
          {errorMessage}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="metric-card">
          <p className="text-sm text-muted">Scheduled Dates</p>
          <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">{groupedDates.length}</p>
        </div>
        <div className="metric-card">
          <p className="text-sm text-muted">Upcoming Tasks</p>
          <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">{upcomingCount}</p>
        </div>
        <div className="metric-card">
          <p className="text-sm text-muted">Overdue Tasks</p>
          <p className="mt-3 text-3xl font-bold text-rose-600 dark:text-rose-300">{overdueCount}</p>
        </div>
      </div>

      {isLoading ? (
        <section className="surface-panel p-10 text-center text-sm text-muted">Loading calendar...</section>
      ) : groupedDates.length > 0 ? (
        <section className="surface-panel p-5 sm:p-6">
          <div className="space-y-6">
            {groupedDates.map(({ dateKey, tasks: dailyTasks }) => {
              const displayDate = new Date(dateKey);

              return (
                <article key={dateKey} className="rounded-3xl border border-slate-200/70 bg-white/65 p-5 dark:border-slate-800 dark:bg-slate-900/60">
                  <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      {displayDate.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </h2>
                    <span className="text-xs uppercase tracking-[0.2em] text-muted">{dailyTasks.length} task(s)</span>
                  </div>

                  <div className="space-y-3">
                    {dailyTasks.map((task) => {
                      const overdue = task.status !== 'completed' && new Date(task.dueDate) < new Date();

                      return (
                        <div
                          key={task._id}
                          className={`rounded-2xl border px-4 py-3 ${
                            overdue
                              ? 'border-rose-300 bg-rose-50 dark:border-rose-500/40 dark:bg-rose-900/20'
                              : 'border-slate-200 bg-white/80 dark:border-slate-700 dark:bg-slate-900/80'
                          }`}
                        >
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <h3 className="font-semibold text-slate-900 dark:text-white">{task.title}</h3>
                              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{task.description || 'No description provided'}</p>
                              <p className="mt-2 text-xs text-muted">
                                Student: {task.studentId ? `${task.studentId.firstName} ${task.studentId.lastName}` : 'Unassigned'}
                              </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                task.priority === 'high'
                                  ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200'
                                  : task.priority === 'medium'
                                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200'
                                    : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200'
                              }`}>
                                {task.priority || 'No priority'}
                              </span>
                              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                task.status === 'completed'
                                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200'
                                  : task.status === 'in-progress'
                                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200'
                                    : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200'
                              }`}>
                                {task.status || 'Unknown'}
                              </span>
                              {overdue ? (
                                <span className="rounded-full bg-rose-600 px-3 py-1 text-xs font-semibold text-white">Overdue</span>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ) : (
        <section className="surface-panel p-10 text-center">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">No tasks scheduled</h2>
          <p className="mt-2 text-sm text-muted">Create tasks to build your timeline and monitor deadlines from here.</p>
          <Link to="/tasks/new" className="primary-button mt-5">
            Create task
          </Link>
        </section>
      )}
    </div>
  );
};

export default CalendarView;
