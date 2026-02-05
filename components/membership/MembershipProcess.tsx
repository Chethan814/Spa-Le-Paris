"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Users, Sparkles } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    step: "01",
    title: "Request Details",
    description: "Share your interest and we'll send you our membership guide",
  },
  {
    icon: Users,
    step: "02",
    title: "Speak With Our Team",
    description: "A brief conversation to understand your wellness goals",
  },
  {
    icon: Sparkles,
    step: "03",
    title: "Begin Your Journey",
    description: "Welcome to elevated wellness experiences, designed for you",
  },
];

const MembershipProcess = () => {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            steps.forEach((_, index) => {
              setTimeout(() => {
                setVisibleSteps((prev) => [...new Set([...prev, index])]);
              }, index * 300);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-body text-xs tracking-[0.25em] uppercase text-champagne mb-4 block">
            The Process
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            How Membership Works
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            A simple, personal approach to joining our community.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto relative">
          {/* Connecting Line (desktop only) */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-champagne/30 to-transparent" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            const isVisible = visibleSteps.includes(index);

            return (
              <div
                key={step.title}
                className={`text-center relative transition-all duration-700 ${isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                  }`}
              >
                {/* Step Number */}
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 rounded-full bg-card border border-border flex items-center justify-center mx-auto relative z-10">
                    <Icon className="w-8 h-8 text-champagne" strokeWidth={1.5} />
                  </div>
                  <span className="absolute -top-2 -right-2 font-heading text-xs text-champagne/60">
                    {step.step}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading text-xl text-foreground mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MembershipProcess;
