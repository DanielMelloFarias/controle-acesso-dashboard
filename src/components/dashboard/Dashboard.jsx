// src/components/dashboard/Dashboard.jsx
import React from 'react';
import { VStack, useBreakpointValue, Skeleton, Text, Box } from '@chakra-ui/react';
import MetricsGrid from './MetricsGrid';
import ChartsSection from './ChartsSection';
import ActivityLog from './ActivityLog';
import { useDashboard } from '../../contexts/DashboardContext';

const Dashboard = () => {
  const { dashboardData, isLoading, error } = useDashboard();
  const spacing = useBreakpointValue({ base: 4, md: 6 });

  // Mostrar um indicador de carregamento enquanto os dados estão sendo buscados
  if (isLoading) {
    return (
      <VStack spacing={spacing} align="stretch">
        <Skeleton height="100px" />
        <Skeleton height="300px" />
        <Skeleton height="300px" />
      </VStack>
    );
  }

  // Mostrar uma mensagem de erro se algo deu errado
  if (error) {
    return (
      <Box p={5} borderRadius="md" bg="red.50" color="red.500">
        <Text fontWeight="bold">Erro ao carregar dados:</Text>
        <Text>{error}</Text>
      </Box>
    );
  }

  // Verificar se dashboardData está disponível antes de usar
  if (!dashboardData) {
    return (
      <Box p={5} borderRadius="md" bg="blue.50" color="blue.500">
        <Text>Carregando dados do dashboard...</Text>
      </Box>
    );
  }

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