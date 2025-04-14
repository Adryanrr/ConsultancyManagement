import { FormStep } from "@/components/ui/MultiStepForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormData } from "@/app/dashboard/cadastrar/contrato/page";
import { useEffect, useState } from "react";
import { Consultores } from "@/lib/consultantsProps";
import { Clientes } from "@/lib/clientsProps";
import { Empresa } from "@/lib/companyProps";

// Mock da função para buscar o tipo de cliente no banco
const fetchClientType = async (clientName: string) => {
  const clientData: { [key: string]: string } = {
    "Gilson Araujo": "VIP",
    "Luciani Viera": "REGULAR",
  };
  return clientData[clientName] || "REGULAR"; // Retorna "regular" se não encontrar
};

interface DataInfoStepProps {
  onNext: () => void;
  onBack: () => void;
  isLastStep: boolean;
  currentStep: number;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export function DataInfoStep({
  onNext,
  onBack,
  isLastStep,
  currentStep,
  formData,
  updateFormData,
}: DataInfoStepProps) {
  const [consultores, setConsultores] = useState<Consultores[]>([]);
  const [filteredConsultants, setFilteredConsultants] = useState<Consultores[]>(
    []
  );
  const [clientes, setClientes] = useState<Clientes[]>([]);
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar consultores da API
  useEffect(() => {
    const fetchConsultants = async () => {
      setLoading(true);
      setError(null);
      const API_BASE_URL = "http://localhost:8080/consultores";

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
        setConsultores(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };
    fetchConsultants();
  }, []);

  // Carregar clientes da API
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
      } finally {
        setLoading(false);
      }
    };
    fetchClientes();
  }, []);

  // Carregar emrpesas da API
  useEffect(() => {
    const fetchEmrpesas = async () => {
      setLoading(true);
      setError(null);
      const API_BASE_URL = "http://localhost:8080/empresas";

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
        setEmpresas(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };
    fetchEmrpesas();
  }, []);

  // Filtrar consultores com base no tipo de consultoria
  useEffect(() => {
    if (formData.consultationType) {
      const filtered = consultores.filter(
        (consultor) => consultor.especializacao === formData.consultationType
      );
      setFilteredConsultants(filtered);
    } else {
      setFilteredConsultants([]);
    }
  }, [formData.consultationType, consultores]);

  const handleInputBlur =
    (field: keyof FormData) =>
    async (e: React.FocusEvent<HTMLInputElement>) => {
      const value = e.target.value;
      updateFormData({ [field]: value });

      if (field === "representativeName") {
        const clientType = await fetchClientType(value);
        updateFormData({ isVip: clientType });

        // Supondo que exista um endpoint para buscar o ID do cliente
        const response = await fetch(
          `http://localhost:8080/clientes?name=${value}`
        );
        if (response.ok) {
          const data = await response.json();
          if (data && data.id) updateFormData({ clienteId: data.id });
        }
      }

      if (field === "companyName") {
        const response = await fetch(
          `http://localhost:8080/empresas?name=${value}`
        );
        if (response.ok) {
          const data = await response.json();
          if (data && data.id) updateFormData({ empresaId: data.id });
        }
      }
    };

  const handleSelectChange = (field: keyof FormData) => (value: string) => {
    const parsedValue = field === "consultant" ? Number(value) : value;
    updateFormData({ [field]: parsedValue });

    if (field === "consultationType") {
      updateFormData({ consultant: 0 }); // Limpa o consultor ao mudar o tipo de consultoria
    }
  };

  const handleClientTypeClick = (value: string) => {
    updateFormData({ isVip: value });
  };

  // POST
  // o que precisamos: ID do consultor, ID do cliente, data de início, data de término, tipo de cliente, tipo de consultoria,

  return (
    <FormStep
      onNext={onNext}
      onBack={onBack}
      isLastStep={isLastStep}
      currentStep={currentStep}
    >
      <main className="flex flex-col md:flex-row justify-center gap-10 p-8">
        {/* lado esquerdo */}
        <div className="space-y-8 flex-1">
          <div className="space-y-2">
            <Label htmlFor="representativeName">Representante</Label>
            <Select
              value={formData.representativeName.toString()} // Converta o número para string para o Select
              onValueChange={handleSelectChange("representativeName")}
            >
              <SelectTrigger id="representativeName">
                <SelectValue placeholder="Selecione o Representante" />
              </SelectTrigger>
              <SelectContent>
                {clientes.map((cliente) => (
                  <SelectItem
                    key={cliente.id}
                    value={cliente.nome.toString()}
                  >
                    {cliente.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyName">Empresa</Label>
            <Input
              id="companyName"
              placeholder="Nome da Empresa"
              defaultValue={formData.companyName}
              onBlur={handleInputBlur("companyName")}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyType">Tipo da Empresa</Label>
            <Select
              value={formData.companyType}
              onValueChange={handleSelectChange("companyType")}
            >
              <SelectTrigger id="companyType">
                <SelectValue placeholder="Selecione o tipo de Empresa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="publico">Público</SelectItem>
                <SelectItem value="privado">Privado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="consultationType">Tipo de Consultoria</Label>
            <Select
              value={formData.consultationType}
              onValueChange={handleSelectChange("consultationType")}
            >
              <SelectTrigger id="consultationType">
                <SelectValue placeholder="Selecione o tipo de consultoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TECNOLOGIA">TI</SelectItem>
                <SelectItem value="FINANCEIRO">Financeira</SelectItem>
                <SelectItem value="GESTAO">Gestão</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* barra central */}
        <div className="hidden md:block">
          <div className="border-l border-gray-300 h-full"></div>
        </div>

        {/* lado direito */}
        <div className="space-y-8 flex-1">
          <div className="space-y-2">
            <Label htmlFor="consultant">Consultor</Label>
            <Select
              value={formData.consultant?.toString()} // Converta o número para string para o Select
              onValueChange={handleSelectChange("consultant")}
              disabled={!formData.consultationType}
            >
              <SelectTrigger id="consultant">
                <SelectValue placeholder="Selecione o consultor" />
              </SelectTrigger>
              <SelectContent>
                {filteredConsultants.map((consultor) => (
                  <SelectItem
                    key={consultor.id}
                    value={consultor.id.toString()}
                  >
                    {consultor.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate">Início do Contrato</Label>
            <Input
              type="date"
              id="startDate"
              defaultValue={formData.startDate}
              onBlur={handleInputBlur("startDate")}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">Término do Contrato</Label>
            <Input
              type="date"
              id="endDate"
              defaultValue={formData.endDate}
              onBlur={handleInputBlur("endDate")}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tipoCliente">Tipo de Cliente</Label>
            <div className="flex space-x-2">
              <button
                onClick={() => handleClientTypeClick("PADRAO")}
                className={`p-6 py-3 rounded-sm ${
                  formData.isVip === "PADRAO"
                    ? "bg-gray-500 dark:bg-purple-800 text-white"
                    : "bg-white dark:bg-darkSecond border-2 dark:border-purple-800 border-gray-200"
                }`}
              >
                PADRÃO
              </button>
              <button
                onClick={() => handleClientTypeClick("VIP")}
                className={`px-6 py-3 rounded-sm ${
                  formData.isVip === "VIP"
                    ? "bg-gray-500 dark:bg-purple-800 text-white"
                    : "bg-white dark:bg-darkSecond border-2 dark:border-purple-800 border-gray-200"
                }`}
              >
                VIP
              </button>
            </div>
          </div>
        </div>
      </main>
    </FormStep>
  );
}
