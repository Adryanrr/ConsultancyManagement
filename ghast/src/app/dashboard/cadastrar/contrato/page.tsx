"use client"

import { useState } from "react"
import { MultiStepForm } from "@/components/ui/MultiStepForm"
import { DataInfoStep } from "@/components/forms/contract/DatainfoStep"
import { ContractPreviewStep } from "@/components/forms/contract/ContractStep"
import { PaymentStep } from "@/components/forms/contract/PaymentStep"
import { useRouter } from "next/navigation";

export interface FormData {
  representativeName: string
  companyName: string
  companyType: string
  consultationType: string
  consultant: string
  startDate: string
  endDate: string
  isVip: string
  paymentMethod: string
  paymentOption: string
  cardNumber?: string
  cardHolder?: string
  expiryDate?: string
  cvv?: string
}

export default function CompanyRegistrationForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    representativeName: '',
    companyName: '',
    companyType: '',
    consultationType: '',
    consultant: '',
    startDate: '',
    endDate: '',
    isVip: '',
    paymentMethod: '',
    paymentOption: '',
  })

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...newData }))
  }

  const steps = [
    {
      title: "Dados",
      component: (props: any) => (
        <DataInfoStep {...props} formData={formData} updateFormData={updateFormData} />
      ),
    },
    {
      title: "Contrato",
      component: (props: any) => (
        <ContractPreviewStep {...props} formData={formData} />
      ),
    },
    {
      title: "Pagamento",
      component: (props: any) => (
        <PaymentStep {...props} formData={formData} updateFormData={updateFormData} />
      ),
    },
  ]

  const handleComplete = async (data: FormData) => {
    console.log("Form completed:", formData)
    router.push("/dashboard")
  }

  return (
    <main className="bg-gray-100 dark:bg-darkMain min-h-screen">
      <MultiStepForm
        steps={steps}
        onComplete={handleComplete}
        className=""
      />
    </main>
  )
}