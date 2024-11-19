import axios from 'axios';

// Chave de API obtida do arquivo .env
const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

export const api = axios.create({
  baseURL: 'https://api.openai.com/v1', // URL base da API do OpenAI
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_API_KEY}`, // Autorização usando a chave da API
  },
});