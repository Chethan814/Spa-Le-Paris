import { Building2, MapPin } from "lucide-react";

const Growth = () => {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8 animate-slide-left">
                        <span className="text-xs font-medium tracking-[0.2em] text-champagne-dark uppercase">Our Presence</span>
                        <h2 className="font-heading text-4xl text-charcoal">Growing with Grace</h2>
                        <div className="w-12 h-px bg-champagne-dark" />
                        <p className="font-body text-charcoal/80 font-light leading-loose">
                            From our humble beginnings to becoming a sanctuary in multiple cities,
                            our growth has never been about numbers. It has always been about
                            extending the reach of our philosophy—bringing calm to chaos,
                            wherever it is needed most.
                        </p>
                        <p className="font-body text-charcoal/80 font-light leading-loose">
                            Each location is thoughtfully chosen, ensuring that when you step inside,
                            you feel the distinct refined elegance that defines our brand.
                        </p>
                    </div>

                    <div className="relative bg-card p-10 md:p-14 border border-border/50 animate-slide-right">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-champagne/10 rounded-bl-full" />

                        <div className="space-y-8 relative z-10">
                            <div className="flex items-start space-x-6">
                                <MapPin className="w-6 h-6 text-champagne-dark mt-1" />
                                <div>
                                    <h3 className="font-heading text-xl text-charcoal mb-2">Prime Locations</h3>
                                    <p className="text-sm font-light text-charcoal/70">
                                        Selected for accessibility and tranquility across the city.
                                    </p>
                                </div>
                            </div>

                            <div className="w-full h-px bg-border" />

                            <div className="flex items-start space-x-6">
                                <Building2 className="w-6 h-6 text-champagne-dark mt-1" />
                                <div>
                                    <h3 className="font-heading text-xl text-charcoal mb-2">Uniform Excellence</h3>
                                    <p className="text-sm font-light text-charcoal/70">
                                        The same high standards and warm welcome, no matter which location you visit.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Growth;
