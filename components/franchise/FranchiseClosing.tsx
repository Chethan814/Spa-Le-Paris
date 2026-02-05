"use client";

import { useEffect, useRef, useState } from "react";

const FranchiseClosing = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
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
        <div
          className={`max-w-3xl mx-auto text-center transition-all duration-[1500ms] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          <div className="w-16 h-px bg-champagne/40 mx-auto mb-12" />

          <p className="font-heading text-2xl md:text-3xl lg:text-4xl font-light text-foreground leading-relaxed mb-4">
            Every partnership is reviewed personally.
          </p>
          <p className="font-heading text-2xl md:text-3xl lg:text-4xl font-light text-muted-foreground leading-relaxed">
            We believe growth should be intentional, not rushed.
          </p>

          <div className="w-16 h-px bg-champagne/40 mx-auto mt-12" />
        </div>
      </div>
    </section>
  );
};

export default FranchiseClosing;
