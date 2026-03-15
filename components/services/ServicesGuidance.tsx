"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/context/BookingContext";

const ServicesGuidance = () => {
    const { openBooking } = useBooking();

    return (
        <>
            {/* Guidance Section */}
            <section className="py-20 md:py-28 bg-background">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="w-px h-10 bg-champagne/40 mx-auto mb-8" />
                        <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-light text-foreground mb-6">
                            Not sure which therapy is right for you?
                        </h2>
                        <p className="font-body text-muted-foreground font-light max-w-xl mx-auto mb-10">
                            Our therapists will guide you based on your needs and comfort. Every journey is personal.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button
                                asChild
                                className="bg-champagne hover:bg-champagne-dark text-primary-foreground px-8 py-6 rounded-full font-body tracking-wide transition-all duration-300 hover:shadow-soft"
                            >
                                <Link href="/packages">Explore Packages</Link>
                            </Button>
                            <a href="tel:8041137369">
                                <Button
                                    variant="outline"

                                    className="border-champagne/40 text-foreground hover:bg-champagne/10 px-8 py-6 rounded-full font-body tracking-wide transition-all duration-300"
                                >
                                    Speak to Our Consultant
                                </Button>

                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ServicesGuidance;
