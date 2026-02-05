import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Scale, CheckCircle2, Sparkles, Calendar, HeartHandshake, Shield, AlertCircle, Mail } from "lucide-react";

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-32 pb-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-champagne/10 mb-6 text-champagne">
                            <Scale className="w-8 h-8" strokeWidth={1.5} />
                        </div>
                        <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
                            Terms of Service
                        </h1>
                        <p className="font-body text-muted-foreground">
                            Last Updated: January 2026
                        </p>
                    </div>

                    <div className="space-y-8 font-body text-foreground/80 leading-relaxed">
                        <section className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-card transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-secondary text-champagne shrink-0 mt-1">
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="font-heading text-2xl text-foreground mb-4">1. Acceptance of Terms</h2>
                                    <p>
                                        By accessing or using the Spa Le Paris website and services, you agree to be bound by these
                                        Terms of Service. If you do not agree to these terms, please do not use our services.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-card transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-secondary text-champagne shrink-0 mt-1">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="font-heading text-2xl text-foreground mb-4">2. Services</h2>
                                    <p>
                                        Spa Le Paris provides wellness and spa services as described on our website. We reserve the
                                        right to modify, suspend, or discontinue any service at any time without notice.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-card transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-secondary text-champagne shrink-0 mt-1">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="font-heading text-2xl text-foreground mb-4">3. Booking and Cancellations</h2>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-champagne mt-2 shrink-0" />
                                            <span>Appointments are subject to availability and should be booked in advance.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-champagne mt-2 shrink-0" />
                                            <span>We require at least 24 hours&apos; notice for cancellations or rescheduling. Late cancellations may be subject to fees.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-champagne mt-2 shrink-0" />
                                            <span>Please arrive 15 minutes prior to your scheduled appointment time to ensure a full experience.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-card transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-secondary text-champagne shrink-0 mt-1">
                                    <HeartHandshake className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="font-heading text-2xl text-foreground mb-4">4. Health Conditions</h2>
                                    <p>
                                        Guests are responsible for informing us of any health conditions, allergies, or injuries that
                                        may affect their service. Spa Le Paris is not liable for any adverse reactions resulting from
                                        undisclosed health issues.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-card transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-secondary text-champagne shrink-0 mt-1">
                                    <Shield className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="font-heading text-2xl text-foreground mb-4">5. Code of Conduct</h2>
                                    <p>
                                        We maintain a professional, respectful, and peaceful environment. Any inappropriate behavior
                                        towards our staff or other guests will result in immediate termination of service and
                                        potential refusal of future entry.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-card transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-secondary text-champagne shrink-0 mt-1">
                                    <AlertCircle className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="font-heading text-2xl text-foreground mb-4">6. Liability</h2>
                                    <p>
                                        Browse and use this website at your own risk. Spa Le Paris is not liable for any direct, indirect,
                                        incidental, or consequential damages arising from your use of our website or services.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-card transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-secondary text-champagne shrink-0 mt-1">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="font-heading text-2xl text-foreground mb-4">7. Contact Information</h2>
                                    <p>
                                        For any questions regarding these Terms of Service, please contact us at:
                                        <br />
                                        <a href="mailto:hello@spaleparis.com" className="text-champagne hover:underline font-medium mt-2 inline-block">
                                            hello@spaleparis.com
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
