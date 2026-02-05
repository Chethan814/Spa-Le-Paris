import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-md",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-md",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md",
        ghost: "hover:bg-accent hover:text-accent-foreground rounded-md",
        link: "text-primary underline-offset-4 hover:underline",
        // Luxury Spa Variants
        hero: "bg-champagne text-charcoal font-body font-semibold tracking-luxury uppercase text-sm border-2 border-champagne hover:bg-champagne-light hover:shadow-glow transition-all duration-700 rounded-none shadow-lg",
        heroOutline: "bg-white/10 backdrop-blur-sm border-2 border-white/60 text-white font-body font-medium tracking-luxury uppercase text-xs hover:border-champagne hover:text-champagne hover:bg-white/20 transition-all duration-500 rounded-none",
        gold: "bg-champagne text-foreground font-body font-medium tracking-wide hover:bg-champagne-light hover:shadow-soft transition-all duration-500 rounded-lg",
        goldOutline: "bg-transparent border-2 border-champagne text-champagne font-body font-medium tracking-wide hover:bg-champagne hover:text-primary-foreground transition-all duration-500 rounded-lg",
        elegant: "bg-foreground text-background font-body font-medium tracking-luxury uppercase text-xs hover:bg-foreground/90 transition-all duration-300 rounded-none",
        subtle: "bg-secondary/60 text-foreground font-body font-light tracking-wide hover:bg-secondary transition-all duration-300 rounded-lg",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        xl: "h-14 px-10 text-base",
        icon: "h-10 w-10",
        hero: "h-14 px-12",
        heroSm: "h-10 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
