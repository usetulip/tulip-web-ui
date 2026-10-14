import React from "react";
import Link from "next/link";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  // Parse markdown lines
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let currentList: React.ReactNode[] = [];
  let listKey = 0;

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${listKey++}`} className="space-y-2.5 my-4 list-disc pl-5 text-[#1e0d01]/80">
          {currentList}
        </ul>
      );
      currentList = [];
    }
  };

  const parseInline = (text: string): React.ReactNode => {
    // Replace markdown links [text](url) and **bold**
    const parts: React.ReactNode[] = [];
    const regex = /(\*\*.*?\*\*|\[.*?\]\(.*?\))/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      const matchText = match[0];
      if (matchText.startsWith("**") && matchText.endsWith("**")) {
        parts.push(
          <strong key={`b-${match.index}`} className="font-bold text-[#1e0d01]">
            {matchText.slice(2, -2)}
          </strong>
        );
      } else if (matchText.startsWith("[") && matchText.includes("](")) {
        const linkMatch = matchText.match(/\[(.*?)\]\((.*?)\)/);
        if (linkMatch) {
          const [, label, href] = linkMatch;
          parts.push(
            <Link
              key={`link-${match.index}`}
              href={href}
              className="text-[#f97518] hover:underline font-semibold"
            >
              {label}
            </Link>
          );
        }
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      return;
    }

    // H1
    if (trimmed.startsWith("# ")) {
      flushList();
      elements.push(
        <h1
          key={`h1-${index}`}
          className="text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tight text-[#1e0d01] font-heading mb-4 leading-tight"
        >
          {trimmed.slice(2)}
        </h1>
      );
      return;
    }

    // H2
    if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(
        <h2
          key={`h2-${index}`}
          className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1e0d01] font-heading mt-10 mb-4 leading-snug"
        >
          {trimmed.slice(3)}
        </h2>
      );
      return;
    }

    // H3
    if (trimmed.startsWith("### ")) {
      flushList();
      elements.push(
        <h3
          key={`h3-${index}`}
          className="text-xl sm:text-2xl font-bold text-[#1e0d01] font-heading mt-8 mb-3 leading-snug"
        >
          {trimmed.slice(4)}
        </h3>
      );
      return;
    }

    // List item
    if (trimmed.startsWith("- ")) {
      currentList.push(
        <li key={`li-${index}`} className="text-sm sm:text-base leading-relaxed text-[#1e0d01]/75">
          {parseInline(trimmed.slice(2))}
        </li>
      );
      return;
    }

    // Paragraph
    flushList();
    elements.push(
      <p key={`p-${index}`} className="text-sm sm:text-base leading-relaxed text-[#1e0d01]/75 mb-4">
        {parseInline(trimmed)}
      </p>
    );
  });

  flushList();

  return <div className={`prose-neutral max-w-none ${className}`}>{elements}</div>;
}
