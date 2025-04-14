// src/contexts/DashboardContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchRegistros } from '../service/api';
import { format, parseISO, differenceInHours, differenceInMinutes } from 'date-fns';
import { useFilter } from './FilterContext';

const DashboardContext = createContext();

export const useDashboard = () => useContext(DashboardContext);

export const DashboardProvider = ({ children }) => {
  const [rawData, setRawData] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    metrics: {},
    sectorAnalysis: {
      departments: [],
      totalEmployees: 0,
      productivity: { value: '0%', comparison: '', trend: 'up' }
    },
    tendencyData: [],
    recentActivities: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Obter funções de filtro do contexto FilterContext
  const { filters, applyFiltersToRegistros } = useFilter();

  // Atualizar os dados do dashboard ao mudar os filtros
  useEffect(() => {
    if (rawData) {
      const processedData = processApiData(rawData);
      setDashboardData(processedData);
    }
  }, [filters, rawData]);

  // Função para processar os dados da API e formatá-los para o dashboard
  const processApiData = (apiData) => {
    // Aplicar filtros aos registros
    const registros = applyFiltersToRegistros(apiData.data || []);
    
    // Agrupa registros por pessoa
    const pessoasPorId = {};
    registros.forEach(registro => {
      if (!pessoasPorId[registro.pessoaId]) {
        pessoasPorId[registro.pessoaId] = {
          id: registro.pessoaId,
          nome: registro.pessoa.nome,
          status: registro.pessoa.status,
          registros: []
        };
      }
      pessoasPorId[registro.pessoaId].registros.push({
        id: registro.id,
        timestamp: registro.timestamp,
        tipo: registro.tipo
      });
    });
    
    // Calcula métricas
    const pessoas = Object.values(pessoasPorId);
    const totalPessoas = pessoas.length;
    const presentesHoje = pessoas.filter(p => p.status === 'DENTRO').length;
    const ausentesHoje = pessoas.filter(p => p.status === 'FORA').length;
    
    // Calcula média de permanência
    // Aqui consideramos pares entrada/saída para calcular o tempo
    let totalMinutos = 0;
    let contadorPermanencias = 0;
    
    pessoas.forEach(pessoa => {
      // Ordenar registros por timestamp (mais recente primeiro)
      const registrosOrdenados = [...pessoa.registros].sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
      
      // Procurar pares entrada/saída
      for (let i = 0; i < registrosOrdenados.length - 1; i++) {
        if (registrosOrdenados[i].tipo === 'SAIDA' && registrosOrdenados[i+1].tipo === 'ENTRADA') {
          const saida = parseISO(registrosOrdenados[i].timestamp);
          const entrada = parseISO(registrosOrdenados[i+1].timestamp);
          const minutos = differenceInMinutes(saida, entrada);
          if (minutos > 0) {
            totalMinutos += minutos;
            contadorPermanencias++;
          }
        }
      }
    });
    
    const mediaPermanenciaMinutos = contadorPermanencias > 0 
      ? Math.round(totalMinutos / contadorPermanencias) 
      : 0;
    
    const horasPermanencia = Math.floor(mediaPermanenciaMinutos / 60);
    const minutosPermanencia = mediaPermanenciaMinutos % 60;
    const mediaPermanencia = `${horasPermanencia}h${minutosPermanencia > 0 ? ` ${minutosPermanencia}min` : ''}`;
    
    // Calcular horas trabalhadas (total de todos os funcionários hoje)
    const today = new Date().toISOString().split('T')[0];
    const horasTrabalhadas = Math.round(totalMinutos / 60);
    
    // Gerar dados para atividades recentes
    const atividadesRecentes = registros
      .slice(0, 10) // Pegar apenas os 10 registros mais recentes
      .map(registro => ({
        id: registro.id,
        pessoaId: registro.pessoaId,
        time: format(parseISO(registro.timestamp), 'HH:mm'),
        name: registro.pessoa.nome,
        avatar: `/assets/images/employee${registro.pessoaId % 5 + 1}.jpg`, // Avatar aleatório
        type: registro.tipo === 'ENTRADA' ? 'Entrada' : 'Saída',
        location: 'Portão Principal', // Informação não disponível na API
        status: registro.tipo === 'ENTRADA' ? 'ENTROU' : 'SAIU',
        timestamp: registro.timestamp
      }));
    
    // Dados setoriais - como não temos essa informação, vamos criar dados fictícios
    // Em uma implementação real, você buscaria esses dados de outro endpoint
    const setores = [
      { name: 'Administrativo', percentage: 40, color: 'brand.500' },
      { name: 'Produção', percentage: 30, color: 'red.500' },
      { name: 'Comercial', percentage: 15, color: 'green.500' },
      { name: 'Suporte', percentage: 15, color: 'yellow.500' }
    ];
    
    // Dados de tendência para o gráfico de barras
    // Aqui usamos dados fictícios, mas em uma implementação real
    // você calcularia isso com base nos registros dos últimos dias
    const tendencyData = [
      { day: 'Seg', expected: 8, actual: 8.2 },
      { day: 'Ter', expected: 8, actual: 7.9 },
      { day: 'Qua', expected: 8, actual: 8.5 },
      { day: 'Qui', expected: 8, actual: 8.1 },
      { day: 'Sex', expected: 8, actual: 7.5 }
    ];
    
    // Transformar para o formato esperado pelos componentes
    return {
      metrics: {
        presentToday: {
          value: presentesHoje,
          percentage: totalPessoas > 0 ? Math.round((presentesHoje / totalPessoas) * 100) : 0,
          trend: 'increase',
          comparison: 'do total'
        },
        absentToday: {
          value: ausentesHoje,
          percentage: totalPessoas > 0 ? Math.round((ausentesHoje / totalPessoas) * 100) : 0,
          trend: 'decrease',
          comparison: 'do total'
        },
        averageStay: {
          value: mediaPermanencia,
          trend: 'increase',
          comparison: 'média diária'
        },
        hoursWorked: {
          value: `${horasTrabalhadas}h`,
          percentage: 95, // Fictício, substituir por cálculo real
          trend: 'increase',
          comparison: 'do previsto'
        },
        delaysToday: {
          value: 3, // Fictício, substituir por cálculo real
          percentage: 5, // Fictício, substituir por cálculo real
          trend: 'decrease',
          comparison: 'do total',
          alert: true
        }
      },
      sectorAnalysis: {
        totalEmployees: totalPessoas,
        productivity: {
          value: '+8%', // Fictício
          comparison: 'vs. média',
          trend: 'up'
        },
        departments: setores
      },
      tendencyData,
      recentActivities: atividadesRecentes,
      rawRegistros: registros // Mantém os registros originais para uso posterior
    };
  };

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const registrosData = await fetchRegistros();
        setRawData(registrosData); // Armazena os dados brutos
        
        const processedData = processApiData(registrosData);
        setDashboardData(processedData);
      } catch (err) {
        setError('Erro ao carregar dados do dashboard: ' + err.message);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // Função para buscar detalhes de uma pessoa específica
  const getPersonDetails = (pessoaId) => {
    if (!rawData || !rawData.data) return { person: null, activities: [] };
    
    // Filtrar registros para esta pessoa
    const registrosPessoa = rawData.data.filter(reg => reg.pessoaId === pessoaId);
    
    if (registrosPessoa.length === 0) return { person: null, activities: [] };
    
    // Obter dados da pessoa
    const person = {
      id: pessoaId,
      nome: registrosPessoa[0].pessoa.nome,
      status: registrosPessoa[0].pessoa.status
    };
    
    // Formatar atividades
    const activities = registrosPessoa.map(reg => ({
      id: reg.id,
      timestamp: reg.timestamp,
      type: reg.tipo,
      location: 'Portão Principal', // Informação padrão
      note: '' // Campo vazio para observações
    })).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Ordenar por timestamp decrescente
    
    return { person, activities };
  };

  const refreshData = async () => {
    try {
      setIsLoading(true);
      const registrosData = await fetchRegistros();
      setRawData(registrosData);
      const processedData = processApiData(registrosData);
      setDashboardData(processedData);
    } catch (err) {
      setError('Erro ao atualizar dados: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    dashboardData,
    isLoading,
    error,
    refreshData,
    getPersonDetails
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;