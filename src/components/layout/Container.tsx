import * as React from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "small" | "large" | "full";
}

export function Container({
  className,
  size = "default",
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 md:px-8",
        size === "small" && "max-w-4xl",
        size === "default" && "max-w-[1240px]",
        size === "large" && "max-w-[1400px]",
        size === "full" && "max-w-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
