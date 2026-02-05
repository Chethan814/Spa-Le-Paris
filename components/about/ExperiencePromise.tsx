"use client";

import { useEffect, useRef, useState } from "react";
// Using existing elegant texture or simple background instead of potentially broken parallax
// We will mimic the PhilosophySection style which is reliable

const ExperiencePromise = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
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
            ref={sectionRef}
            className="relative py-32 overflow-hidden bg-secondary/30"
        >
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-champagne/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-rose/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <span className="font-body text-xs tracking-luxury uppercase text-champagne mb-8 block">
                        Our Promise
                    </span>

                    <p className="font-heading text-3xl md:text-4xl lg:text-5xl text-charcoal leading-tight font-light">
                        “Every detail—from the oils we select to the silence we preserve—is intentional.”
                    </p>

                    <div className="w-16 h-px bg-champagne mx-auto mt-10 mb-4" />
                </div>
            </div>
        </section>
    );
};

export default ExperiencePromise;
