import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormStep } from "@/components/ui/MultiStepForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

interface StepTwoProps {
  onNext: () => void;
  onBack: () => void;
  isLastStep: boolean;
  currentStep: number;
  formData: {
    name: string;
    cpf: string;
    email: string;
    phone: string;
    isVip: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function StepTwo({
  onNext,
  onBack,
  isLastStep,
  currentStep,
  formData,
  handleInputChange,
}: StepTwoProps) {
  return (
    <FormStep
      onNext={onNext}
      onBack={onBack}
      isLastStep={isLastStep}
      currentStep={currentStep}
    >
      <div className="flex flex-col md:flex-row justify-center gap-10 h-[640px]">
        {/* lado esquerdo */}
        <div className="space-y-10 flex flex-col flex-1">
          <Label htmlFor="name">Nome do cliente</Label>
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
          <Label htmlFor="isVip">Tipo de Cliente</Label>
          <Select value={formData.isVip} required>
            <SelectTrigger id="isVip">
              <SelectValue placeholder="Selecione o tipo de cliente" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="VIP">Administração</SelectItem>
              <SelectItem value="Regular">Finanças</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* barra central */}
        <div className="hidden md:block">
          <div className="border-l border-gray-300 h-full"></div>
        </div>

        {/* lado direito */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/assets/confirmacaoCadastro.svg"
            alt=""
            width={338}
            height={338}
            className="hidden md:flex"
          />
        </div>
      </div>
    </FormStep>
  );
}
