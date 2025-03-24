// src/components/dashboard/MetricCard.jsx
import React from 'react';
import { Box, Flex, Text, Icon, Stat, StatNumber, StatHelpText, StatArrow, keyframes, useColorModeValue, useBreakpointValue } from '@chakra-ui/react';

const pulseKeyframes = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.02); opacity: 0.5; }
  100% { transform: scale(1); opacity: 1; }
`;

const MetricCard = ({ 
  title, 
  value, 
  percentage, 
  trend, 
  comparison, 
  icon, 
  colorScheme = 'blue',
  alert = false,
  iconSize = 4  // Tamanho do ícone (opcional, padrão é 4)
}) => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const iconBgColor = useColorModeValue(`${colorScheme}.50`, `${colorScheme}.900`);
  const iconColor = useColorModeValue(`${colorScheme}.500`, `${colorScheme}.200`);
  const borderColor = alert ? `${colorScheme}.500` : 'transparent';
  const pulseAnimation = alert ? `${pulseKeyframes} 1.5s infinite` : 'none';
  
  // Configurações responsivas
  const fontSize = useBreakpointValue({ base: "xs", md: "sm" });
  const valueFontSize = useBreakpointValue({ base: "xl", md: "2xl" });
  const iconBoxSize = useBreakpointValue({ base: 7, md: 8 });
  const padding = useBreakpointValue({ base: 3, md: 4 });

  return (
    <Box
      bg={bgColor}
      p={padding}
      borderRadius="lg"
      boxShadow="md"
      position="relative"
      borderWidth={alert ? '2px' : '0'}
      borderColor={borderColor}
      _after={alert ? {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 'lg',
        animation: pulseAnimation,
        border: `2px solid ${borderColor}`,
        pointerEvents: 'none',
      } : {}}
    >
      <Flex justify="space-between" mb={2}>
        <Text fontSize={fontSize} color="gray.500" fontWeight="medium">
          {title}
        </Text>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg={iconBgColor}
          color={iconColor}
          borderRadius="md"
          w={iconBoxSize}
          h={iconBoxSize}
        >
          <Icon as={icon} boxSize={iconSize} />
        </Box>
      </Flex>
      
      <Stat>
        <StatNumber fontSize={valueFontSize} fontWeight="bold">
          {value}
        </StatNumber>
        {(percentage || comparison) && (
          <StatHelpText mb={0} fontSize={fontSize}>
            {percentage && (
              <>
                <StatArrow type={trend} />
                <Text as="span" fontWeight="semibold" mr={1}>
                  {percentage}%
                </Text>
              </>
            )}
            {comparison}
          </StatHelpText>
        )}
      </Stat>
    </Box>
  );
};

export default MetricCard;