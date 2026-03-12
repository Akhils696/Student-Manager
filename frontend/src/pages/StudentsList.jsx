import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteStudent, getStudents } from '../store/studentSlice';

const StudentsList = () => {
  const dispatch = useDispatch();
  const { students, isLoading, isError, errorMessage } = useSelector((state) => state.students);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  const filteredStudents = useMemo(() => {
    const normalizedQuery = searchTerm.trim().toLowerCase();

    return [...students]
      .filter((student) => {
        if (!normalizedQuery) return true;

        const firstName = (student.firstName || '').toLowerCase();
        const lastName = (student.lastName || '').toLowerCase();
        const email = (student.email || '').toLowerCase();

        return firstName.includes(normalizedQuery) || lastName.includes(normalizedQuery) || email.includes(normalizedQuery);
      })
      .sort((a, b) => {
        const aLast = (a.lastName || '').toLowerCase();
        const bLast = (b.lastName || '').toLowerCase();
        if (aLast !== bLast) return aLast.localeCompare(bLast);

        const aFirst = (a.firstName || '').toLowerCase();
        const bFirst = (b.firstName || '').toLowerCase();
        return aFirst.localeCompare(bFirst);
      });
  }, [students, searchTerm]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      dispatch(deleteStudent(id));
    }
  };

  return (
    <div className="space-y-6">
      <section className="surface-panel-strong p-6 sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.26em] text-cyan-600 dark:text-cyan-300">Roster</p>
            <h1 className="page-title mt-2 text-slate-900 dark:text-white">Students</h1>
            <p className="page-copy">Manage your student list, contact details, and grade-level grouping from one table.</p>
          </div>
          <Link to="/students/new" className="primary-button">
            Add Student
          </Link>
        </div>
      </section>

      {isError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200">
          {errorMessage}
        </div>
      ) : null}

      <section className="surface-panel overflow-hidden p-5 sm:p-6">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Student Directory</h2>
            <p className="mt-1 text-sm text-muted">{filteredStudents.length} visible records</p>
          </div>
          <input
            type="search"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="field-input w-full sm:max-w-xs"
            aria-label="Search students"
          />
        </div>

        {isLoading ? (
          <div className="rounded-2xl border border-slate-200/70 bg-white/60 p-10 text-center text-sm text-muted dark:border-slate-800 dark:bg-slate-900/60">
            Loading students...
          </div>
        ) : filteredStudents.length > 0 ? (
          <div className="overflow-x-auto custom-scrollbar">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200/80 text-left text-xs uppercase tracking-[0.18em] text-slate-500 dark:border-slate-800 dark:text-slate-400">
                  <th className="pb-3 pr-6">Student</th>
                  <th className="pb-3 pr-6">Email</th>
                  <th className="pb-3 pr-6">Grade</th>
                  <th className="pb-3 pr-6">Subjects</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student._id} className="border-b border-slate-200/60 transition last:border-0 hover:bg-white/60 dark:border-slate-800/80 dark:hover:bg-slate-900/60">
                    <td className="py-4 pr-6">
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {student.firstName || 'Unknown'} {student.lastName || ''}
                      </div>
                    </td>
                    <td className="py-4 pr-6 text-slate-600 dark:text-slate-300">{student.email || 'No email on file'}</td>
                    <td className="py-4 pr-6">
                      <span className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-800 dark:bg-cyan-900/35 dark:text-cyan-200">
                        {student.gradeLevel ? `Grade ${student.gradeLevel}` : 'Not set'}
                      </span>
                    </td>
                    <td className="py-4 pr-6 text-slate-600 dark:text-slate-300">
                      {student.subjects?.length ? student.subjects.join(', ') : 'Not assigned'}
                    </td>
                    <td className="py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Link to={`/students/${student._id}`} className="secondary-button !px-3 !py-2 !text-xs">
                          View
                        </Link>
                        <Link to={`/students/${student._id}/edit`} className="secondary-button !px-3 !py-2 !text-xs">
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(student._id)}
                          className="inline-flex items-center rounded-full bg-red-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white/50 p-10 text-center dark:border-slate-700 dark:bg-slate-900/50">
            <p className="text-base font-semibold text-slate-800 dark:text-slate-100">No students found</p>
            <p className="mt-2 text-sm text-muted">Try a different search or add a new student to start your roster.</p>
            <Link to="/students/new" className="primary-button mt-5">
              Add your first student
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default StudentsList;
