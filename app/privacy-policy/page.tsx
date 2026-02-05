import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Shield, Lock, Eye, FileText, Cookie, Mail, CheckCircle2 } from "lucide-react";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-32 pb-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-champagne/10 mb-6 text-champagne">
                            <Shield className="w-8 h-8" strokeWidth={1.5} />
                        </div>
                        <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
                            Privacy Policy
                        </h1>
                        <p className="font-body text-muted-foreground">
                            Last Updated: January 2026
                        </p>
                    </div>

                    <div className="space-y-8 font-body text-foreground/80 leading-relaxed">
                        <section className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-card transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-secondary text-champagne shrink-0 mt-1">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="font-heading text-2xl text-foreground mb-4">1. Introduction</h2>
                                    <p>
                                        Welcome to Spa Le Paris. We value your trust and are committed to protecting your privacy.
                                        This Privacy Policy explains how we collect, use, and safeguard your personal information
                                        when you visit our website or use our services.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-card transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-secondary text-champagne shrink-0 mt-1">
                                    <Eye className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="font-heading text-2xl text-foreground mb-4">2. Information We Collect</h2>
                                    <p className="mb-4">We may collect the following types of information:</p>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-champagne/70 shrink-0 mt-0.5" />
                                            <span><strong>Personal Information:</strong> Name, email address, phone number, and payment details when you book an appointment or purchase a gift card.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-champagne/70 shrink-0 mt-0.5" />
                                            <span><strong>Usage Data:</strong> Information about how you use our website, including your IP address, browser type, and pages visited.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-card transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-secondary text-champagne shrink-0 mt-1">
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="font-heading text-2xl text-foreground mb-4">3. How We Use Your Information</h2>
                                    <p className="mb-4">We use your information to:</p>
                                    <ul className="grid sm:grid-cols-2 gap-3">
                                        {["Process bookings and payments", "Communicate regarding appointments", "Send promotional offers (opt-in)", "Improve our customer service"].map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm bg-background/50 p-2 rounded-lg border border-border/30">
                                                <div className="w-1.5 h-1.5 rounded-full bg-champagne" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-card transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-secondary text-champagne shrink-0 mt-1">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="font-heading text-2xl text-foreground mb-4">4. Data Protection</h2>
                                    <p>
                                        We implement industry-standard security measures to protect your personal data. However, please
                                        note that no method of transmission over the internet is 100% secure.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-card transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-secondary text-champagne shrink-0 mt-1">
                                    <Cookie className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="font-heading text-2xl text-foreground mb-4">5. Cookies</h2>
                                    <p>
                                        Our website uses cookies to enhance your browsing experience. You can choose to disable cookies
                                        through your browser settings, though this may affect site functionality.
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
                                    <h2 className="font-heading text-2xl text-foreground mb-4">6. Contact Us</h2>
                                    <p>
                                        If you have any questions about this Privacy Policy, please contact us at:
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
