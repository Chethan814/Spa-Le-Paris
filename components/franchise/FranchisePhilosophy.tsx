"use client";

import { useEffect, useRef, useState } from "react";

const philosophyLines = [
  "We believe in creating sanctuaries of calm, where every detail speaks to quality.",
  "Our commitment to hygiene, consistency, and genuine care defines who we are.",
  "This is not mass-market wellness. This is intentional luxury.",
  "Every guest deserves an experience that feels personal, refined, and unhurried.",
];

const FranchisePhilosophy = () => {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          philosophyLines.forEach((_, index) => {
            setTimeout(() => {
              setVisibleLines((prev) => [...prev, index]);
            }, index * 400);
          });
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
    <section
      id="philosophy"
      ref={sectionRef}
      className="py-32 md:py-40 bg-background"
    >
      <div className="container mx-auto px-6 max-w-4xl">
        <span className="font-body text-xs tracking-luxury uppercase text-champagne mb-6 block text-center">
          Our Philosophy
        </span>

        <div className="space-y-8">
          {philosophyLines.map((line, index) => (
            <p
              key={index}
              className={`font-heading text-2xl md:text-3xl lg:text-4xl font-light text-foreground text-center leading-relaxed transition-all duration-1000 ${visibleLines.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
                }`}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FranchisePhilosophy;
