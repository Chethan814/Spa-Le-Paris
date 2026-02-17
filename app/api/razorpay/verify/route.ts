import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getSupabase } from "@/lib/supabase";

const generateGiftCode = async () => {
    const supabase = getSupabase();
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Removed ambiguous chars I, O, 0, 1
    let code = "SLP-";
    for (let i = 0; i < 8; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Check uniqueness
    const { data } = await supabase
        .from("gift_cards")
        .select("id")
        .eq("code", code)
        .single();

    if (data) {
        return generateGiftCode(); // Retry if duplicate
    }

    return code;
};

export async function POST(req: NextRequest) {
    try {
        const supabase = getSupabase();
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            amount, // Expected in rupees from frontend state for gift card creation
            recipient_email,
            sender_name,
        } = await req.json();

        // 1. Idempotency Check
        const { data: existingPayment } = await supabase
            .from("payments")
            .select("order_id")
            .eq("order_id", razorpay_order_id)
            .single();

        if (existingPayment) {
            // If payment already recorded, find the associated gift card and return it
            const { data: giftCard } = await supabase
                .from("gift_cards")
                .select("code")
                .eq("order_id", razorpay_order_id)
                .single();

            if (giftCard) {
                return NextResponse.json({
                    success: true,
                    message: "Payment already verified",
                    giftCode: giftCard.code
                });
            }
        }

        // 2. Verify Signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return NextResponse.json(
                { error: "Invalid payment signature" },
                { status: 400 }
            );
        }

        // 3. Update Order Status
        await supabase
            .from("orders")
            .update({ status: "PAID" })
            .eq("id", razorpay_order_id);

        // 4. Record Payment
        const { error: paymentError } = await supabase.from("payments").insert([
            {
                order_id: razorpay_order_id,
                payment_id: razorpay_payment_id,
                signature: razorpay_signature,
                status: "SUCCESS",
                created_at: new Date().toISOString(),
            },
        ]);

        if (paymentError) console.error("Payment Record Error:", paymentError);

        // 5. Generate Gift Code
        const giftCode = await generateGiftCode();

        // 6. Calculate Expiry (3 months from now)
        const expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + 3);

        // 7. Create Gift Card Record
        const { error: giftCardError } = await supabase.from("gift_cards").insert([
            {
                code: giftCode,
                value: amount, // INR value
                balance: amount,
                status: "ACTIVE",
                expiry_date: expiryDate.toISOString(),
                recipient_email,
                sender_name,
                order_id: razorpay_order_id,
                created_at: new Date().toISOString(),
            },
        ]);

        if (giftCardError) {
            console.error("Gift Card Creation Error:", giftCardError);
            return NextResponse.json(
                { error: "Payment verified but gift card creation failed. Please contact support." },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            giftCode
        });

    } catch (error) {
        console.error("Verification Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
