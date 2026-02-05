"use client";

import Link from "next/link";
const spaleParisLogo = "/assets/spaleparis-logo.png";

const FranchiseFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 bg-foreground">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          <Link href="/">
            <img
              src={spaleParisLogo}
              alt="SpaleParis"
              className="h-10 w-auto mb-8 brightness-0 invert opacity-80"
            />
          </Link>

          <p className="font-body text-sm text-background/60 mb-4">
            A refined wellness experience
          </p>

          <div className="flex items-center gap-6 mb-8">
            <Link
              href="/"
              className="font-body text-xs tracking-luxury uppercase text-background/60 hover:text-champagne transition-colors duration-300"
            >
              Main Site
            </Link>
            <span className="w-1 h-1 rounded-full bg-background/30" />
            <a
              href="#apply"
              className="font-body text-xs tracking-luxury uppercase text-background/60 hover:text-champagne transition-colors duration-300"
            >
              Apply Now
            </a>
          </div>

          <div className="w-24 h-px bg-background/10 mb-8" />

          <p className="font-body text-xs text-background/40">
            © {currentYear} SpaleParis. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FranchiseFooter;
