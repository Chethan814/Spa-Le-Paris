"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2, CheckCircle2 } from "lucide-react";

import { useBooking } from "@/context/BookingContext";
import { cn } from "@/lib/utils";
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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const formSchema = z.object({
    fullName: z.string().min(2, { message: "Full name is required" }),
    phone: z.string().min(10, { message: "Valid phone number is required" }),
    email: z.string().email().optional().or(z.literal("")),
    service: z.string().min(1, { message: "Please select a service" }),
    duration: z.string().min(1, { message: "Please select duration" }),
    location: z.string().min(1, { message: "Please select a location" }),
    date: z.date({ message: "Please select a date" }),


    timeSlot: z.string().min(1, { message: "Please select a time slot" }),
    notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const services = [
    "Classic Swedish Massage",
    "Aromatherapy Massage",
    "Deep Tissue Massage",
    "Balinese Massage",
    "Signature Massage",
    "Foot Reflexology",
    "Back Therapy",
    "Hand, Neck & Shoulder Therapy",
    "Face Reflexology",
    "Essential Scrub",
    "Signature Coffee Scrub",
];

const durations = ["30min", "45min", "60min", "90min", "120min"];

const locations = [
    "Spa Le Paris - RMV",
    "Riverside Wellness",
    "Hills Retreat",
];

const timeSlots = ["Morning", "Afternoon", "Evening"];

export function BookingModal() {
    const { isOpen, closeBooking, prefillData } = useBooking();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

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
            notes: "",
        },
    });

    useEffect(() => {
        if (isOpen) {
            const timeoutId = setTimeout(() => {
                form.reset({
                    fullName: "",
                    phone: "",
                    email: "",
                    service: prefillData.service || prefillData.package || "",
                    duration: prefillData.duration || "",
                    location: prefillData.location || "",
                    timeSlot: "",
                    notes: "",
                });
                setIsSuccess(false);
            }, 0);
            return () => clearTimeout(timeoutId);
        }
    }, [isOpen, prefillData, form]);


    async function onSubmit(values: FormValues) {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Booking Request:", values);
        setIsSubmitting(false);
        setIsSuccess(true);
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && closeBooking()}>
            <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto bg-ivory border-sand text-charcoal p-0 sm:rounded-2xl shadow-luxury">
                <DialogHeader className="p-6 pb-0">
                    <DialogTitle className="text-3xl font-heading text-center tracking-wide">
                        {isSuccess ? "Appointment Requested" : "Experience Excellence"}
                    </DialogTitle>
                    {!isSuccess && (
                        <p className="text-charcoal-light text-center font-body text-sm mt-2">
                            Please provide your details below to request your luxury spa experience.
                        </p>
                    )}
                </DialogHeader>

                <div className="p-6 pt-4">
                    {isSuccess ? (
                        <div className="py-12 flex flex-col items-center text-center space-y-4 animate-fade-in">
                            <CheckCircle2 className="w-16 h-16 text-champagne mb-2" />
                            <h3 className="text-2xl font-heading">Thank You</h3>
                            <p className="text-charcoal-light max-w-sm">
                                Our team will contact you shortly via phone or email to confirm your appointment details.
                            </p>
                            <Button
                                onClick={closeBooking}
                                className="mt-8 bg-champagne hover:bg-champagne-dark text-white px-8 rounded-full"
                            >
                                Close
                            </Button>
                        </div>
                    ) : (
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                {/* Section 1: Contact Details */}
                                <div className="space-y-4">
                                    <h4 className="text-xs uppercase tracking-widest text-champagne font-semibold">Section 1 — Contact Details</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="fullName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-xs">Full Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="John Doe" {...field} className="bg-white/50 border-sand focus:ring-champagne" />
                                                    </FormControl>
                                                    <FormMessage className="text-[10px]" />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="phone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-xs">Phone Number *</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="+1 (555) 000-0000" {...field} className="bg-white/50 border-sand focus:ring-champagne" />
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
                                            <FormItem>
                                                <FormLabel className="text-xs">Email Address (Optional)</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="john@example.com" {...field} className="bg-white/50 border-sand focus:ring-champagne" />
                                                </FormControl>
                                                <FormMessage className="text-[10px]" />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Section 2: Appointment Details */}
                                <div className="space-y-4 pt-2 border-t border-sand/30">
                                    <h4 className="text-xs uppercase tracking-widest text-champagne font-semibold">Section 2 — Appointment Details</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="service"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-xs">Service / Package</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="bg-white/50 border-sand">
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
                                                <FormItem>
                                                    <FormLabel className="text-xs">Duration</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="bg-white/50 border-sand">
                                                                <SelectValue placeholder="Select Duration" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent className="bg-white border-sand">
                                                            {durations.map((d) => (
                                                                <SelectItem key={d} value={d}>{d}</SelectItem>
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
                                            <FormItem>
                                                <FormLabel className="text-xs">Preferred Location</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="bg-white/50 border-sand">
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

                                {/* Section 3: Time Preference */}
                                <div className="space-y-4 pt-2 border-t border-sand/30">
                                    <h4 className="text-xs uppercase tracking-widest text-champagne font-semibold">Section 3 — Time Preference</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="date"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel className="text-xs">Preferred Date</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "w-full pl-3 text-left font-normal bg-white/50 border-sand",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value ? (
                                                                        format(field.value, "PPP")
                                                                    ) : (
                                                                        <span>Pick a date</span>
                                                                    )}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0 bg-white border-sand" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                disabled={(date) =>
                                                                    date < new Date(new Date().setHours(0, 0, 0, 0))
                                                                }
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage className="text-[10px]" />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="timeSlot"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-xs">Preferred Time Slot</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="bg-white/50 border-sand">
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
                                </div>

                                {/* Section 4: Optional Notes */}
                                <div className="space-y-4 pt-2 border-t border-sand/30">
                                    <h4 className="text-xs uppercase tracking-widest text-champagne font-semibold">Section 4 — Optional Notes</h4>
                                    <FormField
                                        control={form.control}
                                        name="notes"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Special requests or messages..."
                                                        {...field}
                                                        className="bg-white/50 border-sand focus:ring-champagne min-h-[100px] resize-none"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-champagne hover:bg-champagne-dark text-white py-6 text-sm uppercase tracking-widest transition-all duration-300 rounded-lg"
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
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
