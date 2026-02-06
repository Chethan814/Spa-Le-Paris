"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";

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
    formSchema,
    FormValues,
    services,
    durations,
    locations,
    timeSlots
} from "@/components/booking/booking-constants";

interface BookingFormProps {
    prefillData: {
        service?: string;
        package?: string;
        duration?: string;
        location?: string;
    };
    onSuccess: () => void;
}

export function BookingForm({ prefillData, onSuccess }: BookingFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

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
    }, [prefillData, form]);

    async function onSubmit(values: FormValues) {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Booking Request:", values);
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
                                            <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="h-9 bg-white/50 border-sand text-sm">
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
                    </div>

                    {/* Right Column: Time & Notes */}
                    <div className="space-y-4 sm:space-y-6">
                        <div className="space-y-3">
                            <h4 className="text-[10px] uppercase tracking-widest text-champagne font-semibold border-b border-sand/30 pb-1">Scheduling</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <FormField
                                    control={form.control}
                                    name="date"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col space-y-1">
                                            <FormLabel className="text-[11px]">Preferred Date</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full h-9 pl-3 text-left font-normal bg-white/50 border-sand text-sm",
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
                                                <PopoverContent className="w-auto p-0 bg-white border-sand" align="end">
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
