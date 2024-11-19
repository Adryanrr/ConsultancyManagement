import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FormStep } from "@/components/ui/MultiStepForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { QrCode, CreditCard, Banknote } from "lucide-react";
import { FormData } from "@/app/dashboard/cadastrar/contrato/page";

interface PaymentStepProps {
  onNext: () => void;
  onBack: () => void;
  isLastStep: boolean;
  currentStep: number;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export function PaymentStep({
  onNext,
  onBack,
  isLastStep,
  currentStep,
  formData,
  updateFormData,
}: PaymentStepProps) {
  const handleInputChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      updateFormData({ [field]: e.target.value });
    };

  const handlePaymentMethodChange = (value: string) => {
    updateFormData({ paymentMethod: value });
  };

  const transferenciaBancaria = {
    idTransacao: "TXN123456789", // ID único da transação
    data: "2024-11-18T15:30:00Z", // Data e hora da transação
    remetente: {
      nome: "João da Silva",
      cpf: "123.456.789-00",
      banco: "Banco do Brasil",
      agencia: "1234",
      conta: "123456-7",
      tipoConta: "corrente",
    },
    destinatario: {
      nome: "Maria Oliveira",
      cpf: "987.654.321-00",
      banco: "Caixa Econômica Federal",
      agencia: "5678",
      conta: "987654-3",
      tipoConta: "poupança",
    },
    valor: 1500.75, // Valor transferido
    descricao: "Pagamento de serviços prestados",
    status: "Concluída", // Pode ser: "Concluída", "Pendente", "Cancelada"
    comprovanteUrl: "https://example.com/comprovante/TXN123456789", // URL do comprovante
  };

  return (
    <FormStep
      onNext={onNext}
      onBack={onBack}
      isLastStep={isLastStep}
      currentStep={currentStep}
    >
      <div className="">
        <div>
        {/* Accordion for Payment Methods */}
        <Accordion
          type="single"
          value={formData.paymentMethod || "credit_card"}
          onValueChange={handlePaymentMethodChange}
          className="w-full space-y-2"
        >
          {/* Credit Card Option */}
          <AccordionItem value="credit_card" className="border rounded-lg">
            <AccordionTrigger className="px-4 hover:no-underline">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                <span>Cartão de Crédito</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Número do Cartão</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber || ""}
                  onChange={handleInputChange("cardNumber")}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardHolder">Nome no Cartão</Label>
                <Input
                  id="cardHolder"
                  placeholder="Nome Completo"
                  value={formData.cardHolder || ""}
                  onChange={handleInputChange("cardHolder")}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Data de Expiração</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/AA"
                    value={formData.expiryDate || ""}
                    onChange={handleInputChange("expiryDate")}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={formData.cvv || ""}
                    onChange={handleInputChange("cvv")}
                    required
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Bank Transfer Option */}
          <AccordionItem value="bank_transfer" className="border rounded-lg">
            <AccordionTrigger className="px-4 hover:no-underline">
              <div className="flex items-center gap-2">
                <Banknote className="h-5 w-5" />
                <span>Transferência Bancária</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 px-6">
                <p>
                  <strong>ID da Transação:</strong> {transferenciaBancaria.idTransacao}
                </p>
                <p>
                  <strong>Data:</strong>{" "}
                  {new Date(transferenciaBancaria.data).toLocaleString()}
                </p>
                <p>
                  <strong>Valor:</strong> R${" "}
                  {transferenciaBancaria.valor.toFixed(2)}
                </p>
                <p>
                  <strong>Descrição:</strong> {transferenciaBancaria.descricao}
                </p>
                <p>
                  <strong>Status:</strong> {transferenciaBancaria.status}
                </p>
                <h4>Remetente</h4>
                <p>{transferenciaBancaria.remetente.nome}</p>
                <h4>Destinatário</h4>
                <p>{transferenciaBancaria.destinatario.nome}</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      </div>
      <div className="space-y-4">
        <Card>
          <CardContent className="p-6 dark:bg-darkMain rounded-lg border dark:border-none">
            <div>
              <div className="space-y-2">
                <Label htmlFor="paymentOption" className="text-lg">
                  Opção de Pagamento
                </Label>
                <select
                  id="paymentOption"
                  value={formData.paymentOption}
                  onChange={(e) =>
                    updateFormData({ paymentOption: e.target.value })
                  }
                  className="w-full p-2 border rounded-md dark:bg-darkMain dark:border-none"
                >
                  <option value="full_upfront">Valor Integral no Começo</option>
                  <option value="full_end">Valor Integral no Final</option>
                  <option value="installments">
                    Pagar ao Longo das Etapas (Parcelado)
                  </option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Resumo do Pagamento</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Valor:</span>
                  <span>R$ 12.000,00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Desconto:</span>
                  <span>R$ 1.200,00</span>
                </div>
                <div className="h-px bg-gray-200 my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>R$ 10.800,00</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </FormStep>
  );
}
