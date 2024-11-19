"use client";
import { useState } from "react";
import CardCliente from "@/components/template/CardCliente";

import Image from "next/image";
import {
  FaUser,
  FaUsers,
  FaHeart,
  FaUserCircle,
  FaSearch,
  FaPhoneAlt,
  FaEnvelope,
  FaBriefcase,
  FaMedal,
  FaChevronUp,
  FaChevronDown,
  FaTrash,
  FaEdit,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const filtros = [
  {
    nome: "Total de Usuarios",
    icone: FaUsers,
    quantidade: "250",
    cor: "bg-[#CB3CFF]/20",
    iconeCor: "text-[#CB3CFF]",
  },
  {
    nome: "Novos Usuarios",
    icone: FaUser,
    quantidade: "15",
    cor: "bg-[#FDB52A]/20",
    iconeCor: "text-[#FDB52A]",
  },
  {
    nome: "VIP",
    icone: FaHeart,
    quantidade: "200",
    cor: "bg-[#05C168]/20",
    iconeCor: "text-[#05C168]",
  },
  {
    nome: "Padrão",
    icone: FaUserCircle,
    quantidade: "35",
    cor: "bg-[#086CD9]/20",
    iconeCor: "text-[#086CD9]",
  },
];

const clientes = [
  {
    nome: "João",
    telefone: "999999999",
    email: "joão@mail.com",
    tipo: "VIP",
    fidelidade: "1000",
  },
  {
    nome: "João",
    telefone: "999999999",
    email: "joão@mail.com",
    tipo: "VIP",
    fidelidade: "1000",
  },
  {
    nome: "Tester",
    telefone: "869999999",
    email: "Tester@mail.com",
    tipo: "Padrão",
    fidelidade: "100",
  },
  {
    nome: "João",
    telefone: "999999999",
    email: "joão@mail.com",
    tipo: "VIP",
    fidelidade: "1000",
  },
  {
    nome: "João",
    telefone: "999999999",
    email: "joão@mail.com",
    tipo: "VIP",
    fidelidade: "1000",
  },
  {
    nome: "Tester",
    telefone: "869999999",
    email: "Tester@mail.com",
    tipo: "Padrão",
    fidelidade: "100",
  },
  {
    nome: "João",
    telefone: "999999999",
    email: "joão@mail.com",
    tipo: "VIP",
    fidelidade: "1000",
  },
  {
    nome: "João",
    telefone: "999999999",
    email: "joão@mail.com",
    tipo: "VIP",
    fidelidade: "1000",
  },
  {
    nome: "Tester",
    telefone: "869999999",
    email: "Tester@mail.com",
    tipo: "Padrão",
    fidelidade: "100",
  },
  {
    nome: "João",
    telefone: "999999999",
    email: "joão@mail.com",
    tipo: "VIP",
    fidelidade: "1000",
  },
  {
    nome: "João",
    telefone: "999999999",
    email: "joão@mail.com",
    tipo: "VIP",
    fidelidade: "1000",
  },
  {
    nome: "Tester",
    telefone: "869999999",
    email: "Tester@mail.com",
    tipo: "Padrão",
    fidelidade: "100",
  },
  {
    nome: "João",
    telefone: "999999999",
    email: "joão@mail.com",
    tipo: "VIP",
    fidelidade: "1000",
  },
  {
    nome: "João",
    telefone: "999999999",
    email: "joão@mail.com",
    tipo: "VIP",
    fidelidade: "1000",
  },
  {
    nome: "Tester",
    telefone: "869999999",
    email: "Tester@mail.com",
    tipo: "Padrão",
    fidelidade: "100",
  },
];

const Order = ({
  columnKey,
  onSort,
}: {
  columnKey: string;
  onSort: (key: string, direction: "asc" | "desc") => void;
}) => {
  return (
    <div className="flex flex-col">
      <button onClick={() => onSort(columnKey, "asc")}>
        <FaChevronUp size={12} className="hover:text-slate-500" />
      </button>
      <button onClick={() => onSort(columnKey, "desc")}>
        <FaChevronDown size={12} className="hover:text-slate-500" />
      </button>
    </div>
  );
};

export default function Clientes() {
  const [currentPage, setCurrentPage] = useState(1); // Página atual
  const itemsPerPage = 10; // Limite de itens por página
  const [sortConfig, setSortConfig] = useState<{
    key: keyof (typeof clientes)[0] | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" }); // Configuração de ordenação
  const [searchTerm, setSearchTerm] = useState(""); // Texto de busca
  const [selectedCliente, setSelectedCliente] = useState(null);

  const sortedClientes = [...clientes].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key].toString().toLowerCase();
      const bValue = b[sortConfig.key].toString().toLowerCase();
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const filteredClientes = sortedClientes.filter(
    (cliente) =>
      cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.telefone.includes(searchTerm)
  );

  // Paginação
  const paginatedClientes = filteredClientes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key: any, direction: any) => {
    setSortConfig({ key, direction });
  };

  const handleCardClient = (cliente: any) => {
    setSelectedCliente(cliente);
  };

  const getInitials = (name: string) => {
    const words = name.split(" ");
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    } else if (words.length === 1 && words[0].length >= 2) {
      return words[0].substring(0, 2).toUpperCase();
    } else {
      return name.substring(0, 2).toUpperCase();
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-dark-main flex flex-col h-full w-full p-8 gap-8">
      {/* Modal para exibir o cliente */}
      {selectedCliente && (
        <CardCliente
          cliente={selectedCliente}
          onClose={() => setSelectedCliente(null)}
        />
      )}
      {/* Cartões para o filtro */}
      <div className="flex flex-wrap gap-8 items-center">
        {filtros.map((filtro, index) => (
          <button
            key={index}
            className="flex-1 flex items-center justify-between border dark:bg-darkSecond p-4 rounded-md h-[80px] w-full bg-white dark:border-none"
          >
            <div className="flex flex-row items-center gap-2">
              <div className={`${filtro.cor} rounded-full p-3`}>
                {<filtro.icone className={`${filtro.iconeCor} text-xl`} />}
              </div>
              <div className="flex-col flex xl:items-start justify-items-start">
                <span className="font-medium">{filtro.nome}</span>
                <div className="font-extralight text-sm text-gray-400">
                  {filtro.quantidade}
                </div>
              </div>
            </div>
            <span className="rotate-90 font-bold">...</span>
          </button>
        ))}
        <div className="relative flex flex-1 items-center min-w-[278px]">
          <FaSearch className="absolute left-3 text-gray-400" />
          <input
            className="p-2 pl-10 dark:bg-darkSecond border dark:border-none rounded-sm w-full"
            placeholder="Procurar"
            value={searchTerm} // Valor do estado
            onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o valor do estado
          />
        </div>
      </div>

      {/* Tabela de clientes */}
      <div className="flex flex-1 flex-col border rounded-md bg-white dark:bg-darkSecond dark:border-none">
        <div className="flex justify-between p-6 border-b border-black dark:border-white">
          <h1 className="font-semibold text-2xl text-black dark:text-white">
            Clientes
          </h1>
          <p>
            {filteredClientes.length === 0 ? (
              "Nenhum cliente encontrado/cadastrado"
            ) : (
              <>
                <span className="text-violet-500">
                  {`${(currentPage - 1) * itemsPerPage + 1}-${
                    currentPage * itemsPerPage > filteredClientes.length
                      ? filteredClientes.length
                      : currentPage * itemsPerPage
                  }`}
                </span>{" "}
                clientes de {filteredClientes.length}
              </>
            )}
          </p>
        </div>
        {/* Header e clientes no mesmo grid */}
        <div className="overflow-x-auto ">
          <div className="grid grid-cols-6 items-center p-4 font-semibold text-sm text-black dark:text-white min-w-[800px]">
            <div className="flex gap-2 items-center">
              <FaUser />
              Nome
              <Order columnKey="nome" onSort={handleSort} />
            </div>
            <div className="flex gap-2 items-center">
              <FaPhoneAlt />
              Telefone
              <Order columnKey="telefone" onSort={handleSort} />
            </div>
            <div className="flex gap-2 items-center">
              <FaEnvelope />
              Email
              <Order columnKey="email" onSort={handleSort} />
            </div>
            <div className="flex gap-2 items-center">
              <FaBriefcase />
              Tipo
              <Order columnKey="tipo" onSort={handleSort} />
            </div>
            <div className="flex gap-2 items-center">
              <FaMedal />
              Fidelidade
              <Order columnKey="fidelidade" onSort={handleSort} />
            </div>
            <div className="flex gap-2 justify-center">Ações</div>
          </div>

          {/* Lista de clientes */}
          <div className="flex-1 flex-col min-w-[800px]">
            {paginatedClientes.map((cliente, index) => (
              <div
                key={index}
                className="grid grid-cols-6 items-center p-4 border-t border-black dark:border-white text-sm text-black dark:text-white"
              >
                <button
                  className="flex gap-2 items-center"
                  onClick={() => handleCardClient(cliente)}
                >
                  <Avatar className="h-10 w-10 bg-black dark:text-white">
                    <AvatarFallback>{getInitials(cliente.nome)}</AvatarFallback>
                  </Avatar>
                  <h3>{cliente.nome}</h3>
                </button>
                <div>{cliente.telefone}</div>
                <div>{cliente.email}</div>
                <div>{cliente.tipo}</div>
                <div>GP {cliente.fidelidade}</div>
                <div className="flex gap-2 justify-center">
                  <button className="text-gray-500 hover:text-gray-800">
                    <FaEdit size={15} />
                  </button>
                  <button className="text-gray-500 hover:text-gray-800">
                    <FaTrash size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer da pagina de clientes */}
      <footer className="flex justify-between">
        <p>
          {filteredClientes.length === 0 ? (
            ""
          ) : (
            <>
              <span className="text-violet-500">
                {`${(currentPage - 1) * itemsPerPage + 1}-${
                  currentPage * itemsPerPage > filteredClientes.length
                    ? filteredClientes.length
                    : currentPage * itemsPerPage
                }`}
              </span>{" "}
              clientes de {filteredClientes.length}
            </>
          )}
        </p>

        <div className="flex gap-4 items-center">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className={`px-3 py-1 border rounded-md ${
              currentPage === 1 ? "opacity-20 cursor-not-allowed" : ""
            }`}
          >
            <FaArrowLeft />
          </button>
          <button
            disabled={currentPage * itemsPerPage >= clientes.length}
            onClick={() => setCurrentPage(currentPage + 1)}
            className={`px-3 py-1 border rounded-md ${
              currentPage * itemsPerPage >= clientes.length
                ? "opacity-20 cursor-not-allowed"
                : ""
            }`}
          >
            <FaArrowRight />
          </button>
        </div>
      </footer>
    </div>
  );
}
