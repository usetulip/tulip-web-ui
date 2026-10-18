> **Draft:** the base URL, endpoints and payloads on this page are placeholders that show the intended shape of the API. Confirm them with engineering before publishing.

The Tulip API lets you submit briefs, track sprints and read your token registry from your own tools and CI pipelines.

## Authentication

Every request needs an API key, sent as a bearer token:

```bash
curl https://api.tulipai.com/v1/sprints \
  -H "Authorization: Bearer $TULIP_API_KEY"
```

Keep keys server-side. Never expose them in browser code or commit them to a repository.

## Base URL

```text
https://api.tulipai.com/v1
```

All requests and responses use JSON.

## Briefs

### Create a brief

`POST /briefs`

Submits a structured brief and returns its ID.

```json
{
  "brand": {
    "primary": "#f97518",
    "foreground": "#1e0d01"
  },
  "archetype": "dashboard",
  "features": ["auth-screens", "pricing", "settings"]
}
```

Fields:

- `brand` (object, required): brand colors as hex values.
- `archetype` (string, required): one of `marketing`, `dashboard` or `app-shell`.
- `features` (array of strings): the feature checklist for your screens.

### Get a brief

`GET /briefs/{brief_id}`

Returns the brief and its current validation status.

## Sprints

### Start a sprint

`POST /sprints`

Starts a 48-hour sprint from a validated brief.

```json
{
  "brief_id": "brf_8x2k1",
  "plan": "core-sprint"
}
```

### Get sprint status

`GET /sprints/{sprint_id}`

```json
{
  "id": "spr_41ac9",
  "status": "auditing",
  "stage": "governed-handoff",
  "due_at": "2026-10-20T10:00:00Z"
}
```

`status` is one of `queued`, `compiling`, `auditing`, `delivered` or `failed`.

### Get audit results

`GET /sprints/{sprint_id}/audit`

Returns each governance check with its result and any violations. See [Taste Governance](/docs/taste-governance) for the rules.

## Tokens

### List tokens

`GET /projects/{project_id}/tokens`

Returns the token registry for a project. Filter by group with `?group=color`.

```json
{
  "tokens": [
    { "name": "color.primary", "value": "#f97518" },
    { "name": "radius.lg", "value": "1rem" }
  ]
}
```

## Errors

Errors return a non-2xx status and a JSON body:

```json
{
  "error": {
    "code": "invalid_brief",
    "message": "archetype must be one of marketing, dashboard, app-shell"
  }
}
```

- `400`: the request is malformed or fails validation.
- `401`: the API key is missing or invalid.
- `404`: the resource doesn't exist.
- `429`: too many requests; retry after the time in the `Retry-After` header.
