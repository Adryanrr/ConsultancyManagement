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

// Mock data for consultants
const consultants = [
  { value: "consultant1", label: "Consultant 1", type: "tecnologia" },
  { value: "consultant2", label: "Consultant 2", type: "financeira" },
  { value: "consultant3", label: "Consultant 3", type: "gestao" },
];

interface DataInfoStepProps {
  onNext: () => void;
  onBack: () => void;
  isLastStep: boolean;
  currentStep: number;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

// Mock da função para buscar o tipo de cliente no banco
const fetchClientType = async (clientName: string) => {
  // Simulação de consulta ao banco com base no nome
  const clientData: { [key: string]: string } = {
    "Gilson Araujo": "vip",
    "Luciani Viera": "regular",
  };
  return clientData[clientName] || "regular"; // Retorna "regular" se não encontrar
};

export function DataInfoStep({
  onNext,
  onBack,
  isLastStep,
  currentStep,
  formData,
  updateFormData,
}: DataInfoStepProps) {
  const [filteredConsultants, setFilteredConsultants] = useState(consultants);

  useEffect(() => {
    if (formData.consultationType) {
      const relevantConsultants = consultants.filter(
        (consultant) => consultant.type === formData.consultationType
      );
      setFilteredConsultants(relevantConsultants);
    } else {
      setFilteredConsultants(consultants);
    }
  }, [formData.consultationType]);

  const handleInputBlur =
    (field: keyof FormData) => (e: React.FocusEvent<HTMLInputElement>) => {
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
      updateFormData({ consultant: "" });
    }
  };

  const handleClientTypeClick = (value: string) => {
    updateFormData({ isVip: value });
  };

  return (
    <FormStep
      onNext={onNext}
      onBack={onBack}
      isLastStep={isLastStep}
      currentStep={currentStep}
    >
      <main className="flex flex-col md:flex-row justify-center gap-10">
        {/* lado esquerdo */}
        <div className="space-y-10 flex-1">
          <div className="space-y-6">
            <Label htmlFor="representativeName">Representante</Label>
            <div className="border w-full h-[1px] border-gray-200 dark:border-white" />
            <Input
              id="representativeName"
              placeholder="Nome Completo"
              defaultValue={formData.representativeName}
              onBlur={handleInputBlur("representativeName")}
              required
            />
          </div>

          <div className="space-y-6">
            <Label htmlFor="companyName">Empresa</Label>
            <div className="border w-full h-[1px] border-gray-200 dark:border-white" />
            <Input
              id="companyName"
              placeholder="Nome da Empresa"
              defaultValue={formData.companyName}
              onBlur={handleInputBlur("companyName")}
              required
            />
          </div>

          <div className="space-y-6">
            <Label htmlFor="companyType">Tipo da Empresa</Label>
            <div className="border w-full h-[1px] border-gray-200 dark:border-white" />
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

          <div className="space-y-6">
            <Label htmlFor="consultationType">Tipo de Consultoria</Label>
            <div className="border w-full h-[1px] border-gray-200 dark:border-white" />
            <Select
              value={formData.consultationType}
              onValueChange={handleSelectChange("consultationType")}
            >
              <SelectTrigger id="consultationType">
                <SelectValue placeholder="Selecione o tipo de consultoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tecnologia">TI</SelectItem>
                <SelectItem value="financeira">Financeira</SelectItem>
                <SelectItem value="gestao">Gestão</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* barra central */}
        <div className="hidden md:block">
          <div className="border-l border-gray-300 h-[620px]"></div>
        </div>

        {/* lado direito */}
        <div className="space-y-10 flex-1">
          <div className="space-y-6">
            <Label htmlFor="consultant">Consultor</Label>
            <div className="border w-full h-[1px] border-gray-200 dark:border-white" />
            <Select
              value={formData.consultant}
              onValueChange={handleSelectChange("consultant")}
              disabled={!formData.consultationType}
            >
              <SelectTrigger id="consultant">
                <SelectValue placeholder="Selecione o consultor" />
              </SelectTrigger>
              <SelectContent>
                {filteredConsultants.map((consultant) => (
                  <SelectItem key={consultant.value} value={consultant.value}>
                    {consultant.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-6">
            <Label htmlFor="startDate">Início do Contrato</Label>
            <div className="border w-full h-[1px] border-gray-200 dark:border-white" />
            <Input
              type="date"
              id="startDate"
              defaultValue={formData.startDate}
              onBlur={handleInputBlur("startDate")}
              required
            />
          </div>
          <div className="space-y-6">
            <Label htmlFor="endDate">Término do Contrato</Label>
            <div className="border w-full h-[1px] border-gray-200 dark:border-white" />
            <Input
              type="date"
              id="endDate"
              defaultValue={formData.endDate}
              onBlur={handleInputBlur("endDate")}
              required
            />
          </div>
          <div className="space-y-6">
            <Label htmlFor="tipoCliente">Tipo de Cliente</Label>
            <div className="border w-full h-[1px] border-gray-200 dark:border-white" />
            <div className="flex space-x-6">
              <button
                onClick={() => handleClientTypeClick("regular")}
                className={`px-6 py-2 rounded-sm ${
                  formData.isVip === "regular"
                    ? "bg-gray-500 dark:bg-purple-800 text-white"
                    : "bg-white dark:bg-darkSecond border-2 dark:border-purple-800 border-gray-200"
                }`}
              >
                Regular
              </button>
              <button
                onClick={() => handleClientTypeClick("vip")}
                className={`px-6 py-2 rounded-sm ${
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
