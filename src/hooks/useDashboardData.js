// src/hooks/useDashboardData.js
import { useState, useEffect, useCallback } from 'react';
import { mockDashboardData } from '../data/mockData';
import { useFilter } from '../contexts/FilterContext';

/**
 * Hook personalizado para buscar e filtrar dados do dashboard
 * 
 * @returns {Object} Um objeto contendo dados, estado de carregamento, erro e funções para manipular os dados
 */
const useDashboardData = () => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { filters } = useFilter();

  // Função para buscar dados
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Em um ambiente real, você usaria algo como:
      // const response = await fetch('/api/dashboard');
      // const result = await response.json();
      
      // Simulando uma chamada de API com um pequeno atraso
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Usando dados simulados
      setData(mockDashboardData);
      setFilteredData(mockDashboardData);
      
      setIsLoading(false);
    } catch (err) {
      setError('Erro ao carregar dados do dashboard. Por favor, tente novamente.');
      setIsLoading(false);
      console.error('Erro ao buscar dados:', err);
    }
  }, []);

  // Carregar dados na montagem inicial
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Aplicar filtros aos dados sempre que os filtros forem alterados
  useEffect(() => {
    if (!data) return;

    // Função para aplicar filtros
    const applyFilters = () => {
      let result = { ...data };

      // Filtragem de atividades recentes
      if (filters.employee || filters.department !== 'todos' || filters.status !== 'todos' || filters.dateRange.startDate || filters.dateRange.endDate) {
        const filteredActivities = data.recentActivities.filter(activity => {
          // Filtro por nome de funcionário
          if (filters.employee && !activity.name.toLowerCase().includes(filters.employee.toLowerCase())) {
            return false;
          }

          // Aqui você pode adicionar mais lógica de filtragem baseada no departamento, status, etc.
          // Nota: Em um caso real, você provavelmente teria mais dados no objeto "activity"
          
          return true;
        });

        result = {
          ...result,
          recentActivities: filteredActivities
        };
      }

      // Aqui você pode adicionar mais lógica para filtrar outros aspectos dos dados
      // como métricas, análises por setor, etc.

      setFilteredData(result);
    };

    applyFilters();
  }, [data, filters]);

  // Função para atualizar os dados manualmente
  const refreshData = () => {
    fetchData();
  };

  // Exportando os dados filtrados e funções para manipulá-los
  return {
    dashboardData: filteredData,
    originalData: data,
    isLoading,
    error,
    refreshData
  };
};

export default useDashboardData;