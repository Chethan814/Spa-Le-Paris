"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const spaleParisLogo = "/assets/spaleparis-logo.png";

const FranchiseHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled
        ? "bg-background/98 backdrop-blur-md shadow-card py-3 border-b border-border"
        : "bg-black/50 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none py-4 md:py-6"
        }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img
            src={spaleParisLogo}
            alt="SpaleParis"
            className={`h-10 md:h-12 w-auto transition-all duration-500 ${isScrolled ? "brightness-0" : "brightness-0 invert"
              }`}
          />
        </Link>

        <Link
          href="/"
          className={`font-body text-xs tracking-luxury uppercase transition-colors duration-300 ${isScrolled
            ? "text-foreground/80 hover:text-champagne"
            : "text-white/90 hover:text-champagne"
            }`}
        >
          Back to Main Site
        </Link>
      </div>
    </header>
  );
};

export default FranchiseHeader;
