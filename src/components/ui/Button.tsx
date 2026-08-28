import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  asMotion?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, asMotion = true, ...props }, ref) => {

    const baseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary: "bg-color-primary text-white hover:bg-color-primary-hover shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:shadow-[0_0_25px_rgba(139,92,246,0.7)]",
      secondary: "bg-color-secondary text-white hover:bg-color-secondary-hover shadow-[0_0_15px_rgba(6,182,212,0.5)]",
      outline: "border border-color-border hover:border-color-primary hover:text-color-primary text-foreground bg-transparent",
      ghost: "hover:bg-white/10 hover:text-foreground text-color-muted",
      glass: "glass hover:bg-white/10 text-foreground border border-white/10"
    };

    const sizes = {
      sm: "h-9 px-3 text-xs",
      md: "h-10 px-4 py-2 text-sm",
      lg: "h-12 px-8 text-base"
    };

    const classes = cn(baseClasses, variants[variant], sizes[size], className);

    if (asMotion) {
      return (
        <motion.button
          ref={ref as any}
          className={classes}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          {...(props as any)}
        >
          {children}
        </motion.button>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
