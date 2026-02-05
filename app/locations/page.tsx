import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import LocationsHero from "@/components/locations/LocationsHero";
import LocationsGrid from "@/components/locations/LocationsGrid";
import LocationsMap from "@/components/locations/LocationsMap";
import ConsistencyPromise from "@/components/locations/ConsistencyPromise";
import LocationsCTA from "@/components/locations/LocationsCTA";

export default function LocationsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <Header />
            <main>
                <LocationsHero />
                <LocationsGrid />
                <LocationsMap />
                <ConsistencyPromise />
                <LocationsCTA />
            </main>
            <Footer />
        </div>
    );
}
