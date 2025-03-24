// src/components/dashboard/Dashboard.jsx
import React from 'react';
import { VStack, useBreakpointValue } from '@chakra-ui/react';
import MetricsGrid from './MetricsGrid';
import ChartsSection from './ChartsSection';
import ActivityLog from './ActivityLog';
import { useDashboard } from '../../contexts/DashboardContext';
// Removida a importação do CSS que estava causando erro

const Dashboard = () => {
  const { dashboardData } = useDashboard();
  const spacing = useBreakpointValue({ base: 4, md: 6 });

  return (
    <VStack spacing={spacing} align="stretch">
      <MetricsGrid />
      <ChartsSection 
        sectorData={dashboardData.sectorAnalysis} 
        tendencyData={dashboardData.tendencyData} 
      />
      <ActivityLog activities={dashboardData.recentActivities} />
    </VStack>
  );
};

export default Dashboard;