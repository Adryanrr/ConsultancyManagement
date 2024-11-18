"use client";

import { useState, useEffect } from "react";
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
import { Clientes } from "@/lib/clientsProps";

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
const customers = [
  {
    id: 1,
    nome: "Adryan Ryan",
    email: "adryanryan.s.g@icloud.com",
    avatar: "http://github.com/adryanrr.png",
    cpf: "123.456.789-00",
    telefone: "(12) 3456-7890", // Alterado para 'telefone'
    tipo: "Vip",
    fidelidade: "1000",
  },
  {
    id: 2,
    nome: "Felipe Duan",
    email: "felipe.duan@example.com",
    avatar: "http://github.com/FelipeDuan.png",
    cpf: "234.567.890-01",
    telefone: "(11) 2345-6789", // Alterado para 'telefone'
    tipo: "Vip",
    fidelidade: "1000",
  },
  {
    id: 3,
    nome: "Matheus JuK",
    email: "matheus.juk@example.com",
    avatar: "http://github.com/MatheusJuK.png",
    cpf: "345.678.901-02",
    telefone: "(21) 3456-7890", // Alterado para 'telefone'
    tipo: "Vip",
    fidelidade: "1000",
  },
  ...Array.from({ length: 5 }, (_, i) => ({
    id: i + 4,
    nome: `Customer ${i + 4}`,
    email: `customer${i + 4}@example.com`,
    avatar: "",
    cpf: `456.789.012-${i + 3}`,
    telefone: `(31) 4567-890${i + 3}`, // Alterado para 'telefone'
    tipo: "Padrão",
    fidelidade: "100",
  })),
];

const Order = ({
  columnKey,
  onSort,
}: {
  columnKey: keyof Clientes;
  onSort: (key: keyof Clientes, direction: "asc" | "desc") => void;
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

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Clientes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Clientes | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCliente, setSelectedCliente] = useState<Clientes | null>(null);

  useEffect(() => {
    const fetchClientes = async () => {
      setLoading(true);
      setError(null);

      const API_BASE_URL = "http://localhost:8080/clientes";

      try {
        const response = await fetch(API_BASE_URL);

        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        const contentType = response.headers.get("Content-Type");
        if (!contentType || !contentType.includes("application/json")) {
          console.error("A resposta não é JSON.");
          throw new Error("A resposta não é um JSON válido.");
        }

        const data = await response.json();
        setClientes(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Erro desconhecido");
        setClientes(customers); // Set mock data when fetch fails
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  const sortedClientes = [...clientes].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key!]?.toString().toLowerCase() ?? "";
      const bValue = b[sortConfig.key!]?.toString().toLowerCase() ?? "";
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

  const paginatedClientes = filteredClientes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key: keyof Clientes, direction: "asc" | "desc") => {
    setSortConfig({ key, direction });
  };

  const handleCardClient = (cliente: Clientes) => {
    setSelectedCliente(cliente);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="bg-slate-50 dark:bg-dark-main flex flex-col h-full w-full p-8 gap-8">
      {selectedCliente && (
        <CardCliente
          cliente={selectedCliente}
          onClose={() => setSelectedCliente(null)}
        />
      )}
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

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

          <div className="flex-1 flex-col min-w-[800px]">
            {paginatedClientes.map((cliente) => (
              <div
                key={cliente.id}
                className="grid grid-cols-6 items-center p-4 border-t border-black dark:border-white text-sm text-black dark:text-white"
              >
                <button
                  className="flex gap-2 items-center"
                  onClick={() => handleCardClient(cliente)}
                >
                  <Image
                    src="/assets/Gengar4k.jpg"
                    alt="Cliente"
                    width={40}
                    height={30}
                    className="rounded-full"
                  />
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
            disabled={currentPage * itemsPerPage >= filteredClientes.length}
            onClick={() => setCurrentPage(currentPage + 1)}
            className={`px-3 py-1 border rounded-md ${
              currentPage * itemsPerPage >= filteredClientes.length
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
