// src/App.jsx
import { ChakraProvider } from '@chakra-ui/react'
import { FilterProvider } from './contexts/FilterContext'
import { DashboardProvider } from './contexts/DashboardContext'
import MainLayout from './components/layout/MainLayout'
import Dashboard from './components/dashboard/Dashboard'
import DatePickerStyles from './components/common/DatePickerStyles'

function App() {
  return (
    <ChakraProvider>
      {/* Adiciona os estilos globais para o DatePicker */}
      <DatePickerStyles />
      
      <FilterProvider>
        <DashboardProvider>
          <MainLayout>
            <Dashboard />
          </MainLayout>
        </DashboardProvider>
      </FilterProvider>
    </ChakraProvider>
  )
}

export default App