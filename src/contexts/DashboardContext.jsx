import React, { createContext, useContext, useState } from 'react';
import { mockDashboardData } from '../data/mockData';

const DashboardContext = createContext();

export const useDashboard = () => useContext(DashboardContext);

export const DashboardProvider = ({ children }) => {
  const [dashboardData, setDashboardData] = useState(mockDashboardData);

  const refreshData = () => {
    // Simula uma atualização de dados
    console.log('Refreshing data...');
    setDashboardData({...mockDashboardData});
  };

  return (
    <DashboardContext.Provider value={{ dashboardData, refreshData }}>
      {children}
    </DashboardContext.Provider>
  );
};