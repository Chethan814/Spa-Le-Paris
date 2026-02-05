"use client";

import { useEffect, useRef, useState } from "react";

const journeySteps = [
  {
    step: "01",
    title: "Application Submission",
    description: "Share your interest and background through our simple form.",
  },
  {
    step: "02",
    title: "Introductory Discussion",
    description: "A personal conversation to understand mutual alignment.",
  },
  {
    step: "03",
    title: "Location Evaluation",
    description: "Together, we assess the potential of your proposed location.",
  },
  {
    step: "04",
    title: "Agreement & Onboarding",
    description: "Formalize partnership and begin comprehensive onboarding.",
  },
  {
    step: "05",
    title: "Launch Support",
    description: "Hands-on guidance through your grand opening and beyond.",
  },
];

const FranchiseJourney = () => {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          journeySteps.forEach((_, index) => {
            setTimeout(() => {
              setVisibleSteps((prev) => [...prev, index]);
            }, index * 200);
          });
        }
      },
      { threshold: 0.2 }
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
            The Journey
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-light text-foreground">
            From Inquiry to Launch
          </h2>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block max-w-6xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-8 left-0 right-0 h-px bg-border" />

            <div className="grid grid-cols-5 gap-4">
              {journeySteps.map((step, index) => (
                <div
                  key={index}
                  className={`relative transition-all duration-700 ${visibleSteps.includes(index)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                    }`}
                >
                  {/* Circle */}
                  <div className="w-16 h-16 rounded-full bg-champagne/10 border border-champagne/30 flex items-center justify-center mx-auto mb-6 relative z-10">
                    <span className="font-heading text-lg text-champagne">
                      {step.step}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-light text-foreground text-center mb-2">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground text-center leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden max-w-md mx-auto">
          <div className="relative pl-8 border-l border-border">
            {journeySteps.map((step, index) => (
              <div
                key={index}
                className={`relative pb-12 last:pb-0 transition-all duration-700 ${visibleSteps.includes(index)
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                  }`}
              >
                {/* Circle */}
                <div className="absolute -left-[41px] w-10 h-10 rounded-full bg-champagne/10 border border-champagne/30 flex items-center justify-center">
                  <span className="font-heading text-sm text-champagne">
                    {step.step}
                  </span>
                </div>

                <h3 className="font-heading text-lg font-light text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FranchiseJourney;
