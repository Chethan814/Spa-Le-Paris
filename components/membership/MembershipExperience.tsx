"use client";

import { useEffect, useRef, useState } from "react";
const membershipExperience = "/assets/membership-experience.jpg";

const MembershipExperience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageOffset, setImageOffset] = useState(0);
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

  // Subtle parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        setImageOffset(scrollProgress * 30); // Max 30px movement
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const experienceLines = [
    "From the moment you arrive, every detail is curated for you.",
    "Your therapist knows your preferences before you speak.",
    "The pace is slower, the care deeper, the experience—yours alone.",
    "This is wellness designed around your rhythm."
  ];

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Image with Parallax */}
          <div className="relative overflow-hidden rounded-2xl">
            <div
              className={`transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-105"
                }`}
            >
              <img
                src={membershipExperience}
                alt="Luxury spa wellness experience"
                className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl"
                style={{ transform: `translateY(${-imageOffset}px)` }}
              />
              {/* Warm overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
            </div>

            {/* Gold accent frame */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-champagne/30 rounded-2xl -z-10" />
          </div>

          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span
                className={`font-body text-xs tracking-[0.25em] uppercase text-champagne block transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
              >
                The Experience
              </span>
              <h2
                className={`font-heading text-3xl md:text-4xl text-foreground transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
              >
                How Membership Feels
              </h2>
            </div>

            <div className="space-y-6">
              {experienceLines.map((line, index) => (
                <p
                  key={index}
                  className={`font-body text-lg text-muted-foreground leading-relaxed transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                  style={{ transitionDelay: `${200 + index * 150}ms` }}
                >
                  {line}
                </p>
              ))}
            </div>

            {/* Decorative line */}
            <div
              className={`w-16 h-px bg-gradient-to-r from-champagne to-transparent transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 w-24" : "opacity-0 w-0"
                }`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipExperience;
