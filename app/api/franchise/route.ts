import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, city, background, interest } = body;

    // TODO: Send email notification or save to database
    console.log("Franchise Application Received:", {
      fullName,
      email,
      phone,
      city,
      background,
      interest,
    });

    // Simulate success
    return NextResponse.json(
      { message: "Application received successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing franchise application:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
