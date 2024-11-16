"use client";
import { useState } from "react";
import CardProjetos from "@/components/template/CardProjetos";

import Image from "next/image";
import {
  FaSearch,
  FaChevronUp,
  FaChevronDown,
  FaTrash,
  FaEdit,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

type StatusType = "Finalizado" | "Em Curso" | "Em Espera";

const empresas = [
  {
    nome: "João",
    valor: "500",
    status: "Em Espera",
    prazo: "10/2026",
    consultor: "teste",
  },
  {
    nome: "ZJoão",
    valor: "1600",
    status: "Finalizado",
    prazo: "22/2025",
  },
  {
    nome: "CJoze",
    valor: "100",
    status: "Em Curso",
    prazo: "10/2025",
  },
  {
    nome: "BJoze",
    valor: "100",
    status: "Em Curso",
    prazo: "10/2025",
  },
  {
    nome: "AJoze",
    valor: "100",
    status: "Em Espera",
    prazo: "10/2025",
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

const statusColors = {
  Finalizado: "bg-[#408E5D] text-white",
  "Em Curso": "bg-[#A16207] text-white",
  "Em Espera": "bg-[#6B7280] text-white",
};
const pointColor = {
  Finalizado: "border-[#4ADE80]",
  "Em Curso": "border-[#EAB308]",
  "Em Espera": "border-[#D1D5DB]",
};

export default function Projetos() {
  const [currentPage, setCurrentPage] = useState(1); // Página atual
  const itemsPerPage = 10; // Limite de itens por página
  const [sortConfig, setSortConfig] = useState<{
    key: keyof (typeof empresas)[0] | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" }); // Configuração de ordenação
  const [searchTerm, setSearchTerm] = useState(""); // Texto de busca
  const [selectedCliente, setSelectedCliente] = useState(null);

  const sortedEmpresas = [...empresas].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (sortConfig.key === "valor") {
        // Comparação numérica para o campo "valor"
        return sortConfig.direction === "asc"
          ? Number(aValue) - Number(bValue)
          : Number(bValue) - Number(aValue);
      }

      // Comparação para strings
      const aString = aValue?.toString().toLowerCase() || "";
      const bString = bValue?.toString().toLowerCase() || "";
      if (aString < bString) return sortConfig.direction === "asc" ? -1 : 1;
      if (aString > bString) return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const filteredEmpresas = sortedEmpresas.filter(
    (empresa) =>
      empresa.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empresa.valor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empresa.status.includes(searchTerm)
  );

  // Paginação
  const paginatedEmpresas = filteredEmpresas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key: any, direction: any) => {
    setSortConfig({ key, direction });
  };

  const handleCardClient = (cliente: any) => {
    setSelectedCliente(cliente);
  };

  return (
    <div className="bg-slate-50 dark:bg-dark-main flex flex-col h-full w-full p-8 gap-8">
      {/* Modal para exibir o cliente */}
      {selectedCliente && (
        <CardProjetos
          projeto={selectedCliente}
          onClose={() => setSelectedCliente(null)}
        />
      )}

      {/* Tabela de clientes */}
      <div className="flex flex-1 flex-col border rounded-md bg-white dark:bg-darkSecond dark:border-none">
        <div className="overflow-x-auto ">
          <div className="flex justify-between p-6 border-b border-black dark:border-white">
            <h1 className="font-semibold text-2xl text-black dark:text-white">
              Projetos
            </h1>

            <div className="relative flex border rounded-lg items-center min-w-[278px]">
              <FaSearch className="absolute left-3 text-gray-400" />
              <input
                className="p-2 pl-10 dark:bg-darkMain border dark:border-none rounded-sm w-full"
                placeholder="Procurar"
                value={searchTerm} // Valor do estado
                onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o valor do estado
              />
            </div>
          </div>
          {/* Header e clientes no mesmo grid */}
          <div className="grid grid-cols-5 items-center p-4 font-semibold text-sm text-black dark:text-white min-w-[800px]">
            <div className="flex gap-2 items-center">
              Empresas
              <Order columnKey="nome" onSort={handleSort} />
            </div>
            <div className="flex gap-2 items-center">
              Valor
              <Order columnKey="valor" onSort={handleSort} />
            </div>
            <div className="flex gap-2 items-center">Status</div>

            <div className="flex gap-2 items-center">Prazo</div>
            <div className="flex gap-2 justify-center"></div>
          </div>

          {/* Lista de clientes */}
          <div className="flex-1 flex-col min-w-[800px]">
            {paginatedEmpresas.map((empresa, index) => (
              <div
                key={index}
                className="grid grid-cols-5 items-center p-4 border-t border-black dark:border-white text-sm text-black dark:text-white"
              >
                <button
                  className="flex gap-2 items-center"
                  onClick={() => handleCardClient(empresa)}
                >
                  <Image
                    src="/assets/Gengar4k.jpg"
                    alt="Cliente"
                    width={40}
                    height={30}
                    className="rounded-full"
                  />
                  <h3>{empresa.nome}</h3>
                </button>

                <div>R$ {empresa.valor}</div>
                <div
                  className={`w-24 items-center flex flex-row gap-1 text-center justify-center text-sm font-semibold text-gray-500 border rounded-md p-2 ${
                    statusColors[empresa.status as StatusType]
                  }`}
                >
                  <div
                    className={`border-[3px] rounded-full items-center ${
                      pointColor[empresa.status as StatusType]
                    }`}
                  ></div>
                  {empresa.status}
                </div>
                <div>{empresa.prazo}</div>

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
          {filteredEmpresas.length === 0 ? (
            ""
          ) : (
            <>
              <span className="text-violet-500">
                {`${(currentPage - 1) * itemsPerPage + 1}-${
                  currentPage * itemsPerPage > filteredEmpresas.length
                    ? filteredEmpresas.length
                    : currentPage * itemsPerPage
                }`}
              </span>{" "}
              clientes de {filteredEmpresas.length}
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
            disabled={currentPage * itemsPerPage >= empresas.length}
            onClick={() => setCurrentPage(currentPage + 1)}
            className={`px-3 py-1 border rounded-md ${
              currentPage * itemsPerPage >= empresas.length
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
