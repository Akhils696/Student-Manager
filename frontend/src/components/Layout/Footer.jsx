import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="px-4 pb-6 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 rounded-[28px] border border-white/30 bg-slate-950 px-6 py-8 text-white shadow-2xl shadow-slate-950/10 md:grid-cols-3">
        <div>
          <h3 className="font-['Space_Grotesk'] text-lg font-bold">Student Planner</h3>
          <p className="mt-3 text-sm text-slate-300">
            Built for teachers, tutors, and coordinators who need a clean operational view of students, tasks, and deadlines.
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.28em] text-cyan-300">Reliable. Focused. Fast.</p>
        </div>

        <div>
          <h3 className="font-semibold text-slate-100">Workspace</h3>
          <div className="mt-3 flex flex-col gap-2 text-sm text-slate-300">
            <Link to="/dashboard" className="transition hover:text-white">Dashboard</Link>
            <Link to="/students" className="transition hover:text-white">Students</Link>
            <Link to="/tasks" className="transition hover:text-white">Tasks</Link>
            <Link to="/calendar" className="transition hover:text-white">Calendar</Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-slate-100">Snapshot</h3>
          <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl bg-white/5 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Year</div>
              <div className="mt-2 font-['Space_Grotesk'] text-xl font-bold">{new Date().getFullYear()}</div>
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Status</div>
              <div className="mt-2 font-['Space_Grotesk'] text-xl font-bold text-emerald-300">Live</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
