// src/components/common/DatePickerStyles.jsx
import React from 'react';
import { Global, css } from '@emotion/react';

// Componente que adiciona estilos globais para o DatePicker
const DatePickerStyles = () => {
  return (
    <Global
      styles={css`
        /* Estilos para melhorar a experiência do DatePicker em dispositivos móveis */
        @media (max-width: 768px) {
          .react-datepicker__day {
            width: 2rem !important;
            height: 2rem !important;
            line-height: 2rem !important;
            margin: 0.166rem !important;
          }

          .react-datepicker__day-name {
            width: 2rem !important;
          }

          /* Cabeçalho maior */
          .react-datepicker__header {
            padding-top: 10px !important;
          }

          .react-datepicker__current-month {
            font-size: 1rem !important;
            padding: 5px 0 !important;
          }

          /* Aumentar a área clicável dos seletores */
          .react-datepicker__navigation {
            top: 15px !important;
            width: 26px !important;
            height: 26px !important;
          }

          /* Garantir que o DatePicker sempre caiba na tela */
          .react-datepicker__month-container {
            float: none !important;
          }

          /* Alinhamento central em telas pequenas */
          .react-datepicker-popper {
            transform: none !important;
            position: fixed !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            z-index: 10000 !important;
          }

          /* Setas do popper */
          .react-datepicker-popper[data-placement^=bottom] .react-datepicker__triangle {
            display: none !important;
          }

          /* Garantir que o fundo seja suficientemente contrastante */
          .react-datepicker {
            background-color: white !important;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3) !important;
            border: 1px solid #ccc !important;
          }

          /* Botão de limpar mais visível */
          .react-datepicker__close-icon::after {
            font-size: 16px !important;
            height: 20px !important;
            width: 20px !important;
            background-color: #3182CE !important;
          }
        }

        /* Estilos para dropdowns de mês e ano */
        .react-datepicker__month-dropdown,
        .react-datepicker__year-dropdown {
          background-color: white !important;
          border: 1px solid #aeaeae !important;
          border-radius: 0.25rem !important;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15) !important;
          max-height: 200px !important;
          overflow-y: auto !important;
        }

        .react-datepicker__month-option,
        .react-datepicker__year-option {
          padding: 0.5rem !important;
          transition: background-color 0.2s !important;
        }

        .react-datepicker__month-option:hover,
        .react-datepicker__year-option:hover {
          background-color: #f0f0f0 !important;
        }

        /* Overlay escuro quando o datepicker estiver aberto em mobile */
        .datepicker-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 9999;
          display: none;
        }

        .react-datepicker-popper.open + .datepicker-backdrop {
          display: block;
        }
      `}
    />
  );
};

export default DatePickerStyles;