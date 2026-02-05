"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarCheck, Heart, Sparkles, Crown } from "lucide-react";

const benefits = [
  {
    icon: CalendarCheck,
    title: "Priority Booking Access",
    description: "Secure your preferred times before they open to the public",
  },
  {
    icon: Heart,
    title: "Personalized Therapist Preferences",
    description: "Your preferred therapist, remembered and reserved for you",
  },
  {
    icon: Sparkles,
    title: "Exclusive Member-Only Rituals",
    description: "Access to treatments not available on our standard menu",
  },
  {
    icon: Crown,
    title: "Elevated In-Spa Experience",
    description: "Extended relaxation time, premium amenities, and curated touches",
  },
];

const MembershipBenefits = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            benefits.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...new Set([...prev, index])]);
              }, index * 200);
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
            Why Become a Member
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            More Than Just Savings
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Membership is about belonging—to a space that knows you, cares for you, and elevates every visit.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            const isVisible = visibleCards.includes(index);

            return (
              <div
                key={benefit.title}
                className={`group relative bg-card rounded-2xl p-8 text-center transition-all duration-700 hover:shadow-card gold-border-hover ${isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
                  }`}
              >
                {/* Elegant Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                  <div className="absolute top-0 right-0 w-32 h-1 bg-gradient-to-l from-champagne/50 to-transparent transform rotate-45 translate-x-4 translate-y-8" />
                </div>

                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-champagne/10 mb-6 group-hover:bg-champagne/20 transition-colors duration-500">
                  <Icon className="w-7 h-7 text-champagne" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="font-heading text-xl text-foreground mb-3 group-hover:text-champagne-dark transition-colors duration-500">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MembershipBenefits;
