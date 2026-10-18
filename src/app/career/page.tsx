"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import careersData from "@/data/careers.json";
import { Container } from "@/components/layout/Container";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { FaqSection } from "@/components/sections/common/FaqSection";
import { CtaBanner } from "@/components/sections/common/CtaBanner";
import { MapPin, Briefcase, DollarSign, ChevronRight } from "lucide-react";

export default function CareerPage() {
  const { hero, jobOpenings } = careersData;

  return (
    <div className="relative overflow-hidden">
      {/* Careers Hero Section */}
      <section className="relative overflow-hidden pt-10 sm:pt-14 pb-14 md:pb-20">
        <Container>
          {/* Centered Heading */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tight text-[#1e0d01] font-heading mb-4 leading-[1.12]">
              {hero.title}
            </h1>
            <p className="text-base sm:text-lg text-[#1e0d01]/70 leading-relaxed max-w-2xl">
              {hero.description}
            </p>
          </div>

          {/* Large Team Photo */}
          <div className="relative aspect-[16/9] sm:aspect-[16/8] md:aspect-[16/7.5] w-full rounded-[28px] md:rounded-[36px] overflow-hidden border border-[rgba(30,13,1,0.08)] shadow-lg bg-neutral-100">
            <Image
              src={hero.image}
              alt="Tulip team working together in modern lounge"
              fill
              priority
              className="object-cover object-center"
            />
          </div>
        </Container>
      </section>

      {/* Job Openings Section */}
      <section className="relative overflow-hidden">
        <SectionFrame showTopBorder={true} showBottomBorder={false} showCorners={true}>
          <Container className="py-14 md:py-22">
            {/* Header */}
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1e0d01] font-heading mb-3 leading-tight">
                {jobOpenings.title}
              </h2>
              <p className="text-sm sm:text-base text-[#1e0d01]/70 leading-relaxed">
                {jobOpenings.description}
                <Link
                  href={jobOpenings.privacyLink.href}
                  className="text-[#f97518] hover:underline font-semibold"
                >
                  {jobOpenings.privacyLink.label}
                </Link>
              </p>
            </div>

            {/* Jobs List Container */}
            <div className="rounded-[28px] md:rounded-[36px] bg-white p-6 sm:p-10 md:p-12 border border-[rgba(30,13,1,0.08)] shadow-xs divide-y divide-neutral-100">
              {jobOpenings.jobs.map((job) => (
                <div
                  key={job.id}
                  className="py-8 sm:py-10 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  {/* Job Details */}
                  <div className="flex flex-col items-start">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#1e0d01] font-heading mb-2 leading-snug">
                      {job.title}
                    </h3>
                    <p className="text-sm sm:text-[15px] text-[#1e0d01]/70 leading-relaxed mb-4 max-w-2xl">
                      {job.description}
                    </p>

                    {/* Metadata Tags */}
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#1e0d01]/80 font-medium">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-[#f97518] stroke-[2]" />
                        <span>{job.location}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Briefcase className="h-4 w-4 text-[#f97518] stroke-[2]" />
                        <span>{job.workType}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <DollarSign className="h-4 w-4 text-[#f97518] stroke-[2]" />
                        <span>{job.salary}</span>
                      </div>
                    </div>
                  </div>

                  {/* Apply Now Button */}
                  <Link
                    href={job.applyHref}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#f97518] hover:bg-[#e65f00] text-white px-7 py-3 text-xs sm:text-sm font-bold shadow-md shadow-[#f97518]/25 hover:shadow-lg transition-all shrink-0 self-start md:self-center"
                  >
                    <span>Apply Now</span>
                    <ChevronRight className="h-4 w-4 stroke-[2.5]" />
                  </Link>
                </div>
              ))}
            </div>
          </Container>
        </SectionFrame>
      </section>

      <FaqSection />
      <CtaBanner />
    </div>
  );
}
