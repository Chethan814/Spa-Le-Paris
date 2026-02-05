"use client";

import { useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";

const idealFor = [
  "Those who value quality over rapid scale",
  "Partners with hospitality or wellness experience",
  "Individuals committed to long-term brand building",
  "Those who appreciate refined guest experiences",
];

const notIdealFor = [
  "Those seeking quick returns without engagement",
  "Partners unfamiliar with service excellence standards",
  "Those preferring complete operational independence",
  "Individuals not aligned with calm, luxury positioning",
];

const FranchiseIdealPartner = () => {
  const [leftVisible, setLeftVisible] = useState(false);
  const [rightVisible, setRightVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setLeftVisible(true), 200);
          setTimeout(() => setRightVisible(true), 500);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-body text-xs tracking-luxury uppercase text-champagne mb-4 block">
            Partner Profile
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-light text-foreground">
            Is This Partnership Right for You?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 max-w-5xl mx-auto">
          {/* Ideal For */}
          <div
            className={`p-8 md:p-10 bg-champagne/5 rounded-2xl border border-champagne/20 transition-all duration-1000 ${leftVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
              }`}
          >
            <h3 className="font-heading text-2xl font-light text-foreground mb-8">
              This Opportunity is For
            </h3>
            <ul className="space-y-5">
              {idealFor.map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-champagne/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-champagne" strokeWidth={2} />
                  </div>
                  <span className="font-body text-foreground/90 leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not Ideal For */}
          <div
            className={`p-8 md:p-10 bg-muted/50 rounded-2xl border border-border transition-all duration-1000 ${rightVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
              }`}
          >
            <h3 className="font-heading text-2xl font-light text-foreground mb-8">
              May Not Be Ideal For
            </h3>
            <ul className="space-y-5">
              {notIdealFor.map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={2} />
                  </div>
                  <span className="font-body text-muted-foreground leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FranchiseIdealPartner;
