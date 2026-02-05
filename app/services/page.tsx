import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesCategories from "@/components/services/ServicesCategories";
import ServicesDifferentiators from "@/components/services/ServicesDifferentiators";
import ServicesGuidance from "@/components/services/ServicesGuidance";

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <ServicesHero />
            <ServicesCategories />
            <ServicesDifferentiators />
            <ServicesGuidance />
            <Footer />
        </div>
    );
}
