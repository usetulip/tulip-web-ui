import fs from "fs";
import path from "path";
import docsNavigation from "@/data/docs/navigation.json";

export interface DocNavItem {
  slug: string;
  title: string;
  description: string;
}

export interface DocNavGroup {
  title: string;
  items: DocNavItem[];
}

export interface DocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface Doc extends DocNavItem {
  group: string;
  content: string;
  headings: DocHeading[];
  prev: DocNavItem | null;
  next: DocNavItem | null;
}

const DOCS_DIR = path.join(process.cwd(), "src/data/docs");

export const docsMeta = {
  title: docsNavigation.title,
  description: docsNavigation.description,
};

export function getDocsNavigation(): DocNavGroup[] {
  return docsNavigation.groups;
}

function getFlatNavigation() {
  return getDocsNavigation().flatMap((group) =>
    group.items.map((item) => ({ ...item, group: group.title }))
  );
}

export function getDocSlugs(): string[] {
  return getFlatNavigation().map((item) => item.slug);
}

// Shared by the TOC extractor and the heading renderer so anchor ids always match.
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[`*_]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function stripInlineMarkdown(text: string): string {
  return text
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/[`*_]/g, "")
    .trim();
}

function extractHeadings(content: string): DocHeading[] {
  const headings: DocHeading[] = [];
  let inCodeBlock = false;

  for (const line of content.split("\n")) {
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = /^(##|###)\s+(.+)$/.exec(line.trim());
    if (match) {
      const text = stripInlineMarkdown(match[2]);
      headings.push({
        id: slugifyHeading(text),
        text,
        level: match[1].length as 2 | 3,
      });
    }
  }

  return headings;
}

export function getDoc(slug: string): Doc | null {
  const flat = getFlatNavigation();
  const index = flat.findIndex((item) => item.slug === slug);
  if (index === -1) return null;

  const filePath = path.join(DOCS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const content = fs.readFileSync(filePath, "utf8");
  const { group, ...item } = flat[index];
  const toNavItem = (entry?: (typeof flat)[number]) =>
    entry ? { slug: entry.slug, title: entry.title, description: entry.description } : null;

  return {
    ...item,
    group,
    content,
    headings: extractHeadings(content),
    prev: toNavItem(flat[index - 1]),
    next: toNavItem(flat[index + 1]),
  };
}
