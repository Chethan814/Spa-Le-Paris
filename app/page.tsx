import Header from "@/components/shared/Header";
import HeroSection from "@/components/spa/HeroSection";
import TrustSection from "@/components/spa/TrustSection";
import ServicesSection from "@/components/spa/ServicesSection";
import PackagesSection from "@/components/spa/PackagesSection";
import GiftSection from "@/components/spa/GiftSection";
import MembershipSection from "@/components/spa/MembershipSection";
import TestimonialsSection from "@/components/spa/TestimonialsSection";
import FranchiseSection from "@/components/spa/FranchiseSection";
import Footer from "@/components/shared/Footer";

export default function Home() {
    return (
        <main className="min-h-screen bg-background">
            <Header />
            <HeroSection />
            <TrustSection />
            <ServicesSection />
            <PackagesSection />
            <GiftSection />
            <MembershipSection />
            <TestimonialsSection />
            <FranchiseSection />
            <Footer />
        </main>
    );
}
