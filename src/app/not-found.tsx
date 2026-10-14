import React from "react";
import Link from "next/link";
import notFoundData from "@/data/not-found.json";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { CtaBanner } from "@/components/sections/common/CtaBanner";
import { Home } from "lucide-react";

export const metadata = {
  title: "404 - Page Not Found | Tulip",
};

export default function NotFound() {
  const { code, title, description, button } = notFoundData;

  return (
    <div className="py-16 md:py-28">
      <Container size="small">
        <div className="glass-card rounded-[2.5rem] p-10 sm:p-16 text-center max-w-2xl mx-auto border-[#f97518]/20 shadow-xl">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-[#f97518]/10 text-[#f97518] text-4xl font-bold font-heading mb-6">
            {code}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1e0d01] font-heading mb-4">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-[#1e0d01]/70 leading-relaxed mb-8 max-w-md mx-auto">
            {description}
          </p>
          <Button variant="primary" size="lg" className="h-12 px-8" asChild>
            <Link href={button.href} className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span>{button.label}</span>
            </Link>
          </Button>
        </div>
      </Container>

      <div className="mt-20">
        <CtaBanner />
      </div>
    </div>
  );
}
