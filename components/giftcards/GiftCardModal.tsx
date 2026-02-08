"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import GiftPersonalization from "./GiftPersonalization";
import GiftDelivery from "./GiftDelivery";
import GiftPaymentSummary from "./GiftPaymentSummary";
import { X } from "lucide-react";

interface GiftCardModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedValue: number | null;
    selectedTotal: number | null;
    onProceedToPayment: (data: { recipientName: string; senderName: string; email: string }) => void;
}

const GiftCardModal = ({
    isOpen,
    onClose,
    selectedValue,
    selectedTotal,
    onProceedToPayment,
}: GiftCardModalProps) => {
    const [recipientName, setRecipientName] = useState("");
    const [senderName, setSenderName] = useState("");
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [whatsappNumber, setWhatsappNumber] = useState("");
    const [sendViaWhatsapp, setSendViaWhatsapp] = useState(false);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const handlePayment = () => {
        onProceedToPayment({
            recipientName,
            senderName,
            email
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 bg-background border-champagne/20">
                <DialogHeader className="p-6 pb-0 sticky top-0 bg-background z-20 border-b border-border/50">
                    <div className="flex items-center justify-between">
                        <div>
                            <DialogTitle className="font-heading text-2xl text-foreground">
                                Personalize Your Gift Card
                            </DialogTitle>
                            <DialogDescription className="font-body text-sm text-muted-foreground mt-1">
                                Value: <span className="text-champagne font-medium">{selectedValue ? formatCurrency(selectedValue) : "—"}</span>
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="p-6 space-y-8">
                    <GiftPersonalization
                        recipientName={recipientName}
                        senderName={senderName}
                        message={message}
                        selectedValue={selectedValue}
                        onRecipientNameChange={setRecipientName}
                        onSenderNameChange={setSenderName}
                        onMessageChange={setMessage}
                    />

                    <GiftDelivery
                        email={email}
                        whatsappNumber={whatsappNumber}
                        sendViaWhatsapp={sendViaWhatsapp}
                        onEmailChange={setEmail}
                        onWhatsappChange={setWhatsappNumber}
                        onWhatsappToggle={setSendViaWhatsapp}
                    />

                    <GiftPaymentSummary
                        selectedValue={selectedValue}
                        selectedTotal={selectedTotal}
                        recipientName={recipientName}
                        email={email}
                        onProceedToPayment={handlePayment}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default GiftCardModal;
