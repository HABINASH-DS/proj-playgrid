import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: "bg-color-elevated text-foreground border border-color-border",
    primary: "bg-color-primary/20 text-color-primary border border-color-primary/50",
    secondary: "bg-color-secondary/20 text-color-secondary border border-color-secondary/50",
    success: "bg-color-success/20 text-color-success border border-color-success/50",
    warning: "bg-color-warning/20 text-color-warning border border-color-warning/50",
    danger: "bg-color-danger/20 text-color-danger border border-color-danger/50",
    outline: "text-foreground border border-color-border"
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
