// src/components/common/EmployeeSearch.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Input,
  List,
  ListItem,
  Text,
  Avatar,
  InputGroup,
  InputLeftElement,
  Spinner,
  Flex,
  Divider,
  useOutsideClick,
  useColorModeValue
} from '@chakra-ui/react';
import { FiSearch, FiUser } from 'react-icons/fi';
import { useDashboard } from '../../contexts/DashboardContext';

const EmployeeSearch = ({ value, onChange, darkMode = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value || '');
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dropdownRef = useRef();
  
  const { dashboardData, rawData } = useDashboard();
  
  // Configurações de cores
  const textColor = darkMode ? "white" : "black";
  const bgColor = darkMode ? "#2D4A74" : "white";
  const hoverBgColor = darkMode ? "#3A5E8C" : "gray.100";
  const borderColor = darkMode ? "#4A6895" : "gray.200";
  const placeholderColor = darkMode ? "whiteAlpha.600" : "gray.400";
  
  // Fechar dropdown quando clicar fora
  useOutsideClick({
    ref: dropdownRef,
    handler: () => setIsOpen(false)
  });
  
  // Extrair lista de funcionários dos dados
  useEffect(() => {
    console.log("Tentando extrair funcionários dos dados:", { rawData, dashboardData });
    setIsLoading(true);
    
    try {
      // Verificação de dados raw
      if (rawData && rawData.data && Array.isArray(rawData.data)) {
        const uniqueEmployees = [];
        const employeeIds = new Set();
        
        rawData.data.forEach(registro => {
          if (registro.pessoaId && registro.pessoa && !employeeIds.has(registro.pessoaId)) {
            employeeIds.add(registro.pessoaId);
            uniqueEmployees.push({
              id: registro.pessoaId,
              name: registro.pessoa.nome,
              status: registro.pessoa.status
            });
          }
        });
        
        // Ordenar por nome
        uniqueEmployees.sort((a, b) => a.name.localeCompare(b.name));
        
        console.log(`Encontrados ${uniqueEmployees.length} funcionários únicos`);
        setEmployees(uniqueEmployees);
        setFilteredEmployees(uniqueEmployees);
      } 
      // Fallback para dados processados se os dados raw não estiverem disponíveis
      else if (dashboardData && dashboardData.recentActivities) {
        const activitiesData = dashboardData.recentActivities;
        const uniqueEmployees = [];
        const employeeIds = new Set();
        
        activitiesData.forEach(activity => {
          if (activity.pessoaId && !employeeIds.has(activity.pessoaId)) {
            employeeIds.add(activity.pessoaId);
            uniqueEmployees.push({
              id: activity.pessoaId,
              name: activity.name,
              status: activity.status === 'ENTROU' ? 'DENTRO' : 'FORA'
            });
          }
        });
        
        uniqueEmployees.sort((a, b) => a.name.localeCompare(b.name));
        
        console.log(`Encontrados ${uniqueEmployees.length} funcionários das atividades recentes`);
        setEmployees(uniqueEmployees);
        setFilteredEmployees(uniqueEmployees);
      }
      // Se não encontrarmos funcionários de nenhuma fonte, criamos alguns fictícios para testes
      else {
        console.log("Usando dados de funcionários fictícios para testes");
        const mockEmployees = [
          { id: 1, name: "João Silva", status: "DENTRO" },
          { id: 2, name: "Maria Santos", status: "FORA" },
          { id: 3, name: "Pedro Oliveira", status: "DENTRO" },
          { id: 4, name: "Ana Souza", status: "FORA" },
          { id: 5, name: "Carlos Pereira", status: "DENTRO" }
        ];
        
        setEmployees(mockEmployees);
        setFilteredEmployees(mockEmployees);
      }
    } catch (error) {
      console.error("Erro ao processar lista de funcionários:", error);
      // Em caso de erro, usar dados fictícios como fallback
      const mockEmployees = [
        { id: 1, name: "João Silva", status: "DENTRO" },
        { id: 2, name: "Maria Santos", status: "FORA" }
      ];
      
      setEmployees(mockEmployees);
      setFilteredEmployees(mockEmployees);
    } finally {
      setIsLoading(false);
    }
  }, [rawData, dashboardData]);
  
  // Filtrar funcionários quando o termo de busca mudar
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredEmployees(employees);
    } else {
      const filtered = employees.filter(employee => 
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEmployees(filtered);
    }
  }, [searchTerm, employees]);
  
  // Atualizar o termo de busca quando o valor externo mudar
  useEffect(() => {
    setSearchTerm(value || '');
  }, [value]);
  
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    onChange(newValue);
  };
  
  const handleInputFocus = () => {
    setIsOpen(true);
  };
  
  const handleSelectEmployee = (employee) => {
    setSearchTerm(employee.name);
    onChange(employee.name);
    setIsOpen(false);
  };

  return (
    <Box position="relative" ref={dropdownRef} w="100%">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <FiSearch color={darkMode ? "white" : "gray.300"} />
        </InputLeftElement>
        <Input
          placeholder="Buscar funcionário..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          bg={bgColor}
          color={textColor}
          borderColor={borderColor}
          _hover={{ borderColor: darkMode ? '#6B89C0' : 'blue.300' }}
          _focus={{ 
            borderColor: darkMode ? '#90CAF9' : 'blue.500',
            boxShadow: `0 0 0 1px ${darkMode ? '#90CAF9' : 'var(--chakra-colors-blue-500)'}`
          }}
          _placeholder={{ color: placeholderColor }}
          size="sm"
        />
      </InputGroup>
      
      {isOpen && (
        <Box
          position="absolute"
          top="100%"
          left="0"
          right="0"
          mt="2px"
          maxH="250px"
          overflowY="auto"
          bg={bgColor}
          borderWidth="1px"
          borderColor={borderColor}
          borderRadius="md"
          boxShadow="md"
          zIndex="dropdown"
        >
          {isLoading ? (
            <Flex justify="center" p={4}>
              <Spinner size="sm" color={darkMode ? "white" : "blue.500"} />
            </Flex>
          ) : filteredEmployees.length === 0 ? (
            <Text p={3} fontSize="sm" color={textColor} opacity="0.8">
              Nenhum funcionário encontrado
            </Text>
          ) : (
            <List spacing={0}>
              {filteredEmployees.map((employee) => (
                <React.Fragment key={employee.id}>
                  <ListItem 
                    px={3} 
                    py={2} 
                    cursor="pointer"
                    _hover={{ bg: hoverBgColor }}
                    onClick={() => handleSelectEmployee(employee)}
                  >
                    <Flex align="center" gap={2}>
                      <Avatar 
                        size="xs" 
                        name={employee.name} 
                        src={`/assets/images/employee${employee.id % 5 + 1}.jpg`}
                      />
                      <Box>
                        <Text fontSize="sm" fontWeight="medium" color={textColor}>
                          {employee.name}
                        </Text>
                        <Text fontSize="xs" color={darkMode ? "whiteAlpha.700" : "gray.500"}>
                          Status: {employee.status === 'DENTRO' ? 'Presente' : 'Ausente'}
                        </Text>
                      </Box>
                    </Flex>
                  </ListItem>
                  <Divider opacity={0.3} />
                </React.Fragment>
              ))}
            </List>
          )}
        </Box>
      )}
    </Box>
  );
};

export default EmployeeSearch;