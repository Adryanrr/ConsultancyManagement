"use client"

import * as React from "react"
import { Check, ChevronRight } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface Step {
  title: string
  component: React.ComponentType<{
    onNext: () => void
    onBack: () => void
    isLastStep: boolean
    currentStep: number
  }>
}

interface MultiStepFormProps {
  steps: Step[]
  onComplete: (data: any) => void
  className?: string
}

export function MultiStepForm({ steps, onComplete, className }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [formData, setFormData] = React.useState({})

  const CurrentStepComponent = steps[currentStep].component
  const isLastStep = currentStep === steps.length - 1

  const handleNext = () => {
    if (isLastStep) {
      onComplete(formData)
    } else {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1))
  }

  return (
    <div className="flex items-start justify-center w-full p-6">
      <Card className={cn(
        "w-full bg-white dark:bg-darkSecond min-h-[calc(100vh-8rem)]",
        "shadow-lg border-none max-w-full mx-auto",
        className
      )}>
        <CardHeader className="border-b dark:border-gray-800">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center space-x-2">
              {steps.map((step, index) => (
                <React.Fragment key={step.title}>
                  <div
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors",
                      index === currentStep
                        ? "border-purple-600 bg-purple-600 text-white"
                        : index < currentStep
                          ? "border-purple-600 bg-purple-600 text-white"
                          : "border-gray-300 dark:border-gray-600 text-gray-300 dark:text-gray-600"
                    )}
                  >
                    {index < currentStep ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <span>{index + 1}</span>
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
              Passo {currentStep + 1} de {steps.length}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <CurrentStepComponent
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
}: {
  children: React.ReactNode
  onNext: () => void
  onBack: () => void
  isLastStep: boolean
  currentStep: number
}) {
  const childrenArray = React.Children.toArray(children)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row flex-wrap gap-6 relative">
        <div className="flex flex-col space-y-4 flex-1">
          {React.Children.map(childrenArray[0], (child) => (
            <div className="flex-1 flex flex-col justify-end">
              {child}
            </div>
          ))}
        </div>
        <div className="flex flex-col space-y-4 md:pt-0 pt-4 border-t md:border-t-0 dark:border-gray-800 flex-1">
          {React.Children.map(childrenArray[1], (child) => (
            <div className="flex-1 flex flex-col justify-end">
              {child}
            </div>
          ))}
        </div>
        <div className="absolute top-0 bottom-0 left-1/2 -ml-px hidden md:block">
          <div className="border-l border-gray-200 dark:border-gray-800 h-full"></div>
        </div>
      </div>
      <CardFooter className="flex justify-between px-0 pb-0 pt-6">
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
  )
}