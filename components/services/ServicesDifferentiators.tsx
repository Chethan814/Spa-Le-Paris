"use client";

import { useState, useEffect, useRef } from "react";
import { Shield, Users, Leaf, Heart } from "lucide-react";

const differentiators = [
    {
        icon: Users,
        title: "Skilled Therapists",
        description: "Our certified professionals bring years of expertise and genuine care to every treatment",
    },
    {
        icon: Shield,
        title: "Hygiene-First Approach",
        description: "Medical-grade sanitation protocols ensure your complete peace of mind",
    },
    {
        icon: Leaf,
        title: "Premium Products",
        description: "Only the finest organic oils and botanicals touch your skin",
    },
    {
        icon: Heart,
        title: "Private Environment",
        description: "Serene, personal spaces designed for your ultimate comfort and relaxation",
    },
];

const ServicesDifferentiators = () => {
    const [differencesVisible, setDifferencesVisible] = useState(false);
    const differencesRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observerOptions = { threshold: 0.2 };

        const differencesObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) setDifferencesVisible(true);
            });
        }, observerOptions);

        if (differencesRef.current) differencesObserver.observe(differencesRef.current);

        return () => {
            differencesObserver.disconnect();
        };
    }, []);

    return (
        <section ref={differencesRef} className="py-24 md:py-32 bg-secondary/30">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span
                        className={`font-body text-xs tracking-luxury uppercase text-champagne mb-4 block transition-all duration-700 ${differencesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                            }`}
                    >
                        The Spa Le Paris Difference
                    </span>
                    <h2
                        className={`font-heading text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-6 transition-all duration-700 delay-100 ${differencesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                            }`}
                    >
                        What Sets Us Apart
                    </h2>
                    <p
                        className={`font-body text-muted-foreground font-light max-w-xl mx-auto transition-all duration-700 delay-200 ${differencesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                            }`}
                    >
                        Every detail crafted for your complete peace and wellbeing
                    </p>
                </div>

                {/* Differentiators Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {differentiators.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.title}
                                className={`text-center p-6 transition-all duration-700 ${differencesVisible
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-8"
                                    }`}
                                style={{ transitionDelay: `${300 + index * 150}ms` }}
                            >
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-background mb-5 shadow-soft">
                                    <Icon className="w-6 h-6 text-champagne" strokeWidth={1.5} />
                                </div>
                                <h3 className="font-heading text-xl font-medium text-foreground mb-3">
                                    {item.title}
                                </h3>
                                <p className="font-body text-sm text-muted-foreground font-light leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ServicesDifferentiators;
