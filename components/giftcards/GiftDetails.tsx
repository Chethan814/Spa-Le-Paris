"use client";

import { useState, useEffect, useRef } from "react";
import { Calendar, MapPin, CreditCard, Percent } from "lucide-react";

const details = [
  {
    icon: Calendar,
    title: "Validity",
    description: "3 months from the date of purchase",
  },
  {
    icon: MapPin,
    title: "Redeemable At",
    description: "All Spa Le Paris branches",
  },
  {
    icon: CreditCard,
    title: "Usage",
    description: "Partial redemption allowed",
  },
  {
    icon: Percent,
    title: "Balance",
    description: "Remaining balance visible after each use",
  },
];

const GiftDetails = () => {
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

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span
            className={`font-body text-xs tracking-luxury uppercase text-champagne mb-4 block transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            Gift Card Details
          </span>
          <h2
            className={`font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            Redemption Information
          </h2>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {details.map((detail, index) => {
            const Icon = detail.icon;
            return (
              <div
                key={detail.title}
                className={`bg-card rounded-2xl p-8 text-center transition-all duration-700 border border-border/50 hover:border-champagne/30 hover:shadow-card ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-secondary flex items-center justify-center">
                  <Icon className="w-6 h-6 text-champagne" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-xl text-foreground mb-2">
                  {detail.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {detail.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GiftDetails;
