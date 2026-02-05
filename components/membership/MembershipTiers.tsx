"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Essential",
    tagline: "Begin your journey",
    features: [
      "Monthly signature treatment",
      "Priority booking access",
      "10% savings on additional services",
      "Birthday ritual included",
    ],
  },
  {
    name: "Signature",
    tagline: "Deepen your practice",
    features: [
      "Two treatments monthly",
      "Personal therapist assignment",
      "15% savings on all services",
      "Access to member-only rituals",
      "Guest passes (2 per year)",
    ],
  },
  {
    name: "Elite",
    tagline: "Complete immersion",
    features: [
      "Unlimited treatments",
      "Dedicated wellness concierge",
      "20% savings on retail & gifts",
      "Private events & previews",
      "Complimentary guest treatments",
      "Extended relaxation access",
    ],
  },
];

const MembershipTiers = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tiers.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...new Set([...prev, index])]);
              }, index * 250);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-body text-xs tracking-[0.25em] uppercase text-champagne mb-4 block">
            Membership Tiers
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            Choose Your Path
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Each tier is designed to match your wellness rhythm and lifestyle needs.
          </p>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, index) => {
            const isVisible = visibleCards.includes(index);
            const isSignature = tier.name === "Signature";

            return (
              <div
                key={tier.name}
                className={`group relative bg-card rounded-2xl p-8 transition-all duration-700 hover:shadow-card ${isSignature ? "ring-1 ring-champagne/30" : ""
                  } ${isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                  }`}
              >
                {/* Subtle glow for Signature */}
                {isSignature && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-champagne/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                )}

                {/* Tier Name */}
                <div className="text-center mb-8 relative">
                  <h3 className="font-heading text-2xl text-foreground mb-2 group-hover:text-champagne-dark transition-colors duration-500">
                    {tier.name}
                  </h3>
                  <p className="font-body text-sm text-champagne italic">
                    {tier.tagline}
                  </p>
                </div>

                {/* Divider */}
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-champagne/50 to-transparent mx-auto mb-8" />

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, fIndex) => (
                    <li
                      key={fIndex}
                      className="flex items-start gap-3 font-body text-sm text-muted-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-champagne mt-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="text-center">
                  <Button
                    variant={isSignature ? "elegant" : "goldOutline"}
                    size="default"
                    className="w-full"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MembershipTiers;
