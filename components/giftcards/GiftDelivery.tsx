"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, Zap } from "lucide-react";

interface GiftDeliveryProps {
  email: string;
  whatsappNumber: string;
  sendViaWhatsapp: boolean;
  onEmailChange: (email: string) => void;
  onWhatsappChange: (number: string) => void;
  onWhatsappToggle: (enabled: boolean) => void;
}

const GiftDelivery = ({
  email,
  whatsappNumber,
  sendViaWhatsapp,
  onEmailChange,
  onWhatsappChange,
  onWhatsappToggle,
}: GiftDeliveryProps) => {
  const [isVisible, setIsVisible] = useState(true);
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

  return (
    <div ref={sectionRef as any} className="pt-8 border-t border-border/50">
      <div className="text-center mb-8">
        <h2 className="font-heading text-2xl text-foreground mb-2">
          Delivery Method
        </h2>
        <p className="font-body text-sm text-muted-foreground">
          How would you like to receive your gift card?
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        {/* Instant Delivery Banner */}
        <div
          className={`flex items-center gap-3 bg-champagne/10 text-champagne-dark rounded-xl px-5 py-4 mb-8 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <Zap className="w-5 h-5 flex-shrink-0" strokeWidth={1.5} />
          <p className="font-body text-sm">
            The gift card will be delivered instantly with a unique redemption code.
          </p>
        </div>

        {/* Email Field */}
        <div
          className={`space-y-3 mb-8 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <Label htmlFor="email" className="font-body text-sm text-foreground flex items-center gap-2">
            <Mail className="w-4 h-4 text-champagne" strokeWidth={1.5} />
            Recipient&apos;s Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="recipient@email.com"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className="bg-card border-border/50 focus:border-champagne/50 focus:ring-champagne/20 rounded-xl h-12"
          />
        </div>

        {/* WhatsApp Option */}
        <div
          className={`space-y-4 p-6 bg-card rounded-2xl border border-border/50 transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="flex items-center space-x-3">
            <Checkbox
              id="whatsapp"
              checked={sendViaWhatsapp}
              onCheckedChange={(checked) => onWhatsappToggle(checked as boolean)}
              className="border-champagne/50 data-[state=checked]:bg-champagne data-[state=checked]:border-champagne"
            />
            <Label
              htmlFor="whatsapp"
              className="font-body text-sm text-foreground flex items-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-champagne" strokeWidth={1.5} />
              Also send via WhatsApp
            </Label>
          </div>

          {sendViaWhatsapp && (
            <div className="pt-2 animate-fade-in">
              <Input
                type="tel"
                placeholder="+91 98765 43210"
                value={whatsappNumber}
                onChange={(e) => onWhatsappChange(e.target.value)}
                className="bg-background border-border/50 focus:border-champagne/50 focus:ring-champagne/20 rounded-xl h-12"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GiftDelivery;
