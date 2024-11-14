import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { FormStep } from "@/components/ui/MultiStepForm"

interface StepOneProps {
  onNext: () => void
  onBack: () => void
  isLastStep: boolean
  currentStep: number
  formData: {
    companyName: string
    cnpj: string
    corporateEmail: string
    sector: string
    representativeName: string
    cpf: string
    email: string
    phone: string
  }
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSelectChange: (value: string) => void
}

export function StepOne({
  onNext,
  onBack,
  isLastStep,
  currentStep,
  formData,
  handleInputChange,
  handleSelectChange
}: StepOneProps) {
  return (
    <FormStep onNext={onNext} onBack={onBack} isLastStep={isLastStep} currentStep={currentStep}>
      <div className="space-y-6 flex-1">
        <Label htmlFor="companyName">Nome da Empresa</Label>
        <Input id="companyName" value={formData.companyName} onChange={handleInputChange} required />
        <Label htmlFor="cnpj">CNPJ</Label>
        <Input id="cnpj" value={formData.cnpj} onChange={handleInputChange} required />
        <Label htmlFor="corporateEmail">E-mail Corporativo</Label>
        <Input id="corporateEmail" value={formData.corporateEmail} onChange={handleInputChange} required />
        <Label htmlFor="sector">Setor de Atuação</Label>
        <Select value={formData.sector} onValueChange={handleSelectChange} required>
          <SelectTrigger id="sector">
            <SelectValue placeholder="Selecione o setor de atuação" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Administração">Administração</SelectItem>
            <SelectItem value="Finanças">Finanças</SelectItem>
            <SelectItem value="Direito">Direito</SelectItem>
            <SelectItem value="Saúde">Saúde</SelectItem>
            <SelectItem value="Psicologia">Psicologia</SelectItem>
            <SelectItem value="Outro">Outro</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
      <div className="space-y-6 flex-1">
        <Label htmlFor="representativeName">Nome do Representante</Label>
        <Input id="representativeName" value={formData.representativeName} onChange={handleInputChange} required />
        <Label htmlFor="cpf">CPF</Label>
        <Input id="cpf" value={formData.cpf} onChange={handleInputChange} required />
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" type="email" value={formData.email} onChange={handleInputChange} required />
        <Label htmlFor="phone">Telefone</Label>
        <Input id="phone" value={formData.phone} onChange={handleInputChange} required />
      </div>
      </div>
    </FormStep>
  )
}
