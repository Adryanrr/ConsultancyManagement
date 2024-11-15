"use client"

import { useState } from "react"
import { ChevronLeft } from 'lucide-react'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CadastrarCliente() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    companyName: "",
    cnpj: "",
    corporateEmail: "",
    sector: "",
    representativeName: "",
    cpf: "",
    email: "",
    phone: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, sector: value }))
  }

  const isStepOneComplete = () => {
    return Object.values(formData).every((value) => value !== "")
  }

  const handleNext = () => {
    if (isStepOneComplete()) {
      setStep(2)
    }
  }

  const handleBack = () => {
    setStep(1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isStepOneComplete()) {
      console.log("Form submitted:", formData)
      // Here you would typically send the data to your backend
    }
  }

  if (step === 2) {
    return (
      <div className="min-h-screen w-full p-4 flex items-center justify-center bg-gray-50 dark:bg-darkMain">
        <Card className="w-full max-w-7xl bg-white dark:bg-darkSecond shadow-lg border-[#7C3AED] border-2">
          <CardHeader className="space-y-1 p-6">
            <div className="flex items-center justify-between mx-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#7C3AED] text-white flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <CardTitle className="text-sm font-medium text-gray-600">Empresa</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#7C3AED] text-white flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <span className="text-sm font-medium text-gray-600">Finalizar</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-12">
              <div className="w-full md:w-1/2 space-y-8">
                <div className="space-y-2">
                  <Label>Nome da Empresa</Label>
                  <Input
                    value={formData.companyName}
                    className="border-gray-200 bg-gray-50"
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label>CNPJ</Label>
                  <Input
                    value={formData.cnpj}
                    className="border-gray-200 bg-gray-50"
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input
                    value={formData.phone}
                    className="border-gray-200 bg-gray-50"
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label>Setor de Atuação</Label>
                  <Input
                    value={formData.sector}
                    className="border-gray-200 bg-gray-50"
                    readOnly
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 flex justify-center">
                <Image
                  src="/assets/confirmacaoCadastro.svg"
                  alt="Confirmação de Cadastro"
                  width={338}
                  height={338}
                  className="hidden md:block"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between p-10 pt-4">
            <Button variant="outline" onClick={handleBack} className="text-[#7C3AED] border-[#7C3AED] hover:bg-[#7C3AED] hover:text-white dark:bg-darkSecond">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <Button onClick={handleSubmit} className="bg-[#7C3AED] hover:bg-[#6D28D9] dark:text-white">
              Finalizar
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full p-4 flex items-center justify-center bg-gray-50 dark:bg-darkMain">
      <Card className="w-full max-w-7xl bg-white dark:bg-darkSecond shadow-lg border-[#7C3AED] border-2">
        <CardHeader className="space-y-1 p-6">
          <div className="flex items-center justify-between mx-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#7C3AED] text-white flex items-center justify-center text-sm font-medium">
                1
              </div>
              <CardTitle className="text-sm font-medium text-gray-600">Empresa</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center text-sm">
                2
              </div>
              <span className="text-sm text-gray-400">Finalizar</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-10">
          <form className="grid grid-cols-1 md:grid-cols-[1fr,1px,1fr] gap-12" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-8">
              <div className="space-y-2">
                <Label htmlFor="companyName">Nome da Empresa</Label>
                <Input
                  id="companyName"
                  placeholder="Nome completo da empresa"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input
                  id="cnpj"
                  placeholder="Digite o CNPJ"
                  value={formData.cnpj}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="corporateEmail">E-mail Corporativo</Label>
                <Input
                  id="corporateEmail"
                  type="email"
                  placeholder="Digite o e-mail corporativo"
                  value={formData.corporateEmail}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
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
            </div>
            <div className="hidden md:block w-px bg-gray-200 h-full"></div>
            <div className="space-y-8">
              <div className="space-y-2">
                <Label htmlFor="representativeName">Nome do Representante</Label>
                <Input
                  id="representativeName"
                  placeholder="Nome completo do representante"
                  value={formData.representativeName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  placeholder="Digite o CPF"
                  value={formData.cpf}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite o e-mail"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  placeholder="Digite o telefone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end p-10 pt-4">
          <Button
            onClick={handleNext}
            disabled={!isStepOneComplete()}
            className="bg-[#7C3AED] hover:bg-[#6D28D9] disabled:bg-gray-300 dark:text-white"
          >
            Continuar
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}