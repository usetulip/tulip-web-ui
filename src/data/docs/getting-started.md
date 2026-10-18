Tulip is the design layer for software that actually ships. You describe your product's constraints once, and Tulip compiles them into a **Master Figma system** and a **production React repository** that mirror each other 1:1, delivered in 48 hours.

## What you get

Every sprint ends with the same technical handoff, so your engineers know exactly what lands in their hands:

- **Master Figma System**: a file pre-configured with local variables, semantic color tokens and locked-in typography.
- **Production React Repo**: accessible Next.js components that match the Figma file exactly, ready for backend integration.
- **Pre-configured Tailwind**: your spacing, radii and color hexes synchronized from Figma into `tailwind.config.ts`.
- **Native iconography**: sharp, proprietary SVGs embedded directly into your UI blocks.
- **Custom page layouts**: coded layouts for your core screens, built only from your own components.

> Tulip owns the frontend boundary. Your team keeps the database, auth and backend logic. That strict boundary is how a sprint fits in 48 hours.

## Before you start

Have these ready before you open the brief. The intake takes about five minutes when you do:

- Your primary brand hex codes (and any secondary or accent colors).
- A layout archetype: marketing site, dashboard, or app shell.
- The features each screen needs, as a checklist rather than an open-ended description.
- Access details for the GitHub organization where the repo should live.

## Your first sprint

### 1. Fill out the brief

Open the Brief Wizard and answer its structured questions. Avoid open-ended prompts: the brief is designed to capture constraints, not wishes. Every answer maps to a field the engine can verify.

### 2. Minute zero: we map your UI DNA

Tulip turns your brief into an **Intermediate UI Representation (UIR)**, a structured description of your tokens, components and layouts. See [Architecture & MCP Protocol](/docs/architecture) for how this works.

### 3. Hour 48: governed handoff

Before anything ships, an audit agent checks the visual tokens, confirms that Figma variables match the repository, and verifies WCAG accessibility. The rules it applies are described in [Taste Governance](/docs/taste-governance).

### 4. Run the repo locally

Clone the repository Tulip delivers and start the dev server:

```bash
git clone git@github.com:your-org/your-product-ui.git
cd your-product-ui
yarn install
yarn dev
```

Open `http://localhost:3000` to browse the generated layouts.

## Next steps

- Read [Architecture & MCP Protocol](/docs/architecture) to understand how the engine compiles your brief.
- Learn the guardrails in [Taste Governance](/docs/taste-governance).
- Automate briefs and sprint tracking with the [API Reference](/docs/api-reference).
