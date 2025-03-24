import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const useFilter = () => useContext(FilterContext);

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    employee: '',
    department: 'todos',
    status: 'todos',
    dateRange: {
      startDate: null,
      endDate: null
    }
  });

  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      employee: '',
      department: 'todos',
      status: 'todos',
      dateRange: {
        startDate: null,
        endDate: null
      }
    });
  };

  const value = {
    filters,
    updateFilter,
    resetFilters
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};