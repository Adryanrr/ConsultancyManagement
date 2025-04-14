import { Clientes } from './clientsProps';
import { Consultores } from './consultantsProps';
import { Empresa } from './companyProps';

export interface Contract {
    id: number;
    cliente: Clientes;
    empresa: Empresa;
    consultor: Consultores;
    tipoConsulta: string;
    dataInicio: string;
    dataFim: string;
    tipoCliente: string;
    paymentMethod: string;
    paymentOption: string;
    valor: number;
    status: string;
}

