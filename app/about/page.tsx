import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import AboutHero from "@/components/about/AboutHero";
import FounderSection from "@/components/about/FounderSection";
import Values from "@/components/about/Values";
import ExperiencePromise from "@/components/about/ExperiencePromise";
import Growth from "@/components/about/Growth";
import AboutCTA from "@/components/about/AboutCTA";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <Header />
            <main>
                <AboutHero />
                <FounderSection />
                <Values />
                <ExperiencePromise />
                <Growth />
                <AboutCTA />
            </main>
            <Footer />
        </div>
    );
}
