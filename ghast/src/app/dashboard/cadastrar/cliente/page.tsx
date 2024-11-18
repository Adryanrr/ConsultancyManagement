"use client"

import { useState } from "react"
import { ChevronLeft } from 'lucide-react'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { set } from "lodash"

export default function CadastrarCliente() {
  const [step, setStep] = useState(1)
  const [formData1, setFormData1] = useState({
    representativeName: "",
    cpf: "",
    email: "",
    phone: "",
    id: "", // Add id property
  })
  const [formData2, setFormData2] = useState({
    companyName: "",
    cnpj: "",
    corporateEmail: "",
    sector: "",
  })

  const handleInputChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData1((prev) => ({ ...prev, [id]: value }))
  }

  const handleInputChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData1((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange1 = (value: string) => {
    setFormData1((prev) => ({ ...prev, sector: value }))
  }
  const handleSelectChange2 = (value: string) => {
    setFormData2((prev) => ({ ...prev, sector: value }))
  }

  const isStepOneComplete = () => {
    return Object.entries(formData1)
      .filter(([key]) => key !== "id") // Excluir o campo "id" da verificação
      .every(([_, value]) => value !== ""); // Verificar se os valores restantes não estão vazios
  };

  const isStepTwoComplete = () => {
    return Object.values(formData2).every((value) => value !== "")
  }

  const handleNext = () => {
    if (step === 2) {
      setStep(3)
    } else {
      setStep(2)
    }
  }
  const handleBack = () => {
    if (step === 2) {
      setStep(1)
    } else {
      setStep(2)
    }
  }

  const API_BASE_URL2 = "http://localhost:8080/empresas";

  const handleSubmit2 = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!isStepTwoComplete()) {
      showNotification("Preencha todos os campos para finalizar o cadastro", "error");
      return;
    }
  
    try {
      const response = await fetch(`${API_BASE_URL2}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nomeEmpresa: formData2.companyName,
          cnpj: formData2.cnpj,
          emailCorporativo: formData2.corporateEmail,
          setor: formData2.sector,
          clienteId: formData1.id, // Associar ao cliente cadastrado
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao cadastrar empresa");
      }
  
      const data = await response.json();
      console.log("Empresa cadastrada com sucesso:", data);
  
      showNotification("Empresa cadastrada com sucesso!", "success");
  
      // Limpar os campos do formulário
      setFormData2({
        companyName: "",
        cnpj: "",
        corporateEmail: "",
        sector: "",
      });
  
      // Finalizar o processo
      setStep(3);
    } catch (err: any) {
      console.error("Erro ao cadastrar empresa:", err.message);
      showNotification(err.message || "Erro inesperado", "error");
    }
  };
  
  const API_BASE_URL = "http://localhost:8080/clientes";

  const handleSubmit1 = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isStepOneComplete()) {
      showNotification("Preencha todos os campos para continuar", "error");
      return;
    }

    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formData1.representativeName,
          cpf: formData1.cpf,
          email: formData1.email,
          telefone: formData1.phone,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao cadastrar cliente");
      }

      const data = await response.json(); // Espera pela resposta em JSON
      console.log("Resposta da API:", data);

      // Armazene o ID do cliente no estado
      const { id } = data; // Certifique-se de que o backend retorna o ID do cliente
      setFormData1({ ...formData1, id });

      showNotification("Cliente cadastrado com sucesso!", "success");

      // Limpar os campos do formulário
      setFormData1({
        representativeName: "",
        cpf: "",
        email: "",
        phone: "",
        id: "", // Adicione o ID do cliente
      });

      // Avançar para o próximo passo
      setStep(2);
    } catch (err: any) {
      console.error("Erro ao cadastrar cliente:", err.message);
      showNotification(err.message || "Erro inesperado", "error");
    }
  };

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  if (step === 2) {
    return (
      <div className="min-h-screen w-full p-4 flex items-center justify-center bg-gray-100 dark:bg-darkMain">
        <Card className="w-full max-w-7xl bg-white dark:bg-darkSecond shadow-lg border-[#7C3AED] border-2">
          <CardHeader className="space-y-1 p-6">
            <div className="flex items-center justify-between mx-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#7C3AED] text-white flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <CardTitle className="text-sm font-medium text-gray-600">Cliente</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#7C3AED] text-white flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <span className="text-sm font-medium text-gray-600">Empresa</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-300 text-white flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <span className="text-sm font-medium text-gray-600">Finalizar</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-10">
            <form className="flex flex-col gap-12" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-8">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Nome da Empresa</Label>
                  <Input
                    id="companyName"
                    placeholder="Nome completo da empresa"
                    value={formData2.companyName}
                    onChange={handleInputChange2}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input
                    id="cnpj"
                    placeholder="Digite o CNPJ"
                    value={formData2.cnpj}
                    onChange={handleInputChange2}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="corporateEmail">E-mail Corporativo</Label>
                  <Input
                    id="corporateEmail"
                    type="email"
                    placeholder="Digite o e-mail corporativo"
                    value={formData2.corporateEmail}
                    onChange={handleInputChange2}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sector">Setor de Atuação</Label>
                  <Select value={formData2.sector} onValueChange={handleSelectChange2} required>
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
            </form>
          </CardContent>
          <CardFooter className="flex justify-end p-10 pt-4">
            <Button onClick={handleNext} className="bg-[#7C3AED] hover:bg-[#6D28D9] dark:text-white">
              Continuar
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  if (step === 3) {
    return (
      <div className="min-h-screen w-full p-4 flex items-center justify-center bg-gray-100 dark:bg-darkMain">
        <Card className="w-full max-w-7xl bg-white dark:bg-darkSecond shadow-lg border-[#7C3AED] border-2">
          <CardHeader className="space-y-1 p-6">
            <div className="flex items-center justify-between mx-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#7C3AED] text-white flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <CardTitle className="text-sm font-medium text-gray-600">Cliente</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#7C3AED] text-white flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <span className="text-sm font-medium text-gray-600">Empresa</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#7C3AED] text-white flex items-center justify-center text-sm font-medium">
                  3
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
                    value={formData2.companyName}
                    className="border-gray-200 bg-gray-50"
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label>CNPJ</Label>
                  <Input
                    value={formData2.cnpj}
                    className="border-gray-200 bg-gray-50"
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input
                    value={formData1.phone}
                    className="border-gray-200 bg-gray-50"
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label>Setor de Atuação</Label>
                  <Input
                    value={formData2.sector}
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
          <CardFooter className="flex justify-end p-10 pt-4">
            <Button onClick={handleSubmit1} className="bg-[#7C3AED] hover:bg-[#6D28D9] dark:text-white">
              Finalizar
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (

    <div className="min-h-screen w-full p-4 flex items-center justify-center bg-gray-100 dark:bg-darkMain">

      <Card className="w-full max-w-7xl bg-white dark:bg-darkSecond shadow-lg border-[#7C3AED] border-2">
        <CardHeader className="space-y-1 p-6">
          <div className="flex items-center justify-between mx-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#7C3AED] text-white flex items-center justify-center text-sm font-medium">
                1
              </div>
              <CardTitle className="text-sm font-medium text-gray-600">Cliente</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-300 text-white flex items-center justify-center text-sm font-medium">
                2
              </div>
              <span className="text-sm font-medium text-gray-600">Empresa</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-300 text-white flex items-center justify-center text-sm font-medium">
                3
              </div>
              <span className="text-sm font-medium text-gray-600">Finalizar</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-10">
          {/* Formulário do cliente */}
          <form>
            <div className="space-y-8">
              <div className="space-y-2">
                <Label htmlFor="representativeName">Nome do Cliente</Label>
                <Input
                  id="representativeName"
                  placeholder="Nome completo do cliente"
                  value={formData1.representativeName}
                  onChange={handleInputChange1}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  placeholder="Digite o CPF"
                  value={formData1.cpf}
                  onChange={handleInputChange1}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite o e-mail"
                  value={formData1.email}
                  onChange={handleInputChange1}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  placeholder="Digite o telefone"
                  value={formData1.phone}
                  onChange={handleInputChange1}
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end p-10 pt-4">
          <Button
            onClick={handleSubmit1}
            disabled={!isStepOneComplete()}
            className="bg-[#7C3AED] hover:bg-[#6D28D9] disabled:bg-gray-300 dark:text-white"
          >
            Continuar
          </Button>
        </CardFooter>
      </Card >
    </div >
  )
}