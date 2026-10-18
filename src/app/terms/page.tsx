import React from "react";
import fs from "fs";
import path from "path";
import { Container } from "@/components/layout/Container";
import { MarkdownRenderer } from "@/components/shared/MarkdownRenderer";

export const metadata = {
  title: "Terms of Service - Tulip",
  description: "Terms of Service for using Tulip, its design sprints, MCP server and API.",
};

export default function TermsPage() {
  const filePath = path.join(process.cwd(), "src/data/terms.md");
  const markdownContent = fs.readFileSync(filePath, "utf8");

  return (
    <div className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
      <Container className="max-w-4xl">
        <MarkdownRenderer content={markdownContent} />
      </Container>
    </div>
  );
}
