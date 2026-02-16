"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Sparkles, Heart, Flower2, ArrowRight } from "lucide-react";

const serviceCategories = [
    {
        id: "therapy s",
        title: "Signature therapy’s",
        subtitle: "Full-body relaxation & therapy",
        description: "Ancient techniques meet modern wellness for complete mind-body restoration",
        icon: Heart,
        image: "therapy ",
    },
    {
        id: "quick",
        title: "Quick Services",
        subtitle: "Targeted relief",
        description: "Express treatments designed for focused relief when time is precious",
        icon: Sparkles,
        image: "quick",
    },
    {
        id: "scrubs",
        title: "Body Scrubs",
        subtitle: "Exfoliation & skin renewal",
        description: "Reveal your natural radiance through gentle, luxurious exfoliation",
        icon: Flower2,
        image: "scrub",
    },
];

const ServicesCategories = () => {
    const [categoriesVisible, setCategoriesVisible] = useState(false);
    const categoriesRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observerOptions = { threshold: 0.2 };

        const categoriesObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) setCategoriesVisible(true);
            });
        }, observerOptions);

        if (categoriesRef.current) categoriesObserver.observe(categoriesRef.current);

        return () => {
            categoriesObserver.disconnect();
        };
    }, []);

    return (
        <section id="service-categories" ref={categoriesRef} className="py-24 md:py-32 bg-background">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span
                        className={`font-body text-xs tracking-luxury uppercase text-champagne mb-4 block transition-all duration-700 ${categoriesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                            }`}
                    >
                        What We Offer
                    </span>
                    <h2
                        className={`font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 transition-all duration-700 delay-100 ${categoriesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                            }`}
                    >
                        Service Categories
                    </h2>
                    <p
                        className={`font-body text-muted-foreground max-w-xl mx-auto transition-all duration-700 delay-200 ${categoriesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                            }`}
                    >
                        Explore our thoughtfully designed therapy collections
                    </p>
                </div>

                {/* Category Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {serviceCategories.map((category, index) => {
                        const Icon = category.icon;
                        return (
                            <Link
                                key={category.id}
                                href={`/packages?category=${category.id}`}
                                className={`group relative bg-card rounded-2xl p-8 text-center transition-all duration-700 hover:shadow-card gold-border-hover cursor-pointer ${categoriesVisible
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-8"
                                    }`}
                                style={{ transitionDelay: `${300 + index * 150}ms` }}
                            >
                                {/* Icon */}
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary mb-6 transition-all duration-500 group-hover:bg-champagne/20 group-hover:scale-110">
                                    <Icon className="w-9 h-9 text-champagne" strokeWidth={1.5} />
                                </div>

                                {/* Title */}
                                <h3 className="font-heading text-2xl font-medium text-foreground mb-2">
                                    {category.title}
                                </h3>

                                {/* Subtitle */}
                                <p className="font-body text-sm text-champagne mb-4">
                                    {category.subtitle}
                                </p>

                                {/* Description */}
                                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
                                    {category.description}
                                </p>

                                {/* Link indicator */}
                                <div className="flex items-center justify-center gap-2 text-champagne opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="font-body text-sm">View Treatments</span>
                                    <ArrowRight className="w-4 h-4" />
                                </div>

                                {/* Hover accent line */}
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-champagne transition-all duration-500 group-hover:w-20" />
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ServicesCategories;
