"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const LocationsCTA = () => {
    return (
        <section className="py-24 bg-secondary/30 relative overflow-hidden">
            <div className="container mx-auto px-6 text-center">
                <h2 className="font-heading text-3xl md:text-5xl text-foreground mb-6">
                    Ready to Decompress?
                </h2>
                <p className="font-body text-muted-foreground max-w-xl mx-auto mb-10 font-light">
                    Select your preferred location and let us prepare your experience.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <Link href="/packages">
                        <Button variant="gold" size="lg" className="group min-w-[200px]">
                            <span>Choose an Experience</span>
                            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>

                    <Link href="/about">
                        <Button variant="outline" size="lg" className="group min-w-[200px] border-champagne text-champagne-dark hover:bg-champagne/10">
                            <span>Our Philosophy</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default LocationsCTA;
