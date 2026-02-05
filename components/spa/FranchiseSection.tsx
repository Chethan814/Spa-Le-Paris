"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const franchiseInterior = "/assets/franchise-interior.jpg";

const trustPoints = [
  "Proven service model with consistent excellence",
  "Premium market positioning and brand recognition",
  "Comprehensive training and ongoing support",
];

const FranchiseSection = () => {
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
    <section
      id="franchise"
      ref={sectionRef}
      className="py-24 md:py-32 bg-background overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <div
            className={`order-2 lg:order-1 transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}
          >
            <span className="font-body text-xs tracking-luxury uppercase text-champagne mb-4 block">
              Business Opportunity
            </span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6 leading-tight">
              Partner With a Growing{" "}
              <span className="italic text-champagne">Luxury</span> Wellness Brand
            </h2>
            <p className="font-body text-muted-foreground font-light mb-10 leading-relaxed max-w-lg">
              Join a network of premium wellness destinations. We provide the
              blueprint; you create the experience.
            </p>

            {/* Trust Points */}
            <div className="space-y-4 mb-10">
              {trustPoints.map((point, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 transition-all duration-700 ${isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                    }`}
                  style={{ transitionDelay: `${0.4 + index * 0.15}s` }}
                >
                  <CheckCircle2 className="w-5 h-5 text-champagne flex-shrink-0" strokeWidth={1.5} />
                  <span className="font-body text-foreground/90">{point}</span>
                </div>
              ))}
            </div>

            <Link href="/franchise">
              <Button variant="goldOutline" size="lg">
                Apply for Franchise
              </Button>
            </Link>
          </div>

          {/* Image Side */}
          <div
            className={`order-1 lg:order-2 relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
              }`}
          >
            <div className="relative">
              <img
                src={franchiseInterior}
                alt="Premium spa interior"
                className="w-full rounded-2xl shadow-card"
              />
              {/* Decorative Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent rounded-2xl" />
              {/* Decorative Frame */}
              <div className="absolute -inset-4 border border-champagne/20 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FranchiseSection;
