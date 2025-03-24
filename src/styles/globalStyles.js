// src/styles/globalStyles.js
import { css } from '@emotion/react';

const globalStyles = css`
  /* Reset básico */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Remover outline padrão em inputs focados para usuários com mouse */
  *:focus:not(:focus-visible) {
    outline: none;
  }

  /* Manter outline para usuários de teclado para acessibilidade */
  *:focus-visible {
    outline: 2px solid var(--chakra-colors-blue-500);
    outline-offset: 2px;
  }

  /* Estilos para scrollbar personalizados */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }

  /* Estilos para seleção de texto */
  ::selection {
    background-color: var(--chakra-colors-blue-100);
    color: var(--chakra-colors-blue-900);
  }

  /* Classes utilitárias */
  .noselect {
    user-select: none;
  }

  .truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Estilos do DateRangePicker */
  .react-datepicker {
    font-family: var(--chakra-fonts-body);
    border-color: var(--chakra-colors-gray-200);
    border-radius: var(--chakra-radii-md);
    box-shadow: var(--chakra-shadows-lg);
  }
  
  .react-datepicker-wrapper {
    width: 100%;
  }
  
  .react-datepicker__header {
    background-color: var(--chakra-colors-gray-50);
    border-bottom-color: var(--chakra-colors-gray-200);
  }
  
  .react-datepicker__current-month, 
  .react-datepicker-time__header, 
  .react-datepicker-year-header {
    font-weight: var(--chakra-fontWeights-semibold);
    color: var(--chakra-colors-gray-700);
  }
  
  .react-datepicker__day--selected, 
  .react-datepicker__day--in-selecting-range, 
  .react-datepicker__day--in-range {
    background-color: var(--chakra-colors-blue-500) !important;
    color: white !important;
  }
  
  .react-datepicker__day--keyboard-selected {
    background-color: var(--chakra-colors-blue-300);
  }
  
  .react-datepicker__day:hover {
    background-color: var(--chakra-colors-gray-100);
  }
  
  .react-datepicker__day-name {
    color: var(--chakra-colors-gray-600);
  }
  
  .react-datepicker__day--outside-month {
    color: var(--chakra-colors-gray-400);
  }
  
  .react-datepicker__navigation {
    top: 8px;
  }
  
  .react-datepicker__close-icon::after {
    background-color: var(--chakra-colors-gray-400);
  }

  /* Animações */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideInUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.7;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  /* Classes de animação para uso em componentes */
  .fade-in {
    animation: fadeIn 0.3s ease-in-out;
  }

  .slide-in-up {
    animation: slideInUp 0.4s ease-out;
  }

  .pulse {
    animation: pulse 1.5s infinite;
  }
  
  /* Responsividade */
  @media (max-width: 768px) {
    .mobile-hide {
      display: none !important;
    }
    
    .mobile-stretch {
      width: 100% !important;
    }
  }
  
  /* Acessibilidade */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
  
  /* Modo de impressão */
  @media print {
    body {
      background-color: white !important;
      color: black !important;
    }
    
    .no-print {
      display: none !important;
    }
    
    a, a:visited {
      text-decoration: underline;
      color: #000;
    }
    
    .page-break {
      page-break-before: always;
    }
  }
`;

export default globalStyles;