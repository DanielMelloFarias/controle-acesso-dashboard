// src/components/layout/Header.jsx
import React from 'react';
import { 
  Box, 
  Flex, 
  Heading, 
  IconButton, 
  Avatar, 
  Badge, 
  Tooltip,
  useBreakpointValue
} from '@chakra-ui/react';
import { FiBell, FiRefreshCw, FiMenu } from 'react-icons/fi';
import { useDashboard } from '../../contexts/DashboardContext';

const Header = ({ toggleSidebar, isMobile }) => {
  const { refreshData } = useDashboard();
  const headingSize = useBreakpointValue({ base: "md", md: "lg" });

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      py={3}
      px={{ base: 3, md: 6 }}
      bg="white"
      borderBottomWidth="1px"
      borderBottomColor="gray.200"
      position="sticky"
      top="0"
      zIndex="10"
      h={{ base: "60px", md: "auto" }}
    >
      <Flex align="center">
        {isMobile && (
          <IconButton
            icon={<FiMenu />}
            variant="ghost"
            fontSize="20px"
            mr={3}
            aria-label="Abrir menu"
            onClick={toggleSidebar}
          />
        )}
        <Heading as="h1" size={headingSize} fontWeight="600" noOfLines={1}>
          Visão Geral
        </Heading>
      </Flex>

      <Flex align="center" gap={{ base: 2, md: 4 }}>
        <Tooltip label="Atualizar dados">
          <IconButton
            aria-label="Atualizar dados"
            icon={<FiRefreshCw />}
            variant="ghost"
            onClick={refreshData}
            size={isMobile ? "sm" : "md"}
          />
        </Tooltip>
        
        <Box position="relative">
          <IconButton
            aria-label="Notificações"
            icon={<FiBell />}
            variant="ghost"
            size={isMobile ? "sm" : "md"}
          />
          <Badge
            position="absolute"
            top="-2px"
            right="-2px"
            colorScheme="red"
            borderRadius="full"
            w={{ base: 3, md: 4 }}
            h={{ base: 3, md: 4 }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="xs"
          >
            2
          </Badge>
        </Box>

        <Avatar size={isMobile ? "xs" : "sm"} src="https://bit.ly/dan-abramov" cursor="pointer" />
      </Flex>
    </Flex>
  );
};

export default Header;