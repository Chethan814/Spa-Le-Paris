"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, Gift, Copy, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GiftSuccessProps {
  giftCode: string;
  value: number;
  expiryDate: string;
  recipientName: string;
  onBackToHome: () => void;
}

const GiftSuccess = ({
  giftCode,
  value,
  expiryDate,
  recipientName,
  onBackToHome,
}: GiftSuccessProps) => {
  const { toast } = useToast();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(giftCode);
    toast({
      title: "Copied!",
      description: "Gift code copied to clipboard",
    });
  };

  const redemptionSteps = [
    "Visit any Spa Le Paris branch",
    "Present the gift code at reception",
    "Enjoy your wellness experience",
  ];

  return (
    <section className="min-h-screen flex items-center justify-center py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-lg mx-auto text-center animate-fade-in-up">
          {/* Success Icon */}
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-champagne/20 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-champagne" strokeWidth={1.5} />
          </div>

          {/* Confirmation Message */}
          <h1 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
            Gift Card Sent Successfully!
          </h1>
          <p className="font-body text-muted-foreground mb-10">
            A gift of wellness is on its way to {recipientName}.
          </p>

          {/* Gift Card Details */}
          <div className="bg-card rounded-3xl p-8 border border-champagne/20 shadow-card mb-10">
            <div className="flex items-center justify-between mb-6">
              <span className="font-body text-xs tracking-luxury uppercase text-champagne">
                Spa Le Paris
              </span>
              <Gift className="w-6 h-6 text-champagne" strokeWidth={1.5} />
            </div>

            <h3 className="font-heading text-2xl text-foreground mb-2">
              Gift Card Value
            </h3>
            <p className="font-heading text-4xl text-champagne mb-6">
              {formatCurrency(value)}
            </p>

            {/* Gift Code */}
            <div className="bg-secondary/50 rounded-xl p-4 mb-6">
              <p className="font-body text-xs text-muted-foreground uppercase tracking-wide mb-2">
                Unique Gift Code
              </p>
              <div className="flex items-center justify-center gap-3">
                <span className="font-heading text-2xl text-foreground tracking-widest">
                  {giftCode}
                </span>
                <button
                  onClick={copyToClipboard}
                  className="p-2 rounded-lg hover:bg-champagne/10 transition-colors duration-300"
                >
                  <Copy className="w-5 h-5 text-champagne" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Expiry */}
            <p className="font-body text-sm text-muted-foreground">
              Valid until: <span className="text-foreground">{expiryDate}</span>
            </p>
          </div>

          {/* How to Redeem */}
          <div className="bg-secondary/30 rounded-2xl p-6 mb-10 text-left">
            <h4 className="font-heading text-xl text-foreground mb-4 text-center">
              How to Redeem
            </h4>
            <ol className="space-y-3">
              {redemptionSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-champagne/20 text-champagne text-sm flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="font-body text-sm text-muted-foreground">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Back Button */}
          <Button
            variant="outline"
            size="lg"
            onClick={onBackToHome}
            className="border-champagne text-champagne-dark hover:bg-champagne hover:text-white transition-all duration-500"
          >
            <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={1.5} />
            Back to Home
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GiftSuccess;
