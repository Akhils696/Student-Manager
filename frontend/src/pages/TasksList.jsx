import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteTask, getTasks } from '../store/taskSlice';

const statusStyles = {
  pending: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200',
  'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200',
  completed: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200',
};

const priorityStyles = {
  high: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200',
  medium: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200',
  low: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200',
};

const TasksList = () => {
  const dispatch = useDispatch();
  const { tasks, isLoading, isError, errorMessage } = useSelector((state) => state.tasks);

  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const filteredTasks = useMemo(() => {
    return [...tasks]
      .filter((task) => {
        const statusMatch = filterStatus === 'all' || task.status === filterStatus;
        const priorityMatch = filterPriority === 'all' || task.priority === filterPriority;
        return statusMatch && priorityMatch;
      })
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  }, [tasks, filterPriority, filterStatus]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(id));
    }
  };

  const formatDate = (dateString) => {
    const parsedDate = new Date(dateString);
    if (Number.isNaN(parsedDate.getTime())) return 'Invalid date';
    return parsedDate.toLocaleDateString();
  };

  const isOverdue = (task) => {
    if (task.status === 'completed') return false;
    const dueDate = new Date(task.dueDate);
    return !Number.isNaN(dueDate.getTime()) && dueDate < new Date();
  };

  return (
    <div className="space-y-6">
      <section className="surface-panel-strong p-6 sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.26em] text-cyan-600 dark:text-cyan-300">Execution Board</p>
            <h1 className="page-title mt-2 text-slate-900 dark:text-white">Tasks</h1>
            <p className="page-copy">Track assignment load by urgency, due date, and execution status.</p>
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

      <section className="surface-panel p-5 sm:p-6">
        <div className="mb-5 grid gap-4 md:grid-cols-3">
          <div>
            <label htmlFor="status-filter" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Status
            </label>
            <select
              id="status-filter"
              value={filterStatus}
              onChange={(event) => setFilterStatus(event.target.value)}
              className="field-input"
            >
              <option value="all">All statuses</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label htmlFor="priority-filter" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Priority
            </label>
            <select
              id="priority-filter"
              value={filterPriority}
              onChange={(event) => setFilterPriority(event.target.value)}
              className="field-input"
            >
              <option value="all">All priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="rounded-2xl border border-slate-200/70 bg-white/60 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/60">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Visible tasks</p>
            <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{filteredTasks.length}</p>
          </div>
        </div>

        {isLoading ? (
          <div className="rounded-2xl border border-slate-200/70 bg-white/60 p-10 text-center text-sm text-muted dark:border-slate-800 dark:bg-slate-900/60">
            Loading tasks...
          </div>
        ) : filteredTasks.length > 0 ? (
          <div className="overflow-x-auto custom-scrollbar">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200/80 text-left text-xs uppercase tracking-[0.18em] text-slate-500 dark:border-slate-800 dark:text-slate-400">
                  <th className="pb-3 pr-6">Task</th>
                  <th className="pb-3 pr-6">Student</th>
                  <th className="pb-3 pr-6">Due</th>
                  <th className="pb-3 pr-6">Priority</th>
                  <th className="pb-3 pr-6">Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task) => {
                  const overdue = isOverdue(task);

                  return (
                    <tr
                      key={task._id}
                      className={`border-b border-slate-200/60 transition last:border-0 hover:bg-white/60 dark:border-slate-800/80 dark:hover:bg-slate-900/60 ${
                        overdue ? 'bg-rose-50/70 dark:bg-rose-900/10' : ''
                      }`}
                    >
                      <td className="py-4 pr-6">
                        <p className="font-semibold text-slate-900 dark:text-white">{task.title}</p>
                        <p className="mt-1 max-w-md truncate text-xs text-slate-600 dark:text-slate-400">
                          {task.description || 'No description'}
                        </p>
                      </td>
                      <td className="py-4 pr-6 text-slate-700 dark:text-slate-300">
                        {task.studentId ? `${task.studentId.firstName} ${task.studentId.lastName}` : 'Unassigned'}
                      </td>
                      <td className="py-4 pr-6">
                        <div className="text-slate-800 dark:text-slate-200">{formatDate(task.dueDate)}</div>
                        {overdue ? <div className="mt-1 text-xs font-semibold text-rose-600 dark:text-rose-300">Overdue</div> : null}
                      </td>
                      <td className="py-4 pr-6">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${priorityStyles[task.priority] || 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'}`}>
                          {task.priority || 'N/A'}
                        </span>
                      </td>
                      <td className="py-4 pr-6">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[task.status] || 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'}`}>
                          {task.status || 'Unknown'}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <Link to={`/tasks/${task._id}`} className="secondary-button !px-3 !py-2 !text-xs">
                            View
                          </Link>
                          <Link to={`/tasks/${task._id}/edit`} className="secondary-button !px-3 !py-2 !text-xs">
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(task._id)}
                            className="inline-flex items-center rounded-full bg-red-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white/50 p-10 text-center dark:border-slate-700 dark:bg-slate-900/50">
            <p className="text-base font-semibold text-slate-800 dark:text-slate-100">No tasks match this filter</p>
            <p className="mt-2 text-sm text-muted">Adjust your filters or create a new task to populate this board.</p>
            <Link to="/tasks/new" className="primary-button mt-5">
              Create task
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default TasksList;
