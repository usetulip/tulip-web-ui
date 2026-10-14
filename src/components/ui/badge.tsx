import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-white/80 backdrop-blur-md border border-[rgba(30,13,1,0.08)] text-[#1e0d01] shadow-sm",
        lime:
          "bg-[#a5ff00]/20 text-[#1e0d01] border border-[#a5ff00]/40 font-semibold",
        orange:
          "bg-[#f97518]/10 text-[#f97518] border border-[#f97518]/20 font-semibold",
        tag:
          "bg-[#1e0d01] text-white px-2.5 py-0.5 text-[11px] font-semibold rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
