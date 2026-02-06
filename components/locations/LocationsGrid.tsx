"use client";

import { MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/context/BookingContext";


const locations = [
    {
        name: "SPA LE PARIS - KALYAN NAGAR",
        area: "Kalyan Nagar",
        address: "#412, 3rd Floor, Pearl Building, Above Helios Showroom, HRBR Layout 2nd Block, Kalyan Nagar, Bengaluru - 560043",
        hours: "Mon-Sun: 10:00 AM - 10:00 PM",
        phone: "080-41636333 / 8147787989",
        embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.2!2d77.6!3d13.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAwJzAwLjAiTiA3N8KwMzYnMDAuMCJF!5e0!3m2!1sen!2sin!4v1683812345678!5m2!1sen!2sin"
    },
    {
        name: "SPA LE PARIS - HULIMAVU",
        area: "Hulimavu",
        address: "#6/C, 2nd Block, 2nd Phase, BTM Layout 6th Stage, Hulimavu Main Road, Opp to Nano Hospital, Above Jockey Showroom, Bengaluru - 560076",
        hours: "Mon-Sun: 10:00 AM - 10:00 PM",
        phone: "080-41463349 / 7829022223",
        embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0!2d77.6!3d12.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDQ4JzAwLjAiTiA3N8KwMzYnMDAuMCJF!5e0!3m2!1sen!2sin!4v1683812345679!5m2!1sen!2sin"
    },
    {
        name: "SPA LE PARIS - JP NAGAR 7 TH PHASE",
        area: "JP Nagar",
        address: "#477, 3rd Floor Above KFC, Kothanur Main Road, JP Nagar 7th Phase, Near Brigade Millenium Signal, Bengaluru - 560078",
        hours: "Mon-Sun: 10:00 AM - 10:00 PM",
        phone: "080-41137369 / 7349365566",
        embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0!2d77.58!3d12.89!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDUzJzAwLjAiTiA3N8KwMzUnMDAuMCJF!5e0!3m2!1sen!2sin!4v1683812345680!5m2!1sen!2sin"
    },
    {
        name: "SPA LE PARIS - NEW BEL ROAD",
        area: "New Bel Road",
        address: "#24, 1st Floor, Surya Serenity, New Bel Road, ITI Layout, RMV 2nd Stage, Bengaluru - 560094 Next to City Super Bazaar",
        hours: "Mon-Sun: 10:00 AM - 10:00 PM",
        phone: "080-41230880 / 9945788107",
        embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.486204561879!2d77.5684483!3d13.0284483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17d74db79d03%3A0x6a059d0f36746813!2sRMV%202nd%20Stage%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1683812345681!5m2!1sen!2sin"
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
