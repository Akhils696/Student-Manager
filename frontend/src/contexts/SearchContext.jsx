import React, { createContext, useContext, useState, useEffect } from 'react';

const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [savedSearches, setSavedSearches] = useState([]);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    category: '',
    dateRange: { start: '', end: '' }
  });

  // Load search history and saved searches from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    const savedSearches = localStorage.getItem('savedSearches');
    
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
    
    if (savedSearches) {
      setSavedSearches(JSON.parse(savedSearches));
    }
  }, []);

  // Save search history to localStorage
  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  // Save saved searches to localStorage
  useEffect(() => {
    localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
  }, [savedSearches]);

  // Add to search history
  const addToHistory = (query) => {
    if (query.trim() && !searchHistory.includes(query)) {
      const newHistory = [query, ...searchHistory.slice(0, 9)]; // Keep only last 10 searches
      setSearchHistory(newHistory);
    }
  };

  // Save current search
  const saveSearch = (name, query = searchQuery, filters = filters) => {
    const newSavedSearch = {
      id: Date.now(),
      name,
      query,
      filters,
      createdAt: new Date().toISOString()
    };
    
    setSavedSearches(prev => [...prev, newSavedSearch]);
  };

  // Remove saved search
  const removeSavedSearch = (id) => {
    setSavedSearches(prev => prev.filter(search => search.id !== id));
  };

  // Clear search history
  const clearHistory = () => {
    setSearchHistory([]);
  };

  // Update filters
  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      status: '',
      priority: '',
      category: '',
      dateRange: { start: '', end: '' }
    });
  };

  // Perform search across students and tasks
  const performSearch = (query, items, searchFields = ['title', 'description', 'firstName', 'lastName', 'email']) => {
    if (!query.trim()) return items;
    
    const normalizedQuery = query.toLowerCase().trim();
    
    return items.filter(item => {
      return searchFields.some(field => {
        if (item[field]) {
          return item[field].toLowerCase().includes(normalizedQuery);
        }
        return false;
      });
    });
  };

  // Apply filters to items
  const applyFilters = (items) => {
    return items.filter(item => {
      // Status filter
      if (filters.status && item.status !== filters.status) {
        return false;
      }
      
      // Priority filter
      if (filters.priority && item.priority !== filters.priority) {
        return false;
      }
      
      // Category filter
      if (filters.category && item.category !== filters.category) {
        return false;
      }
      
      // Date range filter
      if (filters.dateRange.start || filters.dateRange.end) {
        const itemDate = new Date(item.dueDate || item.createdAt);
        const startDate = filters.dateRange.start ? new Date(filters.dateRange.start) : null;
        const endDate = filters.dateRange.end ? new Date(filters.dateRange.end) : null;
        
        if (startDate && itemDate < startDate) return false;
        if (endDate && itemDate > endDate) return false;
      }
      
      return true;
    });
  };

  const value = {
    searchQuery,
    setSearchQuery,
    searchHistory,
    savedSearches,
    filters,
    addToHistory,
    saveSearch,
    removeSavedSearch,
    clearHistory,
    updateFilters,
    resetFilters,
    performSearch,
    applyFilters
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};