import FranchiseHeader from "@/components/franchise/FranchiseHeader";
import FranchiseHero from "@/components/franchise/FranchiseHero";
import FranchisePhilosophy from "@/components/franchise/FranchisePhilosophy";
import FranchiseWhyPartner from "@/components/franchise/FranchiseWhyPartner";
import FranchiseIdealPartner from "@/components/franchise/FranchiseIdealPartner";
import FranchiseSupport from "@/components/franchise/FranchiseSupport";
import FranchiseJourney from "@/components/franchise/FranchiseJourney";
import FranchiseForm from "@/components/franchise/FranchiseForm";
import FranchiseClosing from "@/components/franchise/FranchiseClosing";
import FranchiseFooter from "@/components/franchise/FranchiseFooter";

export default function FranchisePage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <FranchiseHeader />
            <FranchiseHero />
            <FranchisePhilosophy />
            <FranchiseWhyPartner />
            <FranchiseIdealPartner />
            <FranchiseSupport />
            <FranchiseJourney />
            <FranchiseForm />
            <FranchiseClosing />
            <FranchiseFooter />
        </div>
    );
}
