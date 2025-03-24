// src/components/dashboard/TendencyChart.jsx
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Flex,
  Text,
  ButtonGroup,
  Button,
  useColorModeValue,
  useBreakpointValue
} from '@chakra-ui/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const TendencyChart = ({ data }) => {
  const [timeRange, setTimeRange] = useState('diario');
  
  const bgColor = useColorModeValue('white', 'gray.700');
  const headingColor = useColorModeValue('gray.700', 'white');
  const expectedColor = "#A0AEC0"; // cinza mais visível
  const actualColor = "#3182CE"; // azul mais vivo
  
  // Configurações responsivas
  const buttonSize = useBreakpointValue({ base: "xs", md: "sm" });
  const fontSize = useBreakpointValue({ base: "sm", md: "md" });
  const chartHeight = useBreakpointValue({ base: 220, md: 280 });
  const barSize = useBreakpointValue({ base: 12, md: 20 });
  const marginRight = useBreakpointValue({ base: 10, md: 30 });
  const tickFontSize = useBreakpointValue({ base: 11, md: 12 });
  const yAxisWidth = useBreakpointValue({ base: 30, md: 40 });
  const legendFontSize = useBreakpointValue({ base: 12, md: 14 });
  
  // Em telas pequenas, filtramos os dados para mostrar menos barras
  const displayData = useBreakpointValue({ 
    base: data.slice(0, 5), // Em mobile, mostramos apenas 5 dias
    md: data // Em desktop, mostramos todos
  });
  
  // Customização do tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box bg="white" p={3} borderRadius="md" boxShadow="md" border="1px solid" borderColor="gray.200">
          <Text fontWeight="bold">{label}</Text>
          <Text color="gray.600">Esperado: {payload[0].value}h</Text>
          <Text color="blue.600">Real: {payload[1].value}h</Text>
          <Text fontSize="sm" mt={1}>
            {payload[1].value > payload[0].value ? 
              `+${(payload[1].value - payload[0].value).toFixed(1)}h que o esperado` : 
              `${(payload[1].value - payload[0].value).toFixed(1)}h que o esperado`}
          </Text>
        </Box>
      );
    }
    return null;
  };

  // Adaptação do componente Legend para evitar o uso de hooks dentro de callbacks
  const customLegendFormatter = (value) => {
    return <span style={{fontSize: legendFontSize}}>{value === 'expected' ? 'Esperado' : 'Real'}</span>;
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
            Tendência de Presença
          </Text>
          <ButtonGroup size={buttonSize} isAttached variant="outline">
            <Button 
              onClick={() => setTimeRange('diario')}
              colorScheme={timeRange === 'diario' ? 'blue' : 'gray'}
              variant={timeRange === 'diario' ? 'solid' : 'outline'}
            >
              Diário
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

      <CardBody>
        <Box height={chartHeight}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={displayData}
              margin={{
                top: 20,
                right: marginRight,
                left: 0,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                dy={10}
                tick={{ fontSize: tickFontSize }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `${value}h`}
                tick={{ fontSize: tickFontSize }}
                width={yAxisWidth}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: 10 }}
                formatter={customLegendFormatter}
              />
              <Bar 
                dataKey="expected" 
                name="Esperado" 
                fill={expectedColor} 
                radius={[4, 4, 0, 0]} 
                barSize={barSize} 
              />
              <Bar 
                dataKey="actual" 
                name="Real" 
                fill={actualColor} 
                radius={[4, 4, 0, 0]} 
                barSize={barSize}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardBody>
    </Card>
  );
};

export default TendencyChart;