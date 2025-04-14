// src/contexts/FilterContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const FilterContext = createContext();

export const useFilter = () => useContext(FilterContext);

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    employee: '',          // Nome do funcionário para busca
    department: 'todos',   // Setor/departamento
    status: 'todos',       // Status (presente, ausente, etc)
    dateRange: {
      startDate: null,     // Data inicial do período
      endDate: null        // Data final do período
    }
  });

  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // Atualiza o contador de filtros ativos
  useEffect(() => {
    let count = 0;
    if (filters.employee) count++;
    if (filters.department !== 'todos') count++;
    if (filters.status !== 'todos') count++;
    if (filters.dateRange.startDate || filters.dateRange.endDate) count++;
    setActiveFiltersCount(count);
  }, [filters]);

  // Atualiza um filtro específico
  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Reseta todos os filtros para os valores padrão
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

  // Função para aplicar filtros aos registros da API
  const applyFiltersToRegistros = (registros) => {
    if (!registros || !Array.isArray(registros)) return [];
    
    return registros.filter(registro => {
      // Filtro por nome de funcionário
      if (filters.employee && !registro.pessoa.nome.toLowerCase().includes(filters.employee.toLowerCase())) {
        return false;
      }
      
      // Filtro por status
      if (filters.status !== 'todos') {
        const status = registro.pessoa.status === 'DENTRO' ? 'presente' : 'ausente';
        if (status !== filters.status) {
          return false;
        }
      }
      
      // Filtro por data
      if (filters.dateRange.startDate || filters.dateRange.endDate) {
        const registroDate = new Date(registro.timestamp);
        
        if (filters.dateRange.startDate && registroDate < filters.dateRange.startDate) {
          return false;
        }
        
        if (filters.dateRange.endDate) {
          // Ajustar para o final do dia selecionado para inclusão completa
          const endDateAdjusted = new Date(filters.dateRange.endDate);
          endDateAdjusted.setHours(23, 59, 59, 999);
          
          if (registroDate > endDateAdjusted) {
            return false;
          }
        }
      }
      
      // Aqui poderia ser adicionado o filtro por departamento, caso a API forneça essa informação
      // Por enquanto, estamos ignorando esse filtro específico
      
      return true;
    });
  };

  // Função para aplicar filtros a pessoas
  const applyFiltersToPessoas = (pessoas) => {
    if (!pessoas || !Array.isArray(pessoas)) return [];
    
    return pessoas.filter(pessoa => {
      // Filtro por nome de funcionário
      if (filters.employee && !pessoa.nome.toLowerCase().includes(filters.employee.toLowerCase())) {
        return false;
      }
      
      // Filtro por status
      if (filters.status !== 'todos') {
        const status = pessoa.status === 'DENTRO' ? 'presente' : 'ausente';
        if (status !== filters.status) {
          return false;
        }
      }
      
      // Filtro por departamento (se estiver disponível)
      if (filters.department !== 'todos' && pessoa.departamento) {
        if (pessoa.departamento.toLowerCase() !== filters.department.toLowerCase()) {
          return false;
        }
      }
      
      return true;
    });
  };

  const value = {
    filters,
    activeFiltersCount,
    updateFilter,
    resetFilters,
    applyFiltersToRegistros,
    applyFiltersToPessoas
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;