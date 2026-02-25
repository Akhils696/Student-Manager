import React, { useState, useRef, useEffect } from 'react';
import { useSearch } from '../../contexts/SearchContext';

const SearchBar = ({ items = [], onSearchResults, placeholder = "Search...", className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localQuery, setLocalQuery] = useState('');
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  
  const { 
    searchQuery, 
    setSearchQuery, 
    searchHistory, 
    savedSearches, 
    filters, 
    addToHistory, 
    performSearch, 
    applyFilters 
  } = useSearch();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Sync local query with context
  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleSearch = (query) => {
    const searchQuery = query || localQuery;
    setSearchQuery(searchQuery);
    addToHistory(searchQuery);
    
    // Perform search and apply filters
    let results = performSearch(searchQuery, items);
    results = applyFilters(results);
    
    if (onSearchResults) {
      onSearchResults(results);
    }
    
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const useSavedSearch = (savedSearch) => {
    setSearchQuery(savedSearch.query);
    setLocalQuery(savedSearch.query);
    // Apply saved filters
    if (savedSearch.filters) {
      // Update filters in context
    }
    handleSearch(savedSearch.query);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setLocalQuery('');
    if (onSearchResults) {
      onSearchResults(items);
    }
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          ref={inputRef}
          type="text"
          className="input-field pl-10 pr-10"
          placeholder={placeholder}
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
        {localQuery && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <svg className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        <button
          onClick={() => handleSearch()}
          className="absolute inset-y-0 right-10 pr-3 flex items-center"
        >
          <svg className="h-5 w-5 text-blue-500 hover:text-blue-700 dark:hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
          {/* Search History */}
          {searchHistory.length > 0 && (
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">Recent Searches</h4>
                <button 
                  onClick={() => {
                    // Clear history
                  }}
                  className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  Clear
                </button>
              </div>
              <div className="space-y-1">
                {searchHistory.slice(0, 3).map((query, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setLocalQuery(query);
                      handleSearch(query);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-150"
                  >
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {query}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Saved Searches */}
          {savedSearches.length > 0 && (
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">Saved Searches</h4>
              </div>
              <div className="space-y-1">
                {savedSearches.slice(0, 2).map((savedSearch) => (
                  <button
                    key={savedSearch.id}
                    onClick={() => useSavedSearch(savedSearch)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-150"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        {savedSearch.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(savedSearch.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Filters */}
          <div className="p-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Quick Filters</h4>
            <div className="grid grid-cols-2 gap-2">
              <button className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors duration-150">
                High Priority
              </button>
              <button className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors duration-150">
                Pending Tasks
              </button>
              <button className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors duration-150">
                This Week
              </button>
              <button className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors duration-150">
                All Students
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;