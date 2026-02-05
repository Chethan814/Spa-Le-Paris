"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Gift } from "lucide-react";

interface GiftOption {
  value: number;
  total: number;
}

const giftOptions: GiftOption[] = [
  { value: 1000, total: 1050 },
  { value: 2000, total: 2100 },
  { value: 3000, total: 3150 },
  { value: 4000, total: 4200 },
  { value: 5000, total: 5250 },
  { value: 6000, total: 6300 },
  { value: 7000, total: 7350 },
  { value: 8000, total: 8400 },
  { value: 9000, total: 9450 },
  { value: 10000, total: 10500 },
];

interface GiftValueSelectorProps {
  selectedValue: number | null;
  onSelectValue: (value: number, total: number) => void;
}

const GiftValueSelector = ({ selectedValue, onSelectValue }: GiftValueSelectorProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.1 }
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
            Select Gift Value
          </span>
          <h2
            className={`font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            Choose the Perfect Amount
          </h2>
          <p
            className={`font-body text-muted-foreground max-w-xl mx-auto transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            Select a gift card value that suits your gesture
          </p>
        </div>

        {/* Gift Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-5xl mx-auto mb-12">
          {giftOptions.map((option, index) => (
            <button
              key={option.value}
              onClick={() => onSelectValue(option.value, option.total)}
              className={cn(
                "group relative bg-card rounded-2xl p-6 text-center transition-all duration-500 border-2 cursor-pointer",
                selectedValue === option.value
                  ? "border-champagne shadow-glow"
                  : "border-border/50 hover:border-champagne/40 hover:shadow-card",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${200 + index * 50}ms` }}
            >
              {/* Gift Icon */}
              <div
                className={cn(
                  "w-10 h-10 mx-auto mb-3 rounded-full flex items-center justify-center transition-all duration-500",
                  selectedValue === option.value
                    ? "bg-champagne/20"
                    : "bg-secondary group-hover:bg-champagne/10"
                )}
              >
                <Gift
                  className={cn(
                    "w-5 h-5 transition-colors duration-500",
                    selectedValue === option.value ? "text-champagne" : "text-muted-foreground group-hover:text-champagne"
                  )}
                  strokeWidth={1.5}
                />
              </div>

              {/* Value */}
              <h3 className="font-heading text-2xl md:text-3xl text-foreground mb-1">
                {formatCurrency(option.value)}
              </h3>

              {/* Total */}
              <p className="font-body text-xs text-muted-foreground">
                Total: {formatCurrency(option.total)}
              </p>

              {/* Selected Indicator */}
              {selectedValue === option.value && (
                <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-champagne animate-fade-in" />
              )}
            </button>
          ))}
        </div>

        {/* Microcopy */}
        <p
          className={cn(
            "text-center font-body text-sm text-muted-foreground max-w-2xl mx-auto transition-all duration-700",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          style={{ transitionDelay: "800ms" }}
        >
          Includes 5% GST · Valid for 3 months from date of purchase · Redeemable across all branches
        </p>
      </div>
    </section>
  );
};

export default GiftValueSelector;
