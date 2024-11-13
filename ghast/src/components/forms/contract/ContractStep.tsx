import { FormStep } from "@/components/ui/MultiStepForm"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FormData } from "@/app/dashboard/cadastrar/contrato/page"

interface ContractPreviewStepProps {
  onNext: () => void
  onBack: () => void
  isLastStep: boolean
  currentStep: number
  formData: FormData
}

export function ContractPreviewStep({ onNext, onBack, isLastStep, currentStep, formData }: ContractPreviewStepProps) {
  const contractText = `
CONTRATO DE PRESTAÇÃO DE SERVIÇOS

IDENTIFICAÇÃO DAS PARTES CONTRATANTES

CONTRATANTE: ${formData.companyName}, representada por ${formData.representativeName}, doravante denominada CONTRATANTE.

CONTRATADA: GHAST CONSULTORIA, empresa prestadora de serviços de ${formData.consultationType}, representada por ${formData.consultant}, doravante denominada CONTRATADA.

1. OBJETO DO CONTRATO
1.1 O presente contrato tem como objeto a prestação de serviços de consultoria em ${formData.consultationType} pela CONTRATADA à CONTRATANTE.

2. VIGÊNCIA
2.1 O presente contrato terá vigência de ${formData.startDate} a ${formData.endDate}.

3. VALOR E FORMA DE PAGAMENTO
3.1 O valor dos serviços será acordado conforme proposta comercial específica.

4. OBRIGAÇÕES DAS PARTES
4.1 A CONTRATADA se compromete a:
   a) Prestar os serviços com qualidade e profissionalismo
   b) Manter sigilo sobre as informações confidenciais
   
4.2 A CONTRATANTE se compromete a:
   a) Fornecer as informações necessárias
   b) Realizar os pagamentos conforme acordado

5. STATUS DO CLIENTE
5.1 O cliente é classificado como: ${formData.isVip ? 'VIP' : 'Regular'}
`
  return (
    <FormStep onNext={onNext} onBack={onBack} isLastStep={isLastStep} currentStep={currentStep}>
      <div className="col-span-2">
        <ScrollArea className="h-[600px] w-full rounded-md border p-6 bg-white dark:bg-gray-800 dark:text-white">
          <pre className="whitespace-pre-wrap font-sans text-sm">
            {contractText}
          </pre>
        </ScrollArea>
      </div>
    </FormStep>
  )
}