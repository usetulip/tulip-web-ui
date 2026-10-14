import React from "react";

export function AmbientBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
      {/* Hero Central Radial Gradient Glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[850px] opacity-90"
        style={{
          background: "radial-gradient(ellipse 65% 55% at 50% 32%, rgba(249, 117, 24, 0.16) 0%, rgba(250, 132, 132, 0.15) 35%, rgba(254, 131, 241, 0.08) 60%, rgba(245, 245, 245, 0) 85%)",
        }}
      />

      {/* Layered blur glow shapes matching Framer tokens */}
      <div className="absolute -top-32 -left-48 w-[800px] h-[600px] ambient-glow-pink opacity-50" />
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[700px] h-[450px] ambient-glow-white opacity-85" />
      <div className="absolute top-36 left-1/2 -translate-x-1/2 w-[950px] h-[420px] ambient-glow-coral opacity-25" />

      {/* Mid page glow behind Bundle & Sprint */}
      <div 
        className="absolute top-[35%] left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[700px] opacity-60"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(254, 131, 241, 0.07) 0%, rgba(249, 117, 24, 0.06) 40%, transparent 80%)",
        }}
      />

      {/* Pricing & Testimonials ambient glow */}
      <div className="absolute top-[60%] -left-40 w-[800px] h-[600px] ambient-glow-coral opacity-20" />
      <div className="absolute top-[68%] -right-40 w-[800px] h-[600px] ambient-glow-pink opacity-25" />
      
      {/* Bottom CTA Glow */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1100px] h-[550px] opacity-70"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(249, 117, 24, 0.12) 0%, rgba(250, 132, 132, 0.1) 40%, transparent 80%)",
        }}
      />
    </div>
  );
}
