import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearError, login } from '../store/authSlice';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, errorMessage } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center">
      <div className="grid w-full overflow-hidden rounded-[32px] border border-white/20 bg-slate-950 text-white shadow-2xl shadow-slate-950/20 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="hidden flex-col justify-between bg-gradient-to-br from-cyan-500 via-emerald-500 to-amber-400 p-10 text-slate-950 lg:flex">
          <div>
            <p className="text-sm uppercase tracking-[0.3em]">Student Planner</p>
            <h1 className="mt-4 font-['Space_Grotesk'] text-5xl font-bold leading-tight">Keep students, tasks, and deadlines aligned.</h1>
          </div>
          <p className="max-w-md text-sm font-medium">Sign in to manage academic operations from a single focused workspace.</p>
        </div>

        <div className="surface-panel-strong m-3 p-8 text-gray-900 dark:text-white sm:p-10">
          <h2 className="text-3xl font-bold">Login</h2>
          <p className="mt-2 text-sm text-muted">Access your planner, roster, and task pipeline.</p>

          {isError ? (
            <div className="mb-4 mt-6 flex items-center justify-between rounded-2xl bg-red-100 p-3 text-red-700">
              <span>{errorMessage}</span>
              <button onClick={() => dispatch(clearError())} className="text-red-700 font-bold">x</button>
            </div>
          ) : null}

          <form onSubmit={(event) => { event.preventDefault(); dispatch(login(formData)); }} className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-muted">Email</label>
              <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="field-input" />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-muted">Password</label>
                <Link to="/forgot-password" className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">Forgot password?</Link>
              </div>
              <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required className="field-input" />
            </div>

            <button type="submit" disabled={isLoading} className={`primary-button w-full ${isLoading ? 'cursor-not-allowed opacity-70' : ''}`}>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-muted">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold text-cyan-700 hover:underline dark:text-cyan-300">Register here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
