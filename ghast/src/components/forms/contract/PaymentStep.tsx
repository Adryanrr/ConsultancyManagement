import * as React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FormStep } from "@/components/ui/MultiStepForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, CreditCard, Banknote } from "lucide-react";
import { FormData } from "@/app/dashboard/cadastrar/contrato/page";

interface PaymentStepProps {
    onNext: () => void;
    onBack: () => void;
    isLastStep: boolean;
    currentStep: number;
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
}

export function PaymentStep({ onNext, onBack, isLastStep, currentStep, formData, updateFormData }: PaymentStepProps) {
    const handleInputChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        updateFormData({ [field]: e.target.value });
    };

    const handlePaymentMethodChange = (value: string) => {
        updateFormData({ paymentMethod: value });
    };

    return (
        <FormStep onNext={onNext} onBack={onBack} isLastStep={isLastStep} currentStep={currentStep}>
            <div className="">
                {/* Accordion for Payment Methods */}
                <div className="">
                    <Accordion type="single" value={formData.paymentMethod} onValueChange={handlePaymentMethodChange} className="w-full space-y-2">
                        {/* Credit Card Option */}
                        <AccordionItem value="credit_card" className="  rounded-lg bg-white dark:bg-darkMain">
                            <AccordionTrigger className="px-4 hover:no-underline">
                                <div className="flex items-center gap-2">
                                    <CreditCard className="h-5 w-5" />
                                    <span>Cartão de Crédito</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="cardNumber">Número do Cartão</Label>
                                    <Input
                                        id="cardNumber"
                                        placeholder="1234 5678 9012 3456"
                                        value={formData.cardNumber}
                                        onChange={handleInputChange("cardNumber")}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cardHolder">Nome no Cartão</Label>
                                    <Input
                                        id="cardHolder"
                                        placeholder="Nome Completo"
                                        value={formData.cardHolder}
                                        onChange={handleInputChange("cardHolder")}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="expiryDate">Data de Expiração</Label>
                                        <Input
                                            id="expiryDate"
                                            placeholder="MM/AA"
                                            value={formData.expiryDate}
                                            onChange={handleInputChange("expiryDate")}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cvv">CVV</Label>
                                        <Input
                                            id="cvv"
                                            placeholder="123"
                                            value={formData.cvv}
                                            onChange={handleInputChange("cvv")}
                                            required
                                        />
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        {/* Bank Transfer Option */}
                        <AccordionItem value="bank_transfer" className=" rounded-lg bg-white dark:bg-darkMain">
                            <AccordionTrigger className="px-4 hover:no-underline">
                                <div className="flex items-center gap-2">
                                    <Banknote className="h-5 w-5" />
                                    <span>Transferência Bancária</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4">
                                <div className="text-center text-gray-600">Informe os dados de transferência em seguida.</div>
                            </AccordionContent>
                        </AccordionItem>

                        {/* PIX Option */}
                        <AccordionItem value="pix" className=" rounded-lg bg-white dark:bg-darkMain">
                            <AccordionTrigger className="px-4 hover:no-underline">
                                <div className="flex items-center gap-2">
                                    <QrCode className="h-5 w-5" />
                                    <span>PIX</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4">
                                <div className="flex justify-center p-4">
                                    <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <QrCode className="h-24 w-24 text-gray-400" />
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

            </div>
            <div className="space-y-4">
                <Card>
                    <CardContent className="p-6 dark:bg-darkMain rounded-lg">
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Resumo do Pagamento</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Valor:</span>
                                    <span>R$ X.XXX,XX</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Desconto:</span>
                                    <span>R$ X.XXX,XX</span>
                                </div>
                                <div className="h-px bg-gray-200 my-2" />
                                <div className="flex justify-between font-semibold">
                                    <span>Total:</span>
                                    <span>R$ X.XXX,XX</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </FormStep>
    );
}
