"use client";

import { useEffect, useRef, useState } from "react";
import { Heart, Lock, Sparkles, ShieldCheck } from "lucide-react";

const emphasisPoints = [
  { icon: Heart, label: "Comfort" },
  { icon: Lock, label: "Privacy" },
  { icon: Sparkles, label: "Confidence" },
  { icon: ShieldCheck, label: "Women's Safety" },
];

const TrustSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-secondary/30"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div
            className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            <span className="inline-block px-4 py-1.5 text-xs tracking-[0.2em] uppercase text-champagne-dark bg-champagne/10 rounded-full mb-6">
              Our Promise
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
              Professional Care, Thoughtfully Delivered
            </h2>
            <div className="w-16 h-px bg-champagne mx-auto" />
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left - Text Content */}
            <div
              className={`space-y-6 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
            >
              <p className="font-body text-muted-foreground text-lg leading-relaxed">
                Spa Le Paris is built on clear standards of professionalism, ethical wellness, and attention to detail.
              </p>
              <p className="font-body text-muted-foreground text-lg leading-relaxed">
                All our services are delivered by trained therapists in a respectful, well-maintained environment designed to make every guest feel at ease.
              </p>
              <p className="font-body text-foreground text-lg leading-relaxed pt-2">
                Our approach places strong emphasis on:
              </p>
            </div>

            {/* Right - Emphasis Points */}
            <div className="grid grid-cols-2 gap-6">
              {emphasisPoints.map((point, index) => {
                const IconComponent = point.icon;
                return (
                  <div
                    key={point.label}
                    className={`group p-6 bg-background rounded-lg border border-border/50 hover:border-champagne/50 hover:shadow-lg transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      }`}
                    style={{ transitionDelay: isVisible ? `${300 + index * 100}ms` : "0ms" }}
                  >
                    <div className="w-12 h-12 rounded-full bg-champagne/10 flex items-center justify-center mb-4 group-hover:bg-champagne/20 transition-colors duration-300">
                      <IconComponent className="w-5 h-5 text-champagne-dark" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-heading text-lg text-foreground">
                      {point.label}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
