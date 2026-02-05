"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useBooking } from "@/context/BookingContext";


const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { openBooking } = useBooking();


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Services", href: "/services" },
    { label: "Packages", href: "/packages" },
    { label: "Gift Cards", href: "/gift-cards" },
    { label: "Membership", href: "/membership" },
    { label: "Locations", href: "/locations" },
    { label: "Franchise", href: "/franchise" },
    { label: "About", href: "/about" },
  ];

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const renderNavLink = (link: { label: string; href: string }) => {
    // Handle external or internal page links (start with /)
    if (link.href.startsWith("/")) {
      return (
        <Link
          key={link.label}
          href={link.href}
          className="font-body text-xs tracking-luxury uppercase text-white/90 hover:text-champagne transition-colors duration-300"
          onClick={handleNavClick}
        >
          {link.label}
        </Link>
      );
    }

    // Handle hash links
    if (link.href.startsWith("#")) {
      // If on home, scroll to section
      if (isHome) {
        return (
          <a
            key={link.label}
            href={link.href}
            className="font-body text-xs tracking-luxury uppercase text-white/90 hover:text-champagne transition-colors duration-300"
            onClick={handleNavClick}
          >
            {link.label}
          </a>
        );
      }
      // If not on home, navigate to home with hash
      return (
        <Link
          key={link.label}
          href={`/${link.href}`}
          className="font-body text-xs tracking-luxury uppercase text-white/90 hover:text-champagne transition-colors duration-300"
          onClick={handleNavClick}
        >
          {link.label}
        </Link>
      );
    }

    return null;
  };

  const renderMobileNavLink = (link: { label: string; href: string }) => {
    const baseClasses = "font-body text-sm tracking-wide text-foreground hover:text-champagne transition-colors duration-300 py-2";

    if (link.href.startsWith("/")) {
      return (
        <Link
          key={link.label}
          href={link.href}
          className={baseClasses}
          onClick={handleNavClick}
        >
          {link.label}
        </Link>
      );
    }

    if (link.href.startsWith("#")) {
      if (isHome) {
        return (
          <a
            key={link.label}
            href={link.href}
            className={baseClasses}
            onClick={handleNavClick}
          >
            {link.label}
          </a>
        );
      }
      return (
        <Link
          key={link.label}
          href={`/${link.href}`}
          className={baseClasses}
          onClick={handleNavClick}
        >
          {link.label}
        </Link>
      );
    }
    return null;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled
        ? "bg-[hsl(220,10%,20%)] backdrop-blur-md shadow-lg py-3 border-b border-champagne/20"
        : "bg-black/40 backdrop-blur-sm py-5"
        }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="/assets/spaleparis-logo.png"
            alt="SpaleParis"
            className="h-10 md:h-12 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => renderNavLink(link))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Button variant="hero" size="heroSm" onClick={() => openBooking()}>
            Book Now
          </Button>
        </div>


        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 text-white transition-colors duration-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 z-50 bg-background border-b border-border shadow-card transition-all duration-500 overflow-hidden ${isMobileMenuOpen ? "max-h-screen py-6" : "max-h-0"
          }`}
      >
        <nav className="container mx-auto px-6 flex flex-col gap-4">
          {navLinks.map((link) => renderMobileNavLink(link))}
          <Button
            variant="hero"
            size="heroSm"
            className="mt-4 w-full"
            onClick={() => {
              handleNavClick();
              openBooking();
            }}
          >
            Book Now
          </Button>

        </nav>
      </div>
    </header >
  );
};

export default Header;
