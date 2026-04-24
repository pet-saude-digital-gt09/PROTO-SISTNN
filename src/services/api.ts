import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // Importante para enviar cookies de sessão do Flask
});

// Opcional: Adicionar interceptores de erro/auth
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Caso 401, o ideal é deslogar o usuário ou redirecionar
      console.log('Não autorizado, redirecionando...');
      // Poderia despachar um evento, etc.
    }
    return Promise.reject(error);
  }
);
