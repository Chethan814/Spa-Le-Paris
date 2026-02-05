"use client";

import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const supportAreas = [
  {
    id: "brand",
    title: "Brand & Design Guidelines",
    content:
      "Receive comprehensive brand assets, interior design guidelines, and visual identity standards that ensure your location reflects the essence of our refined aesthetic.",
  },
  {
    id: "training",
    title: "Staff Training & Onboarding",
    content:
      "Our team provides thorough training programs covering service protocols, guest experience standards, and operational procedures to ensure consistency across all locations.",
  },
  {
    id: "marketing",
    title: "Marketing & Launch Support",
    content:
      "From pre-launch marketing strategies to grand opening support, we guide you through creating awareness and establishing your presence in the local market.",
  },
  {
    id: "operations",
    title: "Operational Systems",
    content:
      "Access to proven booking systems, inventory management, quality control processes, and ongoing operational guidance to maintain excellence.",
  },
];

const FranchiseSupport = () => {
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
    <section ref={sectionRef} className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-body text-xs tracking-luxury uppercase text-champagne mb-4 block">
            Support & Onboarding
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-light text-foreground">
            How We Support Our Partners
          </h2>
        </div>

        <div
          className={`max-w-3xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {supportAreas.map((area, index) => (
              <AccordionItem
                key={area.id}
                value={area.id}
                className="bg-background border border-border rounded-xl px-6 data-[state=open]:border-champagne/30 transition-colors duration-500"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <AccordionTrigger className="font-heading text-lg font-light text-foreground hover:text-champagne py-6 hover:no-underline">
                  {area.title}
                </AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground leading-relaxed pb-6">
                  {area.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FranchiseSupport;
