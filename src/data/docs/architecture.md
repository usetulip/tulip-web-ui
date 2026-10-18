Tulip never asks a model to invent UI from scratch. It forces AI to assemble your actual building blocks, then proves the result matches your system before anything is handed off.

## The pipeline

A sprint moves through four stages. Each stage produces an artifact the next one can check.

### 1. Brief intake

The Brief Wizard collects constraints as structured fields: brand hexes, layout archetype and a feature checklist. Because every answer is typed, nothing downstream depends on interpreting free text.

### 2. Intermediate UI Representation (UIR)

The brief is compiled into a **UIR**: a framework-neutral description of your design system and screens. It has three layers:

- **Tokens**: color, spacing, radius, typography and elevation values, each with a semantic name.
- **Components**: the allowed primitives (built on Radix and your own UI elements) and the variants each one exposes.
- **Layouts**: screens composed only from those components, referencing tokens by name rather than raw values.

A simplified UIR fragment looks like this:

```json
{
  "tokens": {
    "color.primary": "#f97518",
    "color.foreground": "#1e0d01",
    "radius.lg": "1rem"
  },
  "components": ["Button", "Card", "Badge", "Accordion"],
  "layouts": [
    {
      "id": "pricing",
      "children": [{ "component": "Card", "variant": "featured" }]
    }
  ]
}
```

### 3. Dual compilation

The same UIR is compiled twice: once into Figma variables and frames, and once into Tailwind config and React components. Because both outputs come from one source, they cannot disagree.

### 4. Governed handoff

An audit agent compares the two outputs against the UIR and the rules in [Taste Governance](/docs/taste-governance). Only a passing build reaches your repository.

## MCP Protocol

> **Draft:** the server name, tool names and configuration below are placeholders for review. Confirm them with engineering before publishing.

Tulip exposes your design system to AI coding agents through the **Model Context Protocol (MCP)**. When an agent such as Claude Code builds a new screen in your repo, it can query your real tokens and components instead of guessing.

### What the server provides

- **Tools** that agents can call, such as looking up a token, listing allowed components, or validating a snippet against your rules.
- **Resources** that agents can read, such as your UIR and the governance rules for your project.

### Example tools

- `get_tokens`: returns the token registry for the project, optionally filtered by group (for example `color` or `spacing`).
- `list_components`: returns the allowed components and their variants.
- `validate_ui`: checks a JSX snippet against governance rules and returns any violations.

### Connecting an agent

Add the Tulip server to your agent's MCP configuration:

```json
{
  "mcpServers": {
    "tulip": {
      "url": "https://mcp.tulipai.com/v1",
      "headers": { "Authorization": "Bearer ${TULIP_API_KEY}" }
    }
  }
}
```

Keep the key in an environment variable rather than committing it to the repo.

## Related

- [Taste Governance](/docs/taste-governance): the rules the audit agent and `validate_ui` enforce.
- [API Reference](/docs/api-reference): the HTTP endpoints behind briefs and sprints.
