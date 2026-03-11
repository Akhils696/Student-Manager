import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-11 w-20 items-center rounded-full border border-white/10 bg-white/10 px-1 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
      aria-label="Toggle dark mode"
    >
      <span className="sr-only">Toggle dark mode</span>
      <span
        className={`${
          isDarkMode ? 'translate-x-9' : 'translate-x-0'
        } inline-flex h-9 w-9 transform items-center justify-center rounded-full bg-white transition-transform duration-200 ease-in-out shadow-lg`}
      >
        {isDarkMode ? (
          <svg className="h-4 w-4 text-slate-800" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M17.293 13.293A8 8 0 016.707 2.707 8.001 8.001 0 1017.293 13.293z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg className="h-4 w-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </span>
      <span className="pointer-events-none absolute left-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">
        {isDarkMode ? '' : 'Day'}
      </span>
      <span className="pointer-events-none absolute right-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">
        {isDarkMode ? 'Night' : ''}
      </span>
    </button>
  );
};

export default ThemeToggle;
