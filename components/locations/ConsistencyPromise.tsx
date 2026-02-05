// Developed by Chethan KR Bangalore
import { ShieldCheck } from "lucide-react";

const ConsistencyPromise = () => {
    return (
        <section className="py-20 bg-background border-t border-border/40">
            <div className="container mx-auto px-6 text-center">
                <div className="w-16 h-16 rounded-full bg-champagne/10 flex items-center justify-center mx-auto mb-6">
                    <ShieldCheck className="w-8 h-8 text-champagne-dark" strokeWidth={1} />
                </div>

                <h3 className="font-heading text-2xl md:text-3xl text-foreground mb-4">
                    Our Standard of Excellence
                </h3>

                <div className="w-12 h-px bg-champagne mx-auto mb-6" />

                <p className="font-body text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed text-lg">
                    Whether you visit us downtown or by the river, you will step into the same
                    world of silence, hygiene, and intentional care. Our protocols remain
                    unwavering across every location.
                </p>
            </div>
        </section>
    );
};

export default ConsistencyPromise;
