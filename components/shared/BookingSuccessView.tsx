"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookingSuccessViewProps {
    onClose: () => void;
}

export function BookingSuccessView({ onClose }: BookingSuccessViewProps) {
    return (
        <div className="py-8 sm:py-12 flex flex-col items-center text-center space-y-4 animate-fade-in">
            <CheckCircle2 className="w-12 h-12 sm:w-16 sm:h-16 text-champagne mb-2" />
            <h3 className="text-xl sm:text-2xl font-heading">Thank You</h3>
            <p className="text-charcoal-light max-w-sm text-sm sm:text-base">
                Our team will contact you shortly via phone or email to confirm your appointment details.
            </p>
            <Button
                onClick={onClose}
                className="mt-6 sm:mt-8 bg-champagne hover:bg-champagne-dark text-white px-8 rounded-full"
            >
                Close
            </Button>
        </div>
    );
}
