"use client";

import { MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/context/BookingContext";


const locations = [
    {
        name: "Spa Le Paris - RMV",
        area: "New BEL Road",
        address: "#24, 1st Floor, Surya Serenity, New BEL Road, RMV 2nd Stage, Bengaluru 560094",
        hours: "Mon-Sun: 10:00 AM - 10:00 PM",
        phone: "+91 8041 137 369 / +91 7349 365 566",
        embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.486204561879!2d77.5684483!3d13.0284483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17d74db79d03%3A0x6a059d0f36746813!2sRMV%202nd%20Stage%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1683812345678!5m2!1sen!2sin"
    },
    {
        name: "Riverside Wellness",
        area: "Riverfront Promenade",
        address: "The Waterfront Estate, Villa 7, River View Road",
        hours: "Mon-Sun: 9:00 AM - 9:00 PM",
        phone: "+91 98765 43211",
        embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.87654321!2d77.6!3d12.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU0JzAwLjAiTiA3N8KwMzYnMDAuMCJF!5e0!3m2!1sen!2sin!4v1683812345679!5m2!1sen!2sin"
    },
    {
        name: "Hills Retreat",
        area: "Whispering Pines",
        address: "Summit Lodge, Pine Valley Road, Hillside District",
        hours: "Mon-Sun: 8:00 AM - 8:00 PM",
        phone: "+91 98765 43212",
        embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0!2d77.5!3d13.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAwJzAwLjAiTiA3N8KwMzAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1683812345680!5m2!1sen!2sin"
    }
];

const LocationsGrid = () => {
    const { openBooking } = useBooking();

    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {locations.map((loc, index) => (
                        <div
                            key={index}
                            className="group relative bg-card rounded-2xl p-8 text-center transition-all duration-700 hover:shadow-card gold-border-hover cursor-pointer flex flex-col items-center h-full"
                            onClick={() => openBooking({ location: loc.name })}
                        >

                            {/* Icon Container - Clone of ServicesSection */}
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-6 transition-all duration-500 group-hover:bg-champagne/20 group-hover:scale-110">
                                <MapPin className="w-7 h-7 text-champagne" strokeWidth={1.5} />
                            </div>

                            {/* Title */}
                            <h3 className="font-heading text-2xl font-medium text-foreground mb-2">
                                {loc.name}
                            </h3>
                            <p className="font-body text-sm font-medium text-champagne-dark tracking-wide uppercase mb-6">
                                {loc.area}
                            </p>

                            {/* Details */}
                            <div className="space-y-4 text-muted-foreground font-light text-sm leading-relaxed mb-8 flex-grow">
                                <p>{loc.address}</p>
                                <div className="flex items-center justify-center gap-2">
                                    <Clock className="w-4 h-4 text-champagne" />
                                    <span>{loc.hours}</span>
                                </div>
                                <div className="flex items-center justify-center gap-2">
                                    <Phone className="w-4 h-4 text-champagne" />
                                    <span>{loc.phone}</span>
                                </div>
                            </div>

                            {/* Action */}
                            <Button variant="outline" className="w-full border-champagne/30 hover:bg-champagne hover:text-white group-hover:border-champagne transition-all duration-300">
                                Book at this Location
                            </Button>

                            {/* Hover Accent - Clone of ServicesSection */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-champagne transition-all duration-500 group-hover:w-16" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LocationsGrid;
