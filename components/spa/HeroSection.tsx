"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

import { useBooking } from "@/context/BookingContext";

const spaHero = "/assets/spa-hero.jpg";
const spaVideo = "/assets/spa-video.mp4";

const HeroSection = () => {
  const { openBooking } = useBooking();
  const [contentLoaded, setContentLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Trigger content animations after mount
  useEffect(() => {
    const timer = setTimeout(() => setContentLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle video can play - delay transition until text animations complete (3-5 seconds)
  const handleVideoCanPlay = () => {

    // Wait for text animations to complete before transitioning to video
    setTimeout(() => {
      setVideoReady(true);
    }, 4000); // 4 second delay after video is ready
  };


  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Container */}
      <div className="absolute inset-0 z-0">
        {/* Base Image - Always visible first, with Ken Burns effect while waiting */}
        <div
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-out ${videoReady ? "opacity-0" : "opacity-100"
            }`}
        >
          <Image
            src={spaHero}
            alt="Luxury spa interior"
            fill
            priority
            quality={90}
            unoptimized
            onLoad={() => setImageLoaded(true)}
            className={`object-cover transition-all duration-[1500ms] ${imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
              } ${!videoReady ? "animate-ken-burns" : ""}`}
          />
        </div>

        {/* Video - Fades in when ready */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          onCanPlayThrough={handleVideoCanPlay}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ease-out ${videoReady ? "opacity-100" : "opacity-0"
            }`}
        >
          <source src={spaVideo} type="video/mp4" />
        </video>

        {/* Elegant Overlay for text readability */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Headline */}
          <h1
            className={`font-heading text-4xl md:text-6xl lg:text-7xl font-light text-white mb-4 leading-tight transition-all duration-1000 drop-shadow-lg ${contentLoaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
              }`}
            style={{ transitionDelay: "0.3s", textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
          >
            A 4.9★ Rated Professional
            <span className="block italic font-normal text-champagne-light drop-shadow-md">
              Luxury Spa in Bangalore
            </span>
          </h1>

          {/* Subtext */}
          <p
            className={`font-body text-base md:text-lg text-white/90 font-light max-w-2xl mx-auto mb-8 leading-relaxed transition-all duration-1000 ${contentLoaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
              }`}
            style={{ transitionDelay: "0.5s", textShadow: "0 2px 10px rgba(0,0,0,0.4)" }}
          >
            Rated by 1500+ guests for safe, authentic wellness experiences
          </p>

          {/* Primary CTA */}
          <div
            className={`flex justify-center transition-all duration-1000 ${contentLoaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
              }`}
            style={{ transitionDelay: "0.7s" }}
          >
            <Button
              variant="hero"
              size="hero"
              className="mb-8"
              onClick={() => openBooking()}
            >
              Book Your Experience
            </Button>
          </div>


          {/* Secondary Links */}
          <div
            className={`flex items-center justify-center gap-8 transition-all duration-1000 ${contentLoaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
              }`}
            style={{ transitionDelay: "0.9s" }}
          >
            <Link
              href="/gift-cards"
              className="font-body text-sm tracking-luxury uppercase text-white/90 hover:text-champagne-light transition-colors duration-300 border-b border-white/30 hover:border-champagne-light pb-1"
              style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}
            >
              Gift Wellness
            </Link>
            <span className="text-white/50">|</span>
            <Link
              href="/franchise"
              className="font-body text-sm tracking-luxury uppercase text-white/90 hover:text-champagne-light transition-colors duration-300 border-b border-white/30 hover:border-champagne-light pb-1"
              style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-1000 ${contentLoaded ? "opacity-100" : "opacity-0"
          }`}
        style={{ transitionDelay: "1.5s" }}
      >
        <div className="w-px h-16 bg-gradient-to-b from-champagne/60 to-transparent animate-gentle-float" />
      </div>
    </section>
  );
};

export default HeroSection;