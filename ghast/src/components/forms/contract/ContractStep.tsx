import { FormStep } from "@/components/ui/MultiStepForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormData } from "@/app/dashboard/cadastrar/contrato/page";
import jsPDF from "jspdf";

interface ContractPreviewStepProps {
  onNext: () => void;
  onBack: () => void;
  isLastStep: boolean;
  currentStep: number;
  formData: FormData;
}

export function ContractPreviewStep({
  onNext,
  onBack,
  isLastStep,
  currentStep,
  formData,
}: ContractPreviewStepProps) {
  const contractText = `
CONTRATO DE PRESTAÇÃO DE SERVIÇOS

IDENTIFICAÇÃO DAS PARTES CONTRATANTES

CONTRATANTE: ${formData.companyName}, pessoa jurídica de direito ${
    formData.companyType
  }, portadora do CNPJ no 00.111.222/3456-78, neste ato representada por seu sócio administrador ${
    formData.representativeName
  }, brasileiro, empresário, portador do CPF no 000.000.000-10.

CONTRATADA: GHAST CONSULTORIA E GESTÃO, pessoa jurídica de direito privado, portadora do CNPJ 15.209.224/0001-34, com sede na Rua Dr. José Auto de Abreu no 2929, Bairro São Cristóvão, Teresina-PI, CEP 64.055-260, neste ato representada pelo seu sócio administrador André Nogueira Barbosa Dantas Teixeira, brasileiro, casado, empresário, portador do CPF no 293.493.234-44, residente e domiciliado na Av. Miguel Rosa no 5387, Bairro Macauba, Teresina-PI, CEP 64.016-010.

As partes acima qualificadas celebram o presente contrato, mediante as cláusulas seguintes:

CLÁUSULA PRIMEIRA (objeto) – O presente contrato tem por objeto a prestação de serviços de Consultoria de ${
    formData.consultationType
  }.

CLÁUSULA SEGUNDA (remuneração) – Pela prestação de serviços a que se refere a cláusula primeira, a CONTRATANTE pagará ao CONTRATADO, o valor de R$ $120,000,00.

CLÁUSULA TERCEIRA (dos documentos necessários) – A CONTRATANTE se obriga a fornecer os documentos necessários e prestar as informações solicitadas, desde que necessárias à execução dos serviços especificados na Cláusula Primeira.

CLÁUSULA QUARTA (da procuração) – A CONTRATANTE outorgará poderes ao CONTRATADO, mediante procuração, a fim de que possa, em conjunto, ou separadamente, representá-lo perante as repartições públicas e privadas que sejam necessárias para a prestação do serviço.

CLÁUSULA QUINTA (dos ônus) - Ficará o CONTRATADO desobrigado de quaisquer ônus, seja a que título for, de valores que tenham que ser pagos para conseguir as documentações necessárias para a adequada prestação do serviço e outras que porventura se façam necessárias, sob a responsabilidade do CONTRATANTE.

CLÁUSULA SEXTA (da sucessão) – O presente contrato obriga as partes e seus sucessores ao fiel cumprimento dos termos nele contidos, ficando estes últimos obrigados a fornecer ao CONTRATADO os documentos necessários para a devida habilitação nas ações judiciais objeto do presente contrato, quando necessárias.

E, por estarem, assim, justos e contratados, assinam o presente instrumento em duas vias de igual teor e forma, para os devidos fins de direito, juntamente com as testemunhas abaixo, igualmente subscritas, elegendo o foro da cidade de Teresina-PI, como único competente para dirimir quaisquer controvérsias oriundas do presente contrato, com renúncia expressa a qualquer outro, por mais especial e privilegiado que seja.

5. STATUS DO CLIENTE
5.1 O cliente é classificado como: ${formData.isVip ? "VIP" : "Regular"}
`;

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("CONTRATO DE PRESTAÇÃO DE SERVIÇOS", 10, 10);
    doc.text(contractText, 10, 20);
    doc.save("contrato.pdf");
  };

  return (
    <FormStep
      onNext={onNext}
      onBack={onBack}
      isLastStep={isLastStep}
      currentStep={currentStep}
    >
      
        <div className="space-y-4">
          <ScrollArea className="h-[360px] w-full rounded-md border p-6 bg-white dark:bg-darkMain dark:text-white">
            <pre className="whitespace-pre-wrap font-sans text-sm">
              {contractText}
            </pre>
          </ScrollArea>
        </div>

        {/* Segunda parte */}

        <div className="space-y-4">
          <div className="p-4 rounded-md border-gray-300 dark:bg-darkMain ">
            <h2 className="text-lg font-bold mb-2">Detalhes do Contrato</h2>
            <h3 className="font-semibold">
              CONTRATANTE:{" "}
              <span className="font-normal">{formData.companyName}</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              CNPJ Nº 00.111.422/0001-69
            </p>
            <h3 className="font-semibold mt-2">
              CONTRATADO:{" "}
              <span className="font-normal">GHAST CONSULTORIA E GESTÃO</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              CNPJ Nº 15.209.224/0001-34
            </p>
            <h3 className="font-semibold mt-2">
              VALOR DO CONTRATO:{" "}
              <span className="font-normal">R$ 122.000,00</span>
            </h3>
            {/* Botão para gerar PDF */}
            <button
              onClick={generatePDF}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Gerar PDF
            </button>
          </div>
        </div>
      
    </FormStep>
  );
}
