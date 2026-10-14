import React from "react";

export function DashedGuides() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 max-w-[1240px] mx-auto" aria-hidden="true">
      <div className="absolute top-0 bottom-0 left-0 w-[1px] border-l border-dashed border-[rgba(30,13,1,0.12)]" />
      <div className="absolute top-0 bottom-0 right-0 w-[1px] border-r border-dashed border-[rgba(30,13,1,0.12)]" />
    </div>
  );
}
