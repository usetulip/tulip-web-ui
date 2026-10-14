import React from "react";
import Image from "next/image";
import Link from "next/link";
import blogData from "@/data/blog.json";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaqSection } from "@/components/sections/common/FaqSection";
import { CtaBanner } from "@/components/sections/common/CtaBanner";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";

export const metadata = {
  title: "Blog & Articles - Tulip",
  description: "Stay updated with smart strategies, founder stories, and design tips.",
};

export default function BlogPage() {
  const { hero, posts } = blogData;
  const featured = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <div className="py-12 md:py-20">
      {/* Hero Section */}
      <section className="mb-16 md:mb-24 text-center">
        <Container size="small">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1e0d01] font-heading mb-6 leading-tight">
            {hero.title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[#1e0d01]/70 leading-relaxed max-w-2xl mx-auto">
            {hero.description}
          </p>
        </Container>
      </section>

      {/* Featured Post */}
      <section className="mb-16 md:mb-20">
        <Container>
          <div className="glass-card rounded-[2.5rem] p-6 sm:p-10 md:p-12 hover:border-[#f97518]/30 transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-neutral-100">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="lg:col-span-6 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="rounded-full bg-[#f97518]/10 text-[#f97518] px-3 py-1 text-xs font-bold border border-[#f97518]/20">
                    {featured.category}
                  </span>
                  <span className="text-xs text-[#1e0d01]/60 font-medium">
                    {featured.date}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1e0d01] font-heading mb-4 leading-tight">
                  {featured.title}
                </h2>
                <p className="text-sm sm:text-base text-[#1e0d01]/70 leading-relaxed mb-6">
                  {featured.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-[rgba(30,13,1,0.06)]">
                  <div className="flex items-center gap-3">
                    <div className="relative h-9 w-9 rounded-full overflow-hidden border border-white">
                      <Image
                        src={featured.author.avatar}
                        alt={featured.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#1e0d01]">
                        {featured.author.name}
                      </h4>
                      <p className="text-[11px] text-[#1e0d01]/60">
                        {featured.author.role}
                      </p>
                    </div>
                  </div>

                  <Button variant="primary" size="sm" asChild>
                    <Link href={`/blog/${featured.slug}`} className="flex items-center gap-1">
                      <span>Read Article</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Grid of Other Posts */}
      <section className="mb-20 md:mb-28">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherPosts.map((post) => (
              <div
                key={post.slug}
                className="glass-card rounded-[2rem] p-6 flex flex-col justify-between hover:border-[#f97518]/30 transition-all group"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-neutral-100 mb-5 group-hover:scale-[1.02] transition-transform">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="rounded-full bg-neutral-100 text-[#1e0d01] px-2.5 py-0.5 text-xs font-medium border border-[rgba(30,13,1,0.06)]">
                      {post.category}
                    </span>
                    <span className="text-xs text-[#1e0d01]/60">
                      {post.date}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1e0d01] font-heading mb-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-[#1e0d01]/70 leading-relaxed mb-6 line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[rgba(30,13,1,0.06)] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative h-7 w-7 rounded-full overflow-hidden">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-xs font-medium text-[#1e0d01]/80">
                      {post.author.name}
                    </span>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-[#f97518] hover:text-[#e65f00] p-0"
                    asChild
                  >
                    <Link href={`/blog/${post.slug}`} className="flex items-center gap-1">
                      <span>Read</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <FaqSection />
      <CtaBanner />
    </div>
  );
}
