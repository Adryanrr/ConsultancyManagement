"use client";
import { Consultores } from "@/lib/consultantsProps";
import { useState, useEffect } from "react";
import CardProjetos from "@/components/template/CardProjetos";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  FaSearch,
  FaChevronUp,
  FaChevronDown,
  FaTrash,
  FaEdit,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";


//   id: number;
//   empresa: Empresa;
//   cliente: Clientes;
//   consultor: Consultores;
//   tipoConsulta: string;
//   dataInicio: string;
//   dataFim: string;
//   tipoCliente: string;
//   paymentMethod: string;
//   paymentOption: string;
//   valor: number;
//   status: string;

interface Contrato {
  id: number;
  empresa: {
    nome: string;
  };
  consultor: Consultores;
  tipoConsulta: string;
  status: "Finalizado" | "Em Curso" | "Em Espera";
  dataFim: string;
}

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

const Order = ({
  columnKey,
  onSort,
}: {
  columnKey: keyof Contrato;
  onSort: (key: keyof Contrato, direction: "asc" | "desc") => void;
}) => (
  <div className="flex flex-col">
    <button onClick={() => onSort(columnKey, "asc")}>
      <FaChevronUp size={12} className="hover:text-slate-500" />
    </button>
    <button onClick={() => onSort(columnKey, "desc")}>
      <FaChevronDown size={12} className="hover:text-slate-500" />
    </button>
  </div>
);

export default function Projetos() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Contrato | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCliente, setSelectedCliente] = useState<Contrato | null>(null);
  const [contratos, setContratos] = useState<Contrato[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContratos = async () => {
      try {
        const response = await fetch("http://localhost:8080/contratos");
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setContratos(data);
      } catch (error) {
        console.error("Erro ao buscar contratos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContratos();
  }, []);

  const sortedContratos = [...contratos].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
    }
    return 0;
  });

  const filteredContratos = sortedContratos.filter(
    (contrato) =>
      contrato.empresa.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contrato.consultor.nome.toString().includes(searchTerm) ||
      contrato.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedContratos = filteredContratos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key: keyof Contrato, direction: "asc" | "desc") => {
    setSortConfig({ key, direction });
  };

  const handleCardClient = (cliente: Contrato) => {
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
    <div className="bg-gray-100 dark:bg-dark-main flex flex-col h-full w-full p-8 gap-8">
      {selectedCliente && (
        <CardProjetos
          projeto={{
            nome: selectedCliente?.empresa.nome || "",
            status: selectedCliente.status,
            consultor: "", // Add appropriate value
            tipo: "", // Add appropriate value
            fidelidade: "" // Add appropriate value
          }}
          onClose={() => setSelectedCliente(null)}
        />
      )}

      <div className="flex flex-1 flex-col border rounded-md bg-white dark:bg-darkSecond dark:border-none">
        <div className="overflow-x-auto">
          <div className="flex justify-between p-6 border-b border-black dark:border-white">
            <h1 className="font-semibold text-2xl text-black dark:text-white">
              Projetos
            </h1>

            <div className="relative flex border rounded-lg items-center min-w-[278px]">
              <FaSearch className="absolute left-3 text-gray-400" />
              <input
                className="p-2 pl-10 dark:bg-darkMain border dark:border-none rounded-sm w-full"
                placeholder="Procurar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-5 items-center p-4 font-semibold text-sm text-black dark:text-white min-w-[800px]">
            <div className="flex gap-2 items-center">
              Empresas
              <Order columnKey="empresa" onSort={handleSort} />
            </div>
            <div className="flex gap-2 items-center">
              Consultor
              <Order columnKey="consultor" onSort={handleSort} />
            </div>
            <div className="flex gap-2 items-center">Status</div>
            <div className="flex gap-2 items-center">Prazo</div>
            <div className="flex gap-2 justify-center"></div>
          </div>
          <div className="flex-1 flex-col min-w-[800px]">
            {loading ? (
              <p></p>
            ) : paginatedContratos.length === 0 ? (
              <p>Nenhum contrato encontrado.</p>
            ) : (
              paginatedContratos.map((contrato) => (
                <div
                  key={contrato.id}
                  className="grid grid-cols-5 items-center p-4 border-t border-black dark:border-white text-sm text-black dark:text-white"
                >
                  <button
                    className="flex gap-2 items-center"
                    onClick={() => handleCardClient(contrato)}
                  >
                    <Avatar className="h-10 w-10 bg-black dark:text-white">
                      <AvatarFallback>{getInitials(contrato.empresa.nome)}</AvatarFallback>
                    </Avatar>
                    <h3>{contrato.empresa.nome}</h3>
                  </button>
                  <div>{contrato.consultor.nome}</div>
                  <div>
                    {contrato.tipoConsulta}
                  </div>
                  <div>{new Date(contrato.dataFim).toLocaleDateString()}</div>
                  <div className="flex gap-2 justify-center">
                    <button className="text-gray-500 hover:text-gray-800">
                      <FaEdit size={15} />
                    </button>
                    <button className="text-gray-500 hover:text-gray-800">
                      <FaTrash size={15} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <footer className="flex justify-between">
        <p>
          {filteredContratos.length === 0 ? (
            ""
          ) : (
            <>
              <span className="text-violet-500">
                {`${(currentPage - 1) * itemsPerPage + 1}-${
                  currentPage * itemsPerPage > filteredContratos.length
                    ? filteredContratos.length
                    : currentPage * itemsPerPage
                }`}
              </span>{" "}
              contratos de {filteredContratos.length}
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
            disabled={currentPage * itemsPerPage >= contratos.length}
            onClick={() => setCurrentPage(currentPage + 1)}
            className={`px-3 py-1 border rounded-md ${
              currentPage * itemsPerPage >= contratos.length
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
