"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-secondary/50 pt-20 pb-8"
    >
      <div className="container mx-auto px-6">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <span className="font-heading text-3xl font-semibold tracking-wide text-foreground">
                Spa Le Paris
              </span>
              <span className="font-body text-[10px] tracking-luxury uppercase text-muted-foreground block">
                Retreat, Relax & Refresh
              </span>
            </div>
            <p className="font-body text-sm text-muted-foreground font-light leading-relaxed mb-6">
              Where luxury meets deep relaxation. A sanctuary for those who seek
              true wellness.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/spa_le_paris_official?igsh=YmxnZWNjaHlyc3J1" target="_blank"
                className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-muted-foreground hover:text-champagne hover:bg-champagne/10 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-medium text-foreground mb-6">
              Explore
            </h4>
            <ul className="space-y-3">
              {["Services", "Packages", "Gift Cards", "Membership", "About Us"].map(
                (link) => (
                  <li key={link}>
                    <Link
                      href={link === "Services" ? "/services" : link === "Packages" ? "/packages" : link === "Gift Cards" ? "/gift-cards" : link === "Membership" ? "/membership" : "/about"}
                      className="font-body text-sm text-muted-foreground hover:text-champagne transition-colors duration-300"
                    >
                      {link}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-lg font-medium text-foreground mb-6">
              Treatments
            </h4>
            <ul className="space-y-3">
              {["Body Therapy", "Facial Rituals", "Scrub & Polish", "Day Retreat"].map(
                (link) => (
                  <li key={link}>
                    <Link
                      href="/packages"
                      className="font-body text-sm text-muted-foreground hover:text-champagne transition-colors duration-300"
                    >
                      {link}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-medium text-foreground mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-champagne flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <span className="font-body text-sm text-muted-foreground">
                  #24, 1 St floor , Surya Serenity, New BEL Road , RMV 2 nd Stage , Bengaluru 560094
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-champagne flex-shrink-0" strokeWidth={1.5} />
                <a
                  href="tel:8041137369"
                  className="font-body text-sm text-muted-foreground hover:text-champagne transition-colors duration-300"
                >
                  +91 8041 137 369 / +91 7349 365 566
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-champagne flex-shrink-0" strokeWidth={1.5} />
                <a
                  href="mailto:hello@spaleparis.com"
                  className="font-body text-sm text-muted-foreground hover:text-champagne transition-colors duration-300"
                >
                  hello@spaleparis.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`pt-8 border-t border-border transition-all duration-1000 delay-300 ${isVisible ? "opacity-100" : "opacity-0"
            }`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-xs text-muted-foreground">
              © 2024 Spa Le Paris. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy-policy"
                className="font-body text-xs text-muted-foreground hover:text-champagne transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="font-body text-xs text-muted-foreground hover:text-champagne transition-colors duration-300"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
