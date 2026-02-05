"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Data Structure with badges
const categories = {
    "signature-massages": {
        label: "Signature Massages",
        description: "Body Therapy",
        items: [
            {
                name: "Classic Swedish Massage",
                badge: "Most Booked",
                prices: [
                    { duration: "60min", price: "₹3,500" },
                    { duration: "90min", price: "₹4,750" },
                    { duration: "120min", price: "₹6,200" },
                ],
                description: "A calming full-body massage using long, flowing strokes to relax muscles and improve circulation.",
                bestFor: "Reducing Stress, Improving Sleep, and Easing Everyday Fatigue",
            },
            {
                name: "Aromatherapy Massage",
                prices: [
                    { duration: "60min", price: "₹3,500" },
                    { duration: "90min", price: "₹4,250" },
                    { duration: "120min", price: "₹5,500" },
                ],
                description: "A gentle massage combined with essential oils to relax the body and calm the mind.",
                bestFor: "Emotional Stress, Burnout, and Mental Fatigue",
            },
            {
                name: "Deep Tissue Massage",
                badge: "Recommended",
                prices: [
                    { duration: "60min", price: "₹3,500" },
                    { duration: "90min", price: "₹4,750" },
                    { duration: "120min", price: "₹6,250" },
                ],
                description: "Firm and focused pressure targets deep muscle layers to release tightness, knots, and built-up tension.",
                bestFor: "Soreness, Stiffness, or After Intense Physical Activity",
            },
            {
                name: "Balinese Massage",
                prices: [
                    { duration: "60min", price: "₹3,500" },
                    { duration: "90min", price: "₹4,750" },
                    { duration: "120min", price: "₹6,250" },
                ],
                description: "A rhythmic blend of stretches, pressure, and oil-based strokes that promotes full-body balance.",
                bestFor: "Muscle Recovery, Improving Energy Flow, and Easing Body Heaviness",
            },
            {
                name: "Signature Massage",
                badge: "Signature",
                prices: [
                    { duration: "60min", price: "₹3,500" },
                    { duration: "90min", price: "₹4,750" },
                    { duration: "120min", price: "₹6,250" },
                ],
                description: "Our house specialty combining multiple techniques for complete rejuvenation and deep relaxation.",
                bestFor: "Reducing Stress, Improving Sleep, and Easing Everyday Fatigue",
            },
        ],
    },
    "quick-services": {
        label: "Quick Services",
        description: "Targeted Relief",
        items: [
            {
                name: "Foot Reflexology",
                badge: "Most Booked",
                prices: [
                    { duration: "30min", price: "₹1,500" },
                    { duration: "60min", price: "₹2,600" },
                ],
                description: "A deeply grounding therapy focused on specific points in the feet that connect to the body.",
                bestFor: "Tired Feet, Poor Sleep, and Overall Energy Balance",
            },
            {
                name: "Back Therapy",
                prices: [
                    { duration: "30min", price: "₹1,500" },
                    { duration: "60min", price: "₹2,600" },
                ],
                description: "A targeted massage for the upper and lower back to ease stiffness and daily stress.",
                bestFor: "Desk Jobs, Long Hours of Sitting, or Posture-Related Tension",
            },
            {
                name: "Hand, Neck & Shoulder Therapy",
                badge: "Recommended",
                prices: [
                    { duration: "30min", price: "₹1,500" },
                    { duration: "60min", price: "₹2,600" },
                ],
                description: "Focused relief for common tension areas in the upper body.",
                bestFor: "Screen Users, Drivers, or Anyone Carrying Upper Body Strain",
            },
            {
                name: "Face Reflexology",
                prices: [
                    { duration: "30min", price: "₹1,500" },
                    { duration: "60min", price: "₹2,600" },
                ],
                description: "Gentle facial pressure points are activated to relieve tension and support overall relaxation.",
                bestFor: "Headaches, Jaw Tightness, or a Quick Mid-Day Reset",
            },
        ],
    },
    "body-scrubs": {
        label: "Body Scrubs",
        description: "Exfoliation & Glow",
        items: [
            {
                name: "Essential Scrub",
                prices: [{ duration: "45min", price: "₹2,000" }],
                description: "A simple exfoliation that removes dead skin and smoothens rough texture.",
                bestFor: "Dry, Dull, or Uneven Skin in Need of a Refresh",
            },
            {
                name: "Signature Coffee Scrub",
                badge: "Signature",
                prices: [{ duration: "45min", price: "₹3,000" }],
                description: "A stimulating scrub using coffee granules to energize the skin and improve circulation.",
                bestFor: "Tired, Undernourished Skin or Areas Prone to Cellulite",
            },
        ],
    },
};

type PriceOption = { duration: string; price: string };

interface PackageItem {
    name: string;
    badge?: string;
    prices: PriceOption[];
    description: string;
    bestFor: string;
}

const PackageCard = ({ item, index }: { item: PackageItem; index: number }) => {
    const [selectedDuration, setSelectedDuration] = useState(item.prices[0].duration);
    const [currentPrice, setCurrentPrice] = useState(item.prices[0].price);
    const [isAnimating, setIsAnimating] = useState(false);


    const getBadgeStyle = (badge: string) => {
        switch (badge) {
            case "Most Booked":
                return "bg-champagne/20 text-champagne-dark border-champagne/30";
            case "Signature":
                return "bg-primary/15 text-primary border-primary/25";
            case "Recommended":
                return "bg-rose-light text-charcoal border-rose/30";
            default:
                return "bg-secondary text-muted-foreground border-border";
        }
    };

    return (
        <div
            className="group relative bg-card/80 backdrop-blur-sm rounded-3xl p-8 transition-all duration-700 hover:shadow-card hover:-translate-y-2 border border-border/50 hover:border-champagne/30 flex flex-col h-full"
            style={{ animationDelay: `${index * 120}ms` }}
        >
            {/* Badge */}
            {item.badge && (
                <div className={cn(
                    "absolute -top-3 left-6 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide border shadow-soft",
                    getBadgeStyle(item.badge)
                )}>
                    {item.badge}
                </div>
            )}

            <div className="mb-8 pt-2">
                <h3 className="font-heading text-2xl md:text-3xl text-foreground mb-4 group-hover:text-champagne-dark transition-colors duration-500">
                    {item.name}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed text-sm md:text-base">
                    {item.description}
                </p>
            </div>

            {/* Best For Section */}
            <div className="bg-secondary/40 rounded-2xl p-4 mb-8 border border-secondary">
                <span className="text-[10px] uppercase tracking-luxury text-champagne-dark font-semibold block mb-2">
                    Best For
                </span>
                <p className="text-sm text-foreground/80 font-body leading-relaxed">
                    {item.bestFor}
                </p>
            </div>

            <div className="mt-auto">
                {/* Duration Selector */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {item.prices.map((priceOption) => (
                        <button
                            key={priceOption.duration}
                            onClick={() => {
                                if (selectedDuration !== priceOption.duration) {
                                    setSelectedDuration(priceOption.duration);
                                    setIsAnimating(true);
                                    setTimeout(() => {
                                        setCurrentPrice(priceOption.price);
                                        setIsAnimating(false);
                                    }, 150);
                                }
                            }}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-500 border",
                                selectedDuration === priceOption.duration
                                    ? "bg-champagne text-white border-champagne shadow-soft"
                                    : "bg-card text-muted-foreground border-border hover:border-champagne/50 hover:text-foreground hover:bg-secondary/50"
                            )}
                        >
                            {priceOption.duration}
                        </button>
                    ))}
                </div>

                <div className="flex items-end justify-between border-t border-border/50 pt-6">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-muted-foreground uppercase tracking-luxury mb-1">
                            Price
                        </span>
                        <span
                            className={cn(
                                "text-3xl md:text-4xl font-heading text-foreground transition-all duration-300",
                                isAnimating ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"
                            )}
                        >
                            {currentPrice}
                        </span>
                    </div>
                    <Link href="/locations">
                        <Button
                            variant="gold"
                            size="default"
                            className="shadow-soft hover:shadow-glow transition-all duration-500"
                        >
                            Book This Experience
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-3xl border-2 border-champagne/0 transition-all duration-700 group-hover:border-champagne/20 pointer-events-none" />
        </div>
    );
};

const PackagesList = () => {
    const [activeCategory, setActiveCategory] = useState("signature-massages");
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleCategoryChange = (value: string) => {
        if (value === activeCategory) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setActiveCategory(value);
            setIsTransitioning(false);
        }, 300);
    };

    return (
        <section className="py-20 md:py-32 bg-gradient-to-b from-background via-secondary/20 to-background">
            <div className="container mx-auto px-6">
                <Tabs
                    defaultValue="signature-massages"
                    value={activeCategory}
                    onValueChange={handleCategoryChange}
                >
                    {/* Category Selector - Sticky on mobile */}
                    <div className="sticky top-20 z-40 bg-background py-6 mb-16 -mx-6 px-6 md:static md:bg-transparent md:backdrop-blur-none md:py-0 border-b border-border/30 md:border-none">
                        <div className="flex justify-center">
                            <TabsList className="h-auto bg-card shadow-card border border-border/60 p-2 rounded-full inline-flex gap-1 w-full md:w-auto overflow-x-auto justify-start md:justify-center no-scrollbar">
                                {Object.entries(categories).map(([key, category]) => (
                                    <TabsTrigger
                                        key={key}
                                        value={key}
                                        className="rounded-full px-6 py-3 text-sm md:text-base font-body tracking-wide data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-soft transition-all duration-500 min-w-max whitespace-nowrap"
                                    >
                                        {category.label}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>
                        {/* Helper text */}
                        <p className="text-center text-xs text-muted-foreground/60 mt-4 font-light hidden md:block">
                            Not sure what to choose? Our therapists will guide you.
                        </p>
                    </div>

                    {/* Content Grid with smooth transitions */}
                    {Object.entries(categories).map(([key, category]) => (
                        <TabsContent
                            key={key}
                            value={key}
                            className={cn(
                                "mt-0 focus-visible:outline-none transition-all duration-500",
                                isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
                            )}
                        >
                            {/* Category Description */}
                            <div className="text-center mb-16">
                                <h2 className="text-2xl md:text-3xl font-heading text-muted-foreground/50 italic">
                                    — {category.description} —
                                </h2>
                            </div>

                            {/* Package Cards Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                                {category.items.map((item, index) => (
                                    <div
                                        key={item.name}
                                        className="animate-fade-in-up"
                                        style={{ animationDelay: `${index * 120}ms`, animationFillMode: "both" }}
                                    >
                                        <PackageCard item={item as PackageItem} index={index} />
                                    </div>
                                ))}
                            </div>

                            {/* Consultation CTA */}
                            <div className="mt-24 text-center bg-card/60 backdrop-blur-sm border border-champagne/15 rounded-3xl p-12 max-w-3xl mx-auto shadow-soft animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                                <h3 className="font-heading text-3xl text-foreground mb-4">
                                    Need help selecting the right experience?
                                </h3>
                                <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                                    Our spa consultants are here to guide you to the perfect treatment based on your needs.
                                </p>
                                <Link href="/locations">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="border-champagne text-champagne-dark hover:bg-champagne hover:text-white transition-all duration-500"
                                    >
                                        Speak with a Consultant
                                    </Button>
                                </Link>
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </section>
    );
};

export default PackagesList;
