import React from "react";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { LogoCloud } from "@/components/sections/home/LogoCloud";
import { MetricsSection } from "@/components/sections/home/MetricsSection";
import { BundleSection } from "@/components/sections/home/BundleSection";
import { SprintWorkflow } from "@/components/sections/home/SprintWorkflow";
import { EngineSection } from "@/components/sections/home/EngineSection";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { PricingSection } from "@/components/sections/home/PricingSection";
import { FaqSection } from "@/components/sections/common/FaqSection";
import { CtaBanner } from "@/components/sections/common/CtaBanner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LogoCloud />
      <MetricsSection />
      <BundleSection />
      <SprintWorkflow />
      <EngineSection />
      <Testimonials />
      <PricingSection />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
