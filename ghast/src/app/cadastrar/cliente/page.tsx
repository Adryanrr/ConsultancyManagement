'use client'

import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Pagina from '@/components/template/Pagina'
import Image from 'next/image'

export default function Component() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    companyName: '',
    cnpj: '',
    corporateEmail: '',
    sector: '',
    representativeName: '',
    cpf: '',
    email: '',
    phone: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, sector: value }))
  }

  const isStepOneComplete = () => {
    return (
      formData.companyName &&
      formData.cnpj &&
      formData.corporateEmail &&
      formData.sector &&
      formData.representativeName &&
      formData.cpf &&
      formData.email &&
      formData.phone
    )
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
      console.log('Form submitted:', formData)
      // Here you would typically send the data to your backend
    }
  }

  if (step === 2) {
    return (
      <Pagina>
        <Card className="w-full max-w-4xl mx-10 border-blue-500 border-2">
          <CardHeader className="border-b">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm">
                  1
                </div>
                <CardTitle className="text-gray-600">Empresa</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm">
                  2
                </div>
                <span className="text-gray-600">Finalizar</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="w-full md:w-1/2 space-y-6">
                <div className="space-y-2">
                  <Label>Nome da Empresa</Label>
                  <Input
                    value={formData.companyName}
                    className="border-gray-300 bg-gray-50"
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label>CNPJ</Label>
                  <Input
                    value={formData.cnpj}
                    className="border-gray-300 bg-gray-50"
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input
                    value={formData.phone}
                    className="border-gray-300 bg-gray-50"
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label>Setor de Atuação</Label>
                  <Input
                    value={formData.sector}
                    className="border-gray-300 bg-gray-50"
                    readOnly
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 flex justify-center">
                <Image src="/assets/confirmacaoCadastro.svg" alt='' width={338} height={338} className='hidden md:flex' />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-purple-500 hover:bg-purple-600"
            >
              Finalizar
            </Button>
          </CardFooter>
        </Card>
      </Pagina>

    )
  }

  return (
    <Pagina>
      <Card className="w-full max-w-4xl mx-5 border-blue-500 border-2">
        <CardHeader className="border-b hidden md:flex">
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
        <CardContent className="p-6 h-full">
          <form className="flex flex-col md:flex-row justify-center gap-10" onSubmit={handleSubmit}>
            {/* lado esquerdo */}
            <div className="space-y-6 flex-1">
              <div className="space-y-2">
                <Label htmlFor="companyName" className='responsive-label' >Nome da Empresa</Label>
                <Input
                  id="companyName"
                  placeholder="Nome completo da empresa"
                  className="border-gray-300"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cnpj" className='responsive-label'>CNPJ</Label>
                <Input
                  id="cnpj"
                  placeholder="Digite o CNPJ"
                  className="border-gray-300"
                  value={formData.cnpj}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="corporateEmail" className='responsive-label'>E-mail Corporativo</Label>
                <Input
                  id="corporateEmail"
                  type="email"
                  placeholder="Digite o e-mail corporativo"
                  className="border-gray-300"
                  value={formData.corporateEmail}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sector" className='responsive-label'>Setor de Atuação</Label>
                <Select value={formData.sector} onValueChange={handleSelectChange} required>
                  <SelectTrigger id="sector">
                    <SelectValue placeholder="Selecione o setor de atuação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administração</SelectItem>
                    <SelectItem value="finance">Finanças</SelectItem>
                    <SelectItem value="law">Direito</SelectItem>
                    <SelectItem value="health">Saúde</SelectItem>
                    <SelectItem value="psychology">Psicologia</SelectItem>
                    <SelectItem value="other">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* barra central */}
            <div className="hidden md:block">
              <div className="border-l border-gray-300 h-full"></div>
            </div>
            {/* lado direito */}
            <div className="space-y-6 flex-1">
              <div className="space-y-2">
                <Label htmlFor="representativeName" className='responsive-label'>Nome do Representante</Label>
                <Input
                  id="representativeName"
                  placeholder="Nome completo do representante"
                  className="border-gray-300"
                  value={formData.representativeName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf" className='responsive-label'>CPF</Label>
                <Input
                  id="cpf"
                  placeholder="Digite o CPF"
                  className="border-gray-300"
                  value={formData.cpf}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className='responsive-label'>E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite o e-mail"
                  className="border-gray-300"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className='responsive-label'>Telefone</Label>
                <Input
                  id="phone"
                  placeholder="Digite o telefone"
                  className="border-gray-300"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            type="button"
            onClick={handleNext}
            disabled={!isStepOneComplete()}
            className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300"
          >
            Continuar
          </Button>
        </CardFooter>
      </Card>
    </Pagina>
  )
}