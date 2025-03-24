// src/components/common/DateRangePicker.jsx
import React from 'react';
import { Box, Flex, Input, useBreakpointValue } from '@chakra-ui/react';
import ReactDatePicker from 'react-datepicker';
import { FiCalendar } from 'react-icons/fi';
import 'react-datepicker/dist/react-datepicker.css';
import ptBR from 'date-fns/locale/pt-BR';

const DateRangePicker = ({ 
  startDate, 
  endDate, 
  onChange,
  placeholderStart = "Data inicial",
  placeholderEnd = "Data final",
  bgColor = "white",
  textColor = "black",
  borderColor = "gray.200",
  isMobile = false
}) => {
  // Usando Chakra para ajustes responsivos
  const inputSize = useBreakpointValue({ base: "xs", md: "sm" });
  const stackDirection = useBreakpointValue({ base: "column", sm: "row" });
  const gap = useBreakpointValue({ base: 1, sm: 2 });
  const mobilePlaceholderStart = useBreakpointValue({ base: "Início", md: "Data inicial" });
  const mobilePlaceholderEnd = useBreakpointValue({ base: "Fim", md: "Data final" });
  
  // Componente de input personalizado para o DatePicker
  const CustomInput = React.forwardRef(({ value, onClick, placeholder, isStartDate }, ref) => {
    return (
      <Box position="relative">
        <Input
          ref={ref}
          value={value || ''}
          placeholder={isStartDate ? mobilePlaceholderStart : mobilePlaceholderEnd}
          onClick={onClick}
          readOnly
          cursor="pointer"
          bg={bgColor}
          color={textColor}
          borderColor={borderColor}
          pr="2.5rem"
          size={inputSize}
          _focus={{ 
            borderColor: 'blue.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)'
          }}
          _placeholder={{ color: "whiteAlpha.600" }}
        />
        <Box
          position="absolute"
          right="0.75rem"
          top="50%"
          transform="translateY(-50%)"
          color="whiteAlpha.600"
          pointerEvents="none"
        >
          <FiCalendar size={useBreakpointValue({ base: 14, md: 16 })} />
        </Box>
      </Box>
    );
  });

  const handleStartDateChange = (date) => {
    onChange({ startDate: date, endDate });
  };

  const handleEndDateChange = (date) => {
    onChange({ startDate, endDate: date });
  };

  return (
    <Flex gap={gap} flexDirection={stackDirection}>
      <Box flex="1">
        <ReactDatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="dd/MM/yyyy"
          locale={ptBR}
          placeholderText={mobilePlaceholderStart}
          isClearable
          customInput={<CustomInput isStartDate={true} />}
          popperProps={{
            strategy: "fixed"
          }}
          popperPlacement="bottom-start"
          // Configurações para melhorar a experiência mobile
          useWeekdaysShort={true}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
      </Box>
      <Box flex="1">
        <ReactDatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="dd/MM/yyyy"
          locale={ptBR}
          placeholderText={mobilePlaceholderEnd}
          isClearable
          customInput={<CustomInput isStartDate={false} />}
          popperProps={{
            strategy: "fixed"
          }}
          popperPlacement="bottom-end"
          // Configurações para melhorar a experiência mobile
          useWeekdaysShort={true}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
      </Box>
    </Flex>
  );
};

export default DateRangePicker;