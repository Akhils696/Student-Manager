import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../store/authSlice';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="bg-blue-600 dark:bg-blue-800 text-white shadow-md transition-colors duration-300">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Student Planner</Link>
        
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/dashboard" className="hover:text-blue-200 dark:hover:text-blue-300 transition-colors">Dashboard</Link>
            </li>
            <li>
              <Link to="/students" className="hover:text-blue-200 dark:hover:text-blue-300 transition-colors">Students</Link>
            </li>
            <li>
              <Link to="/tasks" className="hover:text-blue-200 dark:hover:text-blue-300 transition-colors">Tasks</Link>
            </li>
            <li>
              <Link to="/calendar" className="hover:text-blue-200 dark:hover:text-blue-300 transition-colors">Calendar</Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {user ? (
            <div className="flex items-center space-x-4">
              <span>Welcome, {user.username}</span>
              <button 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Link 
                to="/login" 
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded mr-2 transition-colors"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;