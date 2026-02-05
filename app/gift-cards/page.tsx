"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import GiftCardsHero from "@/components/giftcards/GiftCardsHero";
import GiftValueSelector from "@/components/giftcards/GiftValueSelector";
import GiftDetails from "@/components/giftcards/GiftDetails";
import GiftPersonalization from "@/components/giftcards/GiftPersonalization";
import GiftDelivery from "@/components/giftcards/GiftDelivery";
import GiftPaymentSummary from "@/components/giftcards/GiftPaymentSummary";
import GiftSuccess from "@/components/giftcards/GiftSuccess";

export default function GiftCardsPage() {
    const router = useRouter();

    // Form State
    const [selectedValue, setSelectedValue] = useState<number | null>(null);
    const [selectedTotal, setSelectedTotal] = useState<number | null>(null);
    const [recipientName, setRecipientName] = useState("");
    const [senderName, setSenderName] = useState("");
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [whatsappNumber, setWhatsappNumber] = useState("");
    const [sendViaWhatsapp, setSendViaWhatsapp] = useState(false);

    // Payment State
    const [showSuccess, setShowSuccess] = useState(false);
    const [giftCode, setGiftCode] = useState("");

    const handleSelectValue = (value: number, total: number) => {
        setSelectedValue(value);
        setSelectedTotal(total);
    };

    const generateGiftCode = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let code = "SLP-";
        for (let i = 0; i < 8; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    };

    const getExpiryDate = () => {
        const date = new Date();
        date.setMonth(date.getMonth() + 3);
        return date.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const handleProceedToPayment = () => {
        // In a real implementation, this would integrate with a payment gateway
        // For now, simulate a successful payment
        setGiftCode(generateGiftCode());
        setShowSuccess(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleBackToHome = () => {
        router.push("/");
    };

    if (showSuccess) {
        return (
            <main className="min-h-screen bg-background text-foreground">
                <Header />
                <GiftSuccess
                    giftCode={giftCode}
                    value={selectedValue || 0}
                    expiryDate={getExpiryDate()}
                    recipientName={recipientName}
                    onBackToHome={handleBackToHome}
                />
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Header />
            <GiftCardsHero />
            <GiftValueSelector
                selectedValue={selectedValue}
                onSelectValue={handleSelectValue}
            />
            <GiftDetails />
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
                onProceedToPayment={handleProceedToPayment}
            />
            <Footer />
        </main>
    );
}
