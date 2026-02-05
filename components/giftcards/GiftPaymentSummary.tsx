"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Lock, Shield } from "lucide-react";

interface GiftPaymentSummaryProps {
  selectedValue: number | null;
  selectedTotal: number | null;
  recipientName: string;
  email: string;
  onProceedToPayment: () => void;
}

const GiftPaymentSummary = ({
  selectedValue,
  selectedTotal,
  recipientName,
  email,
  onProceedToPayment,
}: GiftPaymentSummaryProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const gstAmount = selectedValue ? selectedValue * 0.05 : 0;
  const isFormValid = selectedValue && recipientName.trim() && email.trim();

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-lg mx-auto">
          {/* Payment Summary Card */}
          <div
            className={`bg-card rounded-3xl p-8 border border-champagne/20 shadow-card transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <h3 className="font-heading text-2xl text-foreground mb-6 text-center">
              Payment Summary
            </h3>

            {/* Summary Lines */}
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-3 border-b border-border/50">
                <span className="font-body text-muted-foreground">Gift Card Value</span>
                <span className="font-heading text-lg text-foreground">
                  {selectedValue ? formatCurrency(selectedValue) : "—"}
                </span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-border/50">
                <span className="font-body text-muted-foreground">GST (5%)</span>
                <span className="font-heading text-lg text-foreground">
                  {selectedValue ? formatCurrency(gstAmount) : "—"}
                </span>
              </div>

              <div className="flex justify-between items-center py-4">
                <span className="font-body text-foreground font-medium">Total Payable</span>
                <span className="font-heading text-2xl text-champagne">
                  {selectedTotal ? formatCurrency(selectedTotal) : "—"}
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              variant="gold"
              size="lg"
              className="w-full shadow-soft hover:shadow-glow transition-all duration-500 h-14 text-base"
              disabled={!isFormValid}
              onClick={onProceedToPayment}
            >
              <Lock className="w-4 h-4 mr-2" strokeWidth={1.5} />
              Proceed to Secure Payment
            </Button>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-2 mt-6 text-muted-foreground">
              <Shield className="w-4 h-4" strokeWidth={1.5} />
              <span className="font-body text-xs">Secure & encrypted payment</span>
            </div>

            {/* No Hidden Charges */}
            <p className="font-body text-xs text-center text-muted-foreground mt-4">
              No hidden charges. What you see is what you pay.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiftPaymentSummary;
