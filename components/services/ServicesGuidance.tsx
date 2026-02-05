"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ServicesGuidance = () => {
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
                            <Button
                                variant="outline"
                                className="border-champagne/40 text-foreground hover:bg-champagne/10 px-8 py-6 rounded-full font-body tracking-wide transition-all duration-300"
                            >
                                Speak to Our Consultant
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Soft CTA Section */}
            <section className="py-16 md:py-20 bg-secondary/20">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                        <p className="font-body text-muted-foreground font-light text-center md:text-left">
                            Ready to begin your wellness journey?
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                            <Button
                                asChild
                                variant="ghost"
                                className="text-champagne hover:text-champagne-dark hover:bg-champagne/10 font-body order-2 sm:order-1"
                            >
                                <Link href="/packages" className="flex items-center gap-2">
                                    View Packages <ArrowRight className="w-4 h-4" />
                                </Link>
                            </Button>
                            <span className="hidden sm:inline text-border order-last sm:order-2">|</span>
                            <Button
                                asChild
                                className="bg-champagne hover:bg-champagne-dark text-primary-foreground rounded-full font-body px-6 w-full sm:w-auto order-1 sm:order-3"
                            >
                                <Link href="/packages">Book an Experience</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ServicesGuidance;
