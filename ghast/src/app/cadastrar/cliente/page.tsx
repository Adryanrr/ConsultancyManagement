'use client'

import React from "react"
import { ChevronRight, ChevronLeft } from "lucide-react"

import Pagina from "@/components/template/Pagina"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"



export default function Component() {

  const [step, setStep] = React.useState(1)
  const [formData, setFormData] = React.useState({
    companyName: "",
    cnpj: "",
    corporateEmail: "",
    sector: "",
    representativeName: "",
    cpf: "",
    email: "",
    phone: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, sector: value }))
  }
  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1,2))
  }

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1,1))
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Formulário enviado:',formData)
  }

  return (
    <Pagina>
    <Card className="w-full max-w-4xl mx-auto border-blue-500 border-2">
      <CardHeader className="border-b">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm">
              1
            </div>
            <CardTitle className="text-gray-600">Empresa</CardTitle>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-sm">
              2
            </div>
            <span>Finalizar</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <form className="flex flex-row justify-center gap-10" onSubmit={handleSubmit}>
          {/* lado esquerdo */}
          <div className="space-y-6 flex-1">
            <div className="space-y-2">
              <Label htmlFor="company-name">Nome da Empresa</Label>
              <Input
                id="company-name"
                placeholder="Nome completo da empresa"
                className="border-gray-300"
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input
                id="cnpj"
                placeholder="Digite o CNPJ"
                className="border-gray-300"
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="corporate-email">E-mail Corporativo</Label>
              <Input
                id="corporate-email"
                type="email"
                placeholder="Digite o e-mail corporativo"
                className="border-gray-300"
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sector">Setor de Atuação</Label>
              <Select value={formData.sector} onValueChange={handleSelectChange}>
                <SelectTrigger id="sector">
                  <SelectValue placeholder="Selecione o setor de atuação"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administração</SelectItem>
                  <SelectItem value="finance">Finanças</SelectItem>
                  <SelectItem value="law">Direito</SelectItem>
                  <SelectItem value="health">Saúde</SelectItem>
                  <SelectItem value="Psychology">Psicologia</SelectItem>
                  <SelectItem value="other">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* barra central */}
          <div>
            <div className="border-l border-gray-300 h-full"></div>
          </div>
          {/* lado direito */}
          <div className="space-y-6 flex-1">
            <div className="space-y-2">
              <Label htmlFor="representative-name">Nome do Representante</Label>
              <Input
                id="representative-name"
                placeholder="Nome completo do representante"
                className="border-gray-300"
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                placeholder="Digite o CPF"
                className="border-gray-300"
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite o e-mail"
                className="border-gray-300"
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                placeholder="Digite o telefone"
                className="border-gray-300"
                onChange={handleInputChange}
              />
            </div>
          </div>
          
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
              className={step === 1 ? 'invisible' : ''}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            {step === 1 ? (
              <Button type="button" onClick={handleNext}>
                Continuar
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button type="submit">Finalizar</Button>
            )}
          </CardFooter>
    </Card>
    </Pagina>
  )
}