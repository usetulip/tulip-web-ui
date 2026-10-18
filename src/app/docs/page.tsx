import { redirect } from "next/navigation";
import { getDocSlugs } from "@/lib/docs";

export default function DocsIndexPage() {
  redirect(`/docs/${getDocSlugs()[0]}`);
}
