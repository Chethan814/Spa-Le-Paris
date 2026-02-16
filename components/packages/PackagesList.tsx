"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useBooking } from "@/context/BookingContext";
import { Check } from "lucide-react";

// Data Structure with numeric prices
const categories = {
    "signature-therapy s": {
        label: "Signature therapy’s",
        description: "Body Therapy",
        items: [
            {
                name: "Classic Swedish therapy ",
                badge: "Most Booked",
                prices: [
                    { duration: "60min", price: 3500 },
                    { duration: "90min", price: 4750 },
                    { duration: "120min", price: 6200 },
                ],
                description: "A calming full-body therapy  using long, flowing strokes to relax muscles and improve circulation.",
                bestFor: "Reducing Stress, Improving Sleep, and Easing Everyday Fatigue",
            },
            {
                name: "Aroma therapy ",
                prices: [
                    { duration: "60min", price: 3000 },
                ],
                description: "A gentle therapy  combined with essential oils to relax the body and calm the mind.",
                bestFor: "Emotional Stress, Burnout, and Mental Fatigue",
            },
            {
                name: "Deep Tissue therapy ",
                badge: "Recommended",
                prices: [
                    { duration: "60min", price: 3500 },
                    { duration: "90min", price: 4750 },
                    { duration: "120min", price: 6250 },
                ],
                description: "Firm and focused pressure targets deep muscle layers to release tightness, knots, and built-up tension.",
                bestFor: "Soreness, Stiffness, or After Intense Physical Activity",
            },
            {
                name: "Balinese therapy ",
                prices: [
                    { duration: "60min", price: 3500 },
                    { duration: "90min", price: 4750 },
                    { duration: "120min", price: 6250 },
                ],
                description: "A rhythmic blend of stretches, pressure, and oil-based strokes that promotes full-body balance.",
                bestFor: "Muscle Recovery, Improving Energy Flow, and Easing Body Heaviness",
            },
            {
                name: "Signature therapy ",
                badge: "Signature",
                prices: [
                    { duration: "60min", price: 3500 },
                    { duration: "90min", price: 4750 },
                    { duration: "120min", price: 6250 },
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
                    { duration: "30min", price: 1500 },
                    { duration: "60min", price: 2600 },
                ],
                description: "A deeply grounding therapy focused on specific points in the feet that connect to the body.",
                bestFor: "Tired Feet, Poor Sleep, and Overall Energy Balance",
            },
            {
                name: "Back Therapy",
                prices: [
                    { duration: "30min", price: 1500 },
                    { duration: "60min", price: 2600 },
                ],
                description: "A targeted therapy  for the upper and lower back to ease stiffness and daily stress.",
                bestFor: "Desk Jobs, Long Hours of Sitting, or Posture-Related Tension",
            },
            {
                name: "Hand, Neck & Shoulder Therapy",
                badge: "Recommended",
                prices: [
                    { duration: "30min", price: 1500 },
                    { duration: "60min", price: 2600 },
                ],
                description: "Focused relief for common tension areas in the upper body.",
                bestFor: "Screen Users, Drivers, or Anyone Carrying Upper Body Strain",
            },
            {
                name: "Face Reflexology",
                prices: [
                    { duration: "30min", price: 1500 },
                    { duration: "60min", price: 2600 },
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
                prices: [{ duration: "45min", price: 2000 }],
                description: "A simple exfoliation that removes dead skin and smoothens rough texture.",
                bestFor: "Dry, Dull, or Uneven Skin in Need of a Refresh",
            },
            {
                name: "Signature Coffee Scrub",
                badge: "Signature",
                prices: [{ duration: "45min", price: 3000 }],
                description: "A stimulating scrub using coffee granules to energize the skin and improve circulation.",
                bestFor: "Tired, Undernourished Skin or Areas Prone to Cellulite",
            },
        ],
    },
};

type PriceOption = { duration: string; price: number };

interface PackageItem {
    name: string;
    badge?: string;
    prices: PriceOption[];
    description: string;
    bestFor: string;
}

interface SelectedPackage {
    name: string;
    duration: string;
    price: number;
}

const PackageCard = ({
    item,
    index,
    isSelected,
    onToggle
}: {
    item: PackageItem;
    index: number;
    isSelected: boolean;
    onToggle: (duration: string, price: number) => void;
}) => {
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

    const handleDurationChange = (priceOption: PriceOption) => {
        if (selectedDuration !== priceOption.duration) {
            setSelectedDuration(priceOption.duration);
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentPrice(priceOption.price);
                setIsAnimating(false);
            }, 150);

            // If already selected, we need to update the selection with new logic
            // But for simplicity/UX, if they change duration while selected, we could simple deselect or update.
            // Best UX: If selected, changing duration just updates the internal state until they toggle again? 
            // Or auto-update the selection? Auto-update is tricky. 
            // Let's keep it simple: Changing duration deselects it if it was selected, or forces re-selection.
            // Actually, let's just update local state. The user has to click "Update" or "Select" effectively.
            if (isSelected) {
                // Optionally: onToggle(priceOption.duration, priceOption.price); 
                // But let's leave it manual for now to avoid accidental changes.
            }
        }
    };

    return (
        <div
            className={cn(
                "group relative bg-card/80 backdrop-blur-sm rounded-3xl p-8 transition-all duration-700 hover:shadow-card hover:-translate-y-2 border flex flex-col h-full",
                isSelected
                    ? "border-champagne bg-champagne/5 ring-1 ring-champagne/30"
                    : "border-border/50 hover:border-champagne/30"
            )}
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

            {/* Selected Indicator */}
            {isSelected && (
                <div className="absolute -top-3 right-6 px-3 py-1.5 rounded-full bg-champagne text-white text-xs font-medium flex items-center gap-1 shadow-soft animate-fade-in">
                    <Check className="w-3 h-3" />
                    Selected
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
                            onClick={() => handleDurationChange(priceOption)}
                            disabled={isSelected} // Lock duration if selected to avoid mismatch
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-500 border",
                                selectedDuration === priceOption.duration
                                    ? "bg-champagne text-white border-champagne shadow-soft"
                                    : "bg-card text-muted-foreground border-border hover:border-champagne/50 hover:text-foreground hover:bg-secondary/50",
                                isSelected && selectedDuration !== priceOption.duration && "opacity-50 cursor-not-allowed"
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
                            ₹{currentPrice.toLocaleString()}
                        </span>
                    </div>
                    <Button
                        variant={isSelected ? "outline" : "gold"}
                        size="default"
                        className={cn(
                            "shadow-soft transition-all duration-500 min-w-[140px]",
                            isSelected
                                ? "border-champagne text-champagne-dark hover:bg-destructive/10 hover:text-destructive hover:border-destructive"
                                : "hover:shadow-glow"
                        )}
                        onClick={() => onToggle(selectedDuration, currentPrice)}
                    >
                        {isSelected ? (
                            <span className="flex items-center gap-2">
                                Remove
                            </span>
                        ) : (
                            "Add to Selection"
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};

const PackagesList = () => {
    const [activeCategory, setActiveCategory] = useState("signature-therapy s");
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [selectedPackages, setSelectedPackages] = useState<SelectedPackage[]>([]);
    const { openBooking } = useBooking();

    const handleCategoryChange = (value: string) => {
        if (value === activeCategory) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setActiveCategory(value);
            setIsTransitioning(false);
        }, 300);
    };

    const togglePackage = (name: string, duration: string, price: number) => {
        setSelectedPackages(prev => {
            const exists = prev.find(p => p.name === name);
            if (exists) {
                return prev.filter(p => p.name !== name);
            }
            return [...prev, { name, duration, price }];
        });
    };

    const calculateDiscount = (count: number) => {
        if (count >= 3) return 0.15;
        if (count === 2) return 0.10;
        return 0;
    };

    const subtotal = selectedPackages.reduce((acc, curr) => acc + curr.price, 0);
    const discountPercent = calculateDiscount(selectedPackages.length);
    const discountAmount = subtotal * discountPercent;
    const finalTotal = subtotal - discountAmount;

    return (
        <section className="py-20 md:py-32 bg-gradient-to-b from-background via-secondary/20 to-background relative pb-40">
            <div className="container mx-auto px-6">
                <Tabs
                    defaultValue="signature-therapy s"
                    value={activeCategory}
                    onValueChange={handleCategoryChange}
                >
                    {/* Category Selector */}
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
                        <p className="text-center text-xs text-muted-foreground/60 mt-4 font-light hidden md:block">
                            Select multiple treatments to create your personalized spa day.
                        </p>
                    </div>

                    {/* Content Grid */}
                    {Object.entries(categories).map(([key, category]) => (
                        <TabsContent
                            key={key}
                            value={key}
                            className={cn(
                                "mt-0 focus-visible:outline-none transition-all duration-500",
                                isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
                            )}
                        >
                            <div className="text-center mb-16">
                                <h2 className="text-2xl md:text-3xl font-heading text-muted-foreground/50 italic">
                                    — {category.description} —
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                                {category.items.map((item, index) => (
                                    <div
                                        key={item.name}
                                        className="animate-fade-in-up"
                                        style={{ animationDelay: `${index * 120}ms`, animationFillMode: "both" }}
                                    >
                                        <PackageCard
                                            item={item as PackageItem}
                                            index={index}
                                            isSelected={selectedPackages.some(p => p.name === item.name)}
                                            onToggle={(duration, price) => togglePackage(item.name, duration, price)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>

            {/* Sticky Cart Summary */}
            <div className={cn(
                "fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 transform",
                selectedPackages.length > 0 ? "translate-y-0" : "translate-y-full"
            )}>
                <div className="bg-white/90 backdrop-blur-md border-t border-champagne/30 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-6 pt-4 px-6 md:pb-8 md:pt-6">
                    <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-start">
                            <div className="flex flex-col">
                                <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-1">
                                    Your Selection
                                </span>
                                <div className="flex items-baseline gap-2">
                                    <span className="font-heading text-2xl text-foreground">
                                        {selectedPackages.length} <span className="text-base text-muted-foreground font-body">Treatments</span>
                                    </span>
                                </div>
                            </div>

                            <div className="h-10 w-px bg-border hidden md:block" />

                            <div className="flex flex-col">
                                <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-1">
                                    Total Value
                                </span>
                                <div className="flex items-baseline gap-3">
                                    {discountPercent > 0 && (
                                        <span className="text-lg text-muted-foreground line-through font-light">
                                            ₹{subtotal.toLocaleString()}
                                        </span>
                                    )}
                                    <span className="font-heading text-3xl text-champagne-dark">
                                        ₹{finalTotal.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {discountPercent > 0 && (
                            <div className="hidden md:flex items-center gap-2 px-4 py-1.5 bg-champagne/10 border border-champagne/20 rounded-full">
                                <span className="text-xs font-medium text-champagne-dark">
                                    {discountPercent * 100}% Bundle Savings Applied
                                </span>
                            </div>
                        )}

                        <div className="flex gap-3 w-full md:w-auto">
                            <Button
                                variant="outline"
                                onClick={() => setSelectedPackages([])}
                                className="flex-1 md:flex-none border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
                            >
                                Clear
                            </Button>
                            <Button
                                variant="gold"
                                size="lg"
                                onClick={() => openBooking({ selectedPackages })}
                                className="flex-1 md:flex-none shadow-soft hover:shadow-glow min-w-[200px]"
                            >
                                Request Appointment
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PackagesList;
