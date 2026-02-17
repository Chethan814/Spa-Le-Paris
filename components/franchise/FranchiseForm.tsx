"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { getSupabase } from "@/lib/supabase";

const backgroundOptions = [
  "Hospitality & Hotels",
  "Wellness & Spa Industry",
  "Retail & Luxury Brands",
  "Healthcare & Medical",
  "Entrepreneurship",
  "Other",
];

const FranchiseForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    background: "",
    interest: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const supabase = getSupabase();
      const { error } = await supabase.from("franchise_inquiries").insert([
        {
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          background: formData.background,
          interest: formData.interest,
          status: "NEW",
        },
      ]);

      if (error) {
        console.error("Franchise Inquiry Error:", error);
        toast({
          title: "Submission Failed",
          description: "Something went wrong. Please try again or contact us directly.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      toast({
        title: "Application Received",
        description:
          "Thank you for your interest. We will review your application and be in touch soon.",
      });

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        city: "",
        background: "",
        interest: "",
      });
    } catch (err) {
      console.error("Franchise Inquiry Error:", err);
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again or contact us directly.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <section
      id="apply"
      ref={sectionRef}
      className="py-24 md:py-32 bg-secondary/30"
    >
      <div className="container mx-auto px-6">
        <div
          className={`max-w-2xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="text-center mb-12">
            <span className="font-body text-xs tracking-luxury uppercase text-champagne mb-4 block">
              Begin the Conversation
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-6">
              Submit Your Application
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed">
              If our philosophy aligns with yours, we&apos;d be glad to begin a
              conversation.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-body text-sm text-foreground/80">
                  Full Name
                </label>
                <Input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  required
                  className="bg-background border-border focus:border-champagne/50 transition-colors duration-300"
                  placeholder="Your full name"
                />
              </div>

              <div className="space-y-2">
                <label className="font-body text-sm text-foreground/80">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="bg-background border-border focus:border-champagne/50 transition-colors duration-300"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-body text-sm text-foreground/80">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                  className="bg-background border-border focus:border-champagne/50 transition-colors duration-300"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div className="space-y-2">
                <label className="font-body text-sm text-foreground/80">
                  City / Preferred Location
                </label>
                <Input
                  type="text"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  required
                  className="bg-background border-border focus:border-champagne/50 transition-colors duration-300"
                  placeholder="City or region"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-body text-sm text-foreground/80">
                Professional Background
              </label>
              <Select
                value={formData.background}
                onValueChange={(value) =>
                  setFormData({ ...formData, background: value })
                }
                required
              >
                <SelectTrigger className="bg-background border-border focus:border-champagne/50 transition-colors duration-300">
                  <SelectValue placeholder="Select your background" />
                </SelectTrigger>
                <SelectContent>
                  {backgroundOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="font-body text-sm text-foreground/80">
                Why are you interested in partnering?
              </label>
              <Textarea
                value={formData.interest}
                onChange={(e) =>
                  setFormData({ ...formData, interest: e.target.value })
                }
                required
                rows={4}
                className="bg-background border-border focus:border-champagne/50 transition-colors duration-300 resize-none"
                placeholder="Share a few words about your interest and vision..."
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                variant="goldOutline"
                size="lg"
                disabled={isSubmitting}
                className="w-full md:w-auto hover:shadow-glow transition-shadow duration-500"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FranchiseForm;
