'use client'

import Pagina from "@/components/template/Pagina"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Component() {
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
              3
            </div>
            <span>Finalizar</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <form className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="company-name">Nome da Empresa</Label>
              <Input
                id="company-name"
                placeholder="Nome completo da empresa"
                className="border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input
                id="cnpj"
                placeholder="Digite o CNPJ"
                className="border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="corporate-email">E-mail Corporativo</Label>
              <Input
                id="corporate-email"
                type="email"
                placeholder="Digite o e-mail corporativo"
                className="border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sector">Setor de Atuação</Label>
              <Input
                id="sector"
                placeholder="Digite uma descrição da atuação"
                className="border-gray-300"
              />
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="representative-name">Nome do Representante</Label>
              <Input
                id="representative-name"
                placeholder="Nome completo da empresa"
                className="border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                placeholder="Digite o CNPJ"
                className="border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite o e-mail"
                className="border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                placeholder="Digite o telefone"
                className="border-gray-300"
              />
            </div>
          </div>
          <div className="md:col-span-2 flex justify-between mt-4">
            <Button
              variant="outline"
              className="text-purple-600 border-purple-600 hover:bg-purple-50"
            >
              VOLTAR
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              CONTINUAR
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
    </Pagina>
  )
}