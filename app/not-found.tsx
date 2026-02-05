"use client";

import Link from "next/link";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="flex-grow flex items-center justify-center p-6 text-center">
                <div>
                    <h1 className="font-heading text-7xl md:text-9xl text-champagne/20 mb-4">404</h1>
                    <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">Oops! Page not found</h2>
                    <p className="font-body text-muted-foreground max-w-md mx-auto mb-10">
                        The treatment you're looking for seems to have escaped into a world of silence.
                        Let's get you back to tranquility.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-full bg-champagne px-8 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-champagne/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                        Return to Home
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}
