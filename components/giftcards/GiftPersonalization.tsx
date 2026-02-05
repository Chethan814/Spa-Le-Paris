"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Gift } from "lucide-react";

interface GiftPersonalizationProps {
  recipientName: string;
  senderName: string;
  message: string;
  selectedValue: number | null;
  onRecipientNameChange: (name: string) => void;
  onSenderNameChange: (name: string) => void;
  onMessageChange: (message: string) => void;
}

const GiftPersonalization = ({
  recipientName,
  senderName,
  message,
  selectedValue,
  onRecipientNameChange,
  onSenderNameChange,
  onMessageChange,
}: GiftPersonalizationProps) => {
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

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span
            className={`font-body text-xs tracking-luxury uppercase text-champagne mb-4 block transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            Personalize Your Gift
          </span>
          <h2
            className={`font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            Add a Personal Touch
          </h2>
          <p
            className={`font-body text-muted-foreground max-w-xl mx-auto transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            Make it memorable with a heartfelt message
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-start">
          {/* Form */}
          <div
            className={`space-y-6 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <div className="space-y-2">
              <Label htmlFor="recipientName" className="font-body text-sm text-foreground">
                Recipient Name
              </Label>
              <Input
                id="recipientName"
                placeholder="Enter recipient&apos;s name"
                value={recipientName}
                onChange={(e) => onRecipientNameChange(e.target.value)}
                className="bg-card border-border/50 focus:border-champagne/50 focus:ring-champagne/20 rounded-xl h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="senderName" className="font-body text-sm text-foreground">
                Your Name
              </Label>
              <Input
                id="senderName"
                placeholder="Enter your name"
                value={senderName}
                onChange={(e) => onSenderNameChange(e.target.value)}
                className="bg-card border-border/50 focus:border-champagne/50 focus:ring-champagne/20 rounded-xl h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="font-body text-sm text-foreground">
                Personal Message{" "}
                <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Textarea
                id="message"
                placeholder="Write a heartfelt message..."
                value={message}
                onChange={(e) => onMessageChange(e.target.value.slice(0, 200))}
                className="bg-card border-border/50 focus:border-champagne/50 focus:ring-champagne/20 rounded-xl min-h-[120px] resize-none"
              />
              <p className="font-body text-xs text-muted-foreground text-right">
                {message.length}/200 characters
              </p>
            </div>
          </div>

          {/* Live Preview */}
          <div
            className={`transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <div className="bg-card rounded-3xl p-8 border border-champagne/20 shadow-card relative overflow-hidden">
              {/* Decorative Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-champagne/10 to-transparent rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-champagne/5 to-transparent rounded-tr-full" />

              <div className="relative">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <span className="font-body text-xs tracking-luxury uppercase text-champagne">
                    Spa Le Paris
                  </span>
                  <Gift className="w-6 h-6 text-champagne" strokeWidth={1.5} />
                </div>

                {/* Gift Card Title */}
                <h3 className="font-heading text-2xl text-foreground mb-2">
                  Gift Card
                </h3>

                {/* Value */}
                <p className="font-heading text-4xl text-champagne mb-6">
                  {selectedValue ? formatCurrency(selectedValue) : "₹0"}
                </p>

                {/* Recipient */}
                <div className="mb-4">
                  <p className="font-body text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    For
                  </p>
                  <p className="font-heading text-xl text-foreground">
                    {recipientName || "Recipient Name"}
                  </p>
                </div>

                {/* Message */}
                {message && (
                  <div className="mb-4 p-4 bg-secondary/50 rounded-xl">
                    <p className="font-body text-sm text-muted-foreground italic leading-relaxed">
                      &quot;{message}&quot;
                    </p>
                  </div>
                )}

                {/* Sender */}
                <div className="pt-4 border-t border-border/50">
                  <p className="font-body text-xs text-muted-foreground">
                    With love, {senderName || "Your Name"}
                  </p>
                </div>
              </div>
            </div>

            <p className="font-body text-xs text-muted-foreground text-center mt-4">
              Live preview of your gift card
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiftPersonalization;
