"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Quote } from "lucide-react";

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
      className="py-24 md:py-32 bg-background relative overflow-hidden"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-champagne/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left Column: Image with Frame */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
            <div className="relative group max-w-md mx-auto lg:mx-0">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 border border-champagne/30 rounded-2xl transition-all duration-500 group-hover:border-champagne/60 group-hover:-inset-6" />

              {/* Main Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-2xl bg-muted overflow-hidden">
                <Image
                  src="/assets/Founder.jpeg"
                  alt="Pradip Naidu - Founder of Spa Le Paris"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Soft overlay on hover */}
                <div className="absolute inset-0 bg-champagne/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Accent tag */}
              <div className="absolute -bottom-4 -right-4 bg-background border border-sand px-6 py-3 rounded-lg shadow-xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-xs font-medium tracking-widest text-champagne-dark uppercase">Experience & Integrity</p>
              </div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="space-y-8">
            <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <span className="text-xs font-medium tracking-[0.2em] text-champagne-dark uppercase mb-4 block">Our Visionary</span>
              <h2 className="font-heading text-3xl md:text-4xl text-charcoal">A Note from the Founder</h2>
              <div className="w-12 h-px bg-champagne-dark mt-6 mb-8" />
            </div>

            {/* Staggered Paragraphs */}
            <div className="space-y-6">
              <Quote className={`w-8 h-8 text-champagne/30 mb-2 transition-all duration-700 delay-500 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"}`} />

              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={`font-body text-charcoal/80 text-lg leading-relaxed transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: isVisible ? `${600 + index * 200}ms` : "0ms" }}
                >
                  {paragraph}
                </p>
              ))}

              <p
                className={`font-body text-charcoal text-lg md:text-xl font-medium leading-relaxed pt-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: isVisible ? "1400ms" : "0ms" }}
              >
                Our commitment is simple: genuine wellness delivered with professionalism, integrity, and respect.
              </p>
            </div>

            {/* Signature Section */}
            <div
              className={`pt-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: isVisible ? "1700ms" : "0ms" }}
            >
              <div className="space-y-1">
                <p className="font-heading text-2xl text-charcoal italic tracking-wide">— Pradip Naidu</p>
                <p className="font-body text-xs text-champagne-dark tracking-[0.2em] uppercase">Founder, Spa Le Paris</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FounderSection;
