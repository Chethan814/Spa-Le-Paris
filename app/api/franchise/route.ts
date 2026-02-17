import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { resend } from "@/lib/resend";
import { getFranchiseEmailHtml } from "@/lib/email-templates";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Franchise API Received:", JSON.stringify(body, null, 2));
    const { fullName, email, phone, city, background, interest } = body;

    // 1. Store in Supabase
    console.log("Attempting Supabase insert into 'franchise_inquiries'...");
    const supabase = getSupabase();
    const { error: supabaseError } = await supabase.from("franchise_inquiries").insert([
      {
        full_name: fullName,
        email: email,
        phone: phone,
        city: city,
        background: background,
        interest: interest,
        status: "NEW",
      },
    ]);

    if (supabaseError) {
      console.error("Supabase Franchise Error:", supabaseError);
      return NextResponse.json({ error: `Supabase Error: ${supabaseError.message} (${supabaseError.code})` }, { status: 500 });
    }
    console.log("Supabase insert successful.");

    // 2. Send Notification Email to Admin
    try {
      await resend.emails.send({
        from: 'Spa Le Paris System <onboarding@resend.dev>',
        to: 'admin@spaleparis.com', // Replace with your admin email
        subject: `New Franchise Inquiry: ${fullName} from ${city}`,
        html: getFranchiseEmailHtml(body),
      });
    } catch (emailError) {
      console.error("Resend Admin Email Error:", emailError);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Franchise API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
