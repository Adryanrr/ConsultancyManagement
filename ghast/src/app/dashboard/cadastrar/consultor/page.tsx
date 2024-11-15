"use client";

import { ChangeEvent, useState } from "react";
import { ChevronLeft } from "lucide-react";
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

export default function CadastrarConsultor() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    email: "",
    phone: "",
    type: "",
    size: "",
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value }));
  };

  const isStepOneComplete = () => {
    return Object.values(formData).every((value) => value !== "");
  };

  const handleNext = () => {
    if (isStepOneComplete()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isStepOneComplete()) {
      console.log("Form submitted:", formData);
    }
  };

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
                <CardTitle className="text-sm font-medium text-gray-600">
                  Empresa
                </CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#7C3AED] text-white flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <span className="text-sm font-medium text-gray-600">
                  Finalizar
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-12">
              <div className="w-full md:w-1/2 space-y-8">
                <div className="space-y-2">
                  <Label>Nome do Consultor</Label>
                  <Input
                    value={formData.name}
                    className="border-gray-200 bg-gray-50"
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label>CPF</Label>
                  <Input
                    value={formData.cpf}
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
                  <Label>Tipo de Mentoria</Label>
                  <Input
                    value={formData.type}
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
    );
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
              <CardTitle className="text-sm font-medium text-gray-600">
                Dados
              </CardTitle>
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
          <div className="grid md:grid-cols-[1fr,1px,1fr] gap-12 grid-cols-[1fr]">
            <div className="space-y-6">
              <div className="profile-image-uploader">
                {!selectedImage && (
                  <label
                    htmlFor="fileInput"
                    className="custom-file-upload cursor-pointer"
                  >
                    <img
                      src="/assets/ImgPerfil.svg"
                      alt="Profile Image"
                      className="w-32 h-32 rounded-full object-cover"
                    />
                  </label>
                )}
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                {selectedImage && (
                  <div className="flex justify-center">
                    <img
                      src={selectedImage}
                      alt="Imagem de Perfil"
                      className="w-32 h-32 rounded-full object-cover"
                    />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Consultoria</Label>
                <div className="border w-full h-[2px] border-black dark:border-white"></div>

                <Select
                  value={formData.type}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Selecione o tipo de consultoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TI">TI</SelectItem>
                    <SelectItem value="Gestão">
                      Gestão
                    </SelectItem>
                    <SelectItem value="Financeira">Financeira</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="size">Tamanho do negócio</Label>
                <div className="border w-full h-[2px] border-black dark:border-white"></div>

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
            <div className="bg-gray-200 w-px h-full" />
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  placeholder="Nome completo"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  placeholder="Digite o CPF"
                  value={formData.cpf}
                  onChange={handleInputChange}
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
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  placeholder="Digite o telefone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
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
  );
}
