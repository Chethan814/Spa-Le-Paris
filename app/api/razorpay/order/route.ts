import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { getSupabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
    try {
        const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
        const keySecret = process.env.RAZORPAY_KEY_SECRET;

        if (!keyId || !keySecret) {
            console.error("Missing Razorpay Keys");
            return NextResponse.json({ error: "Razorpay configuration missing" }, { status: 500 });
        }

        const razorpay = new Razorpay({
            key_id: keyId,
            key_secret: keySecret,
        });

        const body = await req.json();
        const { amount, currency = "INR", receipt, notes } = body;

        // 1. Server-side Amount Validation
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
        const supabase = getSupabase();
        const { error: supabaseError } = await supabase.from("orders").insert([
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

        if (supabaseError) console.error("Supabase Order Error:", supabaseError.message);

        return NextResponse.json(order);
    } catch (error: any) {
        console.error("Razorpay Order Error:", error.message);
        return NextResponse.json(
            { error: "Error creating order" },
            { status: 500 }
        );
    }
}
