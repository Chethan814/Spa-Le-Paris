"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Gift, Mail, Sparkles } from "lucide-react";

const giftMoment = "/assets/gift-moment.jpg";

const steps = [
  {
    icon: Gift,
    title: "Choose Value",
    description: "Select any amount or specific treatment",
  },
  {
    icon: Mail,
    title: "Personalize",
    description: "Add a heartfelt message",
  },
  {
    icon: Sparkles,
    title: "Deliver Instantly",
    description: "Email or print beautifully",
  },
];

const GiftSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
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
    <section id="gift" ref={sectionRef} className="py-24 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div
            className={`relative transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}
          >
            <div className="relative">
              <img
                src={giftMoment}
                alt="Gift giving moment"
                className="w-full rounded-2xl shadow-card"
              />
              {/* Decorative Frame */}
              <div className="absolute -inset-4 border border-champagne/20 rounded-2xl -z-10" />
              <div className="absolute -inset-8 border border-champagne/10 rounded-2xl -z-20" />
            </div>
          </div>

          {/* Content Side */}
          <div
            className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
              }`}
          >
            <span className="font-body text-xs tracking-luxury uppercase text-champagne mb-4 block">
              The Gift of Wellness
            </span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6 leading-tight">
              A Thoughtful Gift of{" "}
              <span className="italic text-champagne">Relaxation</span>
            </h2>
            <p className="font-body text-muted-foreground font-light mb-10 leading-relaxed max-w-lg">
              Give the ones you cherish an escape from the ordinary. Our elegant
              gift cards arrive instantly, wrapped in digital luxury.
            </p>

            {/* Steps */}
            <div className="space-y-6 mb-10">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.title}
                    className={`flex items-start gap-4 transition-all duration-700 ${isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                      }`}
                    style={{ transitionDelay: `${0.5 + index * 0.15}s` }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                      <Icon className="w-5 h-5 text-champagne" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-heading text-xl font-medium text-foreground mb-1">
                        {step.title}
                      </h4>
                      <p className="font-body text-sm text-muted-foreground font-light">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link href="/gift-cards">
              <Button variant="gold" size="lg" className="group">
                <span>Buy a Gift Card</span>
                <div className="w-0 group-hover:w-2 transition-all duration-300" />
                <Gift className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiftSection;
