import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormStep } from "@/components/ui/MultiStepForm";

interface StepOneProps {
  onNext: () => void;
  onBack: () => void;
  isLastStep: boolean;
  currentStep: number;
  formData: {
    name: string;
    cpf: string;
    email: string;
    phone: string;
    companyName: string;
    cnpj: string;
    companyEmail: string;
    companyField: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (value: string) => void;
}

export function StepOne({
  onNext,
  onBack,
  isLastStep,
  currentStep,
  formData,
  handleInputChange,
  handleSelectChange,
}: StepOneProps) {
  return (
    <FormStep
      onNext={onNext}
      onBack={onBack}
      isLastStep={isLastStep}
      currentStep={currentStep}
    >
      <div className="flex flex-col md:flex-row justify-center gap-10 h-[640px]">
        {/* lado esquerdo */}
        <div className="space-y-10 flex-1">
          <Label htmlFor="name">Nome do Cliente</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <Label htmlFor="cpf">CPF</Label>
          <Input
            id="cpf"
            value={formData.cpf}
            onChange={handleInputChange}
            required
            
          />
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
           
          />
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            
          />
        </div>

        {/* barra central */}
        <div className="hidden md:block">
          <div className="border-l border-gray-300 h-full"></div>
        </div>

        {/* lado direito */}
        <div className="space-y-10 flex-1">
          <Label htmlFor="companyName">Nome da Empresa</Label>
          <Input
            id="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            required
          />
          <Label htmlFor="cnpj">CNPJ</Label>
          <Input
            id="cnpj"
            value={formData.cnpj}
            onChange={handleInputChange}
            required
          />
          <Label htmlFor="companyEmail">E-mail da Empresa</Label>
          <Input
            id="companyEmail"
            value={formData.companyEmail}
            onChange={handleInputChange}
            required
          />
          <Label htmlFor="companyField">Setor de Atuação</Label>
          <Select
            value={formData.companyField}
            onValueChange={handleSelectChange}
            required
          >
            <SelectTrigger id="companyField">
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
      </div>
    </FormStep>
  );
}
