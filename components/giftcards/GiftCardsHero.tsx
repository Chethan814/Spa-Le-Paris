"use client";

import { useState, useEffect } from "react";
const giftHero = "/assets/gift-hero.jpg";

const GiftCardsHero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = giftHero;
    img.onload = () => {
      setImageLoaded(true);
      setTimeout(() => setContentVisible(true), 300);
    };
  }, []);

  return (
    <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Ken Burns */}
      <div
        className={`absolute inset-0 transition-opacity duration-[2000ms] ${imageLoaded ? "opacity-100" : "opacity-0"
          }`}
      >
        <div
          className="absolute inset-0 bg-cover bg-center animate-ken-burns"
          style={{ backgroundImage: `url(${giftHero})` }}
        />
      </div>

      {/* Dark Overlay with Warm Tones */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/60 to-charcoal/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/40 via-transparent to-charcoal/40" />

      {/* Warm Gold Vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-champagne/5 via-transparent to-transparent opacity-60" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Label */}
        <span
          className={`inline-block font-body text-xs tracking-luxury uppercase text-champagne-light mb-6 transition-all duration-1000 ${contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
          Gift Wellness
        </span>

        {/* Main Headline */}
        <h1
          className={`font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-light leading-tight mb-6 transition-all duration-1000 delay-200 ${contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          A Thoughtful Gift of{" "}
          <span className="italic text-champagne-light">Relaxation</span>
        </h1>

        {/* Subtext */}
        <p
          className={`font-body text-base md:text-lg text-white/80 max-w-xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          Share calm, care, and indulgence with someone special.
        </p>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default GiftCardsHero;
