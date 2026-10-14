import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-2xl border border-[rgba(30,13,1,0.12)] bg-white p-4 text-sm text-[#1e0d01] transition-all placeholder:text-[#1e0d01]/40 focus-visible:outline-none focus-visible:border-[#f97518] focus-visible:ring-2 focus-visible:ring-[#f97518]/20 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
