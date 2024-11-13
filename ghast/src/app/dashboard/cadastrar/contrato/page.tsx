"use client"

import { useState } from "react"
import { MultiStepForm } from "@/components/ui/MultiStepForm"
import { DataInfoStep } from "@/components/forms/contract/DatainfoStep"
import { ContractPreviewStep } from "@/components/forms/contract/ContractStep"
import { PaymentStep } from "@/components/forms/contract/PaymentStep"

export interface FormData {
  representativeName: string
  companyName: string
  consultationType: string
  consultant: string
  startDate: string
  endDate: string
  isVip: boolean
  paymentMethod: string
  cardNumber?: string
  cardHolder?: string
  expiryDate?: string
  cvv?: string
}

export default function CompanyRegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    representativeName: '',
    companyName: '',
    consultationType: '',
    consultant: '',
    startDate: '',
    endDate: '',
    isVip: false,
    paymentMethod: '',
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
    // Here you would typically submit the data to your backend
  }

  return (
    <main className="bg-gray-50 dark:bg-darkMain min-h-screen">
      <MultiStepForm
        steps={steps}
        onComplete={handleComplete}
        className=""
      />
    </main>
  )
}