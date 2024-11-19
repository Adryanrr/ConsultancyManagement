"use client";

import { useState } from "react";
import { MultiStepForm } from "@/components/ui/MultiStepForm";
import { DataInfoStep } from "@/components/forms/contract/DatainfoStep";
import { ContractPreviewStep } from "@/components/forms/contract/ContractStep";
import { PaymentStep } from "@/components/forms/contract/PaymentStep";
import { useRouter } from "next/navigation";
import { Contract } from "@/lib/contractProps";

export default function CompanyRegistrationForm() {
  const router = useRouter();
  const [contrato, setContrato] = useState<Contract>({
    id: 0,
    cliente: {
      id: 0,
      nome: "",
      email: "",
      cpf: "",
      telefone: "",
    },
    empresa: {
      id: 0,
      nome: "",
      cnpj: "",
      telefone: "",
      email: "",
      setorAtuacao: "",
      representanteLegal: {
        id: 0,
        nome: "",
        email: "",
        cpf: "",
        telefone: "",
      },
    },
    consultor: {
      id: 0,
      nome: "",
      cpf: "",
      email: "",
      telefone: "",
      avatar: "",
    },
    tipoConsulta: "",
    dataInicio: "",
    dataFim: "",
    tipoCliente: "",
    paymentMethod: "",
    paymentOption: "",
    valor: 0,
    status: "",
  });

  const updateContrato = (newData: Partial<Contract>) => {
    setContrato((prev) => ({ ...prev, ...newData }));
  };

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const steps = [
    {
      title: "Dados",
      component: (props: any) => (
        <DataInfoStep
          {...props}
          formData={contrato}
          updateFormData={updateContrato}
        />
      ),
    },
    {
      title: "Contrato",
      component: (props: any) => (
        <ContractPreviewStep {...props} formData={contrato} />
      ),
    },
    {
      title: "Pagamento",
      component: (props: any) => (
        <PaymentStep
          {...props}
          formData={contrato}
          updateFormData={updateContrato}
        />
      ),
    },
  ];

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleComplete = async (data: Contract) => {
    console.log("Response:", data);
    try {
      const response = await fetch("http://localhost:8080/contratos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cliente: {
            nome: data.cliente.nome,
          },
          nome: data.empresa.nome,
          tipoConulta: data.tipoConsulta,
          consultor:{
            nome: data.consultor.nome,
          },
          dataInicio: data.dataInicio,
          dataFim: data.dataFim,
          tipoCliente: data.tipoCliente,
        }),
      });
      console.log("Response:", response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Contract created successfully:", result);
      showNotification("Contrato cadastrado com sucesso!", "success");
    } catch (err: any) {
      console.error("Error creating contract:", err);
      showNotification(err.message || "Erro inesperado", "error");
    }

  };

  return (
    <main className="bg-gray-100 dark:bg-darkMain min-h-screen">
      <MultiStepForm steps={steps} onComplete={handleComplete} className="" />
    </main>
  );
}
