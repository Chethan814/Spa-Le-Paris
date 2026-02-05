"use client";

import { useState } from "react";
// Static map placeholder for "Lovable" aesthetic without API key complexity
// In production, this would be an interactive map or multiple embeds

const LocationsMap = () => {
    return (
        <section className="py-24 bg-secondary/20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="font-heading text-3xl md:text-4xl text-charcoal mb-4">Find Your Escape</h2>
                    <p className="font-body text-muted-foreground font-light">
                        Ideally situated for your convenience
                    </p>
                </div>

                {/* Map Container */}
                <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-card border border-border/50 bg-sand/10">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15555.98765432!2d77.6!3d12.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU3JzAwLjAiTiA3N8KwMzYnMDAuMCJF!5e0!3m2!1sen!2sin!4v1683812345679!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0, filter: "grayscale(0.2) contrast(1.1) opacity(0.85)" }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Our Locations"
                    />

                    {/* Overlay for aesthetic integration */}
                    <div className="absolute inset-0 pointer-events-none border-[12px] border-white/50 rounded-2xl" />
                </div>
            </div>
        </section>
    );
};

export default LocationsMap;
