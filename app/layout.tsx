import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-heading",
});

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-body",
});

export const metadata: Metadata = {
    title: "Spa Le Paris | Luxury Wellness Experience",
    description: "Experience the pinnacle of wellness and relaxation at Spa Le Paris. Premium body treatments, signature therapies, and exclusive memberships await you.",
    keywords: "luxury spa, wellness, body therapy, massage, relaxation, premium spa treatments, Spa Le Paris",
    authors: [{ name: "Spa Le Paris" }],
    alternates: {
        canonical: "https://www.spaleparis.com/",
    },
    openGraph: {
        type: "website",
        title: "Spa Le Paris | Luxury Wellness Experience",
        description: "Where luxury meets deep relaxation. Discover our premium spa treatments and exclusive wellness experiences.",
        images: ["https://lovable.dev/opengraph-image-p98pqg.png"],
    },
    twitter: {
        card: "summary_large_image",
        site: "@SpaLeParis",
        images: ["https://lovable.dev/opengraph-image-p98pqg.png"],
    },
    icons: {
        icon: "/favicon.png",
    },
};

import { BookingModal } from "@/components/shared/BookingModal";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${cormorant.variable} ${montserrat.variable} font-body antialiased`}>
                <Providers>
                    {children}
                    <BookingModal />
                </Providers>
            </body>
        </html>
    );
}

