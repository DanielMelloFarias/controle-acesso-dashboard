// src/components/layout/MainLayout.jsx
import React, { useState, useEffect } from 'react';
import { Box, Flex, IconButton, useMediaQuery } from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import Sidebar from './Sidebar';
import Header from './Header';

const MainLayout = ({ children }) => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // No mobile, a sidebar sempre começa fechada
  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true);
      setIsSidebarOpen(false);
    } else {
      setIsCollapsed(false);
      setIsSidebarOpen(true);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <Flex minH="100vh" position="relative">
      {/* Sidebar com comportamento diferente em mobile */}
      <Sidebar 
        isCollapsed={isCollapsed} 
        isMobile={isMobile}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar} 
      />
      
      {/* Conteúdo principal */}
      <Box 
        flex="1" 
        overflow="auto"
        transition="margin-left 0.3s ease"
        ml={isMobile ? 0 : (isCollapsed ? "60px" : "280px")}
        width="100%"
      >
        <Header toggleSidebar={toggleSidebar} isMobile={isMobile} />
        
        <Box as="main" p={{ base: 3, md: 6 }}>
          {children}
        </Box>
      </Box>
      
      {/* Overlay para mobile que fecha sidebar quando clicado fora */}
      {isMobile && isSidebarOpen && (
        <Box 
          position="fixed" 
          top="0" 
          left="0" 
          right="0" 
          bottom="0" 
          bg="blackAlpha.600" 
          zIndex="900"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </Flex>
  );
};

export default MainLayout;