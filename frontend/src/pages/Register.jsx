import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearError, register } from '../store/authSlice';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    dispatch(register(formData));
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center">
      <div className="grid w-full overflow-hidden rounded-[32px] border border-white/20 bg-slate-950 text-white shadow-2xl shadow-slate-950/20 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-panel-strong m-3 p-8 text-gray-900 dark:text-white sm:p-10">
          <h2 className="text-3xl font-bold">Create Account</h2>
          <p className="mt-2 text-sm text-muted">Set up a workspace for students, tasks, and academic follow-through.</p>

          {isError ? (
            <div className="mb-4 mt-6 flex items-center justify-between rounded-2xl bg-red-100 p-3 text-red-700">
              <span>{errorMessage}</span>
              <button onClick={() => dispatch(clearError())} className="text-red-700 font-bold">x</button>
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="username" className="mb-2 block text-sm font-medium text-muted">Username</label>
              <input id="username" name="username" type="text" value={formData.username} onChange={handleChange} required className="field-input" />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-muted">Email</label>
              <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="field-input" />
            </div>
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-muted">Password</label>
              <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required className="field-input" />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-muted">Confirm Password</label>
              <input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required className="field-input" />
            </div>
            <button type="submit" disabled={isLoading} className={`primary-button w-full ${isLoading ? 'cursor-not-allowed opacity-70' : ''}`}>
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-muted">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-cyan-700 hover:underline dark:text-cyan-300">Login here</Link>
            </p>
          </div>
        </div>

        <div className="hidden flex-col justify-between bg-gradient-to-br from-slate-100 via-cyan-100 to-amber-100 p-10 text-slate-950 lg:flex">
          <div>
            <p className="text-sm uppercase tracking-[0.3em]">Organize Better</p>
            <h1 className="mt-4 font-['Space_Grotesk'] text-5xl font-bold leading-tight">Build a cleaner academic workflow from day one.</h1>
          </div>
          <p className="max-w-md text-sm font-medium">Create your account to start tracking roster activity, assignment load, and delivery deadlines.</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
