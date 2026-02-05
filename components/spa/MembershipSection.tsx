"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Crown, Star, Calendar, Sparkles } from "lucide-react";

const benefits = [
  {
    icon: Crown,
    title: "Exclusive Access",
    description: "Priority booking and members-only treatments",
  },
  {
    icon: Star,
    title: "Elevated Savings",
    description: "15-25% off all services, year-round",
  },
  {
    icon: Calendar,
    title: "Monthly Rituals",
    description: "Complimentary treatment every month",
  },
  {
    icon: Sparkles,
    title: "Signature Events",
    description: "Invitation to private wellness gatherings",
  },
];

const MembershipSection = () => {
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
              }, index * 150);
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
    <section
      id="membership"
      ref={sectionRef}
      className="py-24 md:py-32 bg-background"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-body text-xs tracking-luxury uppercase text-champagne mb-4 block">
            By Invitation
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6">
            The Inner Circle
          </h2>
          <p className="font-body text-muted-foreground font-light max-w-xl mx-auto">
            An exclusive membership for those who seek wellness as a way of life
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
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
                {/* Gold Corner */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-1 bg-gradient-to-l from-champagne to-transparent transform rotate-45 translate-x-4 translate-y-6" />
                </div>

                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-champagne/10 mb-5 group-hover:bg-champagne/20 transition-colors duration-500">
                  <Icon className="w-6 h-6 text-champagne" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="font-heading text-xl font-medium text-foreground mb-2">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="font-body text-sm text-muted-foreground font-light leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/membership">
            <Button variant="elegant" size="hero">
              Request Membership
            </Button>
          </Link>
          <p className="font-body text-xs text-muted-foreground mt-4">
            Limited to 100 members annually
          </p>
        </div>
      </div>
    </section>
  );
};

export default MembershipSection;
