"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const MembershipCTA = () => {
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
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Decorative Element */}
          <div
            className={`flex items-center justify-center gap-4 mb-8 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"
              }`}
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-champagne/50" />
            <div className="w-2 h-2 rounded-full bg-champagne/40" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-champagne/50" />
          </div>

          {/* Main Copy */}
          <p
            className={`font-heading text-2xl md:text-3xl text-foreground mb-4 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            Memberships are limited to ensure
            <br />
            <span className="text-champagne-dark">quality and personalized care.</span>
          </p>

          <p
            className={`font-body text-muted-foreground mb-10 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            We accept new members on a quarterly basis.
          </p>

          {/* CTA Button */}
          <div
            className={`transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            <Button
              variant="elegant"
              size="hero"
              className="group relative overflow-hidden h-auto py-4 whitespace-normal text-center max-w-[90vw]"
            >
              <span className="relative z-10 leading-tight">Request Membership Details</span>
              <div className="absolute inset-0 bg-gradient-to-r from-champagne-light/0 via-champagne-light/20 to-champagne-light/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            </Button>
          </div>

          {/* Subtle Note */}
          <p
            className={`font-body text-xs text-muted-foreground/70 mt-6 transition-all duration-700 delay-400 ${isVisible ? "opacity-100" : "opacity-0"
              }`}
          >
            No obligation • Response within 24 hours
          </p>
        </div>
      </div>
    </section>
  );
};

export default MembershipCTA;
