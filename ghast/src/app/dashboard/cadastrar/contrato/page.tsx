"use client";

import { useState } from "react";
import { MultiStepForm } from "@/components/ui/MultiStepForm";
import { DataInfoStep } from "@/components/forms/contract/DatainfoStep";
import { ContractPreviewStep } from "@/components/forms/contract/ContractStep";
import { PaymentStep } from "@/components/forms/contract/PaymentStep";
import { useRouter } from "next/navigation";

export interface FormData {
  representativeName: string;
  companyName: string;
  companyType: string;
  consultationType: string;
  startDate: string;
  endDate: string;
  isVip: string;
  paymentMethod: string;
  paymentOption: string;
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  cvv?: string;
  valorContrato?: number;
  consultant: number;
  clienteId: number;
  empresaId: number;
}

export default function CompanyRegistrationForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    representativeName: "",
    companyName: "",
    companyType: "",
    consultationType: "",
    consultant: 0,
    startDate: "",
    endDate: "",
    isVip: "",
    paymentMethod: "",
    paymentOption: "",
    clienteId: 2,
    empresaId: 3,
    valorContrato: 10800,
  });

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const steps = [
    {
      title: "Dados",
      component: (props: any) => (
        <DataInfoStep
          {...props}
          formData={formData}
          updateFormData={(newData) => {
            setFormData((prev) => ({
              ...prev,
              ...newData, // Atualiza os dados, incluindo clienteId e empresaId
            }));
          }}
        />
      ),
    },
    {
      title: "Contrato",
      component: (props: any) => (
        <ContractPreviewStep
          {...props}
          formData={formData}
          updateFormData={(newData: any) => {
            setFormData((prev) => ({
              ...prev,
              ...newData, // Atualiza os dados relevantes para o contrato
            }));
          }}
        />
      ),
    },
    {
      title: "Pagamento",
      component: (props: any) => (
        <PaymentStep
          {...props}
          formData={formData}
          updateFormData={updateFormData}
        />
      ),
    },
  ];

  const handleComplete = async () => {
    if (typeof formData.consultant !== "number" || isNaN(formData.consultant)) {
      alert("Selecione um consultor válido.");
      return;
    }
  
    const requestBody = {
      cliente: { id: formData.clienteId },
      empresa: { id: formData.empresaId },
      consultor: { id: formData.consultant }, // Já garantido como número
      descricao: "Contrato de consultoria empresarial",
      dataInicio: formData.startDate,
      dataFim: formData.endDate,
      valor: formData.valorContrato,
      tipoCliente: formData.isVip,
      tipoConsulta: formData.consultationType,
    };
    console.log("Enviando requisição:", requestBody);
  
    try {
      const response = await fetch("http://localhost:8080/contratos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      if (response.ok) {
        console.log("Contrato cadastrado com sucesso!");
        router.push("/dashboard");
      } else {
        console.error("Erro ao cadastrar contrato:", await response.json());
      }
    } catch (error) {
      console.error("Erro na solicitação:", error);
    }
  };
  

  return (
    <main className="bg-gray-100 dark:bg-darkMain min-h-screen">
      <MultiStepForm steps={steps} onComplete={handleComplete} className="" />
    </main>
  );
}
