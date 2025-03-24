// src/components/dashboard/ActivityLog.jsx
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  Avatar,
  Badge,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  useBreakpointValue,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import { FiDownload, FiChevronRight, FiMoreVertical, FiFilter } from 'react-icons/fi';
import ReportModal from '../common/ReportModal';

const ActivityLog = ({ activities }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedActivity, setSelectedActivity] = useState(null);
  
  const bgColor = useColorModeValue('white', 'gray.700');
  const headerColor = useColorModeValue('gray.700', 'white');
  const thColor = useColorModeValue('gray.500', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const hoverBgColor = useColorModeValue('gray.50', 'gray.700');
  
  // Configurações responsivas
  const isMobile = useBreakpointValue({ base: true, md: false });
  const buttonSize = useBreakpointValue({ base: "xs", md: "sm" });
  const fontSize = useBreakpointValue({ base: "sm", md: "md" });
  const hideColumn = useBreakpointValue({ base: true, md: false });
  const tablePadding = useBreakpointValue({ base: 2, md: 4 });
  
  const handleGenerateReport = () => {
    onOpen();
  };
  
  const handleViewDetails = (activity) => {
    setSelectedActivity(activity);
    console.log('Ver detalhes:', activity);
  };

  // Colunas a exibir baseadas no tamanho da tela
  const getVisibleColumns = () => {
    if (isMobile) {
      return ['HORÁRIO', 'NOME', 'STATUS', 'AÇÕES'];
    }
    return ['HORÁRIO', 'NOME', 'TIPO', 'LOCAL', 'STATUS', 'AÇÕES'];
  };

  const visibleColumns = getVisibleColumns();

  return (
    <>
      <Card bg={bgColor} boxShadow="md" borderRadius="lg">
        <CardHeader p={{ base: 3, md: 4 }}>
          <Flex 
            justify="space-between" 
            align="center" 
            direction={{ base: "column", sm: "row" }}
            gap={{ base: 2, sm: 0 }}
          >
            <Text 
              fontSize={fontSize} 
              fontWeight="600" 
              color={headerColor}
              mb={{ base: 2, sm: 0 }}
            >
              Registro de Atividades Recentes
            </Text>
            
            <Wrap spacing={{ base: 1, md: 2 }} justify={{ base: "center", sm: "flex-end" }}>
              <WrapItem>
                <Button
                  size={buttonSize}
                  leftIcon={<FiDownload size={isMobile ? 12 : 14} />}
                  colorScheme="blue"
                  onClick={handleGenerateReport}
                >
                  Gerar Relatório
                </Button>
              </WrapItem>
              <WrapItem>
                <Button
                  size={buttonSize}
                  rightIcon={<FiChevronRight size={isMobile ? 12 : 14} />}
                  variant="outline"
                  colorScheme="blue"
                >
                  Ver Todos
                </Button>
              </WrapItem>
              <WrapItem>
                <IconButton
                  icon={<FiFilter size={isMobile ? 12 : 18} />}
                  aria-label="Filtrar atividades"
                  variant="ghost"
                  size={buttonSize}
                />
              </WrapItem>
            </Wrap>
          </Flex>
        </CardHeader>

        <CardBody pt={0} overflowX="auto" px={{ base: 1, md: 4 }}>
          <Table variant="simple" size={isMobile ? "sm" : "md"}>
            <Thead>
              <Tr>
                {visibleColumns.includes('HORÁRIO') && (
                  <Th color={thColor} fontWeight="semibold" fontSize="xs" textTransform="uppercase" px={tablePadding} py={tablePadding} borderColor={borderColor}>
                    Horário
                  </Th>
                )}
                {visibleColumns.includes('NOME') && (
                  <Th color={thColor} fontWeight="semibold" fontSize="xs" textTransform="uppercase" px={tablePadding} py={tablePadding} borderColor={borderColor}>
                    Nome
                  </Th>
                )}
                {visibleColumns.includes('TIPO') && (
                  <Th color={thColor} fontWeight="semibold" fontSize="xs" textTransform="uppercase" px={tablePadding} py={tablePadding} borderColor={borderColor}>
                    Tipo
                  </Th>
                )}
                {visibleColumns.includes('LOCAL') && (
                  <Th color={thColor} fontWeight="semibold" fontSize="xs" textTransform="uppercase" px={tablePadding} py={tablePadding} borderColor={borderColor}>
                    Local
                  </Th>
                )}
                {visibleColumns.includes('STATUS') && (
                  <Th color={thColor} fontWeight="semibold" fontSize="xs" textTransform="uppercase" px={tablePadding} py={tablePadding} borderColor={borderColor}>
                    Status
                  </Th>
                )}
                {visibleColumns.includes('AÇÕES') && (
                  <Th color={thColor} fontWeight="semibold" fontSize="xs" textTransform="uppercase" px={tablePadding} py={tablePadding} borderColor={borderColor} width="40px">
                    {!isMobile && "Ações"}
                  </Th>
                )}
              </Tr>
            </Thead>
            <Tbody>
              {activities.map((activity) => (
                <Tr key={activity.id} _hover={{ bg: hoverBgColor }}>
                  {visibleColumns.includes('HORÁRIO') && (
                    <Td px={tablePadding} py={tablePadding} borderColor={borderColor} fontSize={isMobile ? "xs" : "sm"}>
                      {activity.time}
                    </Td>
                  )}
                  {visibleColumns.includes('NOME') && (
                    <Td px={tablePadding} py={tablePadding} borderColor={borderColor}>
                      <HStack spacing={isMobile ? 1 : 3}>
                        <Avatar size={isMobile ? "2xs" : "sm"} name={activity.name} src={activity.avatar} />
                        {!isMobile && <Text fontWeight="medium" fontSize={isMobile ? "xs" : "sm"}>{activity.name}</Text>}
                        {isMobile && <Text fontWeight="medium" fontSize="xs" isTruncated maxW="60px">{activity.name.split(' ')[0]}</Text>}
                      </HStack>
                    </Td>
                  )}
                  {visibleColumns.includes('TIPO') && (
                    <Td px={tablePadding} py={tablePadding} borderColor={borderColor} fontSize={isMobile ? "xs" : "sm"}>
                      {activity.type}
                    </Td>
                  )}
                  {visibleColumns.includes('LOCAL') && (
                    <Td px={tablePadding} py={tablePadding} borderColor={borderColor} fontSize={isMobile ? "xs" : "sm"}>
                      {activity.location}
                    </Td>
                  )}
                  {visibleColumns.includes('STATUS') && (
                    <Td px={tablePadding} py={tablePadding} borderColor={borderColor}>
                      <Badge
                        colorScheme={activity.status === 'ENTROU' ? 'green' : 'red'}
                        px={isMobile ? 1 : 2}
                        py={isMobile ? 0 : 1}
                        borderRadius="md"
                        fontWeight="bold"
                        fontSize={isMobile ? "2xs" : "xs"}
                      >
                        {activity.status}
                      </Badge>
                    </Td>
                  )}
                  {visibleColumns.includes('AÇÕES') && (
                    <Td px={tablePadding} py={tablePadding} borderColor={borderColor}>
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          icon={<FiMoreVertical size={isMobile ? 14 : 16} />}
                          variant="ghost"
                          size={isMobile ? "xs" : "sm"}
                          aria-label="Opções"
                        />
                        <MenuList>
                          <MenuItem onClick={() => handleViewDetails(activity)}>
                            Ver detalhes
                          </MenuItem>
                          <MenuItem>Verificar histórico</MenuItem>
                          <MenuItem>Enviar notificação</MenuItem>
                        </MenuList>
                      </Menu>
                    </Td>
                  )}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>

      <ReportModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ActivityLog;