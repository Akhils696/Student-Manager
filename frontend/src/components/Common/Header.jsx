import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../store/authSlice';
import ThemeToggle from './ThemeToggle';
import NotificationBell from './NotificationBell';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const isAuthScreen =
    ['/login', '/register', '/forgot-password'].includes(location.pathname) ||
    location.pathname.startsWith('/reset-password/');

  const navItems = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/students', label: 'Students' },
    { to: '/tasks', label: 'Tasks' },
    { to: '/calendar', label: 'Calendar' },
  ];

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-[28px] border border-white/20 bg-slate-950/78 px-4 py-3 text-white shadow-2xl shadow-slate-950/20 backdrop-blur-xl transition duration-300 xl:px-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-emerald-400 text-lg font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition duration-300 hover:scale-105">
            SP
          </div>
          <div>
            <div className="font-['Space_Grotesk'] text-lg font-bold">Student Planner</div>
            <div className="text-xs text-slate-300">Operations console for students and deadlines</div>
          </div>
        </Link>

        {!isAuthScreen && token ? (
          <nav className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm transition duration-300 ${
                    isActive ? 'bg-white text-slate-950 shadow-lg shadow-white/10' : 'text-slate-200 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        ) : (
          <div className="hidden lg:block" />
        )}

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          {token && !isAuthScreen ? <NotificationBell /> : null}
          {token && user ? (
            <>
              <Link
                to="/profile"
                className="hidden rounded-full border border-white/15 px-4 py-2 text-sm text-slate-100 transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 md:block"
              >
                {user.firstName || user.username}
              </Link>
              <button onClick={handleLogout} className="secondary-button hidden !border-white/10 !bg-white/10 !text-white md:inline-flex">
                Logout
              </button>
              <button
                onClick={() => setMenuOpen((open) => !open)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 md:hidden"
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-nav-menu"
              >
                {menuOpen ? (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                  </svg>
                )}
              </button>
            </>
          ) : (
            <Link to="/login" className="primary-button">
              Sign In
            </Link>
          )}
        </div>
      </div>

      {!isAuthScreen && token && menuOpen ? (
        <div id="mobile-nav-menu" className="mx-auto mt-3 max-w-7xl rounded-[24px] border border-white/20 bg-slate-950/90 p-4 text-white shadow-xl backdrop-blur md:hidden">
          <div className="mb-3 text-sm text-slate-300">Signed in as {user?.email}</div>
          <div className="grid gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-sm ${isActive ? 'bg-white text-slate-950' : 'bg-white/5 text-slate-200'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/profile"
              onClick={() => setMenuOpen(false)}
              className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-200"
            >
              Profile
            </Link>
            <button onClick={handleLogout} className="rounded-2xl bg-red-500 px-4 py-3 text-left text-sm font-semibold text-white">
              Logout
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
