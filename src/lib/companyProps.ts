import { Clientes } from './clientsProps';
export interface Empresa {
    id: number;
    nome: string;
    cnpj: string;
    email: string;
    setorAtuacao: string;
    representanteLegal: Clientes;
    telefone: string;
}
