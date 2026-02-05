import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import PackagesHero from "@/components/packages/PackagesHero";
import PackagesList from "@/components/packages/PackagesList";

export default function PackagesPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Header />
            <PackagesHero />
            <PackagesList />
            <Footer />
        </main>
    );
}
