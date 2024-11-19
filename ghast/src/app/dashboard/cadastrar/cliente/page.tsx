"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

export default function CadastrarClienteEEmpresa() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: "",
    cnpj: "",
    email: "",
    telefone: "",
    setorAtuacao: "",
    representanteLegal: {
      id: "",
      nome: "",
      cpf: "",
      email: "",
      telefone: "",
    },
  });

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id.startsWith("representante.")) {
      const field = id.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        representanteLegal: { ...prev.representanteLegal, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, setorAtuacao: value }));
  };

  const isStepOneComplete = () => {
    const { nome, cpf, email, telefone } = formData.representanteLegal;
    return [nome, cpf, email, telefone].every((field) => field !== "");
  };

  const isStepTwoComplete = () => {
    const { nome, cnpj, email, telefone, setorAtuacao } = formData;
    return [nome, cnpj, email, telefone, setorAtuacao].every(
      (field) => field !== ""
    );
  };

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const API_BASE_URL_CLIENTES = "http://localhost:8080/clientes";
  const API_BASE_URL_EMPRESAS = "http://localhost:8080/empresas";

  const handleSubmit1 = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(API_BASE_URL_CLIENTES, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formData.representanteLegal.nome,
          cpf: formData.representanteLegal.cpf,
          email: formData.representanteLegal.email,
          telefone: formData.representanteLegal.telefone,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao cadastrar cliente");
      }

      const data = await response.json();
      console.log("Cliente cadastrado com sucesso:", data);
      setFormData((prev) => ({
        ...prev,
        representanteLegal: { ...prev.representanteLegal, id: data.id },
      }));

      showNotification("Cliente cadastrado com sucesso!", "success");
      setStep(2);
    } catch (err: any) {
      showNotification(err.message || "Erro inesperado", "error");
    }
  };

  const handleSubmit2 = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(API_BASE_URL_EMPRESAS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formData.nome,
          cnpj: formData.cnpj,
          email: formData.email,
          telefone: formData.telefone,
          setorAtuacao: formData.setorAtuacao,
          representanteLegal: {
            id: formData.representanteLegal.id,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao cadastrar empresa");
      }

      const data = await response.json();
      console.log("Empresa cadastrada com sucesso:", data);

      showNotification("Empresa cadastrada com sucesso!", "success");
      setStep(3);
    } catch (err: any) {
      showNotification(err.message || "Erro inesperado", "error");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <CardContent className="p-10">
            <form onSubmit={handleSubmit1}>
              <div className="space-y-8">
                <div className="space-y-2">
                  <Label htmlFor="representante.nome">Nome do Cliente</Label>
                  <Input
                    id="representante.nome"
                    placeholder="Nome completo do cliente"
                    value={formData.representanteLegal.nome}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="representante.cpf">CPF</Label>
                  <Input
                    id="representante.cpf"
                    placeholder="Digite o CPF"
                    value={formData.representanteLegal.cpf}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="representante.email">E-mail</Label>
                  <Input
                    id="representante.email"
                    type="email"
                    placeholder="Digite o e-mail"
                    value={formData.representanteLegal.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="representante.telefone">Telefone</Label>
                  <Input
                    id="representante.telefone"
                    placeholder="Digite o telefone"
                    value={formData.representanteLegal.telefone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <CardFooter className="flex justify-end p-0 pt-8">
                <Button
                  type="submit"
                  disabled={!isStepOneComplete()}
                  className="bg-[#7C3AED] hover:bg-[#6D28D9] disabled:bg-gray-300 dark:text-white"
                >
                  Continuar
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        );
      case 2:
        return (
          <CardContent className="p-10">
            <form onSubmit={handleSubmit2} className="space-y-8">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome da Empresa</Label>
                <Input
                  id="nome"
                  placeholder="Nome completo da empresa"
                  value={formData.nome}
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
                <Label htmlFor="email">E-mail Corporativo</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite o e-mail corporativo"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone da Empresa</Label>
                <Input
                  id="telefone"
                  placeholder="Digite o telefone da empresa"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="setorAtuacao">Setor de Atuação</Label>
                <Select
                  value={formData.setorAtuacao}
                  onValueChange={handleSelectChange}
                  required
                >
                  <SelectTrigger id="setorAtuacao">
                    <SelectValue placeholder="Selecione o setor de atuação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TECNOLOGIA">Tecnologia</SelectItem>
                    <SelectItem value="SAUDE">Saúde</SelectItem>
                    <SelectItem value="EDUCACAO">Educação</SelectItem>
                    <SelectItem value="FINANCEIRO">Financeira</SelectItem>
                    <SelectItem value="SERVICOS">Serviços</SelectItem>
                    <SelectItem value="INDUSTRIA">Indústria</SelectItem>
                    <SelectItem value="GESTAO">Gestão</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <CardFooter className="flex justify-end p-0 pt-4">
                <Button
                  type="submit"
                  className="bg-[#7C3AED] hover:bg-[#6D28D9] dark:text-white"
                  disabled={!isStepTwoComplete()}
                >
                  Continuar
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        );
      case 3:
        return (
          <>
            <CardContent className="p-10">
              <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                <div className="w-full md:w-1/2 space-y-8">
                  <div className="space-y-2">
                    <Label>Nome da Empresa</Label>
                    <Input
                      value={formData.nome}
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
                    <Label>Telefone da Empresa</Label>
                    <Input
                      value={formData.telefone}
                      className="border-gray-200 bg-gray-50"
                      readOnly
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Setor de Atuação</Label>
                    <Input
                      value={formData.setorAtuacao}
                      className="border-gray-200 bg-gray-50"
                      readOnly
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Nome do Representante</Label>
                    <Input
                      value={formData.representanteLegal.nome}
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
              <Button
                className="bg-[#7C3AED] hover:bg-[#6D28D9] dark:text-white"
                onClick={() => router.push("/dashboard")}
              >
                Finalizar
              </Button>
            </CardFooter>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full p-4 flex items-center justify-center bg-gray-100 dark:bg-darkMain">
      <Card className="w-full max-w-7xl bg-white dark:bg-darkSecond shadow-lg border-[#7C3AED] border-2">
        <CardHeader className="space-y-1 p-6">
          <div className="flex items-center justify-between mx-3">
            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full ${
                  step >= 1 ? "bg-[#7C3AED]" : "bg-gray-300"
                } text-white flex items-center justify-center text-sm font-medium`}
              >
                1
              </div>
              <CardTitle className="text-sm font-medium text-gray-600">
                Cliente
              </CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full ${
                  step >= 2 ? "bg-[#7C3AED]" : "bg-gray-300"
                } text-white flex items-center justify-center text-sm font-medium`}
              >
                2
              </div>
              <span className="text-sm font-medium text-gray-600">Empresa</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full ${
                  step >= 3 ? "bg-[#7C3AED]" : "bg-gray-300"
                } text-white flex items-center justify-center text-sm font-medium`}
              >
                3
              </div>
              <span className="text-sm font-medium text-gray-600">
                Finalizar
              </span>
            </div>
          </div>
        </CardHeader>
        {renderStep()}
      </Card>
      {notification && (
        <div
          className={`fixed bottom-4 right-4 p-4 rounded-md ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
}
