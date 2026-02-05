"use client";

import { useState, useEffect, useRef } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "An oasis of tranquility. The attention to hygiene and detail is unparalleled. I left feeling reborn.",
    author: "Priya S.",
    location: "Bangalore",
  },
  {
    quote:
      "Every visit is a journey to complete relaxation. The therapists understand exactly what you need.",
    author: "Anika M.",
    location: "Delhi",
  },
  {
    quote:
      "The cleanliness and ambiance create such peace of mind. This is truly luxury wellness at its finest.",
    author: "Rahul K.",
    location: "Bangalore",
  },
  {
    quote:
      "From the moment you enter, stress melts away. The service quality sets a new standard.",
    author: "Meera D.",
    location: "Pune",
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-secondary/30"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-body text-xs tracking-luxury uppercase text-champagne mb-4 block">
            Voices of Spa Le Paris
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-foreground">
            Guest Experiences
          </h2>
        </div>

        {/* Testimonial Carousel */}
        <div
          className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"
            }`}
        >
          {/* Quote Icon */}
          <Quote className="w-12 h-12 text-champagne/40 mx-auto mb-8" strokeWidth={1} />

          {/* Testimonial Content */}
          <div className="relative h-48 md:h-40">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ${index === activeIndex
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4 pointer-events-none"
                  }`}
              >
                <p className="font-heading text-2xl md:text-3xl font-light text-foreground/90 italic leading-relaxed mb-8">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div>
                  <p className="font-body text-sm font-medium text-foreground">
                    {testimonial.author}
                  </p>
                  <p className="font-body text-xs text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Navigation */}
          <div className="flex items-center justify-center gap-3 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${index === activeIndex
                  ? "bg-champagne w-8"
                  : "bg-border hover:bg-champagne/40"
                  }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
