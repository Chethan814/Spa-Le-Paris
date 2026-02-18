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
    onPaymentError?: (message: string) => void;
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
    onPaymentError,
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
            console.log("Initiating payment for amount:", selectedValue);
            console.log("Key ID Check:", {
                length: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.length || 0,
                prefix: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.slice(0, 8)
            });

            // 1. Create Order
            const response = await fetch("/api/razorpay/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: selectedValue * 100, // Amount in paise
                    currency: "INR",
                    receipt: `rcpt_${Date.now()}`,
                    notes: {
                        gift_value: selectedValue,
                        recipient_email: email,
                        sender_name: senderName,
                    },
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Order Creation Failed:", errorData);
                throw new Error(errorData.error || "Failed to create order");
            }

            const order = await response.json();
            console.log("Order Created Successfully:", order);

            // 2. Initialize Razorpay
            if (!window.Razorpay) {
                console.error("Razorpay SDK not loaded");
                throw new Error("Razorpay SDK not loaded. Please check your internet connection.");
            }

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "Spa Le Paris",
                description: `Gift Card - ${formatCurrency(selectedValue)}`,
                order_id: order.id,
                handler: async function (response: any) {
                    console.log("Payment Success Handler Triggered", response);
                    setIsProcessing(true); // Re-show loading if needed
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
                            console.log("Payment Verified Successfully");
                            onProceedToPayment({
                                recipientName,
                                senderName,
                                email,
                                giftCode: verifyData.giftCode
                            });
                        } else {
                            console.error("Verification Failed:", verifyData);
                            toast.error("Payment verification failed. Please contact support.");
                        }
                    } catch (error) {
                        console.error("Verification Error:", error);
                        toast.error("Error verifying payment");
                    } finally {
                        setIsProcessing(false);
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
                        console.log("Razorpay modal dismissed");
                        setIsProcessing(false);
                    }
                }
            };

            console.log("Opening Razorpay with options:", { ...options, key: "MASKED" });

            // CRITICAL FIX: Close Radix modal first to prevent focus trap
            onClose();

            // Wait for modal to unmount/close completely
            setTimeout(() => {
                try {
                    const rzp = new window.Razorpay(options);
                    rzp.on("payment.failed", function (response: any) {
                        const errorMsg = response.error?.description || "Payment failed or was cancelled";
                        toast.error(errorMsg);
                        setIsProcessing(false);
                        if (onPaymentError) onPaymentError(errorMsg);
                    });
                    rzp.open();
                } catch (e: any) {
                    console.error("Error creating Razorpay instance:", e);
                    toast.error("Failed to initialize payment window");
                    setIsProcessing(false);
                    if (onPaymentError) onPaymentError(e.message);
                }
            }, 300);

        } catch (error: any) {
            console.error("handlePayment Error:", error);
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
