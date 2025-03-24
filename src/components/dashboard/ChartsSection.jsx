// src/components/dashboard/ChartsSection.jsx
import React from 'react';
import { Grid, GridItem, Box, useBreakpointValue } from '@chakra-ui/react';
import SectorPieChart from './SectorPieChart';
import TendencyChart from './TendencyChart';

const ChartsSection = ({ sectorData, tendencyData }) => {
  // Em mobile, os gráficos ficam empilhados
  const columns = useBreakpointValue({ base: "1fr", md: "repeat(2, 1fr)" });
  
  return (
    <Grid 
      templateColumns={columns}
      gap={{ base: 4, md: 6 }}
    >
      <GridItem>
        <SectorPieChart data={sectorData} />
      </GridItem>
      <GridItem>
        <TendencyChart data={tendencyData} />
      </GridItem>
    </Grid>
  );
};

export default ChartsSection;