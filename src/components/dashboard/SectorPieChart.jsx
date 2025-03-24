// src/components/dashboard/SectorPieChart.jsx - Ajustes móveis
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Flex,
  Text,
  VStack,
  HStack,
  Stat,
  StatNumber,
  StatLabel,
  Badge,
  ButtonGroup,
  Button,
  useColorModeValue,
  useBreakpointValue
} from '@chakra-ui/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { FiTrendingUp } from 'react-icons/fi';

const SectorPieChart = ({ data }) => {
  const [timeRange, setTimeRange] = useState('hoje');
  const { totalEmployees, productivity, departments } = data;

  const bgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const headingColor = useColorModeValue('gray.700', 'white');
  const badgeBg = useColorModeValue('green.50', 'green.900');
  const badgeColor = useColorModeValue('green.600', 'green.200');
  
  // Tamanho do gráfico responsivo
  const chartSize = useBreakpointValue({ base: "140px", md: "180px" });
  const buttonSize = useBreakpointValue({ base: "xs", md: "sm" });
  const fontSize = useBreakpointValue({ base: "sm", md: "md" });
  const statFontSize = useBreakpointValue({ base: "2xl", md: "3xl" });
  const legendDirection = useBreakpointValue({ base: "row", md: "column" });
  const legendWrap = useBreakpointValue({ base: "wrap", md: "nowrap" });

  // Cores fixas para os departamentos
  const departmentColors = {
    'Administrativo': '#3182CE', // azul
    'Saúde': '#E53E3E',         // vermelho
    'Operacional': '#48BB78',   // verde
    'Suporte': '#ECC94B'        // amarelo
  };

  // Formatando os dados para o gráfico de pizza com cores definidas
  const chartData = departments.map(dept => ({
    name: dept.name,
    value: dept.percentage,
    color: departmentColors[dept.name] || '#CBD5E0' // cor padrão caso não encontre
  }));

  // Customização do tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Box bg={bgColor} p={3} borderRadius="md" boxShadow="md">
          <Text fontWeight="bold">{payload[0].name}</Text>
          <Text>{payload[0].value}% dos funcionários</Text>
        </Box>
      );
    }
    return null;
  };

  return (
    <Card bg={bgColor} boxShadow="md" borderRadius="lg" height="100%">
      <CardHeader p={{ base: 3, md: 4 }}>
        <Flex 
          justify="space-between" 
          align="center"
          direction={{ base: "column", sm: "row" }}
          gap={{ base: 2, sm: 0 }}
        >
          <Text fontSize={fontSize} fontWeight="600" color={headingColor} mb={{ base: 2, sm: 0 }}>
            Análise por Setor
          </Text>
          <ButtonGroup size={buttonSize} isAttached variant="outline">
            <Button 
              onClick={() => setTimeRange('hoje')}
              colorScheme={timeRange === 'hoje' ? 'blue' : 'gray'}
              variant={timeRange === 'hoje' ? 'solid' : 'outline'}
            >
              Hoje
            </Button>
            <Button 
              onClick={() => setTimeRange('semanal')}
              colorScheme={timeRange === 'semanal' ? 'blue' : 'gray'}
              variant={timeRange === 'semanal' ? 'solid' : 'outline'}
            >
              Semanal
            </Button>
            <Button 
              onClick={() => setTimeRange('mensal')}
              colorScheme={timeRange === 'mensal' ? 'blue' : 'gray'}
              variant={timeRange === 'mensal' ? 'solid' : 'outline'}
            >
              Mensal
            </Button>
          </ButtonGroup>
        </Flex>
      </CardHeader>

      <CardBody pt={0}>
        <VStack spacing={4} align="center">
          {/* Total de funcionários no topo */}
          <Stat textAlign="center">
            <StatNumber fontSize={statFontSize}>{totalEmployees}</StatNumber>
            <StatLabel fontSize="sm" color={textColor}>Total Funcionários</StatLabel>
          </Stat>

          {/* Gráfico de pizza com legenda */}
          <Flex 
            w="100%" 
            justify="space-between" 
            align="center" 
            direction={{ base: "column", md: "row" }}
            gap={4}
          >
            <Box width={chartSize} height={chartSize}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={chartSize === "140px" ? 60 : 80}
                    fill="#8884d8"
                    paddingAngle={1}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </Box>

            {/* Legenda - flexível para mobile */}
            <Flex 
              direction={legendDirection} 
              flexWrap={legendWrap} 
              gap={{ base: 2, md: 2 }}
              justify="center"
              mt={{ base: 2, md: 0 }}
            >
              {departments.map((dept, index) => (
                <HStack key={index} minW={{ base: "120px", md: "auto" }}>
                  <Box 
                    w="12px" 
                    h="12px" 
                    borderRadius="full" 
                    bg={departmentColors[dept.name] || '#CBD5E0'}
                  />
                  <Text fontSize="sm">
                    {dept.name} ({dept.percentage}%)
                  </Text>
                </HStack>
              ))}
            </Flex>
          </Flex>

          {/* Badge de produtividade */}
          <Badge
            display="flex"
            alignItems="center"
            px={3}
            py={2}
            borderRadius="full"
            bg="green.100"
            color="green.700"
          >
            <FiTrendingUp style={{ marginRight: '4px' }} />
            Produtividade: {productivity.value} {productivity.comparison}
          </Badge>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default SectorPieChart;