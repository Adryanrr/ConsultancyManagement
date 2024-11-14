export interface Clientes {
  id: number;
  nome: string;
  email: string;
  avatar: string;
  cpf: string;
  telefone: string; // Deve ser 'telefone', e não 'telefonets'
}