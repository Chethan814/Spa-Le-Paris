import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import MembershipHero from "@/components/membership/MembershipHero";
import MembershipBenefits from "@/components/membership/MembershipBenefits";
import MembershipExperience from "@/components/membership/MembershipExperience";
import MembershipTiers from "@/components/membership/MembershipTiers";
import MembershipProcess from "@/components/membership/MembershipProcess";
import MembershipCTA from "@/components/membership/MembershipCTA";

export default function MembershipPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main>
                <MembershipHero />
                <MembershipBenefits />
                <MembershipExperience />
                <MembershipTiers />
                <MembershipProcess />
                <MembershipCTA />
            </main>
            <Footer />
        </div>
    );
}
