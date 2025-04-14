// src/styles/theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: '#e6f1fb',
      100: '#c6def5',
      200: '#9bc7ee',
      300: '#6eafe7',
      400: '#4c9ce1',
      500: '#3182ce',
      600: '#2b67a9',
      700: '#214d85',
      800: '#183461',
      900: '#0e1c3d',
    },
    secondary: {
      500: '#ffd700',
    },
    success: {
      500: '#48bb78',
    },
    danger: {
      500: '#e53e3e',
    },
  },
  fonts: {
    body: "'Segoe UI', sans-serif",
    heading: "'Segoe UI', sans-serif",
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "semibold",
        borderRadius: "md",
      },
      variants: {
        solid: {
          bg: "brand.500",
          color: "white",
          _hover: {
            bg: "brand.600",
          },
        },
        outline: {
          borderColor: "brand.500",
          color: "brand.500",
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          p: 4,
          borderRadius: "lg",
          bg: "white",
          boxShadow: "sm",
        }
      }
    },
  },
});

export default theme;
