import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button — base shadcn/ui, mais entièrement re-stylé pour Tably
 * (radius, couleurs, micro-physique hover) — jamais l'état générique par défaut.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-noir focus-visible:ring-offset-2 focus-visible:ring-offset-creme disabled:pointer-events-none disabled:opacity-50 active:translate-y-0",
  {
    variants: {
      variant: {
        // CTA principal : jaune plein -> inversion noir au survol.
        primary:
          "rounded-full bg-jaune-vif text-noir shadow-lift-sm hover:-translate-y-0.5 hover:bg-noir hover:text-jaune-vif hover:shadow-lift",
        // Surface sombre (sections noires) : inverse du primary.
        invert:
          "rounded-full bg-noir text-jaune-vif hover:-translate-y-0.5 hover:bg-jaune-vif hover:text-noir hover:shadow-lift",
        // Secondaire discret : texte souligné, pas de fond.
        ghost:
          "rounded-full text-noir underline decoration-gris-clair decoration-2 underline-offset-4 hover:decoration-jaune-vif hover:bg-jaune-vif/20",
        // Contour fin.
        outline:
          "rounded-full border border-hair bg-blanc/60 text-noir hover:-translate-y-0.5 hover:border-noir hover:bg-blanc",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
