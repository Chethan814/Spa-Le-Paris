import * as z from "zod";

export const formSchema = z.object({
    fullName: z.string().min(2, { message: "Full name is required" }),
    phone: z.string().min(10, { message: "Valid phone number is required" }),
    email: z.string().email().optional().or(z.literal("")),
    // Service/Duration are optional if selectedPackages is present
    service: z.string().optional(),
    duration: z.string().optional(),
    location: z.string().min(1, { message: "Please select a location" }),
    date: z.string()
        .min(1, { message: "Date is required" })
        .regex(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/, {
            message: "Use DD-MM-YYYY format",
        })
        .refine((val) => {
            const [day, month, year] = val.split("-").map(Number);
            const date = new Date(year, month - 1, day);
            return (
                date.getFullYear() === year &&
                date.getMonth() === month - 1 &&
                date.getDate() === day
            );
        }, { message: "Invalid date" })
        .refine((val) => {
            const [day, month, year] = val.split("-").map(Number);
            const inputDate = new Date(year, month - 1, day);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return inputDate >= today;
        }, { message: "Date cannot be in the past" }),
    timeSlot: z.string().min(1, { message: "Please select a time slot" }),
    notes: z.string().optional(),
    selectedPackages: z.array(z.object({
        name: z.string(),
        duration: z.string(),
        price: z.number(),
    })).optional(),
}).superRefine((data, ctx) => {
    // If no packages selected, service and duration are required
    if (!data.selectedPackages || data.selectedPackages.length === 0) {
        if (!data.service || data.service.length === 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Please select a service",
                path: ["service"],
            });
        }
        if (!data.duration || data.duration.length === 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Please select duration",
                path: ["duration"],
            });
        }
    }
});

export type FormValues = z.infer<typeof formSchema>;

export type PurchaseOption = {
    duration: string;
    price: number;
};

export const serviceOptions: Record<string, PurchaseOption[]> = {
    // Signature Therapies
    "Classic Swedish therapy ": [
        { duration: "60min", price: 3500 },
        { duration: "90min", price: 4750 },
        { duration: "120min", price: 6200 },
    ],
    "Aroma therapy ": [
        { duration: "60min", price: 3000 },
    ],
    "Deep Tissue therapy ": [
        { duration: "60min", price: 3500 },
        { duration: "90min", price: 4750 },
        { duration: "120min", price: 6250 },
    ],
    "Balinese therapy ": [
        { duration: "60min", price: 3500 },
        { duration: "90min", price: 4750 },
        { duration: "120min", price: 6250 },
    ],
    "Signature therapy ": [
        { duration: "60min", price: 3500 },
        { duration: "90min", price: 4750 },
        { duration: "120min", price: 6250 },
    ],

    // Quick Services
    "Foot Reflexology": [
        { duration: "30min", price: 1500 },
        { duration: "60min", price: 2600 },
    ],
    "Back Therapy": [
        { duration: "30min", price: 1500 },
        { duration: "60min", price: 2600 },
    ],
    "Hand, Neck & Shoulder Therapy": [
        { duration: "30min", price: 1500 },
        { duration: "60min", price: 2600 },
    ],
    "Face Reflexology": [
        { duration: "30min", price: 1500 },
        { duration: "60min", price: 2600 },
    ],

    // Body Scrubs
    "Essential Scrub": [
        { duration: "45min", price: 2000 },
    ],
    "Signature Coffee Scrub": [
        { duration: "45min", price: 3000 },
    ],
};

export const services = Object.keys(serviceOptions);

export const locations = [
    "SPA LE PARIS - KALYAN NAGAR",
    "SPA LE PARIS - HULIMAVU",
    "SPA LE PARIS - JP NAGAR 7 TH PHASE",
    "SPA LE PARIS - NEW BEL ROAD",
];

export const timeSlots = ["Morning", "Afternoon", "Evening"];
