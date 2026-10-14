import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import blogData from "@/data/blog.json";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaqSection } from "@/components/sections/common/FaqSection";
import { CtaBanner } from "@/components/sections/common/CtaBanner";
import { ArrowLeft, Calendar, Clock, CheckCircle2 } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return blogData.posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogData.posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const content = post.content || {
    overview: post.excerpt,
    sections: [],
  };

  return (
    <article className="py-12 md:py-20">
      <Container size="small">
        {/* Back Link */}
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/blog" className="flex items-center gap-2 text-xs font-semibold text-[#1e0d01]/70 hover:text-[#f97518]">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Articles</span>
            </Link>
          </Button>
        </div>

        {/* Post Header */}
        <header className="mb-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="rounded-full bg-[#f97518]/10 text-[#f97518] px-3.5 py-1 text-xs font-bold border border-[#f97518]/20">
              {post.category}
            </span>
            <span className="text-xs text-[#1e0d01]/60 font-medium">
              {post.date}
            </span>
            <span className="text-xs text-[#1e0d01]/40">•</span>
            <span className="text-xs text-[#1e0d01]/60 font-medium">
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1e0d01] font-heading mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Author Badge */}
          <div className="inline-flex items-center gap-3 rounded-full border border-[rgba(30,13,1,0.08)] bg-white/80 px-4 py-2 shadow-sm">
            <div className="relative h-9 w-9 rounded-full overflow-hidden border border-white">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-bold text-[#1e0d01]">
                {post.author.name}
              </h4>
              <p className="text-[11px] text-[#1e0d01]/60">
                {post.author.role}
              </p>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-neutral-100 mb-12 shadow-lg border border-[rgba(30,13,1,0.08)]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Post Body Content */}
        <div className="space-y-8 text-base md:text-lg text-[#1e0d01]/80 leading-relaxed font-normal">
          {/* Overview */}
          {content.overview && (
            <div className="rounded-2xl bg-white p-6 md:p-8 border border-[rgba(30,13,1,0.08)] shadow-sm">
              <h3 className="text-xl font-bold text-[#1e0d01] font-heading mb-3">
                Overview
              </h3>
              <p className="whitespace-pre-line text-base text-[#1e0d01]/80">
                {content.overview}
              </p>
            </div>
          )}

          {/* Content Sections */}
          {content.sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              {section.heading && (
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1e0d01] font-heading pt-4">
                  {section.heading}
                </h2>
              )}

              {section.body && (
                <p className="whitespace-pre-line text-base md:text-lg text-[#1e0d01]/80 leading-relaxed">
                  {section.body}
                </p>
              )}

              {/* Quote callout */}
              {section.quote && (
                <div className="rounded-2xl bg-gradient-to-r from-[#f97518]/10 to-[#fa8484]/10 border-l-4 border-l-[#f97518] p-6 my-6 italic">
                  <p className="text-lg font-medium text-[#1e0d01] mb-2">
                    {section.quote}
                  </p>
                  {section.quoteAuthor && (
                    <p className="text-xs font-bold text-[#1e0d01]/60 uppercase tracking-wider not-italic">
                      {section.quoteAuthor}
                    </p>
                  )}
                </div>
              )}

              {/* Bullet points */}
              {section.bulletPoints && (
                <ul className="space-y-2.5 my-4">
                  {section.bulletPoints.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-3 text-base text-[#1e0d01]/80">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#f97518] mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </Container>

      <div className="mt-20">
        <FaqSection />
        <CtaBanner />
      </div>
    </article>
  );
}
