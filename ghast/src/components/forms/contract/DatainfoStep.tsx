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

// Mock da função para buscar o tipo de cliente no banco
const fetchClientType = async (clientName: string) => {
  const clientData: { [key: string]: string } = {
    "Gilson Araujo": "vip",
    "Luciani Viera": "regular",
  };
  return clientData[clientName] || "regular"; // Retorna "regular" se não encontrar
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
  const [filteredConsultants, setFilteredConsultants] = useState<Consultores[]>([]);
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

  const handleInputBlur = (field: keyof FormData) => (e: React.FocusEvent<HTMLInputElement>) => {
    updateFormData({ [field]: e.target.value });

    if (field === "representativeName") {
      fetchClientType(e.target.value).then((clientType) => {
        updateFormData({ isVip: clientType });
      });
    }
  };

  const handleSelectChange = (field: keyof FormData) => (value: string) => {
    updateFormData({ [field]: value });

    if (field === "consultationType") {
      updateFormData({ consultant: "" }); // Reset consultant when changing consultation type
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
            <Input
              id="representativeName"
              placeholder="Nome Completo"
              defaultValue={formData.representativeName}
              onBlur={handleInputBlur("representativeName")}
              required
            />
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
            <Select value={formData.companyType} onValueChange={handleSelectChange("companyType")}>
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
            <Select value={formData.consultationType} onValueChange={handleSelectChange("consultationType")}>
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
              value={formData.consultant}
              onValueChange={handleSelectChange("consultant")}
              disabled={!formData.consultationType}
            >
              <SelectTrigger id="consultant">
                <SelectValue placeholder="Selecione o consultor" />
              </SelectTrigger>
              <SelectContent>
                {filteredConsultants.map((consultor) => (
                  <SelectItem key={consultor.id} value={consultor.id}>
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
                onClick={() => handleClientTypeClick("regular")}
                className={`p-6 py-3 rounded-sm ${
                  formData.isVip === "regular"
                    ? "bg-gray-500 dark:bg-purple-800 text-white"
                    : "bg-white dark:bg-darkSecond border-2 dark:border-purple-800 border-gray-200"
                }`}
              >
                Regular
              </button>
              <button
                onClick={() => handleClientTypeClick("vip")}
                className={`px-6 py-3 rounded-sm ${
                  formData.isVip === "vip"
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
