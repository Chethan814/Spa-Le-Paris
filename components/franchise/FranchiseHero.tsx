"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const franchiseInterior = "/assets/franchise-interior.jpg";

const FranchiseHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToOpportunity = () => {
    document.getElementById("philosophy")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with slow fade */}
      <div
        className={`absolute inset-0 transition-opacity duration-[2000ms] ${isLoaded ? "opacity-100" : "opacity-0"
          }`}
      >
        <img
          src={franchiseInterior}
          alt="Premium spa interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
        {/* Headline */}
        <h1
          className={`font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-tight mb-8 transition-all duration-1000 delay-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          Partner With a Refined{" "}
          <span className="italic text-champagne-light">Wellness</span> Brand
        </h1>

        {/* Subtext */}
        <p
          className={`font-body text-lg md:text-xl text-white/80 font-light leading-relaxed mb-12 max-w-2xl mx-auto transition-all duration-1000 delay-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          We collaborate with like-minded partners to bring premium spa
          experiences to exceptional locations.
        </p>

        {/* CTA Button */}
        <div
          className={`transition-all duration-1000 delay-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
          <Button
            variant="heroOutline"
            size="hero"
            onClick={scrollToOpportunity}
            className="group hover:shadow-glow transition-shadow duration-500 h-auto py-4 whitespace-normal text-center max-w-[90vw]"
          >
            Explore Franchise Opportunity
            <ChevronDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1500 ${isLoaded ? "opacity-100" : "opacity-0"
          }`}
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-champagne/50 to-transparent animate-pulse" />
      </div>
    </section>
  );
};

export default FranchiseHero;
