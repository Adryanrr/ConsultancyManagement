import { FormStep } from "@/components/ui/MultiStepForm"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Crown } from 'lucide-react'
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

  // Atualiza a lista de consultores com base no tipo de consultoria selecionado
  useEffect(() => {
    if (formData.consultationType) {
      const relevantConsultants = consultants.filter(
        consultant => consultant.type === formData.consultationType
      );
      setFilteredConsultants(relevantConsultants);
    } else {
      setFilteredConsultants(consultants); // Mostra todos os consultores quando nenhum tipo é selecionado
    }
  }, [formData.consultationType]);

  const handleInputBlur = (field: keyof FormData) => (e: React.FocusEvent<HTMLInputElement>) => {
    updateFormData({ [field]: e.target.value });
  };

  const handleSelectChange = (field: keyof FormData) => (value: string) => {
    updateFormData({ [field]: value });

    if (field === "consultationType") {
      updateFormData({ consultant: "" }); // Limpa a seleção anterior de consultor ao alterar o tipo
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    updateFormData({ isVip: checked });
  };

  return (
    <FormStep onNext={onNext} onBack={onBack} isLastStep={isLastStep} currentStep={currentStep}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="representativeName">Nome do Representante</Label>
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

      <div className="space-y-4">
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
      </div>
    </FormStep>
  );
}
