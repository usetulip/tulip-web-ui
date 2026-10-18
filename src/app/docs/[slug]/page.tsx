import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { DocsMarkdown } from "@/components/docs/DocsMarkdown";
import { DocsToc } from "@/components/docs/DocsToc";
import { getDoc, getDocSlugs } from "@/lib/docs";

interface DocPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getDocSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) return {};

  return {
    title: `${doc.title} - Tulip Docs`,
    description: doc.description,
  };
}

export default async function DocPage({ params }: DocPageProps) {
  const { slug } = await params;
  const doc = getDoc(slug);

  if (!doc) {
    notFound();
  }

  return (
    <div className="flex gap-12">
      <article className="min-w-0 flex-1 max-w-3xl">
        <header className="mb-10 border-b border-border pb-8">
          <p className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-primary">
            {doc.group}
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground font-heading">
            {doc.title}
          </h1>
          <p className="mt-3 text-base sm:text-lg leading-relaxed text-muted-foreground">
            {doc.description}
          </p>
        </header>

        <DocsMarkdown content={doc.content} />

        <nav
          aria-label="Pagination"
          className="mt-16 grid gap-3 border-t border-border pt-8 sm:grid-cols-2"
        >
          {doc.prev ? (
            <Link
              href={`/docs/${doc.prev.slug}`}
              className="group rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
            >
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                Previous
              </span>
              <span className="mt-1 block text-sm font-semibold text-foreground">
                {doc.prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {doc.next && (
            <Link
              href={`/docs/${doc.next.slug}`}
              className="group rounded-xl border border-border bg-card p-4 text-right transition-colors hover:border-primary/40"
            >
              <span className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
                Next
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="mt-1 block text-sm font-semibold text-foreground">
                {doc.next.title}
              </span>
            </Link>
          )}
        </nav>
      </article>

      <DocsToc headings={doc.headings} />
    </div>
  );
}
