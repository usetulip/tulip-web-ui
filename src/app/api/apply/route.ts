import { NextResponse } from "next/server";
import homeData from "@/data/home.json";

// Receives "Apply for Private Access" submissions from the ApplyModal and stores them
// in the Supabase table public.access_applications. Validation mirrors the form so bad
// requests are rejected even without the UI; the table has matching CHECK constraints.
// Row-level security lets the publishable key insert rows but never read them, so
// applications are reviewed in the Supabase dashboard.

const IDES = homeData.apply.ides;
const STAGES = homeData.apply.stages;
// Plans plus the one-off Launch Sprint.
const TIERS = [...homeData.pricing.plans.map((plan) => plan.name), homeData.pricing.oneOff.name];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Application {
  name: string;
  email: string;
  company: string;
  ide: string;
  stage: string;
  tier: string;
  cohort: string;
}

function parse(body: unknown): { data?: Application; error?: string } {
  if (!body || typeof body !== "object") return { error: "Expected a JSON object." };
  const b = body as Record<string, unknown>;
  const str = (key: string, max = 200) => (typeof b[key] === "string" ? (b[key] as string).trim().slice(0, max) : "");

  const data: Application = {
    name: str("name"),
    email: str("email", 320),
    company: str("company"),
    ide: str("ide"),
    stage: str("stage"),
    tier: str("tier"),
    cohort: homeData.apply.cohort,
  };

  if (!data.name) return { error: "Name is required." };
  if (!EMAIL.test(data.email)) return { error: "A valid work email is required." };
  if (!data.company) return { error: "Company name is required." };
  if (!IDES.includes(data.ide)) return { error: "Primary AI IDE must be one of the listed options." };
  if (!STAGES.includes(data.stage)) return { error: "Project stage must be one of the listed options." };
  if (!TIERS.includes(data.tier)) return { error: "Preferred tier must be one of the listed plans." };
  return { data };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const { data, error } = parse(body);
  if (!data) return NextResponse.json({ error }, { status: 422 });

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    console.error("[apply] SUPABASE_URL or SUPABASE_PUBLISHABLE_KEY is not set");
    return NextResponse.json({ error: "Applications are temporarily unavailable." }, { status: 503 });
  }

  const res = await fetch(`${url}/rest/v1/access_applications`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      // The website can't read rows back, so don't ask for them
      Prefer: "return=minimal",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.error("[apply] Supabase insert failed", res.status, await res.text());
    return NextResponse.json({ error: "Couldn't save your application." }, { status: 502 });
  }

  // Name and email stay out of the log so personal data doesn't end up in hosting logs.
  console.info("[apply] application saved", { cohort: data.cohort, tier: data.tier });

  return NextResponse.json({ ok: true });
}
