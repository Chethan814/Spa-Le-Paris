"use client";

import { useRef, useEffect } from "react";
import { Sparkles, Heart, ShieldCheck, Clock } from "lucide-react";

const values = [
    {
        icon: Heart,
        title: "Intentional Care",
        description: "Every touch is deliberate, every treatment personalized to your unique needs."
    },
    {
        icon: Sparkles,
        title: "Refined Luxury",
        description: "An atmosphere of understated elegance, where comfort meets sophistication."
    },
    {
        icon: ShieldCheck,
        title: "Uncompromising Trust",
        description: "The highest standards of hygiene and professionalism, ensuring your peace of mind."
    },
    {
        icon: Clock,
        title: "Timeless Moments",
        description: "A space where time slows down, allowing you to fully immerse in the present."
    }
];

const Values = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-fade-in-up");
                        entry.target.classList.remove("opacity-0", "translate-y-8");
                    }
                });
            },
            { threshold: 0.1, rootMargin: "-50px" }
        );

        const children = sectionRef.current?.querySelectorAll(".value-card");
        if (children) {
            children.forEach((child) => observer.observe(child));
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className="py-24 bg-card/30 relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <span className="text-xs font-medium tracking-[0.2em] text-champagne-dark uppercase">Core Values</span>
                    <h2 className="mt-4 font-heading text-3xl md:text-4xl text-charcoal">What We Stand For</h2>
                </div>

                <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, index) => (
                        <div
                            key={index}
                            className={`value-card opacity-0 translate-y-8 transition-all duration-700 group relative bg-card rounded-2xl p-8 text-center hover:shadow-card gold-border-hover`}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-secondary mb-6 transition-all duration-500 group-hover:bg-champagne/20 group-hover:scale-110">
                                <value.icon className="w-6 h-6 text-champagne" strokeWidth={1.5} />
                            </div>
                            <h3 className="font-heading text-xl text-charcoal mb-4">{value.title}</h3>
                            <p className="font-body text-charcoal/70 font-light leading-relaxed text-sm">
                                {value.description}
                            </p>
                            {/* Hover Accent from ServicesSection */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-champagne transition-all duration-500 group-hover:w-16" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Values;
