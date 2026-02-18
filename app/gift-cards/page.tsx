"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import GiftCardsHero from "@/components/giftcards/GiftCardsHero";
import GiftValueSelector from "@/components/giftcards/GiftValueSelector";
import GiftCardModal from "@/components/giftcards/GiftCardModal";
import GiftSuccess from "@/components/giftcards/GiftSuccess";
import GiftDetails from "@/components/giftcards/GiftDetails";

export default function GiftCardsPage() {
    const router = useRouter();

    // Form State
    const [selectedValue, setSelectedValue] = useState<number | null>(null);
    const [selectedTotal, setSelectedTotal] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Success State
    const [showSuccess, setShowSuccess] = useState(false);
    const [giftCode, setGiftCode] = useState("");
    const [finalRecipientName, setFinalRecipientName] = useState("");

    const handleSelectValue = (value: number, total: number) => {
        setSelectedValue(value);
        setSelectedTotal(total);
        setIsModalOpen(true);
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

    const handleProceedToPayment = (data: { recipientName: string; giftCode: string }) => {
        setGiftCode(data.giftCode);
        setFinalRecipientName(data.recipientName);
        setIsModalOpen(false);
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
                    recipientName={finalRecipientName || "Recipient"}
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

            <GiftCardModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                selectedValue={selectedValue}
                selectedTotal={selectedTotal}
                onProceedToPayment={handleProceedToPayment}
                onPaymentError={(msg) => {
                    console.error("Payment error reported to page:", msg);
                    setIsModalOpen(true);
                }}
            />
            <GiftDetails />

            <Footer />
        </main>
    );
}
