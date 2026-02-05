"use client";

import { useState, useEffect } from "react";
const servicesHero = "/assets/services-hero.jpg";

const ServicesHero = () => {
    const [heroLoaded, setHeroLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setHeroLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const scrollToCategories = () => {
        document
            .getElementById("service-categories")
            ?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="relative min-h-screen overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src={servicesHero}
                    alt="Luxury spa atmosphere"
                    className={`w-full h-full object-cover transition-all duration-[2s] ease-out ${heroLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
                        }`}
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
            </div>

            {/* TRUE CENTERING WRAPPER (same as PackagesHero) */}
            <div className="relative z-10 flex min-h-screen items-center justify-center -translate-y-16">
                <div className="container mx-auto px-6 text-center">
                    <div className="max-w-4xl mx-auto">
                        {/* Decorative line */}
                        <div
                            className={`w-px h-16 bg-gradient-to-b from-champagne/60 to-transparent mx-auto mb-8 transition-all duration-1000 delay-300 ${heroLoaded ? "opacity-100" : "opacity-0"
                                }`}
                        />

                        <span
                            className={`inline-block py-2 px-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-[11px] tracking-[0.25em] uppercase text-white/90 mb-8 transition-all duration-700 delay-500 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                                }`}
                        >
                            Discover Our Offerings
                        </span>

                        <h1
                            className={`font-heading text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 transition-all duration-1000 delay-700 drop-shadow-lg ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                }`}
                            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
                        >
                            Signature Experiences
                        </h1>

                        <p
                            className={`font-body text-base md:text-lg text-white/80 font-light max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-900 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                                }`}
                            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.4)" }}
                        >
                            All our treatments are performed by trained professionals in a calm, respectful environment designed for genuine wellness.
                        </p>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator — isolated */}
            <div
                className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1200 ${heroLoaded ? "opacity-100" : "opacity-0"
                    }`}
            >
                <button
                    onClick={scrollToCategories}
                    className="flex flex-col items-center gap-2 hover:translate-y-1 transition-transform"
                >
                    <div className="w-px h-16 bg-gradient-to-b from-champagne/60 to-transparent animate-gentle-float" />
                </button>
            </div>
        </section>
    );
};

export default ServicesHero;
