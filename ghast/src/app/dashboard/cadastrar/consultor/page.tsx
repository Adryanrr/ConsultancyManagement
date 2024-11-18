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

// Tipos para os campos de formulário
interface Consultor {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  tipo: string;
  tamanho: string;
}

export default function CadastrarConsultor() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Consultor>({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    tipo: "",
    tamanho: "",
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const API_BASE_URL = "http://localhost:8080/consultores";

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id in formData) {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleSelectChange = (value: string, field: keyof Consultor) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formData.nome,
          cpf: formData.cpf,
          email: formData.email,
          telefone: formData.telefone,
          especializacao: formData.tipo,
          tamanhoNegocio: formData.tamanho.toUpperCase(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao cadastrar consultor");
      }

      showNotification("Consultor cadastrado com sucesso!", "success");
      setFormData({
        nome: "",
        cpf: "",
        email: "",
        telefone: "",
        tipo: "",
        tamanho: "",
      });
      setStep(1);
    } catch (err: any) {
      showNotification(err.message || "Erro inesperado", "error");
    }
  };

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <div className="min-h-screen w-full p-4 flex items-center justify-center bg-gray-100 dark:bg-darkMain">
      <Card className="w-full max-w-7xl bg-white dark:bg-darkSecond shadow-lg border-[#7C3AED] border-2">
        <CardHeader className="space-y-1 p-6">
          <div className="flex items-center justify-between mx-3">
            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full ${
                  step === 1
                    ? "bg-[#7C3AED] text-white"
                    : "bg-gray-200 text-gray-400"
                } flex items-center justify-center text-sm font-medium`}
              >
                1
              </div>
              <CardTitle className="text-sm font-medium text-gray-600">
                Dados
              </CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full ${
                  step === 2
                    ? "bg-[#7C3AED] text-white"
                    : "bg-gray-200 text-gray-400"
                } flex items-center justify-center text-sm`}
              >
                2
              </div>
              <span className="text-sm font-medium text-gray-600">
                Finalizar
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-10">
          {step === 1 ? (
            <FirstStep
              formData={formData}
              selectedImage={selectedImage}
              onInputChange={handleInputChange}
              onSelectChange={handleSelectChange}
              onImageChange={handleImageChange}
            />
          ) : (
            <SecondStep formData={formData} />
          )}
        </CardContent>
        <CardFooter
          className={`p-10 pt-4 ${
            step === 1 ? "flex justify-end" : "flex justify-between"
          }`}
        >
          {step === 2 ? (
            <>
              <Button
                variant="outline"
                onClick={handleBack}
                className="text-[#7C3AED] border-[#7C3AED] hover:bg-[#7C3AED] hover:text-white dark:bg-darkSecond dark:hover:bg-[#7C3AED]"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white"
              >
                Finalizar
              </Button>
            </>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!isStepOneComplete()}
              className="bg-[#7C3AED] hover:bg-[#6D28D9] disabled:bg-gray-300 dark:text-white"
            >
              Continuar
            </Button>
          )}
        </CardFooter>
      </Card>
      {notification && (
        <div
          className={`fixed bottom-4 right-4 p-4 rounded shadow-lg ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white transition-opacity duration-300`}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
}

const FirstStep = ({
  formData,
  selectedImage,
  onInputChange,
  onSelectChange,
  onImageChange,
}: {
  formData: Consultor;
  selectedImage: string | null;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (value: string, field: keyof Consultor) => void;
  onImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="grid md:grid-cols-[1fr,1px,1fr] gap-12">
    <div className="space-y-6">
      <div className="profile-image-uploader">
        {!selectedImage && (
          <label htmlFor="fileInput" className="custom-file-upload cursor-pointer">
            <Image
              src="/assets/ImgPerfil.svg"
              alt="Imagem de Perfil"
              className="w-32 h-32 rounded-full object-cover"
              width={128}
              height={128}
            />
          </label>
        )}
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={onImageChange}
          className="hidden"
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
      <FieldGroup label="Tipo de Consultoria">
        <Select
          value={formData.tipo}
          onValueChange={(value) => onSelectChange(value, "tipo")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o tipo de consultoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TI">TI</SelectItem>
            <SelectItem value="GESTAO">Gestão</SelectItem>
            <SelectItem value="FINANCEIRO">Financeiro</SelectItem>
          </SelectContent>
        </Select>
      </FieldGroup>
      <FieldGroup label="Tamanho do Negócio">
        <div className="flex gap-4">
          {["Pequeno", "Médio", "Grande"].map((tamanho) => (
            <label key={tamanho} className="flex items-center gap-2">
              <input
                type="radio"
                name="tamanho"
                value={tamanho.toUpperCase()}
                onChange={(e) => onSelectChange(e.target.value, "tamanho")}
              />
              {tamanho}
            </label>
          ))}
        </div>
      </FieldGroup>
    </div>
    <div className="bg-gray-200 w-px h-full dark:bg-darkBorder" />
    <div className="space-y-6">
      {(["nome", "cpf", "email", "telefone"] as const).map((field) => (
        <FieldGroup key={field} label={capitalize(field)}>
          <Input
            id={field}
            placeholder={`Digite o ${field}`}
            value={formData[field]}
            onChange={onInputChange}
          />
        </FieldGroup>
      ))}
    </div>
  </div>
);

const SecondStep = ({ formData }: { formData: Consultor }) => (
  <div className="flex flex-col md:flex-row justify-between items-center gap-12">
    <div className="w-full md:w-1/2 space-y-8">
      {(["nome", "cpf", "telefone", "tipo"] as const).map((field) => (
        <FieldGroup key={field} label={capitalize(field)}>
          <Input value={formData[field]} readOnly className="bg-gray-50" />
        </FieldGroup>
      ))}
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
);

const FieldGroup = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    <div className="border w-full h-[2px] border-gray-200 dark:border-darkBorder" />
    {children}
  </div>
);

const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
