import React from "react";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { DemoSection } from "@/components/sections/home/DemoSection";
import { BundleSection } from "@/components/sections/home/BundleSection";
import { ProcessSection } from "@/components/sections/home/ProcessSection";
import { EngineSection } from "@/components/sections/home/EngineSection";
import { PricingSection } from "@/components/sections/home/PricingSection";
import { FaqSection } from "@/components/sections/common/FaqSection";
import { CtaBanner } from "@/components/sections/common/CtaBanner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <DemoSection />
      <BundleSection />
      <ProcessSection />
      <EngineSection />
      <PricingSection />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
