// src/components/common/UserDetailModal.jsx
import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Flex,
  Text,
  Button,
  Avatar,
  Badge,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  useColorModeValue,
  Skeleton,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { FiDownload } from 'react-icons/fi';
import { formatDate } from '../../utils/formatters';
import { useDashboard } from '../../contexts/DashboardContext';

/**
 * Modal para visualizar detalhes de um funcionário, incluindo seu histórico de entradas e saídas
 */
const UserDetailModal = ({ isOpen, onClose, userId, userName }) => {
  const { getPersonDetails, isLoading } = useDashboard();
  
  // Busca os detalhes da pessoa do contexto do dashboard
  const { person, activities } = getPersonDetails(userId);
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const headerBg = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  
  // Calcular estatísticas do usuário com base nas atividades
  const calculateStats = () => {
    if (!activities || activities.length === 0) {
      return {
        totalHours: 'N/A',
        averageEntry: 'N/A',
        averageExit: 'N/A',
        presentDays: 0,
        absentDays: 0,
        lateCount: 0
      };
    }
    
    // Ordenar atividades por timestamp (mais antigo primeiro)
    const sortedActivities = [...activities].sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );
    
    // Variáveis para cálculos
    let totalMinutosNaEmpresa = 0;
    const entradas = [];
    const saidas = [];
    const diasPresentes = new Set(); // Usamos Set para contar dias únicos
    
    // Processa cada registro para calcular tempo real na empresa
    let entradaAtual = null;
    
    for (const activity of sortedActivities) {
      const timestamp = new Date(activity.timestamp);
      
      // Registra dia presente
      const dia = timestamp.toISOString().split('T')[0];
      diasPresentes.add(dia);
      
      // Coleta horários para médias
      if (activity.type === 'ENTRADA') {
        entradas.push(timestamp);
        entradaAtual = timestamp;
      } else if (activity.type === 'SAIDA' && entradaAtual) {
        saidas.push(timestamp);
        
        // Calcula duração em minutos entre entrada e saída
        const duracao = (timestamp - entradaAtual) / (1000 * 60);
        
        // Adiciona ao total se for uma duração válida (ignoramos entradas/saídas inválidas)
        if (duracao > 0 && duracao < 24 * 60) { // Menos de 24h (para descartar erros)
          totalMinutosNaEmpresa += duracao;
        }
        
        entradaAtual = null; // Reseta entrada atual após calcular
      }
    }
    
    // Calcula horas totais
    const totalHoras = Math.floor(totalMinutosNaEmpresa / 60);
    const totalMinutosRestantes = Math.round(totalMinutosNaEmpresa % 60);
    
    // Calcula média de horário de entrada
    let mediaEntrada = 'N/A';
    if (entradas.length > 0) {
      let totalHorasEntrada = 0;
      let totalMinutosEntrada = 0;
      
      entradas.forEach(entrada => {
        totalHorasEntrada += entrada.getHours();
        totalMinutosEntrada += entrada.getMinutes();
      });
      
      const mediaHorasEntrada = Math.floor(totalHorasEntrada / entradas.length);
      const mediaMinutosEntrada = Math.floor(totalMinutosEntrada / entradas.length);
      
      mediaEntrada = `${String(mediaHorasEntrada).padStart(2, '0')}:${String(mediaMinutosEntrada).padStart(2, '0')}`;
    }
    
    // Calcula média de horário de saída
    let mediaSaida = 'N/A';
    if (saidas.length > 0) {
      let totalHorasSaida = 0;
      let totalMinutosSaida = 0;
      
      saidas.forEach(saida => {
        totalHorasSaida += saida.getHours();
        totalMinutosSaida += saida.getMinutes();
      });
      
      const mediaHorasSaida = Math.floor(totalHorasSaida / saidas.length);
      const mediaMinutosSaida = Math.floor(totalMinutosSaida / saidas.length);
      
      mediaSaida = `${String(mediaHorasSaida).padStart(2, '0')}:${String(mediaMinutosSaida).padStart(2, '0')}`;
    }
    
    return {
      totalHours: `${totalHoras}h${totalMinutosRestantes > 0 ? ` ${totalMinutosRestantes}min` : ''}`,
      averageEntry: mediaEntrada,
      averageExit: mediaSaida,
      presentDays: diasPresentes.size,
      absentDays: 0,  // Não temos dados para calcular absenteísmo
      lateCount: 0    // Não temos horário de referência para calcular atrasos
    };
  };
  
  const userStats = calculateStats();
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent bg={bgColor} maxWidth="800px">
        <ModalHeader 
          bg={headerBg} 
          borderBottomWidth="1px" 
          borderColor={borderColor}
          borderTopRadius="md"
          py={4}
        >
          <Flex align="center" gap={4}>
            <Avatar size="md" name={userName} src={`/assets/images/employee${userId % 5 + 1}.jpg`} />
            <Box>
              <Heading size="md">{userName}</Heading>
              <Text color="gray.500" fontSize="sm">ID: {userId}</Text>
            </Box>
          </Flex>
        </ModalHeader>
        
        <ModalCloseButton />
        
        <ModalBody pt={4} pb={6}>
          {isLoading ? (
            <VStack spacing={4} align="stretch">
              <Skeleton height="100px" />
              <Skeleton height="200px" />
            </VStack>
          ) : !person ? (
            <Alert status="warning">
              <AlertIcon />
              Não foi possível carregar os dados deste funcionário.
            </Alert>
          ) : (
            <>
              {/* Cartão de estatísticas do usuário */}
              <Box mb={6} p={4} bg="gray.50" borderRadius="md" borderWidth="1px" borderColor={borderColor}>
                <Heading size="sm" mb={3}>Resumo de Atividade</Heading>
                <Flex 
                  wrap="wrap" 
                  justify="space-between" 
                  gap={4}
                >
                  <Box>
                    <Text fontSize="sm" color="gray.500">Total de Horas (Estimado)</Text>
                    <Text fontWeight="bold">{userStats.totalHours}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.500">Média de Entrada</Text>
                    <Text fontWeight="bold">{userStats.averageEntry}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.500">Média de Saída</Text>
                    <Text fontWeight="bold">{userStats.averageExit}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.500">Dias Presentes</Text>
                    <Text fontWeight="bold">{userStats.presentDays}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.500">Status Atual</Text>
                    <Badge colorScheme={person.status === 'DENTRO' ? 'green' : 'red'}>
                      {person.status === 'DENTRO' ? 'Na empresa' : 'Fora da empresa'}
                    </Badge>
                  </Box>
                </Flex>
              </Box>
              
              <Heading size="sm" mb={3}>Histórico de Registros</Heading>
              
              {/* Tabela de atividades */}
              {activities.length === 0 ? (
                <Alert status="info">
                  <AlertIcon />
                  Nenhum registro encontrado para este funcionário.
                </Alert>
              ) : (
                <Box overflowX="auto">
                  <Table variant="simple" size="sm">
                    <Thead>
                      <Tr>
                        <Th>Data/Hora</Th>
                        <Th>Tipo</Th>
                        <Th>Local</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {activities.map((activity) => (
                        <Tr key={activity.id}>
                          <Td>
                            <VStack spacing={0} align="flex-start">
                              <Text fontWeight="medium">
                                {formatDate(activity.timestamp, 'dd/MM/yyyy')}
                              </Text>
                              <Text fontSize="xs" color="gray.500">
                                {formatDate(activity.timestamp, 'HH:mm')}
                              </Text>
                            </VStack>
                          </Td>
                          <Td>
                            <Badge
                              colorScheme={activity.type === 'ENTRADA' ? 'green' : 'red'}
                              px={2}
                              py={1}
                              borderRadius="md"
                            >
                              {activity.type}
                            </Badge>
                          </Td>
                          <Td>{activity.location || 'N/A'}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              )}
            </>
          )}
        </ModalBody>

        <ModalFooter borderTopWidth="1px" borderColor={borderColor}>
          <Button 
            mr={3} 
            onClick={onClose} 
            variant="ghost"
          >
            Fechar
          </Button>
          <Button 
            leftIcon={<FiDownload />}
            colorScheme="blue"
            isDisabled={!person || activities.length === 0}
          >
            Exportar Relatório
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserDetailModal;