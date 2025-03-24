// src/components/common/Button.jsx
import React from 'react';
import {
  Button as ChakraButton,
  useColorModeValue
} from '@chakra-ui/react';

/**
 * Componente de botão personalizado que estende o Button do Chakra UI
 * com estilos consistentes para toda a aplicação.
 * 
 * @param {Object} props - Propriedades do botão
 * @param {string} [props.variant='solid'] - Variante do botão (solid, outline, ghost, link)
 * @param {string} [props.size='md'] - Tamanho do botão (xs, sm, md, lg)
 * @param {string} [props.colorScheme='blue'] - Esquema de cores do botão
 * @param {React.ReactNode} [props.leftIcon] - Ícone à esquerda do texto
 * @param {React.ReactNode} [props.rightIcon] - Ícone à direita do texto
 * @param {boolean} [props.isFullWidth=false] - Se o botão deve ocupar toda a largura disponível
 * @param {boolean} [props.isLoading=false] - Se o botão deve mostrar estado de carregamento
 * @param {boolean} [props.isDisabled=false] - Se o botão deve estar desabilitado
 * @param {Function} props.onClick - Função a ser chamada quando o botão for clicado
 * @param {React.ReactNode} props.children - Conteúdo do botão
 */
const Button = ({ 
  variant = 'solid', 
  size = 'md', 
  colorScheme = 'blue',
  leftIcon,
  rightIcon,
  isFullWidth = false,
  isLoading = false,
  isDisabled = false,
  onClick,
  children,
  ...rest
}) => {
  // Cores customizadas baseadas no tema
  const solidBg = useColorModeValue(`${colorScheme}.500`, `${colorScheme}.400`);
  const solidHoverBg = useColorModeValue(`${colorScheme}.600`, `${colorScheme}.500`);
  const solidActiveBg = useColorModeValue(`${colorScheme}.700`, `${colorScheme}.600`);
  
  const outlineBorderColor = useColorModeValue(`${colorScheme}.500`, `${colorScheme}.400`);
  const outlineColor = useColorModeValue(`${colorScheme}.500`, `${colorScheme}.400`);
  const outlineHoverBg = useColorModeValue(`${colorScheme}.50`, `${colorScheme}.900`);

  // Configurações condicionais baseadas na variante
  const variantProps = variant === 'solid' 
    ? {
        bg: solidBg,
        color: 'white',
        _hover: { bg: solidHoverBg },
        _active: { bg: solidActiveBg }
      }
    : variant === 'outline'
    ? {
        borderColor: outlineBorderColor,
        color: outlineColor,
        _hover: { bg: outlineHoverBg }
      }
    : {}; // Para outras variantes, usamos as configurações padrão do Chakra

  return (
    <ChakraButton
      variant={variant}
      size={size}
      colorScheme={colorScheme}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      isFullWidth={isFullWidth}
      isLoading={isLoading}
      isDisabled={isDisabled}
      onClick={onClick}
      borderRadius="md"
      fontWeight="semibold"
      transition="all 0.2s"
      {...variantProps}
      {...rest}
    >
      {children}
    </ChakraButton>
  );
};

export default Button;