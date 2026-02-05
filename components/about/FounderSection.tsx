"use client";

import { useEffect, useRef, useState } from "react";

const FounderSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const paragraphs = [
    "Spa Le Paris was created with a clear intention — to offer a professional, respectful, and inclusive wellness environment where every guest feels comfortable and confident.",
    "From the beginning, our focus has been on ethical spa practices, consistent standards, and especially the safety and comfort of women.",
    "Founded in 2019, Spa Le Paris is backed by over 18 years of experience in the wellness industry. This experience guides everything we do — from therapist training and space design to maintaining the same standards of care across all our locations.",
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-background border-t border-border/30"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          {/* Section Title */}
          <div
            className={`text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-10">
              A Note from the Founder
            </h2>
            <div className="w-12 h-px bg-champagne mx-auto mb-12" />
          </div>

          {/* Opening Quote Mark */}
          <div
            className={`text-center mb-8 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
          >
            <span className="font-heading text-6xl md:text-7xl text-champagne/30 leading-none">
              "
            </span>
          </div>

          {/* Editorial Content - Staggered paragraphs */}
          <div className="space-y-6 text-left md:text-center">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={`font-body text-muted-foreground text-lg leading-relaxed transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                style={{ transitionDelay: isVisible ? `${400 + index * 300}ms` : "0ms" }}
              >
                {paragraph}
              </p>
            ))}

            {/* Final commitment statement */}
            <p
              className={`font-body text-foreground text-lg md:text-xl leading-relaxed pt-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              style={{ transitionDelay: isVisible ? "1300ms" : "0ms" }}
            >
              Our commitment is simple: genuine wellness delivered with professionalism, integrity, and respect.
            </p>
          </div>

          {/* Closing Quote Mark */}
          <div
            className={`text-center mt-8 transition-all duration-700 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
            style={{ transitionDelay: isVisible ? "1500ms" : "0ms" }}
          >
            <span className="font-heading text-6xl md:text-7xl text-champagne/30 leading-none">
              "
            </span>
          </div>

          {/* Signature with elegant reveal */}
          <div
            className={`mt-12 pt-8 border-t border-border/30 text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            style={{ transitionDelay: isVisible ? "1800ms" : "0ms" }}
          >
            <p className="font-heading text-xl md:text-2xl text-foreground italic">
              — Pradip Naidu
            </p>
            <p className="font-body text-sm text-muted-foreground mt-2 tracking-wide uppercase">
              Founder, Spa Le Paris
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
