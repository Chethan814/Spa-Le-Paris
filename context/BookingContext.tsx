"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type BookingPrefillData = {
    service?: string;
    package?: string;
    duration?: string;
    location?: string;
    selectedPackages?: Array<{
        name: string;
        duration: string;
        price: number;
    }>;
};

interface BookingContextType {
    isOpen: boolean;
    prefillData: BookingPrefillData;
    openBooking: (data?: BookingPrefillData) => void;
    closeBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [prefillData, setPrefillData] = useState<BookingPrefillData>({});

    const openBooking = (data: BookingPrefillData = {}) => {
        setPrefillData(data);
        setIsOpen(true);
    };

    const closeBooking = () => {
        setIsOpen(false);
        setPrefillData({});
    };

    return (
        <BookingContext.Provider value={{ isOpen, prefillData, openBooking, closeBooking }}>
            {children}
        </BookingContext.Provider>
    );
}

export function useBooking() {
    const context = useContext(BookingContext);
    if (context === undefined) {
        throw new Error("useBooking must be used within a BookingProvider");
    }
    return context;
}
