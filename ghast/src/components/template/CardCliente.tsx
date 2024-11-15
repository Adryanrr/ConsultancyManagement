import Image from "next/image";
import { FaTimes } from "react-icons/fa";

interface CardClienteProps {
  cliente: {
    nome: string;
    telefone: string;
    email: string;
    tipo: string;
    fidelidade: string;
  };
  onClose: () => void;
}

type StatusType = "Finalizado" | "Em Curso" | "Em Espera";

const contratos: { icone: string; nome: string; status: StatusType }[] = [
  {
    icone: "/assets/gengarICON.webp",
    nome: "Chakra Soft UI Version",
    status: "Finalizado",
  },
  {
    icone: "/assets/gengarICON.webp",
    nome: "Add Progress Track",
    status: "Em Curso",
  },
  {
    icone: "/assets/gengarICON.webp",
    nome: "Fix Platform Errors",
    status: "Em Espera",
  },
  {
    icone: "/assets/gengarICON.webp",
    nome: "Fix Platform Errors",
    status: "Em Espera",
  },
  {
    icone: "/assets/gengarICON.webp",
    nome: "Fix Platform Errors",
    status: "Em Espera",
  },
];

export default function CardCliente({ cliente, onClose }: CardClienteProps) {
  const statusColors = {
    Finalizado: "bg-green-500 text-white",
    "Em Curso": "bg-yellow-500 text-white",
    "Em Espera": "bg-gray-500 text-white",
  };

  return (
    // fundo preto
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      {/*  card separando fecha e conteudo */}
      <div className="bg-white dark:bg-dark-main w-[800px] p-6 rounded-md shadow-lg flex flex-col gap-4">
        {/* botão fechar */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <FaTimes size={20} />
          </button>
        </div>
        {/* conteudo do card */}
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          {/* imagem e informações do cliente */}
          <div className="flex flex-col gap-3 items-center w-full lg:w-1/2">
            <img
              src="/assets/Gengar4k.jpg"
              alt={cliente.nome}
              className="rounded-full w-24 h-24 border"
            />
            <h2 className="text-xl font-semibold">{cliente.nome}</h2>
            <div className="gap-2 flex flex-col">
              <p><strong>Email:</strong>  {cliente.email}</p>
              <p><strong>Telefone:</strong>  {cliente.telefone}</p>
              <p><strong>Tipo:</strong>  {cliente.tipo}</p>
              <p><strong>Fidelidade: GP</strong>  {cliente.fidelidade}</p>
            </div>
          </div>
          {/* linhas separando */}
          <div className="flex border border-r-white"></div>
          {/* contratos realizados */}
          <div className="flex flex-col gap-5 items-center w-full lg:w-1/2">
            <h2 className="text-xl font-semibold">Contratos realizados</h2>
            <div className="flex flex-col border dark:border-white/30 border-black h-full w-full rounded-md min-w-[250px] max-h-[200px] overflow-y-auto scrollbar-thin">
              {contratos.map((contrato, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 border-b dark:border-white/30 border-black p-2 justify-between"
                >
                  <div className="flex gap-2 items-center">
                    <Image
                      src={contrato.icone}
                      alt={contrato.nome}
                      width={30}
                      height={30}
                    />
                    <p className="font-semibold">{contrato.nome}</p>
                  </div>
                  <div className={`w-24 items-center text-center justify-center text-sm text-gray-500 border font-light rounded-md p-2 ${statusColors[contrato.status]}`}>
                    {contrato.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
