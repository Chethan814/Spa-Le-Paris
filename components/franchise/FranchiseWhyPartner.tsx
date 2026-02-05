"use client";

import { useEffect, useRef, useState } from "react";
import { Award, Users, BookOpen, HeartHandshake } from "lucide-react";

const partnerBenefits = [
  {
    icon: Award,
    title: "Proven Service Model",
    description:
      "A refined approach to wellness, tested and perfected across locations.",
  },
  {
    icon: Users,
    title: "Premium Brand Positioning",
    description:
      "Stand apart with a brand recognized for elegance and authenticity.",
  },
  {
    icon: BookOpen,
    title: "Training & SOP Support",
    description:
      "Comprehensive guidance to ensure consistent excellence in every detail.",
  },
  {
    icon: HeartHandshake,
    title: "Ongoing Guidance",
    description:
      "Continued partnership and operational support beyond launch.",
  },
];

const FranchiseWhyPartner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
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
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-secondary/30"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-body text-xs tracking-luxury uppercase text-champagne mb-4 block">
            Why Partner With Us
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-light text-foreground">
            The Foundation of Partnership
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {partnerBenefits.map((benefit, index) => (
            <div
              key={index}
              className={`group p-8 bg-background rounded-xl border border-border hover:border-champagne/30 transition-all duration-700 hover:-translate-y-1 hover:shadow-card ${isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
                }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="w-12 h-12 rounded-full bg-champagne/10 flex items-center justify-center mb-6 group-hover:bg-champagne/20 transition-colors duration-500">
                <benefit.icon className="w-5 h-5 text-champagne" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-xl font-light text-foreground mb-3">
                {benefit.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FranchiseWhyPartner;
