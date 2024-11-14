import { FormStep } from "@/components/ui/MultiStepForm"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormData } from "@/app/dashboard/cadastrar/contrato/page"
import { useEffect, useState } from 'react'

interface DataInfoStepProps {
  onNext: () => void
  onBack: () => void
  isLastStep: boolean
  currentStep: number
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

const consultants = [
  { value: "consultant1", label: "Gilson Araujo - TI", type: "tecnologia" },
  { value: "consultant4", label: "Luciani Viera - TI", type: "tecnologia" },
  { value: "consultant2", label: "Andre Nogueira - Financeira", type: "financeira" },
  { value: "consultant5", label: "Chiquinho - Financeira", type: "financeira" },
  { value: "consultant3", label: "Whuanderson Marinho - Gestão", type: "gestao" },
  { value: "consultant6", label: "Carlos Futino - Gestão", type: "gestao" }
];

export function DataInfoStep({ onNext, onBack, isLastStep, currentStep, formData, updateFormData }: DataInfoStepProps) {
  const [filteredConsultants, setFilteredConsultants] = useState(consultants);

  useEffect(() => {
    if (formData.consultationType) {
      const relevantConsultants = consultants.filter(
        consultant => consultant.type === formData.consultationType
      );
      setFilteredConsultants(relevantConsultants);
    } else {
      setFilteredConsultants(consultants);
    }
  }, [formData.consultationType]);

  const handleInputBlur = (field: keyof FormData) => (e: React.FocusEvent<HTMLInputElement>) => {
    updateFormData({ [field]: e.target.value });
  };

  const handleSelectChange = (field: keyof FormData) => (value: string) => {
    updateFormData({ [field]: value });

    if (field === "consultationType") {
      updateFormData({ consultant: "" });
    }
  };

  return (
    <FormStep onNext={onNext} onBack={onBack} isLastStep={isLastStep} currentStep={currentStep}>
      <main className="flex flex-col md:flex-row justify-center gap-10">
        {/* lado esquerdo */}
        <div className="space-y-6 flex-1">
          <div className="space-y-2">
            <Label htmlFor="representativeName">Representante</Label>
            <Input
              id="representativeName"
              placeholder="Nome Completo"
              defaultValue={formData.representativeName}
              onBlur={handleInputBlur('representativeName')}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyName">Empresa</Label>
            <Input
              id="companyName"
              placeholder="Nome da Empresa"
              defaultValue={formData.companyName}
              onBlur={handleInputBlur('companyName')}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyType">Tipo da Empresa</Label>
            <Select
              value={formData.companyType}
              onValueChange={handleSelectChange('companyType')}
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
              onValueChange={handleSelectChange('consultationType')}
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
          <div className="border-l border-gray-300 h-full"></div>
        </div>

        {/* lado direito */}
        <div className="space-y-6 flex-1">
          <div className="space-y-2">
            <Label htmlFor="consultant">Consultor</Label>
            <Select
              value={formData.consultant}
              onValueChange={handleSelectChange('consultant')}
              disabled={!formData.consultationType}
            >
              <SelectTrigger id="consultant">
                <SelectValue placeholder="Selecione o consultor" />
              </SelectTrigger>
              <SelectContent>
                {filteredConsultants.map(consultant => (
                  <SelectItem key={consultant.value} value={consultant.value}>
                    {consultant.label}
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
              onBlur={handleInputBlur('startDate')}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">Término do Contrato</Label>
            <Input
              type="date"
              id="endDate"
              defaultValue={formData.endDate}
              onBlur={handleInputBlur('endDate')}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="isVip">Tipo de Cliente</Label>
            <Select
              value={formData.isVip}
              onValueChange={handleSelectChange('isVip')}
            >
              <SelectTrigger id="isVip">
                <SelectValue placeholder="Selecione o tipo de cliente" />
              </SelectTrigger>
              <SelectContent>
              <SelectItem value="tecnologia">VIP</SelectItem>
              <SelectItem value="financeira">Regular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </main>
    </FormStep>
  );
}