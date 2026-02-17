import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { resend } from "@/lib/resend";
import { getBookingEmailHtml } from "@/lib/email-templates";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log("Booking API Received:", JSON.stringify(body, null, 2));
        const { fullName, email, phone, service, duration, location, date, timeSlot, notes, selectedPackages, pricing } = body;

        // 1. Store in Supabase
        console.log("Attempting Supabase insert into 'bookings'...");
        const supabase = getSupabase();
        const { error: supabaseError } = await supabase.from("bookings").insert([
            {
                full_name: fullName,
                phone: phone,
                email: email || null,
                service: service || null,
                duration: duration || null,
                location: location || null,
                preferred_date: date || null,
                time_slot: timeSlot || null,
                notes: notes || null,
                selected_packages: selectedPackages || null,
                pricing: pricing,
                status: "PENDING",
            },
        ]);

        if (supabaseError) {
            console.error("Supabase Booking Error:", supabaseError);
            return NextResponse.json({ error: `Supabase Error: ${supabaseError.message} (${supabaseError.code})` }, { status: 500 });
        }
        console.log("Supabase insert successful.");

        // 2. Send Confirmation Email to Client if email provided
        if (email) {
            try {
                await resend.emails.send({
                    from: 'Spa Le Paris <onboarding@resend.dev>', // Replace with your verified domain in production
                    to: email,
                    subject: 'Reservation Confirmed - Spa Le Paris',
                    html: getBookingEmailHtml(body),
                });
            } catch (emailError) {
                console.error("Resend Client Email Error:", emailError);
                // We don't fail the whole request if only the email fails
            }
        }

        // 3. Send Notification Email to Admin
        try {
            await resend.emails.send({
                from: 'Spa Le Paris System <onboarding@resend.dev>',
                to: 'admin@spaleparis.com', // Replace with your admin email
                subject: `New Booking: ${fullName} - ${service}`,
                html: `
                    <h1>New Appointment Request</h1>
                    <p><strong>Client:</strong> ${fullName}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Service:</strong> ${service}</p>
                    <p><strong>Location:</strong> ${location}</p>
                    <p><strong>Date/Time:</strong> ${date} at ${timeSlot}</p>
                    <p><strong>Notes:</strong> ${notes || 'None'}</p>
                `,
            });
        } catch (adminEmailError) {
            console.error("Resend Admin Email Error:", adminEmailError);
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Booking API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
