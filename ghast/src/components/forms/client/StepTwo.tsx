import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { FormStep } from "@/components/ui/MultiStepForm"

interface StepTwoProps {
  onNext: () => void
  onBack: () => void
  isLastStep: boolean
  currentStep: number
  formData: {
    representativeName: string
    cpf: string
    email: string
    phone: string
  }
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function StepTwo({
  onNext,
  onBack,
  isLastStep,
  currentStep,
  formData,
  handleInputChange
}: StepTwoProps) {
  return (
    <FormStep onNext={onNext} onBack={onBack} isLastStep={isLastStep} currentStep={currentStep}>
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
    </FormStep>
  )
}
