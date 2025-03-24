// src/components/common/FilterSection.jsx
import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Flex,
  Collapse,
  Input,
  Select,
  FormControl,
  FormLabel,
  IconButton,
  Badge,
  useDisclosure,
  useColorModeValue
} from '@chakra-ui/react';
import { FiFilter, FiX, FiSearch, FiCalendar, FiUsers, FiCheckCircle } from 'react-icons/fi';
import DateRangePicker from './DateRangePicker';
import { useFilter } from '../../contexts/FilterContext';

const FilterSection = ({ onApplyFilters }) => {
  const { filters, updateFilter, resetFilters } = useFilter();
  const { isOpen, onToggle } = useDisclosure();
  
  const [localFilters, setLocalFilters] = useState({ ...filters });
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Atualiza o contador de filtros ativos
  React.useEffect(() => {
    let count = 0;
    if (filters.employee) count++;
    if (filters.department !== 'todos') count++;
    if (filters.status !== 'todos') count++;
    if (filters.dateRange.startDate || filters.dateRange.endDate) count++;
    setActiveFiltersCount(count);
  }, [filters]);

  const handleInputChange = (field, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDateRangeChange = (dateRange) => {
    setLocalFilters(prev => ({
      ...prev,
      dateRange
    }));
  };

  const handleApply = () => {
    // Atualiza o contexto global com os filtros locais
    Object.entries(localFilters).forEach(([key, value]) => {
      updateFilter(key, value);
    });
    
    // Fecha o painel de filtros
    if (isOpen) onToggle();
    
    // Executa ação de callback (se fornecida)
    if (onApplyFilters) onApplyFilters(localFilters);
  };

  const handleReset = () => {
    resetFilters();
    setLocalFilters({
      employee: '',
      department: 'todos',
      status: 'todos',
      dateRange: {
        startDate: null,
        endDate: null
      }
    });
  };

  return (
    <Box mb={6}>
      <Flex justify="space-between" align="center" mb={4}>
        <HStack>
          <IconButton
            icon={<FiFilter />}
            aria-label="Filtros"
            onClick={onToggle}
            colorScheme={isOpen ? "blue" : "gray"}
            variant={isOpen ? "solid" : "outline"}
          />
          <Text fontWeight="medium">Filtros</Text>
          {activeFiltersCount > 0 && (
            <Badge colorScheme="blue" borderRadius="full" px={2}>
              {activeFiltersCount}
            </Badge>
          )}
        </HStack>
        
        <HStack spacing={2}>
          <Button 
            size="sm" 
            leftIcon={<FiX />} 
            variant="ghost" 
            onClick={handleReset}
            isDisabled={activeFiltersCount === 0}
          >
            Limpar
          </Button>
          <Button 
            size="sm" 
            leftIcon={<FiCheckCircle />} 
            colorScheme="blue" 
            onClick={handleApply}
          >
            Aplicar
          </Button>
        </HStack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Box 
          p={4} 
          bg={bgColor} 
          borderWidth="1px" 
          borderColor={borderColor} 
          borderRadius="md"
          boxShadow="sm"
          mb={4}
        >
          <Flex 
            direction={{ base: "column", md: "row" }} 
            gap={4} 
            wrap="wrap"
          >
            <FormControl flex={{ md: 1 }}>
              <FormLabel display="flex" alignItems="center">
                <FiSearch size={14} style={{ marginRight: '6px' }} />
                Funcionário
              </FormLabel>
              <Input 
                placeholder="Busca por nome..." 
                value={localFilters.employee} 
                onChange={(e) => handleInputChange('employee', e.target.value)}
              />
            </FormControl>

            <FormControl flex={{ md: 1 }}>
              <FormLabel display="flex" alignItems="center">
                <FiCalendar size={14} style={{ marginRight: '6px' }} />
                Período
              </FormLabel>
              <DateRangePicker 
                startDate={localFilters.dateRange.startDate}
                endDate={localFilters.dateRange.endDate}
                onChange={handleDateRangeChange}
              />
            </FormControl>

            <FormControl flex={{ md: 1 }}>
              <FormLabel display="flex" alignItems="center">
                <FiUsers size={14} style={{ marginRight: '6px' }} />
                Setor/Departamento
              </FormLabel>
              <Select 
                value={localFilters.department} 
                onChange={(e) => handleInputChange('department', e.target.value)}
              >
                <option value="todos">Todos os Setores</option>
                <option value="administrativo">Administrativo</option>
                <option value="saude">Saúde</option>
                <option value="operacional">Operacional</option>
                <option value="suporte">Suporte</option>
              </Select>
            </FormControl>

            <FormControl flex={{ md: 1 }}>
              <FormLabel display="flex" alignItems="center">
                <FiCheckCircle size={14} style={{ marginRight: '6px' }} />
                Status
              </FormLabel>
              <Select 
                value={localFilters.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
              >
                <option value="todos">Todos</option>
                <option value="presente">Presente</option>
                <option value="ausente">Ausente</option>
                <option value="atrasado">Atrasado</option>
              </Select>
            </FormControl>
          </Flex>

          {/* Filtros ativos */}
          {activeFiltersCount > 0 && (
            <Box mt={4}>
              <Text fontSize="sm" fontWeight="medium" mb={2}>
                Filtros ativos:
              </Text>
              <Flex gap={2} flexWrap="wrap">
                {filters.employee && (
                  <Badge 
                    colorScheme="blue" 
                    borderRadius="full" 
                    px={2} 
                    py={1}
                    display="flex"
                    alignItems="center"
                  >
                    Funcionário: {filters.employee}
                    <Box as="span" ml={1} cursor="pointer" onClick={() => updateFilter('employee', '')}>
                      <FiX size={14} />
                    </Box>
                  </Badge>
                )}
                
                {filters.department !== 'todos' && (
                  <Badge 
                    colorScheme="purple" 
                    borderRadius="full" 
                    px={2} 
                    py={1}
                    display="flex"
                    alignItems="center"
                  >
                    Setor: {filters.department}
                    <Box as="span" ml={1} cursor="pointer" onClick={() => updateFilter('department', 'todos')}>
                      <FiX size={14} />
                    </Box>
                  </Badge>
                )}
                
                {filters.status !== 'todos' && (
                  <Badge 
                    colorScheme="green" 
                    borderRadius="full" 
                    px={2} 
                    py={1}
                    display="flex"
                    alignItems="center"
                  >
                    Status: {filters.status}
                    <Box as="span" ml={1} cursor="pointer" onClick={() => updateFilter('status', 'todos')}>
                      <FiX size={14} />
                    </Box>
                  </Badge>
                )}
                
                {(filters.dateRange.startDate || filters.dateRange.endDate) && (
                  <Badge 
                    colorScheme="orange" 
                    borderRadius="full" 
                    px={2} 
                    py={1}
                    display="flex"
                    alignItems="center"
                  >
                    Período: {filters.dateRange.startDate?.toLocaleDateString()} - {filters.dateRange.endDate?.toLocaleDateString() || 'Atual'}
                    <Box 
                      as="span" 
                      ml={1} 
                      cursor="pointer" 
                      onClick={() => updateFilter('dateRange', { startDate: null, endDate: null })}
                    >
                      <FiX size={14} />
                    </Box>
                  </Badge>
                )}
              </Flex>
            </Box>
          )}
        </Box>
      </Collapse>
    </Box>
  );
};

export default FilterSection;