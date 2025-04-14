import { useState } from "react";
import { FaTimes } from "react-icons/fa";

interface CardClienteProps {
  projeto: {
    nome: string;
    status: StatusType;
    consultor: string;
    tipo: string;
    fidelidade: string;
  };
  onClose: () => void;
}
type StatusType = "Finalizado" | "Em Curso" | "Em Espera";

const phases = [
  "Análise Inicial",
  "Implementação",
  "Revisão Final",
  "Finalizado",
];

export default function CardProjetos({ projeto, onClose }: CardClienteProps) {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [status, setStatus] = useState<StatusType>(projeto.status);

  const handleNextPhase = () => {
    if (currentPhaseIndex < phases.length - 1) {
      setCurrentPhaseIndex((prev) => prev + 1);
    }
    if (currentPhaseIndex === phases.length - 2) {
      setStatus("Finalizado");
    } else {
      setStatus("Em Curso");
    }
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

  return (
    // fundo preto
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center backdrop-blur-sm z-50">
      {/*  card separando fecha e conteudo */}
      <div className="bg-white dark:bg-dark-main w-[900px] h-[600px] p-6 rounded-md shadow-lg flex flex-col gap-4 overflow-auto">
        {/* botão fechar */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <FaTimes size={20} />
          </button>
        </div>
        {/* Conteúdo principal */}
        <div className="flex flex-col lg:flex-row lg:items-start items-center w-full gap-6">
          {/* Seção Esquerda */}
          <div className="flex flex-col w-2/3 gap-4">
            <div className="flex justify-center">
              <h1 className="text-2xl font-bold">{projeto.nome}</h1>
            </div>
            <div className="relative flex flex-col p-2">
              {phases.map((phase, index) => (
                <div key={index} className="relative flex items-start gap-3 mt-5">
                  {/* Linha de conexão */}
                  {index < phases.length - 1 && (
                    <div
                      className={`absolute left-[11px] top-6 w-[3px] h-full mt-5 ${
                        index < currentPhaseIndex
                          ? "bg-purple-500"
                          : "bg-gray-500"
                      }`}
                    ></div>
                  )}
                  {/* Circulo das fases */}
                  <div
                    className={`w-6 h-6 rounded-full flex mt-5 flex-shrink-0 ${
                      index <= currentPhaseIndex
                        ? "bg-purple-500"
                        : "bg-gray-500"
                    }`}
                  ></div>
                  {/* Texto das fases */}
                  <div className="mt-4">
                    <h2 className="text-lg font-medium">{phase}</h2>
                    {phase !== "Finalizado" && (
                      <p className="text-sm text-gray-500 mt-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Numquam, nostrum laboriosam maiores inventore id
                        mollitia ratione vel obcaecati.
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* lado Direito */}
          <div className="flex flex-col items-center justify-center w-1/3 gap-12 p-2">
            <div className="flex flex-col justify-between items-center">
              <span className="text-lg font-bold">Status:</span>
              <div
                className={`w-24 items-center flex flex-row gap-1 text-center justify-center text-sm font-semibold text-gray-500 border rounded-md p-2 ${statusColors[status]}`}
              >
                <div
                  className={`border-[3px] rounded-full items-center ${pointColor[status]}`}
                ></div>
                {status}
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-lg font-bold">Consultor</h2>
              <p>{projeto.consultor || "Nome do Consultor"}</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-lg font-bold">Empresa</h2>
              <p>{projeto.nome || "Nome da empresa"}</p>
            </div>
            <button className="w-full border border-[#8951FF]  text-[#8951FF] py-2 rounded-md">
              Imprimir Contrato
            </button>
            <button
              onClick={handleNextPhase}
              disabled={status === "Finalizado"}
              className="w-full bg-[#6C63FF] text-white py-2 rounded-md"
            >
              Passar de Fase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
