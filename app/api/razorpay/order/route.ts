import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { supabase } from "@/lib/supabase";

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
    try {
        const { amount, currency = "INR", receipt, notes } = await req.json();

        // 1. Server-side Amount Validation
        // We expect the frontend to send the amount in paise, but we should double check against the plan.
        // For gift cards, we trust the value but ensure it's a valid number.
        // In a stricter system, we might map IDs to fixed amounts.
        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
        }

        // 2. Create Order in Razorpay
        const options = {
            amount: amount.toString(), // Amount in smallest currency unit (paise)
            currency,
            receipt,
            notes,
        };

        const order = await razorpay.orders.create(options);

        // 3. Store Order in Supabase
        const { error } = await supabase.from("orders").insert([
            {
                id: order.id,
                amount: Number(order.amount) / 100, // Store in rupees
                currency: order.currency,
                status: "CREATED",
                created_at: new Date().toISOString(),
                receipt: order.receipt,
                notes: order.notes,
            },
        ]);

        if (error) {
            console.error("Supabase Order Error:", error);
            // We might choose to fail here or proceed with a warning log depending on criticality
        }

        return NextResponse.json(order);
    } catch (error) {
        console.error("Razorpay Order Error:", error);
        return NextResponse.json(
            { error: "Error creating order" },
            { status: 500 }
        );
    }
}
