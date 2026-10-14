import React from "react";
import { cn } from "@/lib/utils";

export interface CornerDotProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
}

export function CornerDot({ position, className }: CornerDotProps) {
  const positionClasses = {
    "top-left": "-top-[3.5px] -left-[3.5px]",
    "top-right": "-top-[3.5px] -right-[3.5px]",
    "bottom-left": "-bottom-[3.5px] -left-[3.5px]",
    "bottom-right": "-bottom-[3.5px] -right-[3.5px]",
  };

  return (
    <div
      className={cn(
        "absolute z-20 h-2 w-2 rounded-full bg-white border border-[rgba(30,13,1,0.25)] shadow-xs pointer-events-none",
        positionClasses[position],
        className
      )}
      aria-hidden="true"
    />
  );
}

export interface SectionFrameProps {
  children: React.ReactNode;
  className?: string;
  showTopBorder?: boolean;
  showBottomBorder?: boolean;
  showCorners?: boolean;
}

export function SectionFrame({
  children,
  className,
  showTopBorder = true,
  showBottomBorder = true,
  showCorners = true,
}: SectionFrameProps) {
  return (
    <div className={cn("relative w-full max-w-[1240px] mx-auto", className)}>
      {/* Top dashed border */}
      {showTopBorder && (
        <div className="absolute top-0 left-0 right-0 h-[1px] border-t border-dashed border-[rgba(30,13,1,0.14)] z-10" />
      )}

      {/* Bottom dashed border */}
      {showBottomBorder && (
        <div className="absolute bottom-0 left-0 right-0 h-[1px] border-b border-dashed border-[rgba(30,13,1,0.14)] z-10" />
      )}

      {/* Corner Dots */}
      {showCorners && (
        <>
          {showTopBorder && (
            <>
              <CornerDot position="top-left" />
              <CornerDot position="top-right" />
            </>
          )}
          {showBottomBorder && (
            <>
              <CornerDot position="bottom-left" />
              <CornerDot position="bottom-right" />
            </>
          )}
        </>
      )}

      {children}
    </div>
  );
}
