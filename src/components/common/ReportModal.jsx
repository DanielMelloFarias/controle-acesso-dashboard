// src/components/common/ReportModal.jsx
import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Radio,
  RadioGroup,
  Input,
  Select,
  FormControl,
  FormLabel,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import { FiFileText, FiDownload, FiUsers, FiBarChart2 } from 'react-icons/fi';

const ReportModal = ({ isOpen, onClose }) => {
  const [reportType, setReportType] = useState('daily');
  const [format, setFormat] = useState('pdf');
  const [isGenerating, setIsGenerating] = useState(false);
  const toast = useToast();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const optionBgHover = useColorModeValue('gray.50', 'gray.700');

  const reportOptions = [
    {
      id: 'daily',
      title: 'Relatório Diário de Presença',
      description: 'Resumo completo de presenças do dia atual',
      icon: FiFileText
    },
    {
      id: 'productivity',
      title: 'Relatório de Produtividade por Setor',
      description: 'Comparativo de horas trabalhadas por departamento',
      icon: FiBarChart2
    },
    {
      id: 'below_target',
      title: 'Funcionários Abaixo da Meta',
      description: 'Lista de colaboradores com baixa presença',
      icon: FiUsers
    }
  ];

  const handleDownload = () => {
    setIsGenerating(true);
    
    // Simulando o tempo de geração do relatório
    setTimeout(() => {
      setIsGenerating(false);
      onClose();
      
      toast({
        title: "Relatório gerado com sucesso",
        description: `O relatório ${reportOptions.find(opt => opt.id === reportType).title} foi baixado.`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right"
      });
    }, 1500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent bg={bgColor}>
        <ModalHeader>Gerar Relatório</ModalHeader>
        <ModalCloseButton />
        
        <ModalBody>
          <VStack spacing={5} align="stretch">
            <Box>
              <Text fontWeight="medium" mb={3}>Selecione o tipo de relatório:</Text>
              <RadioGroup value={reportType} onChange={setReportType}>
                <VStack spacing={3} align="stretch">
                  {reportOptions.map(option => (
                    <Box
                      key={option.id}
                      as="label"
                      htmlFor={option.id}
                      borderWidth="1px"
                      borderColor={borderColor}
                      borderRadius="md"
                      p={3}
                      cursor="pointer"
                      _hover={{ bg: optionBgHover }}
                      bg={reportType === option.id ? optionBgHover : 'transparent'}
                    >
                      <HStack>
                        <Radio id={option.id} value={option.id} colorScheme="blue" />
                        <Box ml={3} flex="1">
                          <HStack>
                            <Box
                              p={2}
                              borderRadius="md"
                              bg="blue.50"
                              color="blue.500"
                              fontSize="lg"
                            >
                              <option.icon />
                            </Box>
                            <Box>
                              <Text fontWeight="medium">{option.title}</Text>
                              <Text fontSize="sm" color="gray.500">
                                {option.description}
                              </Text>
                            </Box>
                          </HStack>
                        </Box>
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              </RadioGroup>
            </Box>

            <FormControl>
              <FormLabel>Formato do arquivo</FormLabel>
              <Select value={format} onChange={(e) => setFormat(e.target.value)}>
                <option value="pdf">PDF</option>
                <option value="excel">Excel (XLSX)</option>
                <option value="csv">CSV</option>
              </Select>
            </FormControl>

            {reportType === 'daily' && (
              <FormControl>
                <FormLabel>Data</FormLabel>
                <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
              </FormControl>
            )}

            {reportType === 'below_target' && (
              <FormControl>
                <FormLabel>Limite de horas mínimo (%)</FormLabel>
                <Input type="number" defaultValue={80} min={1} max={100} />
              </FormControl>
            )}
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button 
            leftIcon={<FiDownload />} 
            colorScheme="blue" 
            onClick={handleDownload}
            isLoading={isGenerating}
            loadingText="Gerando..."
          >
            Baixar Relatório
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReportModal;