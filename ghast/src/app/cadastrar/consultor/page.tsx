'use client'

import React, { useState, ChangeEvent } from 'react'
import { ChevronLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Pagina from '@/components/template/Pagina'
import Image from 'next/image'

export default function CadastrarConsultor() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  }
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    Name: '',
    cpf: '',
    email: '',
    phone: '',
    type: '',
    size: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, type: value }))
  }

  const isStepOneComplete = () => {
    return (
      formData.Name &&
      formData.cpf &&
      formData.email &&
      formData.phone &&
      formData.type &&
      formData.size
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
        <div className='flex flex-1 items-center justify-center'>

        <Card className="w-full max-w-4xl mx-10 border-blue-500 border-2">
          <CardHeader className='border-b'>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm">
                  1
                </div>
                <CardTitle className="text-gray-600">Dados</CardTitle>
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
                  <Label>Nome do consultor</Label>
                  <Input
                    value={formData.Name}
                    className="border-gray-300 bg-gray-50"
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label>CPF</Label>
                  <Input
                    value={formData.cpf}
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
                  <Label>Tipo de Consultoria</Label>
                  <Input
                    value={formData.type}
                    className="border-gray-300 bg-gray-50"
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tamanho do Negócio</Label>
                  <Input
                    value={formData.size}
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
        </div>
      </Pagina>
    )

  }

  return (
    <Pagina>
      <div className='flex flex-1 items-center justify-center'>

      <Card className="w-full max-w-4xl mx-2 border-blue-500 border-2">
        <CardHeader className="border-b flex">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm">
                1
              </div>
              <CardTitle className="text-gray-600">Dados</CardTitle>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                2
              </div>
              <span>Finalizar</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-2 md:p-6 h-full">
          <form className="flex flex-col md:flex-row justify-center gap-10" onSubmit={handleSubmit}>

            {/* lado esquerdo */}
            <div className="space-y-6 flex-1">

              {/* Imagem Consultor */}
              <div className="space-y-2 flex items-center justify-center">
                {/* Campo de upload de imagem escondido */}
                {!selectedImage && (
                  <label htmlFor="fileInput" className="text-center cursor-pointer inline-block">
                    <img src="/assets/SeletorPerfilPOO.png" alt="Adicionar uma foto" className='object-cover rounded-full'/>
                  </label>
                )}
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }} // Esconde o input
                />

                {/* Exibição da imagem selecionada */}
                {selectedImage && (
                  <div>
                    <img
                      src={selectedImage}
                      alt="Imagem de Perfil"
                      style={{ width: '110px', height: '110px', borderRadius: '50%' }}
                    />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="type"  >Tipo de Consultoria</Label>
                <div className="border w-full h-[2px] border-black"></div>

                <Select value={formData.type} onValueChange={handleSelectChange} required>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Selecione o tipo de consultoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TI">TI</SelectItem>
                    <SelectItem value="Gestão de Projeto">Gestão de Projetos</SelectItem>
                    <SelectItem value="Financeira">Financeira</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="size">Tamanho do negócio</Label>
                <div className="border w-full h-[2px] border-black"></div>

                <div className="flex gap-10">
                  <div className="flex items-center gap-2 ">
                    <input
                      type="radio"
                      id="size"
                      name="size"
                      value="Pequeno"
                      onChange={handleInputChange}
                    />
                    <label htmlFor="Pequeno">Pequeno</label>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      id="size"
                      name="size"
                      value="Médio"
                      onChange={handleInputChange}
                    />
                    <label htmlFor="Médio">Médio</label>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      id="size"
                      name="size"
                      value="Grande"
                      onChange={handleInputChange}
                    />
                    <label htmlFor="Grande">Grande</label>
                  </div>
                </div>

              </div>
            </div>

            {/* barra central */}
            <div className="hidden md:block">
              <div className="border-l border-gray-300 h-full"></div>
            </div>

            {/* lado direito */}
            <div className="space-y-6 flex-1">
              <div className="space-y-2">
                <Label htmlFor="representativeName" className='responsive-label'>Nome do Consultor</Label>
                <Input
                  id="Name"
                  placeholder="Nome completo do consultor"
                  className="border-gray-300"
                  value={formData.Name}
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
      </div>
    </Pagina>
  );
}