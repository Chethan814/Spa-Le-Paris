"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const membershipHero = "/assets/membership-hero.jpg";

const MembershipHero = () => {
  const [bgLoaded, setBgLoaded] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = membershipHero;
    img.onload = () => {
      setBgLoaded(true);
      setTimeout(() => setContentVisible(true), 300);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className={`absolute inset-0 transition-opacity duration-[2000ms] ${bgLoaded ? "opacity-100" : "opacity-0"
          }`}
      >
        <img
          src={membershipHero}
          alt="Luxury spa membership lounge"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Warm Gold Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(38,45%,30%)]/20 via-transparent to-[hsl(38,45%,30%)]/20" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Pill Badge */}
        <span
          className={`inline-block font-body text-xs tracking-[0.3em] uppercase text-champagne-light mb-6 px-4 py-2 border border-champagne/30 rounded-full transition-all duration-700 ${contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
          Membership Privileges
        </span>

        {/* Main Headline */}
        <h1
          className={`font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-6 transition-all duration-1000 delay-200 ${contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          A Deeper Way to
          <br />
          <span className="text-champagne-light">Experience Wellness</span>
        </h1>

        {/* Subtext */}
        <p
          className={`font-body text-lg md:text-xl text-white/80 max-w-xl mx-auto mb-10 transition-all duration-1000 delay-400 ${contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          Designed for those who value consistency, comfort, and care.
        </p>

        {/* Soft CTA */}
        <div
          className={`transition-all duration-1000 delay-600 ${contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          <Button
            variant="hero"
            size="hero"
            className="group relative overflow-hidden h-auto py-4 whitespace-normal text-center max-w-[90vw]"
          >
            <span className="relative z-10 leading-tight">Request Membership Details</span>
            <div className="absolute inset-0 bg-gradient-to-r from-champagne-light/0 via-champagne-light/30 to-champagne-light/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000 ${contentVisible ? "opacity-100" : "opacity-0"
          }`}
      >
        <div className="w-px h-16 bg-gradient-to-b from-champagne/60 to-transparent animate-gentle-float" />
      </div>
    </section>
  );
};

export default MembershipHero;
