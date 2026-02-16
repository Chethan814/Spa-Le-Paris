"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBooking } from "@/context/BookingContext";


const categories = {
  "signature-therapy s": {
    label: "Signature therapy s",
    description: "Body Therapy",
    items: [
      {
        name: "Classic Swedish therapy ",
        prices: [
          { duration: "60min", price: "₹3500" },
          { duration: "90min", price: "₹4750" },
          { duration: "120min", price: "₹6200" },
        ],
        description: "A calming full-body therapy  using long, flowing strokes to relax muscles and improve circulation.",
        bestFor: "Reducing Stress, Improving Sleep, and Easing Everyday Fatigue",
      },
      {
        name: "Aromatherapy therapy ",
        prices: [
          { duration: "60min", price: "₹3500" },
          { duration: "90min", price: "₹4250" },
          { duration: "120min", price: "₹5500" },
        ],
        description: "A gentle therapy  combined with essential oils to relax the body and calm the mind.",
        bestFor: "Emotional Stress, Burnout, and Mental Fatigue",
      },
      {
        name: "Deep Tissue therapy ",
        prices: [
          { duration: "60min", price: "₹3500" },
          { duration: "90min", price: "₹4750" },
          { duration: "120min", price: "₹6250" },
        ],
        description: "Firm and focused pressure targets deep muscle layers to release tightness, knots, and built-up tension.",
        bestFor: "Soreness, Stiffness, or After Intense Physical Activity",
      },
      {
        name: "Balinese therapy ",
        prices: [
          { duration: "60min", price: "₹3500" },
          { duration: "90min", price: "₹4750" },
          { duration: "120min", price: "₹6250" },
        ],
        description: "A rhythmic blend of stretches, pressure, and oil-based strokes that promotes full-body balance.",
        bestFor: "Muscle Recovery, Improving Energy Flow, and Easing Body Heaviness",
      },
      {
        name: "Signature therapy ",
        prices: [
          { duration: "60min", price: "₹3500" },
          { duration: "90min", price: "₹4750" },
          { duration: "120min", price: "₹6250" },
        ],
        description: "A calming full-body therapy  using long, flowing strokes to relax muscles and improve circulation.",
        bestFor: "Reducing Stress, Improving Sleep, and Easing Everyday Fatigue",
      },
    ],
  },
  "quick-services": {
    label: "Quick Services",
    description: "Targeted Relief",
    items: [
      {
        name: "Foot Reflexology",
        prices: [
          { duration: "30min", price: "₹1500" },
          { duration: "60min", price: "₹2600" },
        ],
        description: "A deeply grounding therapy to release tension from your soles, focused on specific points in the feet that connect to the body.",
        bestFor: "Tired Feet, Poor Sleep, and Overall Energy Balance",
      },
      {
        name: "Back Therapy",
        prices: [
          { duration: "30min", price: "₹1500" },
          { duration: "60min", price: "₹2600" },
        ],
        description: "A targeted therapy  for the upper and lower back to ease stiffness and daily stress.",
        bestFor: "People with Desk Jobs, Long Hours of Sitting, or Posture-Related Tension",
      },
      {
        name: "Hand, Neck & Shoulder Therapy",
        prices: [
          { duration: "30min", price: "₹1500" },
          { duration: "60min", price: "₹2600" },
        ],
        description: "Focused relief for common tension areas in the upper body.",
        bestFor: "Screen Users, Drivers, or Anyone Carrying Upper Body Strain",
      },
      {
        name: "Face Reflexology",
        prices: [
          { duration: "30min", price: "₹1500" },
          { duration: "60min", price: "₹2600" },
        ],
        description: "Gentle facial pressure points are activated to relieve tension and support overall relaxation.",
        bestFor: "Headaches, Jaw Tightness, or a Quick Mid-Day Reset",
      },
    ],
  },
  "body-scrubs": {
    label: "Body Scrubs",
    description: "Exfoliation & Glow",
    items: [
      {
        name: "Essential Scrub",
        prices: [
          { price: "₹2000" },
        ],
        description: "A simple exfoliation that removes dead skin and smoothens rough texture.",
        bestFor: "Dry, Dull, or Uneven Skin in Need of a Refresh",
      },
      {
        name: "Signature Coffee Scrub",
        prices: [
          { price: "₹3000" },
        ],
        description: "A stimulating scrub using coffee granules to energize the skin and improve circulation.",
        bestFor: "Tired, Undernourished Skin or Areas Prone to Cellulite",
      },
    ],
  },
};

const PackagesSection = () => {
  const { openBooking } = useBooking();
  const [activeTab, setActiveTab] = useState("signature-therapy s");
  const sectionRef = useRef<HTMLDivElement>(null);


  // Animation observer can be simpler or just kept for section visibility if needed
  // For now, removing the per-card stagger animation complexity to focus on clean tab switching
  // but we can add a simple fade-in key for the tab content

  return (
    <section
      id="packages"
      ref={sectionRef}
      className="py-24 md:py-32 bg-secondary/30"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-body text-xs tracking-luxury uppercase text-champagne mb-4 block">
            Curated Experiences
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6">
            Our Menu
          </h2>
          <p className="font-body text-muted-foreground font-light max-w-xl mx-auto">
            Thoughtfully designed journeys for complete rejuvenation
          </p>
        </div>

        <Tabs
          defaultValue="signature-therapy s"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full max-w-5xl mx-auto"
        >
          <div className="flex justify-center mb-12">
            <TabsList className="flex flex-col md:flex-row h-auto bg-white/50 backdrop-blur-sm p-1 rounded-3xl md:rounded-full border border-champagne/20 space-y-2 md:space-y-0 w-full md:w-auto">
              {Object.entries(categories).map(([key, category]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="rounded-full px-6 py-2.5 text-sm md:text-base font-body tracking-wide data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 w-full md:w-auto"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {Object.entries(categories).map(([key, category]) => (
            <TabsContent key={key} value={key} className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="group relative bg-card rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-card hover:-translate-y-1 border border-transparent hover:border-champagne/20 cursor-pointer"
                    onClick={() => openBooking({ package: item.name })}

                  >
                    <div className="flex flex-col h-full">
                      <div className="mb-4">
                        <h3 className="font-heading text-xl md:text-2xl font-medium text-foreground mb-2">
                          {item.name}
                        </h3>
                        <div className="flex flex-wrap gap-2 text-sm font-body text-champagne font-medium mb-3">
                          {item.prices.map((p, i) => (
                            <span key={i} className="bg-primary/5 px-2 py-0.5 rounded text-xs md:text-sm">
                              {p.price} {"duration" in p ? `(${p.duration})` : ""}
                              {i < item.prices.length - 1 && <span className="mx-1 text-muted-foreground/40">|</span>}
                            </span>
                          ))}
                        </div>

                      </div>

                      <p className="font-body text-sm md:text-base text-muted-foreground font-light mb-6 leading-relaxed flex-grow">
                        {item.description}
                      </p>

                      <div className="pt-4 border-t border-border/50">
                        <span className="text-xs uppercase tracking-wider text-muted-foreground/70 block mb-1">Best For:</span>
                        <p className="font-body text-xs md:text-sm text-foreground/80 italic">
                          {item.bestFor}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-16 text-center">
          <Button
            variant="gold"
            size="lg"
            className="min-w-[200px]"
            onClick={() => openBooking()}
          >
            Book an Appointment
          </Button>

        </div>

      </div>
    </section>
  );
};

export default PackagesSection;
