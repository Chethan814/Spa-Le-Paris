import * as z from "zod";

export const formSchema = z.object({
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

export type FormValues = z.infer<typeof formSchema>;

export const services = [
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

export const durations = ["30min", "45min", "60min", "90min", "120min"];

export const locations = [
    "Spa Le Paris - RMV",
    "Riverside Wellness",
    "Hills Retreat",
];

export const timeSlots = ["Morning", "Afternoon", "Evening"];
