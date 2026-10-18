Generic AI tools output UI that looks plausible and can't be deployed. Taste governance is the set of rules that makes Tulip's output deterministic: the same brief always produces UI built from the same tokens and components, and nothing ships until it passes.

## Principles

- **Use the bricks you have.** Layouts may only use components from your library. New one-off components are rejected, not merged.
- **Tokens, never raw values.** Colors, spacing and radii are referenced by semantic token. A hard-coded hex or pixel value is a violation.
- **Figma and code are one system.** Every Figma variable has a matching Tailwind token with the same value, and the other way round.
- **Accessible by default.** Contrast, focus states and semantic markup are checked on every screen, not left to a later pass.

## What gets audited

Before handoff, the audit agent checks each build against these rules:

### Token integrity

- Every color, spacing, radius and type value resolves to a token in the registry.
- No arbitrary Tailwind values (such as `text-[#123456]`) where a token exists.
- Figma variables and `tailwind.config.ts` values match exactly.

### Component discipline

- Every element comes from the approved component list, built on Radix primitives and your own UI elements.
- Variants are used as defined: no overriding a button's padding to make a new size.
- No unused or duplicate components in the repository.

### Accessibility (WCAG)

- Text and interactive elements meet WCAG AA contrast ratios.
- Interactive elements are reachable by keyboard and have a visible focus state.
- Images have alt text, and form controls have labels.

### Typography

- Type uses the defined scale and weights only.
- Body text stays legible in dense layouts such as analytical dashboards.

## Drift checks

Design systems decay after handoff, as quick fixes add one-off colors and custom spacing. On **The Pipeline** plan, Tulip keeps governing after delivery:

- **Automated GitHub PR audits** run the same rules on every pull request and comment with any violations.
- **Design-system drift checks** compare the repository with the Master Figma file and flag values that no longer match.

## Handling violations

When a check fails, the build is not handed off. The audit agent reports each violation with the file, the rule it broke and the token or component that should be used instead. Fixes are made at the UIR level and recompiled, so Figma and code stay in sync.

## Related

- [Architecture & MCP Protocol](/docs/architecture): where governance sits in the pipeline.
- [API Reference](/docs/api-reference): read audit results programmatically.
