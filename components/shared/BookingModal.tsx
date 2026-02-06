"use client";

import React, { useState } from "react";
import { useBooking } from "@/context/BookingContext";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { BookingForm } from "./BookingForm";
import { BookingSuccessView } from "./BookingSuccessView";

export function BookingModal() {
    const { isOpen, closeBooking, prefillData } = useBooking();
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSuccess = () => {
        setIsSuccess(true);
    };

    const handleClose = () => {
        closeBooking();
        // Reset success state after modal finishes closing or when explicitly closed
        setTimeout(() => setIsSuccess(false), 300);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto bg-ivory border-sand text-charcoal p-0 sm:rounded-2xl shadow-luxury">
                <DialogHeader className="p-4 sm:p-6 pb-0">
                    <DialogTitle className="text-2xl sm:text-3xl font-heading text-center tracking-wide">
                        {isSuccess ? "Appointment Requested" : "Experience Excellence"}
                    </DialogTitle>
                    {!isSuccess && (
                        <p className="text-charcoal-light text-center font-body text-xs sm:text-sm mt-1 sm:mt-2">
                            Please provide your details below to request your luxury spa experience.
                        </p>
                    )}
                </DialogHeader>

                <div className="p-4 sm:p-8 pt-2 sm:pt-4">
                    {isSuccess ? (
                        <BookingSuccessView onClose={handleClose} />
                    ) : (
                        <BookingForm
                            prefillData={prefillData}
                            onSuccess={handleSuccess}
                        />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}