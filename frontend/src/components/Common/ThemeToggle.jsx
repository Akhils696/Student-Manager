import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="group relative inline-flex h-12 w-[92px] items-center overflow-hidden rounded-full border border-white/15 bg-white/10 px-1.5 shadow-lg shadow-slate-950/10 transition duration-300 hover:border-cyan-300/40 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 dark:border-white/10 dark:bg-slate-900/60"
      aria-label="Toggle dark mode"
    >
      <span className="sr-only">Toggle dark mode</span>
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        <span className={`absolute inset-y-0 left-0 w-1/2 transition duration-500 ${isDarkMode ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}>
          <span className="absolute left-3 top-3 h-1.5 w-1.5 rounded-full bg-amber-200 shadow-[0_0_18px_rgba(253,224,71,0.95)]" />
          <span className="absolute right-5 top-2 h-2 w-2 rounded-full bg-amber-300/90 shadow-[0_0_22px_rgba(251,191,36,0.85)]" />
        </span>
        <span className={`absolute inset-y-0 right-0 w-1/2 transition duration-500 ${isDarkMode ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'}`}>
          <span className="absolute left-4 top-3 h-1 w-1 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.95)]" />
          <span className="absolute left-7 top-5 h-1.5 w-1.5 rounded-full bg-white/90 shadow-[0_0_16px_rgba(255,255,255,0.9)]" />
          <span className="absolute right-4 top-2.5 h-1 w-1 rounded-full bg-white/80 shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
        </span>
      </span>

      <span
        className={`relative z-10 inline-flex h-9 w-9 transform items-center justify-center rounded-full shadow-lg transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isDarkMode
            ? 'translate-x-10 bg-slate-950 text-cyan-200'
            : 'translate-x-0 bg-white text-amber-500'
        }`}
      >
        {isDarkMode ? (
          <svg className="h-4.5 w-4.5 transition duration-300 group-hover:rotate-12" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M17.293 13.293A8 8 0 016.707 2.707 8.001 8.001 0 1017.293 13.293z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg className="h-4.5 w-4.5 transition duration-300 group-hover:rotate-90" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </span>

      <span className={`pointer-events-none absolute left-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/70 transition duration-300 ${isDarkMode ? 'opacity-0 -translate-x-2' : 'opacity-100 translate-x-0'}`}>
        Day
      </span>
      <span className={`pointer-events-none absolute right-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/70 transition duration-300 ${isDarkMode ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}>
        Night
      </span>
    </button>
  );
};

export default ThemeToggle;
