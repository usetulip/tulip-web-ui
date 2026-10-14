"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import aboutData from "@/data/about.json";
import { Container } from "@/components/layout/Container";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { Users, Linkedin, Instagram, Github } from "lucide-react";

interface SocialLinks {
  x?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  github?: string;
  [key: string]: string | undefined;
}

interface TeamMember {
  id?: string;
  name: string;
  role: string;
  avatar: string;
  socials?: SocialLinks;
}

// Custom X (Twitter) SVG Icon
function XIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function CoreTeamSection() {
  const { team } = aboutData;
  const members = team.members as TeamMember[];
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <SectionFrame showTopBorder={true} showBottomBorder={false} showCorners={true}>
        <Container className="py-14 md:py-22">
          {/* Section Header */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 md:mb-20">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(30,13,1,0.08)] bg-white px-3.5 py-1 shadow-sm mb-6">
              <Users className="h-3.5 w-3.5 text-[#f97518]" />
              <span className="text-xs sm:text-sm font-medium text-[#1e0d01]/80">
                {team.badge}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1e0d01] font-heading mb-4 leading-tight">
              {team.title}
            </h2>

            <p className="text-base sm:text-lg text-[#1e0d01]/70 leading-relaxed max-w-2xl">
              {team.description}
            </p>
          </div>

          {/* Team Grid: 4 columns x 2 rows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
            {members.map((member, index) => {
              const socials = member.socials || {};
              const xLink = socials.x || socials.twitter;
              const hasSocials = Object.values(socials).some(
                (url) => typeof url === "string" && url.trim().length > 0
              );

              return (
                <div
                  key={member.id || index}
                  style={{
                    transitionDelay: `${index * 80}ms`,
                  }}
                  className={`group relative aspect-[3.6/4.6] w-full rounded-[22px] overflow-hidden bg-neutral-900 shadow-xs border border-[rgba(30,13,1,0.08)] transition-all duration-700 ease-out ${
                    isInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12 pointer-events-none"
                  }`}
                >
                  {/* Member Photo */}
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    sizes="(min-width: 1200px) 25vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                  />

                  {/* Gradient Shadow Overlay for bottom text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-0" />

                  {/* Member Name and Role at Bottom */}
                  <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-10 pointer-events-none transition-opacity duration-300 group-hover:opacity-0">
                    <h3 className="text-lg sm:text-xl font-bold text-white font-heading leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-300 font-medium mt-1">
                      {member.role}
                    </p>
                  </div>

                  {/* Translucent Brown Overlay (Expands from Top to Bottom on Hover) */}
                  {hasSocials && (
                    <div className="absolute inset-0 z-20 bg-[rgba(33,29,26,0.95)] backdrop-blur-[2px] flex items-center justify-center origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out">
                      {/* Social Icons (Scale from 0 to 1) */}
                      <div className="flex items-center gap-3 scale-0 group-hover:scale-100 transition-transform duration-300 delay-100 ease-out">
                        {xLink && (
                          <Link
                            href={xLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on X`}
                            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all hover:scale-110 shadow-xs"
                          >
                            <XIcon className="h-4 w-4 fill-white" />
                          </Link>
                        )}

                        {socials.linkedin && (
                          <Link
                            href={socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on LinkedIn`}
                            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all hover:scale-110 shadow-xs"
                          >
                            <Linkedin className="h-4 w-4 stroke-[2]" />
                          </Link>
                        )}

                        {socials.instagram && (
                          <Link
                            href={socials.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on Instagram`}
                            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all hover:scale-110 shadow-xs"
                          >
                            <Instagram className="h-4 w-4 stroke-[2]" />
                          </Link>
                        )}

                        {socials.github && (
                          <Link
                            href={socials.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on GitHub`}
                            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all hover:scale-110 shadow-xs"
                          >
                            <Github className="h-4 w-4 stroke-[2]" />
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </SectionFrame>
    </section>
  );
}
