"use client" // Indica que este componente é um cliente React no Next.js, executado no lado do cliente.

import * as React from "react"
import { Check, ChevronRight } from 'lucide-react' // Importa ícones do pacote 'lucide-react'.
import { cn } from "@/lib/utils" // Função auxiliar para combinar classes CSS.
import { Button } from "@/components/ui/button" // Importa o componente Button.
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card" // Importa componentes de Card.

interface Step {
  // Define o tipo Step, representando cada etapa do formulário multi-etapas.
  title: string // Título da etapa.
  component: React.ComponentType<{ // Componente que será renderizado para esta etapa.
    onNext: () => void // Função para ir para a próxima etapa.
    onBack: () => void // Função para voltar para a etapa anterior.
    isLastStep: boolean // Indica se é a última etapa.
    currentStep: number // Número da etapa atual.
  }>
}

interface MultiStepFormProps {
  // Define as propriedades do formulário multi-etapas.
  steps: Step[] // Array das etapas do formulário.
  onComplete: (data: any) => void // Função chamada ao finalizar o formulário.
  className?: string // Classe CSS opcional para estilizar o formulário.
}

export function MultiStepForm({ steps, onComplete, className }: MultiStepFormProps) {
  // Componente principal do formulário multi-etapas.
  
  const [currentStep, setCurrentStep] = React.useState(0) // Estado para armazenar o índice da etapa atual.
  const [formData, setFormData] = React.useState({}) // Estado para armazenar os dados do formulário.

  const CurrentStepComponent = steps[currentStep].component // Componente da etapa atual.
  const isLastStep = currentStep === steps.length - 1 // Checa se a etapa atual é a última.

  const handleNext = () => {
    // Função para avançar para a próxima etapa.
    if (isLastStep) {
      onComplete(formData) // Chama onComplete com os dados do formulário se for a última etapa.
    } else {
      setCurrentStep((prev) => prev + 1) // Incrementa para a próxima etapa.
    }
  }

  const handleBack = () => {
    // Função para voltar para a etapa anterior.
    setCurrentStep((prev) => Math.max(0, prev - 1)) // Decrementa a etapa atual, mas não permite valores negativos.
  }

  return (
    <div className="flex items-start justify-center w-full p-6">
      <Card className={cn(
        "w-full bg-white dark:bg-darkSecond",
        "shadow-lg max-w-full mx-auto border-2 border-[#7C3AED]",
        className
      )}>
        <CardHeader className="">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center space-x-2">
              {steps.map((step, index) => (
                <React.Fragment key={step.title}>
                  <div
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors",
                      index === currentStep
                        ? "border-purple-600 bg-purple-600 text-white" // Etapa atual estilizada em roxo.
                        : index < currentStep
                          ? "border-purple-600 bg-purple-600 text-white" // Etapas concluídas em roxo.
                          : "border-gray-300 dark:border-gray-600 text-gray-300 dark:text-gray-600" // Etapas futuras em cinza.
                    )}
                  >
                    {index < currentStep ? (
                      <Check className="w-4 h-4" /> // Ícone de verificação para etapas concluídas.
                    ) : (
                      <span>{index + 1}</span> // Número da etapa para etapas não concluídas.
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <ChevronRight
                      className={cn(
                        "w-4 h-4",
                        index < currentStep 
                          ? "text-purple-600" 
                          : "text-gray-300 dark:text-gray-600"
                      )}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
               Passo {currentStep + 1} de {steps.length} {/*// Exibe o passo atual e o total. */}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <CurrentStepComponent
            // Renderiza o componente da etapa atual com as props onNext, onBack, isLastStep e currentStep.
            onNext={handleNext}
            onBack={handleBack}
            isLastStep={isLastStep}
            currentStep={currentStep}
          />
        </CardContent>
      </Card>
    </div>
  )
}
export function FormStep({
  children,
  onNext,
  onBack,
  isLastStep,
  currentStep,
  className = "", // Classe opcional para customização adicional
  footerClassName = "", // Classe opcional para customizar o rodapé
}: {
  children: React.ReactNode
  onNext: () => void
  onBack: () => void
  isLastStep: boolean
  currentStep: number
  className?: string // Prop opcional para personalização de estilos
  footerClassName?: string // Prop opcional para personalização do rodapé
}) {
  return (
    <div className={`space-y-6 justify-between flex flex-col ${className}`}>
      {/* Renderiza o conteúdo dos filhos diretamente, permitindo alta customização */}
      {children}

      <CardFooter className={`flex justify-between px-0 pb-0 pt-0 ${footerClassName}`}>
        <Button
          variant="outline"
          onClick={onBack}
          className={cn(
            "text-purple-600 border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/20 bg-white dark:bg-transparent",
            currentStep === 0 && "opacity-0 pointer-events-none"
          )}
        >
          Voltar
        </Button>
        <div className="flex-grow" />
        <Button
          onClick={onNext}
          className="bg-purple-600 text-white hover:bg-purple-700"
        >
          {isLastStep ? "Finalizar" : "Continuar"}
        </Button>
      </CardFooter>
    </div>
  );
}
