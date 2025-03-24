// src/utils/formatters.js
import { format, parseISO, formatDistanceToNow, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';

/**
 * Funções utilitárias para formatação de dados no dashboard
 */

/**
 * Formata um valor para o formato de moeda brasileira
 * 
 * @param {number} value - Valor a ser formatado
 * @param {Object} options - Opções de formatação
 * @param {boolean} options.showSymbol - Se deve mostrar o símbolo da moeda
 * @param {number} options.decimals - Número de casas decimais
 * @returns {string} Valor formatado como moeda
 */
export const formatCurrency = (value, { showSymbol = true, decimals = 2 } = {}) => {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: showSymbol ? 'currency' : 'decimal',
    currency: 'BRL',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
  
  return formatter.format(value || 0);
};

/**
 * Formata um número com separadores de milhares
 * 
 * @param {number} value - Valor a ser formatado
 * @param {Object} options - Opções de formatação
 * @param {number} options.decimals - Número de casas decimais
 * @returns {string} Número formatado
 */
export const formatNumber = (value, { decimals = 0 } = {}) => {
  const formatter = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
  
  return formatter.format(value || 0);
};

/**
 * Formata um valor como porcentagem
 * 
 * @param {number} value - Valor a ser formatado (ex: 0.75 para 75%)
 * @param {Object} options - Opções de formatação
 * @param {number} options.decimals - Número de casas decimais
 * @param {boolean} options.includeSymbol - Se deve incluir o símbolo de porcentagem
 * @returns {string} Valor formatado como porcentagem
 */
export const formatPercent = (value, { decimals = 1, includeSymbol = true } = {}) => {
  // Converte para porcentagem se o valor estiver entre 0 e 1
  const percentValue = value > 0 && value < 1 ? value * 100 : value;
  
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: includeSymbol ? 'percent' : 'decimal',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
  
  // Para valores estilo "decimal", precisamos dividir por 100 para evitar duplicação
  if (includeSymbol) {
    return formatter.format(percentValue / 100);
  }
  
  return formatter.format(percentValue);
};

/**
 * Formata uma data para o formato brasileiro
 * 
 * @param {Date|string} date - Data a ser formatada
 * @param {string} pattern - Padrão de formatação (ex: 'dd/MM/yyyy')
 * @returns {string} Data formatada
 */
export const formatDate = (date, pattern = 'dd/MM/yyyy') => {
  if (!date) return '';
  
  try {
    // Se for string ISO, converte para objeto Date
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    
    if (!isValid(dateObj)) return 'Data inválida';
    
    return format(dateObj, pattern, { locale: ptBR });
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return 'Data inválida';
  }
};

/**
 * Formata uma data relativa ao momento atual (ex: "há 2 horas")
 * 
 * @param {Date|string} date - Data a ser formatada
 * @param {Object} options - Opções de formatação
 * @param {boolean} options.addSuffix - Se deve adicionar prefixo/sufixo
 * @returns {string} Texto de distância relativa
 */
export const formatRelativeTime = (date, { addSuffix = true } = {}) => {
  if (!date) return '';
  
  try {
    // Se for string ISO, converte para objeto Date
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    
    if (!isValid(dateObj)) return 'Data inválida';
    
    return formatDistanceToNow(dateObj, { 
      locale: ptBR,
      addSuffix: addSuffix
    });
  } catch (error) {
    console.error('Erro ao formatar data relativa:', error);
    return 'Data inválida';
  }
};

/**
 * Formata uma duração em horas e minutos
 * 
 * @param {number} totalMinutes - Total de minutos da duração
 * @returns {string} Duração formatada (ex: "2h 30min")
 */
export const formatDuration = (totalMinutes) => {
  if (!totalMinutes && totalMinutes !== 0) return '';
  
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  if (hours === 0) {
    return `${minutes}min`;
  }
  
  if (minutes === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${minutes}min`;
};

/**
 * Trunca um texto longo e adiciona reticências
 * 
 * @param {string} text - Texto a ser truncado
 * @param {number} maxLength - Comprimento máximo
 * @returns {string} Texto truncado
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  
  if (text.length <= maxLength) return text;
  
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Formata um nome para exibir iniciais
 * 
 * @param {string} name - Nome completo
 * @returns {string} Iniciais do nome
 */
export const getInitials = (name) => {
  if (!name) return '';
  
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
};

/**
 * Formata bytes para unidades legíveis (KB, MB, GB)
 * 
 * @param {number} bytes - Tamanho em bytes
 * @param {number} decimals - Número de casas decimais
 * @returns {string} Tamanho formatado
 */
export const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
};

/**
 * Formata um status para exibição
 * 
 * @param {string} status - Código do status
 * @returns {Object} Objeto com texto e cor do status
 */
export const formatStatus = (status) => {
  const statusMap = {
    'presente': { text: 'Presente', color: 'green' },
    'ausente': { text: 'Ausente', color: 'red' },
    'atrasado': { text: 'Atrasado', color: 'orange' },
    'ENTROU': { text: 'Entrou', color: 'green' },
    'SAIU': { text: 'Saiu', color: 'red' }
  };
  
  return statusMap[status] || { text: status, color: 'gray' };
};