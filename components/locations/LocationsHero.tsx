"use client";

import { useEffect, useState } from "react";
const locationsHero = "/assets/locations-hero.jpg";

const LocationsHero = () => {
    const [bgLoaded, setBgLoaded] = useState(false);
    const [contentVisible, setContentVisible] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = locationsHero;
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
                    src={locationsHero}
                    alt="Luxury spa exterior at dusk"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 text-center">
                {/* Decorative line */}
                <div
                    className={`w-px h-16 bg-gradient-to-b from-champagne/60 to-transparent mx-auto mb-8 transition-all duration-1000 ${contentVisible ? "opacity-100" : "opacity-0"
                        }`}
                />

                {/* Pill Badge */}
                <span
                    className={`inline-block font-body text-xs tracking-[0.3em] uppercase text-champagne-light mb-8 px-6 py-2 border border-champagne/30 rounded-full backdrop-blur-sm transition-all duration-700 ${contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                >
                    Our Locations
                </span>

                {/* Main Headline */}
                <h1
                    className={`font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-6 transition-all duration-1000 delay-200 ${contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                        }`}
                >
                    Experience Professional care,
                    <br />
                    <span className="italic text-champagne-light">Wherever You Are</span>
                </h1>

                {/* Subtext */}
                <p
                    className={`font-body text-lg md:text-xl text-white/85 max-w-xl mx-auto transition-all duration-1000 delay-400 ${contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                        }`}
                >
                    Consistent care and refined wellness across all our spa destinations.
                </p>
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

export default LocationsHero;
