// src/services/api.js
const ACCESS_TOKEN = '826de2f3234e1aeccc645180ada45d3aacdd73a1';

export const fetchRegistros = async () => {
  try {
    // Caminho relativo - o proxy se encarrega de redirecionar
    const response = await fetch(`/api/registros?access_token=${ACCESS_TOKEN}`);
    
    if (!response.ok) {
      throw new Error(`Erro: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar registros:', error);
    throw error;
  }
};