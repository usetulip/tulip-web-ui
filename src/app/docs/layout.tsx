import React from "react";
import { Container } from "@/components/layout/Container";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { getDocsNavigation } from "@/lib/docs";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-10 sm:py-14">
      <Container>
        <div className="lg:flex lg:gap-10 xl:gap-14">
          <DocsSidebar groups={getDocsNavigation()} />
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </Container>
    </div>
  );
}
