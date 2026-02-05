"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutCTA = () => {
    return (
        <section className="py-24 bg-secondary/30 relative overflow-hidden">
            <div className="container mx-auto px-6 text-center">
                <h2 className="font-heading text-3xl md:text-5xl text-foreground mb-6">
                    Begin Your Journey
                </h2>
                <p className="font-body text-muted-foreground max-w-xl mx-auto mb-10 font-light">
                    Whether you seek a moment of solitude or a complete transformation,
                    our doors are open.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <Link href="/services">
                        <Button variant="gold" size="lg" className="group min-w-[200px]">
                            <span>Explore Services</span>
                            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>

                    <Link href="/franchise">
                        <Button variant="outline" size="lg" className="group min-w-[200px] border-champagne text-champagne-dark hover:bg-champagne/10">
                            <span>View Locations</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default AboutCTA;
