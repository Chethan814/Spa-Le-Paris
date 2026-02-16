"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import {
    formSchema,
    FormValues,
    services,
    serviceOptions,
    locations,
    timeSlots
} from "@/components/booking/booking-constants";

interface BookingFormProps {
    prefillData: {
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
    onSuccess: () => void;
}

export function BookingForm({ prefillData, onSuccess }: BookingFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const hasSelectedPackages = prefillData.selectedPackages && prefillData.selectedPackages.length > 0;

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            phone: "",
            email: "",
            service: "",
            duration: "",
            location: "",
            timeSlot: "",
            date: "",
            notes: "",
            selectedPackages: hasSelectedPackages ? prefillData.selectedPackages : undefined,
        },
    });

    const selectedService = form.watch("service");
    const selectedDuration = form.watch("duration");

    const availableDurations = selectedService && serviceOptions[selectedService]
        ? serviceOptions[selectedService]
        : [];

    // Calculate price for single service
    const singleServicePrice = availableDurations.find(opt => opt.duration === selectedDuration)?.price;

    // Calculate totals for packages
    const calculatePackageTotals = () => {
        if (!prefillData.selectedPackages) return { subtotal: 0, discountPercent: 0, discountAmount: 0, total: 0 };

        const count = prefillData.selectedPackages.length;
        const subtotal = prefillData.selectedPackages.reduce((sum, pkg) => sum + pkg.price, 0);

        // Discount Logic: 10% for 2, 15% for 3+
        let discountPercent = 0;
        if (count >= 3) discountPercent = 0.15;
        else if (count === 2) discountPercent = 0.10;

        const discountAmount = subtotal * discountPercent;
        const total = subtotal - discountAmount;

        return { subtotal, discountPercent, discountAmount, total };
    };

    const { subtotal, discountPercent, discountAmount, total: packageTotal } = calculatePackageTotals();



    useEffect(() => {
        form.reset({
            fullName: "",
            phone: "",
            email: "",
            service: prefillData.service || prefillData.package || "",
            duration: prefillData.duration || "",
            location: prefillData.location || "",
            timeSlot: "",
            date: "",
            notes: "",
            selectedPackages: prefillData.selectedPackages,
        });
    }, [prefillData, form]);

    // Reset duration when service changes (only for single service mode)
    useEffect(() => {
        if (!hasSelectedPackages && selectedService && selectedDuration) {
            const isValidDuration = serviceOptions[selectedService]?.some(opt => opt.duration === selectedDuration);
            if (!isValidDuration) {
                form.setValue("duration", "");
            }
        }
    }, [selectedService, selectedDuration, form, hasSelectedPackages]);

    async function onSubmit(values: FormValues) {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Recalculate totals for submission (Server-side simulation)
        let finalPricing = {};

        if (hasSelectedPackages && values.selectedPackages) {
            const pkgs = values.selectedPackages;
            const count = pkgs.length;
            const sub = pkgs.reduce((sum, p) => sum + p.price, 0);

            let discPct = 0;
            if (count >= 3) discPct = 0.15;
            else if (count === 2) discPct = 0.10;

            const discAmt = sub * discPct;

            finalPricing = {
                subtotal: sub,
                discount: discAmt,
                total: sub - discAmt
            };
        } else {
            // Re-verify single service price
            // In a real app, this would fetch from DB. Here we look up constants.
            // For now, using the render-scope price is acceptable as constants are static.
            finalPricing = {
                total: singleServicePrice
            };
        }

        const submissionData = {
            ...values,
            pricing: finalPricing
        };

        console.log("Booking Request:", submissionData);
        setIsSubmitting(false);
        onSuccess();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 sm:gap-y-6">
                    {/* Left Column: Client & Request Info */}
                    <div className="space-y-4 sm:space-y-6">
                        <div className="space-y-3">
                            <h4 className="text-[10px] uppercase tracking-widest text-champagne font-semibold border-b border-sand/30 pb-1">Client Details</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <FormLabel className="text-[11px]">Full Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John Doe" {...field} className="h-9 bg-white/50 border-sand focus:ring-champagne text-sm" />
                                            </FormControl>
                                            <FormMessage className="text-[10px]" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <FormLabel className="text-[11px]">Phone Number *</FormLabel>
                                            <FormControl>
                                                <Input placeholder="+1 (555) 000-0000" {...field} className="h-9 bg-white/50 border-sand focus:ring-champagne text-sm" />
                                            </FormControl>
                                            <FormMessage className="text-[10px]" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel className="text-[11px]">Email Address (Optional)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="john@example.com" {...field} className="h-9 bg-white/50 border-sand focus:ring-champagne text-sm" />
                                        </FormControl>
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-[10px] uppercase tracking-widest text-champagne font-semibold border-b border-sand/30 pb-1">Service Preference</h4>

                            {hasSelectedPackages ? (
                                // Multi-Package View
                                <div className="space-y-3">
                                    <div className="space-y-2">
                                        {prefillData.selectedPackages?.map((pkg, idx) => (
                                            <div key={idx} className="flex justify-between items-center text-sm p-2 bg-secondary/30 rounded-md border border-sand/30">
                                                <div>
                                                    <p className="font-medium text-charcoal">{pkg.name}</p>
                                                    <p className="text-xs text-muted-foreground">{pkg.duration}</p>
                                                </div>
                                                <span className="font-body text-charcoal-light">₹{pkg.price.toLocaleString()}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Pricing Summary */}
                                    <div className="bg-champagne/5 border border-champagne/20 rounded-md p-3 space-y-2">
                                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                                            <span>Subtotal</span>
                                            <span>₹{subtotal.toLocaleString()}</span>
                                        </div>
                                        {discountPercent > 0 && (
                                            <div className="flex justify-between items-center text-xs text-champagne-dark font-medium">
                                                <span>Bundled Experience Benefit ({(discountPercent * 100).toFixed(0)}%)</span>
                                                <span>-₹{discountAmount.toLocaleString()}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between items-center pt-2 border-t border-champagne/20">
                                            <span className="text-xs uppercase tracking-widest text-mud font-semibold">Total Estimate</span>
                                            <span className="text-lg font-heading text-champagne-dark">₹{packageTotal.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // Single Service View
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <FormField
                                        control={form.control}
                                        name="service"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1">
                                                <FormLabel className="text-[11px]">Service / Package</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="h-9 bg-white/50 border-sand text-sm">
                                                            <SelectValue placeholder="Select Service" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="bg-white border-sand">
                                                        {services.map((s) => (
                                                            <SelectItem key={s} value={s}>{s}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage className="text-[10px]" />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="duration"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1">
                                                <FormLabel className="text-[11px]">Duration</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    value={field.value}
                                                    disabled={!selectedService}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="h-9 bg-white/50 border-sand text-sm">
                                                            <SelectValue placeholder={selectedService ? "Select Duration" : "Select Service First"} />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="bg-white border-sand">
                                                        {availableDurations.map((opt) => (
                                                            <SelectItem key={opt.duration} value={opt.duration}>
                                                                {opt.duration}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage className="text-[10px]" />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}

                            {/* Price Display for Single Service */}
                            {!hasSelectedPackages && singleServicePrice && (
                                <div className="bg-champagne/10 border border-champagne/20 rounded-md p-3 flex justify-between items-center animate-fade-in mt-3">
                                    <span className="text-xs uppercase tracking-widest text-mud font-semibold">Estimated Price</span>
                                    <span className="text-lg font-heading text-champagne-dark">₹{singleServicePrice.toLocaleString()}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Time & Notes */}
                    <div className="space-y-4 sm:space-y-6">
                        <div className="space-y-3">
                            <h4 className="text-[10px] uppercase tracking-widest text-champagne font-semibold border-b border-sand/30 pb-1">Scheduling & Location</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <FormField
                                    control={form.control}
                                    name="date"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <FormLabel className="text-[11px]">Preferred Date (DD-MM-YYYY)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={`E.g., 15-${format(new Date(), "MM-yyyy")}`}
                                                    {...field}
                                                    onChange={(e) => {
                                                        const raw = e.target.value;
                                                        const prev = field.value || "";

                                                        // Only allow numbers and dashes
                                                        let val = raw.replace(/[^0-9-]/g, "");

                                                        // Limit length to 10 (DD-MM-YYYY)
                                                        if (val.length > 10) val = val.substring(0, 10);

                                                        // Logic for Day (first 2 digits)
                                                        if (val.length >= 2) {
                                                            const day = parseInt(val.substring(0, 2));
                                                            if (day > 31) val = "31" + val.substring(2);
                                                            if (day === 0 && val.length === 2) val = "01";

                                                            // Auto-fill separator and Month/Year
                                                            if (val.length === 2 && val.length > prev.length && !val.includes("-")) {
                                                                val = val + format(new Date(), "-MM-yyyy");
                                                            }
                                                        }

                                                        // Logic for Month (digits 4-5)
                                                        if (val.length >= 5) {
                                                            const monthStr = val.substring(3, 5);
                                                            const month = parseInt(monthStr);
                                                            if (month > 12) val = val.substring(0, 3) + "12" + val.substring(5);
                                                            if (month === 0 && monthStr.length === 2) val = val.substring(0, 3) + "01" + val.substring(5);
                                                        }

                                                        field.onChange(val);
                                                    }}
                                                    className="h-9 bg-white/50 border-sand focus:ring-champagne text-sm"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-[10px]" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="timeSlot"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <FormLabel className="text-[11px]">Preferred Time Slot</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="h-9 bg-white/50 border-sand text-sm">
                                                        <SelectValue placeholder="Select Time Slot" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="bg-white border-sand">
                                                    {timeSlots.map((ts) => (
                                                        <SelectItem key={ts} value={ts}>{ts}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage className="text-[10px]" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel className="text-[11px]">Preferred Location</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="h-9 bg-white/50 border-sand text-sm">
                                                    <SelectValue placeholder="Select Location" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="bg-white border-sand">
                                                {locations.map((l) => (
                                                    <SelectItem key={l} value={l}>{l}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-[10px] uppercase tracking-widest text-champagne font-semibold border-b border-sand/30 pb-1">Additional Notes</h4>
                            <FormField
                                control={form.control}
                                name="notes"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormControl>
                                            <Textarea
                                                placeholder="Special requests..."
                                                {...field}
                                                className="bg-white/50 border-sand focus:ring-champagne min-h-[80px] sm:min-h-[114px] resize-none text-sm"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-champagne hover:bg-champagne-dark text-white py-5 sm:py-6 text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 rounded-lg mt-2"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing Request...
                        </>
                    ) : (
                        "Request Appointment"
                    )}
                </Button>
            </form>
        </Form>
    );
}

