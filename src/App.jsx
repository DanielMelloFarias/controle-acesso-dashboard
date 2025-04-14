// src/App.jsx
import { ChakraProvider } from '@chakra-ui/react'
import { FilterProvider } from './contexts/FilterContext'
import { DashboardProvider } from './contexts/DashboardContext'
import MainLayout from './components/layout/MainLayout'
import Dashboard from './components/dashboard/Dashboard'
import DatePickerStyles from './components/common/DatePickerStyles'

import React from 'react';
import { Global } from '@emotion/react';
import theme from './styles/theme';
import globalStyles from './styles/globalStyles';


function App() {
  return (
    <ChakraProvider theme={theme}>
      {/* Estilos globais */}
      <Global styles={globalStyles} />
      <DatePickerStyles />
      
      {/* Providers de contexto */}
      <FilterProvider>
        <DashboardProvider>
          <MainLayout>
            <Dashboard />
          </MainLayout>
        </DashboardProvider>
      </FilterProvider>
    </ChakraProvider>
  );
}

export default App;