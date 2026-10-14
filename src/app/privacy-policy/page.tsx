import React from "react";
import fs from "fs";
import path from "path";
import { Container } from "@/components/layout/Container";
import { MarkdownRenderer } from "@/components/shared/MarkdownRenderer";

export const metadata = {
  title: "Privacy Policy - Tulip",
  description: "Privacy Policy and data protection terms for Tulip / Flexfolio.",
};

export default function PrivacyPolicyPage() {
  const filePath = path.join(process.cwd(), "src/data/privacy-policy.md");
  const markdownContent = fs.readFileSync(filePath, "utf8");

  return (
    <div className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
      <Container className="max-w-4xl">
        <MarkdownRenderer content={markdownContent} />
      </Container>
    </div>
  );
}
