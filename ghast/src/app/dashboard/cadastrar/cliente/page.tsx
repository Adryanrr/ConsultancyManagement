"use client"

import { useState } from "react"
import { MultiStepForm } from "@/components/ui/MultiStepForm"
import { StepOne } from "@/components/forms/client/StepOne"
import { StepTwo } from "@/components/forms/client/StepTwo"

export interface FormData {
  name: string
  cpf: string
  email: string
  phone: string
  companyName: string
  cnpj: string
  companyEmail: string
  companyField: string
  isVip: string
}

export default function CompanyRegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    cpf: '',
    email: '',
    phone: '',
    companyName: '',
    cnpj: '',
    companyEmail: '',
    companyField: '',
    isVip: '',
  })

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...newData }))
  }

  const steps = [
    {
      title: "Dados",
      component: (props: any) => (
        <StepOne {...props} formData={formData} updateFormData={updateFormData} />
      ),
    },
    {
      title: "Overview",
      component: (props: any) => (
        <StepTwo {...props} formData={formData} />
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