export interface Consultores{
    id: number;
    cpf: string;
    nome: string;
    email: string;
    avatar: string;
    telefone: string; // Deve ser 'telefone', e não 'telefonets'
    especializacao: number;
    tipoAtendimento: number;
}