// src/components/dashboard/MetricsGrid.jsx
import React from 'react';
import { SimpleGrid, Skeleton, useBreakpointValue } from '@chakra-ui/react';
import MetricCard from './MetricCard';
import { FiUsers, FiUserX, FiClock, FiBriefcase, FiAlertCircle } from 'react-icons/fi';
import { useDashboard } from '../../contexts/DashboardContext';

const MetricsGrid = () => {
  const { dashboardData, isLoading } = useDashboard();
  
  // Configurações responsivas para o grid
  const columns = useBreakpointValue({ 
    base: 1,         // Mobile: 1 coluna
    sm: 2,           // Tablet pequeno: 2 colunas
    md: 3,           // Tablet: 3 colunas
    lg: 4,           // Desktop: 4 colunas
    xl: 5            // Telas grandes: 5 colunas
  });
  
  const spacing = useBreakpointValue({ base: 3, md: 4, lg: 5 });
  const iconSize = useBreakpointValue({ base: 3, md: 4 });

  // Skeleton enquanto carrega
  if (isLoading || !dashboardData || !dashboardData.metrics) {
    return (
      <SimpleGrid columns={columns} spacing={spacing}>
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} height="100px" />
        ))}
      </SimpleGrid>
    );
  }

  const { metrics } = dashboardData;

  const metricConfigs = [
    {
      key: 'presentToday',
      title: 'Presentes Hoje',
      icon: FiUsers,
      colorScheme: 'blue',
    },
    {
      key: 'absentToday',
      title: 'Ausentes Hoje',
      icon: FiUserX,
      colorScheme: 'orange',
    },
    {
      key: 'averageStay',
      title: 'Média de Permanência',
      icon: FiClock,
      colorScheme: 'green',
    },
    {
      key: 'hoursWorked',
      title: 'Horas Trabalhadas',
      icon: FiBriefcase,
      colorScheme: 'purple',
    },
    {
      key: 'delaysToday',
      title: 'Atrasos Hoje',
      icon: FiAlertCircle,
      colorScheme: 'red',
    }
  ];

  return (
    <SimpleGrid columns={columns} spacing={spacing}>
      {metricConfigs.map((config) => {
        // Verificar se a métrica existe antes de renderizar
        if (!metrics[config.key]) return null;
        
        return (
          <MetricCard
            key={config.key}
            title={config.title}
            value={metrics[config.key].value}
            percentage={metrics[config.key].percentage}
            trend={metrics[config.key].trend}
            comparison={metrics[config.key].comparison}
            icon={config.icon}
            colorScheme={config.colorScheme}
            alert={metrics[config.key].alert}
            iconSize={iconSize}
          />
        );
      })}
    </SimpleGrid>
  );
};

export default MetricsGrid;