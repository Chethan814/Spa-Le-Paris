import Script from "next/script";
import { toast } from "sonner";
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
    onProceedToPayment: (data: { recipientName: string; senderName: string; email: string; giftCode: string }) => void;
}

declare global {
    interface Window {
        Razorpay: any;
    }
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
    const [isProcessing, setIsProcessing] = useState(false);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const handlePayment = async () => {
        if (!selectedValue) return;
        setIsProcessing(true);

        try {
            // 1. Create Order
            const response = await fetch("/api/razorpay/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: selectedValue * 100, // Amount in paise
                    currency: "INR",
                    notes: {
                        gift_value: selectedValue,
                        recipient_email: email,
                        sender_name: senderName,
                    },
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Failed to create order");
            }

            const order = await response.json();

            // 2. Initialize Razorpay
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "Spa Le Paris",
                description: `Gift Card - ${formatCurrency(selectedValue)}`,
                order_id: order.id,
                handler: async function (response: any) {
                    try {
                        const verifyRes = await fetch("/api/razorpay/verify", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                amount: selectedValue,
                                recipient_email: email,
                                sender_name: senderName,
                            }),
                        });

                        const verifyData = await verifyRes.json();

                        if (verifyData.success) {
                            onProceedToPayment({
                                recipientName,
                                senderName,
                                email,
                                giftCode: verifyData.giftCode
                            });
                        } else {
                            toast.error("Payment verification failed. Please contact support.");
                        }
                    } catch (error) {
                        toast.error("Error verifying payment");
                        console.error(error);
                    }
                },
                prefill: {
                    name: senderName,
                    email: email,
                    contact: whatsappNumber,
                },
                theme: {
                    color: "#D4AF37", // Champagne Gold
                },
                modal: {
                    ondismiss: function () {
                        setIsProcessing(false);
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.on("payment.failed", function (response: any) {
                toast.error(response.error.description || "Payment failed");
                setIsProcessing(false);
            });
            rzp.open();

        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Something went wrong");
            setIsProcessing(false);
        }
    };

    return (
        <>
            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
            />
            <Dialog open={isOpen} onOpenChange={(open) => !isProcessing && onClose()}>
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
        </>
    );
};

export default GiftCardModal;
