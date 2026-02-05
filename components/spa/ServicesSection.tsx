"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, Droplets, Wind, Heart, Flower2 } from "lucide-react";
import { useBooking } from "@/context/BookingContext";


const services = [
  {
    title: "Scrub",
    description: "Deep exfoliation revealing silken, luminous skin",
    icon: Sparkles,
  },
  {
    title: "Detan",
    description: "Restore your natural radiance and even skin tone",
    icon: Droplets,
  },
  {
    title: "Body Polish",
    description: "Luxurious smoothing treatment for baby-soft skin",
    icon: Wind,
  },
  {
    title: "Body Wrap",
    description: "Nourishing cocoon of detoxifying minerals",
    icon: Flower2,
  },
  {
    title: "Therapy",
    description: "Healing touch that melts away tension",
    icon: Heart,
  },
];

const ServicesSection = () => {
  const { openBooking } = useBooking();
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            services.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...new Set([...prev, index])]);
              }, index * 150);
            });
          }
        });
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
      id="services"
      ref={sectionRef}
      className="py-24 md:py-32 bg-background"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-body text-xs tracking-luxury uppercase text-champagne mb-4 block">
            Our Expertise
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6">
            Signature Treatments
          </h2>
          <p className="font-body text-muted-foreground font-light max-w-xl mx-auto">
            Each service is crafted to restore balance and unveil your inner glow
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isVisible = visibleCards.includes(index);

            return (
              <div
                key={service.title}
                className={`group relative bg-card rounded-2xl p-8 text-center transition-all duration-700 hover:shadow-card gold-border-hover cursor-pointer ${isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
                  }`}
                onClick={() => openBooking({ service: service.title })}

              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-6 transition-all duration-500 group-hover:bg-champagne/20 group-hover:scale-110">
                  <Icon className="w-7 h-7 text-champagne" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="font-heading text-2xl font-medium text-foreground mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="font-body text-sm text-muted-foreground font-light leading-relaxed">
                  {service.description}
                </p>

                {/* Hover Accent */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-champagne transition-all duration-500 group-hover:w-16" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
