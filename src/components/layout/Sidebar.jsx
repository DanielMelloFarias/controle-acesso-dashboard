// src/components/layout/Sidebar.jsx
import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Input,
  Select,
  Button,
  Flex,
  IconButton,
  Image,
  FormControl,
  FormLabel,
  Collapse,
  Tooltip,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight, FiUser, FiCalendar, FiGrid, FiCheck } from 'react-icons/fi';
import { useFilter } from '../../contexts/FilterContext';
import DateRangePicker from '../common/DateRangePicker';

const Sidebar = ({ isCollapsed, toggleSidebar, isMobile, isOpen }) => {
  const { filters, updateFilter, resetFilters } = useFilter();

  const handleEmployeeChange = (e) => {
    updateFilter('employee', e.target.value);
  };

  const handleDepartmentChange = (e) => {
    updateFilter('department', e.target.value);
  };

  const handleStatusChange = (e) => {
    updateFilter('status', e.target.value);
  };

  const handleDateRangeChange = (dateRange) => {
    updateFilter('dateRange', dateRange);
  };

  const handleApplyFilters = () => {
    console.log('Filtros aplicados:', filters);
    // Fechar sidebar em mobile após aplicar filtros
    if (isMobile) {
      toggleSidebar();
    }
  };

  // Conteúdo dos filtros - reutilizado em ambos os modos
  const filterContent = (
    <>
      <Text
        textTransform="uppercase"
        fontSize="sm"
        fontWeight="bold"
        color="#A0B8D9"
        letterSpacing="wider"
        mb={4}
      >
        FILTROS AVANÇADOS
      </Text>

      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel fontSize="sm" mb={1} color="white">Funcionário</FormLabel>
          <Input
            placeholder="Busca rápida..."
            size="sm"
            value={filters.employee}
            onChange={handleEmployeeChange}
            bg="#2D4A74"
            color="white"
            borderColor="#4A6895"
            _hover={{ borderColor: '#6B89C0' }}
            _focus={{ borderColor: '#90CAF9', boxShadow: '0 0 0 1px #90CAF9' }}
            _placeholder={{ color: 'whiteAlpha.600' }}
          />
        </FormControl>

        <FormControl>
          <FormLabel fontSize="sm" mb={1} color="white">Período</FormLabel>
          <DateRangePicker 
            startDate={filters.dateRange.startDate}
            endDate={filters.dateRange.endDate}
            onChange={handleDateRangeChange}
            bgColor="#2D4A74"
            textColor="white"
            borderColor="#4A6895"
            isMobile={isMobile}
          />
        </FormControl>

        <FormControl>
          <FormLabel fontSize="sm" mb={1} color="white">Setor/Departamento</FormLabel>
          <Select
            value={filters.department}
            onChange={handleDepartmentChange}
            size="sm"
            bg="#2D4A74"
            color="white"
            borderColor="#4A6895"
            _hover={{ borderColor: '#6B89C0' }}
            _focus={{ borderColor: '#90CAF9', boxShadow: '0 0 0 1px #90CAF9' }}
          >
            <option value="todos" style={{backgroundColor: "#1A365D", color: "white"}}>Todos os Setores</option>
            <option value="administrativo" style={{backgroundColor: "#1A365D", color: "white"}}>Administrativo</option>
            <option value="saude" style={{backgroundColor: "#1A365D", color: "white"}}>Saúde</option>
            <option value="operacional" style={{backgroundColor: "#1A365D", color: "white"}}>Operacional</option>
            <option value="suporte" style={{backgroundColor: "#1A365D", color: "white"}}>Suporte</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel fontSize="sm" mb={1} color="white">Status</FormLabel>
          <Select
            value={filters.status}
            onChange={handleStatusChange}
            size="sm"
            bg="#2D4A74"
            color="white"
            borderColor="#4A6895"
            _hover={{ borderColor: '#6B89C0' }}
            _focus={{ borderColor: '#90CAF9', boxShadow: '0 0 0 1px #90CAF9' }}
          >
            <option value="todos" style={{backgroundColor: "#1A365D", color: "white"}}>Todos</option>
            <option value="presente" style={{backgroundColor: "#1A365D", color: "white"}}>Presente</option>
            <option value="ausente" style={{backgroundColor: "#1A365D", color: "white"}}>Ausente</option>
            <option value="atrasado" style={{backgroundColor: "#1A365D", color: "white"}}>Atrasado</option>
          </Select>
        </FormControl>

        <Button
          mt={2}
          colorScheme="blue"
          size="md"
          w="full"
          onClick={handleApplyFilters}
          bg="#3182CE"
          _hover={{ bg: "#2B6CB0" }}
        >
          Aplicar Filtros
        </Button>
      </VStack>
    </>
  );

  // Para dispositivos móveis, usamos Drawer em vez de sidebar
  if (isMobile) {
    return (
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={toggleSidebar}
        size="full"
      >
        <DrawerOverlay />
        <DrawerContent bg="#1A365D" color="white">
          <DrawerCloseButton color="white" />
          <DrawerHeader borderBottomWidth="1px" borderColor="whiteAlpha.300">
            <Flex align="center" gap={3}>
              <Box bg="white" p={2} borderRadius="md">
                <Image src="/logo.png" alt="Logo" fallbackSrc="https://via.placeholder.com/30" boxSize="30px" />
              </Box>
              <Heading size="md" fontWeight="semibold">ControleAcesso</Heading>
            </Flex>
          </DrawerHeader>
          <DrawerBody py={4}>
            {filterContent}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  }

  // Para desktop, mantemos a sidebar
  return (
    <Box
      as="aside"
      position="fixed"
      left="0"
      height="100vh"
      bg="#1A365D"
      color="white"
      p={isCollapsed ? 2 : 5}
      width={isCollapsed ? "60px" : "280px"}
      transition="all 0.3s ease"
      zIndex="1000"
      overflowX="hidden"
      overflowY={isCollapsed ? "hidden" : "auto"}
    >
      {/* Cabeçalho do Sidebar */}
      <Flex justify={isCollapsed ? "center" : "space-between"} align="center" mb={6}>
        {!isCollapsed && (
          <>
            <Flex align="center" gap={3}>
              <Box bg="white" p={2} borderRadius="md">
                <Image src="/logo.png" alt="Logo" fallbackSrc="https://via.placeholder.com/30" boxSize="30px" />
              </Box>
              <Heading size="md" fontWeight="semibold">ControleAcesso</Heading>
            </Flex>
          </>
        )}

        {isCollapsed && (
          <Box bg="white" p={2} borderRadius="md" mb={2}>
            <Image src="/logo.png" alt="Logo" fallbackSrc="https://via.placeholder.com/30" boxSize="30px" />
          </Box>
        )}

        <IconButton
          icon={isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
          aria-label={isCollapsed ? "Expandir sidebar" : "Recolher sidebar"}
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          position={isCollapsed ? "relative" : "absolute"}
          right={isCollapsed ? "auto" : "5px"}
          top={isCollapsed ? "auto" : "5px"}
          color="white"
          _hover={{ bg: "whiteAlpha.200" }}
        />
      </Flex>

      {/* Conteúdo do Sidebar - visível apenas quando expandido */}
      <Collapse in={!isCollapsed} animateOpacity>
        {filterContent}
      </Collapse>

      {/* Ícones de atalho visíveis apenas quando recolhido */}
      {isCollapsed && (
        <VStack spacing={4} align="center" mt={10}>
          <Tooltip label="Filtrar por funcionário" placement="right" hasArrow>
            <IconButton
              icon={<FiUser />}
              aria-label="Filtrar por funcionário"
              variant="ghost"
              color="white"
              _hover={{ bg: "whiteAlpha.200" }}
            />
          </Tooltip>
          
          <Tooltip label="Filtrar por período" placement="right" hasArrow>
            <IconButton
              icon={<FiCalendar />}
              aria-label="Filtrar por período"
              variant="ghost"
              color="white"
              _hover={{ bg: "whiteAlpha.200" }}
            />
          </Tooltip>
          
          <Tooltip label="Filtrar por setor" placement="right" hasArrow>
            <IconButton
              icon={<FiGrid />}
              aria-label="Filtrar por setor"
              variant="ghost"
              color="white"
              _hover={{ bg: "whiteAlpha.200" }}
            />
          </Tooltip>
          
          <Tooltip label="Aplicar filtros" placement="right" hasArrow>
            <IconButton
              icon={<FiCheck />}
              aria-label="Aplicar filtros"
              colorScheme="blue"
              variant="solid"
              size="sm"
              mt={6}
            />
          </Tooltip>
        </VStack>
      )}
    </Box>
  );
};

export default Sidebar;