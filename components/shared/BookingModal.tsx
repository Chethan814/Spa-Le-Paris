"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2, CheckCircle2, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

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

// Custom Calendar Component for Inline use with Monthly Selection
function InlineCalendar({
    selected,
    onSelect,
    disabled
}: {
    selected?: Date;
    onSelect: (date: Date | undefined) => void;
    disabled?: (date: Date) => boolean;
}) {
    return (
        <div className="bg-white rounded-2xl border border-sand/30 shadow-sm overflow-hidden p-0 animate-fade-in">
            <Calendar
                mode="single"
                selected={selected}
                onSelect={onSelect}
                disabled={disabled}
                className="w-full"
            />
        </div>
    );
}

// Interactive Time Slot Selector
function TimeSlotPicker({
    selected,
    onSelect
}: {
    selected: string;
    onSelect: (val: string) => void;
}) {
    return (
        <div className="flex flex-col gap-3 h-full">
            <div className="grid grid-cols-1 gap-3">
                {timeSlots.map((slot) => {
                    const isSelected = selected === slot;
                    return (
                        <button
                            key={slot}
                            type="button"
                            onClick={() => onSelect(slot)}
                            className={cn(
                                "flex items-center justify-between px-5 py-4 rounded-2xl border transition-all duration-300 h-[60px]",
                                isSelected
                                    ? "bg-champagne border-champagne text-white shadow-md transform scale-[1.02] z-10"
                                    : "bg-white border-sand/20 text-charcoal hover:border-champagne/40 hover:bg-ivory/50 shadow-sm"
                            )}
                        >
                            <span className="text-sm font-medium tracking-wide">{slot}</span>
                            <div className={cn(
                                "w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300",
                                isSelected ? "bg-white border-white" : "border-sand/40"
                            )}>
                                {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-champagne font-bold" />}
                            </div>
                        </button>
                    );
                })}
            </div>
            <div className="mt-auto pt-4">
                <p className="text-[10px] text-charcoal/40 italic leading-relaxed text-center px-4">
                    * Availability depends on current therapist schedule. Final confirmation will be provided after request.
                </p>
            </div>
        </div>
    );
}


export function BookingModal() {
    const { isOpen, closeBooking, prefillData } = useBooking();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isDateOpen, setIsDateOpen] = useState(false);

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
            <DialogContent className="max-w-3xl max-h-[95vh] overflow-y-auto bg-ivory border-sand text-charcoal p-0 sm:rounded-2xl shadow-luxury">
                <DialogHeader className="p-4 sm:p-5 pb-0">
                    <DialogTitle className="text-2xl sm:text-3xl font-heading text-center tracking-wide">
                        {isSuccess ? "Appointment Requested" : "Experience Excellence"}
                    </DialogTitle>
                    {!isSuccess && (
                        <p className="text-charcoal-light text-center font-body text-xs sm:text-sm mt-1">
                            Please provide your details below to request your luxury spa experience.
                        </p>
                    )}
                </DialogHeader>

                <div className="p-4 sm:p-5 pt-3">
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
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
                                {/* Date & Time Selection - Collapsible Dropdown */}
                                <div className="space-y-3 mb-6">
                                    <div
                                        onClick={() => setIsDateOpen(!isDateOpen)}
                                        className={cn(
                                            "group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md",
                                            isDateOpen ? "bg-white border-champagne" : "bg-white/40 border-sand/30 hover:bg-white/60"
                                        )}
                                    >
                                        <div className="flex flex-col">
                                            <h4 className="text-[10px] sm:text-xs uppercase tracking-widest text-champagne font-semibold mb-0.5">1. Select Date & Time</h4>
                                            <div className="flex items-center gap-2">
                                                <CalendarIcon className="w-4 h-4 text-champagne-dark" />
                                                <span className={cn(
                                                    "text-sm font-medium transition-colors duration-300",
                                                    (form.watch("date") || form.watch("timeSlot")) ? "text-charcoal" : "text-charcoal/40"
                                                )}>
                                                    {form.watch("date") && form.watch("timeSlot")
                                                        ? `${format(form.watch("date"), "MMM d, yyyy")} • ${form.watch("timeSlot")}`
                                                        : form.watch("date")
                                                            ? format(form.watch("date"), "MMM d, yyyy")
                                                            : form.watch("timeSlot")
                                                                ? form.watch("timeSlot")
                                                                : "Choose your preferred time..."}
                                                </span>
                                            </div>
                                        </div>
                                        <div className={cn(
                                            "w-8 h-8 rounded-full bg-sand/10 flex items-center justify-center transition-transform duration-500",
                                            isDateOpen ? "rotate-180 bg-champagne text-white" : "text-champagne-dark"
                                        )}>
                                            <ChevronDown className="w-5 h-5" />
                                        </div>
                                    </div>

                                    {isDateOpen && (
                                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white/40 p-4 sm:p-5 rounded-3xl border border-sand/20 shadow-inner-soft animate-in fade-in slide-in-from-top-4 duration-500">
                                            {/* Calendar Column */}
                                            <div className="lg:col-span-7 overflow-hidden">
                                                <FormField
                                                    control={form.control}
                                                    name="date"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-col">
                                                            <FormControl>
                                                                <InlineCalendar
                                                                    selected={field.value}
                                                                    onSelect={(date) => {
                                                                        field.onChange(date);
                                                                        // Optional: don't close immediately to let them pick time
                                                                    }}
                                                                    disabled={(date) =>
                                                                        date < new Date(new Date().setHours(0, 0, 0, 0))
                                                                    }
                                                                />
                                                            </FormControl>
                                                            <FormMessage className="text-[9px]" />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            {/* Time Slots Column */}
                                            <div className="lg:col-span-5 flex flex-col pt-2 lg:pt-0">
                                                <FormField
                                                    control={form.control}
                                                    name="timeSlot"
                                                    render={({ field }) => (
                                                        <FormItem className="h-full flex flex-col">
                                                            <FormControl>
                                                                <div className="flex-1">
                                                                    <TimeSlotPicker
                                                                        selected={field.value}
                                                                        onSelect={(val) => {
                                                                            field.onChange(val);
                                                                            // Auto close after both are picked? Maybe keep open for review.
                                                                        }}
                                                                    />
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage className="text-[9px]" />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Appointment Details */}
                                <div className="space-y-4 pt-4 border-t border-sand/30">
                                    <h4 className="text-[10px] sm:text-xs uppercase tracking-widest text-champagne font-semibold px-1">2. Appointment Details</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3">
                                        <FormField
                                            control={form.control}
                                            name="service"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-[10px] sm:text-xs">Service / Package</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="bg-white/50 border-sand h-9 text-sm">
                                                                <SelectValue placeholder="Select Service" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent className="bg-white border-sand">
                                                            {services.map((s) => (
                                                                <SelectItem key={s} value={s}>{s}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage className="text-[9px]" />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="duration"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-[10px] sm:text-xs">Duration</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="bg-white/50 border-sand h-9 text-sm">
                                                                <SelectValue placeholder="Select Duration" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent className="bg-white border-sand">
                                                            {durations.map((d) => (
                                                                <SelectItem key={d} value={d}>{d}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage className="text-[9px]" />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="location"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-[10px] sm:text-xs">Preferred Location</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="bg-white/50 border-sand h-9 text-sm">
                                                                <SelectValue placeholder="Select Location" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent className="bg-white border-sand">
                                                            {locations.map((l) => (
                                                                <SelectItem key={l} value={l}>{l}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage className="text-[9px]" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                {/* Contact Details */}
                                <div className="space-y-4 pt-4 border-t border-sand/30">
                                    <h4 className="text-[10px] sm:text-xs uppercase tracking-widest text-champagne font-semibold px-1">3. Contact Details</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3">
                                        <FormField
                                            control={form.control}
                                            name="fullName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-[10px] sm:text-xs text-charcoal/60">Full Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="John Doe" {...field} className="bg-white/50 border-sand focus:ring-champagne h-10 text-sm rounded-xl" />
                                                    </FormControl>
                                                    <FormMessage className="text-[9px]" />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="phone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-[10px] sm:text-xs text-charcoal/60">Phone Number *</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="+1 (555) 000-0000" {...field} className="bg-white/50 border-sand focus:ring-champagne h-10 text-sm rounded-xl" />
                                                    </FormControl>
                                                    <FormMessage className="text-[9px]" />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-[10px] sm:text-xs text-charcoal/60">Email (Optional)</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="john@example.com" {...field} className="bg-white/50 border-sand focus:ring-champagne h-10 text-sm rounded-xl" />
                                                    </FormControl>
                                                    <FormMessage className="text-[9px]" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                {/* Optional Notes */}
                                <div className="space-y-2 pt-1 border-t border-sand/30">
                                    <h4 className="text-[10px] sm:text-xs uppercase tracking-widest text-champagne font-semibold">Additional Notes (Optional)</h4>
                                    <FormField
                                        control={form.control}
                                        name="notes"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Special requests or messages..."
                                                        {...field}
                                                        className="bg-white/50 border-sand focus:ring-champagne min-h-[60px] resize-none text-sm"
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-[9px]" />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-champagne hover:bg-champagne-dark text-white py-5 text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 rounded-lg mt-3"
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
