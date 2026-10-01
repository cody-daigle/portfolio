# Fullstack Portfolio

A personal portfolio built as a real fullstack application rather than a static
page: a typed React client, an Express API, and a PostgreSQL database, with
automated tests and CI wired up end to end.

**Stack:** React + TypeScript + Tailwind CSS (client) · Express + TypeScript +
Prisma (server) · PostgreSQL · Vitest (both) · GitHub Actions (CI)

## Why it's built this way

This repo is meant to demonstrate engineering practices, not just list them:

- **Typed end to end** — shared shape of `Project`/`Skill`/`Experience` between
  the Prisma schema and the client's TypeScript types.
- **A real schema, not hardcoded JSON** — content lives in Postgres and is
  reachable through a REST API, so adding a project is a database write, not a
  code change.
- **Validated input at the boundary** — the contact form is validated with
  `zod` on the server and rate-limited, not just trusted from the client.
- **Tested on both sides** — server routes are tested with mocked Prisma calls
  via Vitest + Supertest; client components are tested with React Testing
  Library.
- **CI that proves it works** — GitHub Actions runs lint, tests, and a build
  for both workspaces, and pushes the Prisma schema against a real Postgres
  service container as a smoke test.

## Project structure

```
.
├── client/          React + TypeScript + Tailwind (Vite)
├── server/          Express + TypeScript + Prisma API
├── docker-compose.yml   Local Postgres for development
└── .github/workflows/ci.yml
```

## Getting started

Requires Node 20+ and Docker (for local Postgres).

```bash
npm install
docker compose up -d          # starts Postgres on localhost:5432
cp server/.env.example server/.env
npm run db:migrate            # creates tables
npm run db:seed               # loads placeholder content
npm run dev                   # runs API on :4000 and client on :5173
```

Then open http://localhost:5173.

## Make it yours

The seed data in [`server/prisma/seed.ts`](server/prisma/seed.ts) is
placeholder content. Replace the projects, skills, and experience entries
with your own, then re-run `npm run db:seed`. Update the name, headline, and
about text in [`client/src/components/Hero.tsx`](client/src/components/Hero.tsx)
and [`client/src/components/About.tsx`](client/src/components/About.tsx), and
the page `<title>` in [`client/index.html`](client/index.html).

## Scripts

Run from the repo root (npm workspaces):

| Command | Description |
| --- | --- |
| `npm run dev` | Run client + server together |
| `npm run build` | Build both workspaces for production |
| `npm test` | Run server and client test suites |
| `npm run lint` | Lint both workspaces |
| `npm run db:migrate` | Apply Prisma migrations |
| `npm run db:seed` | Seed the database |
| `npm run docker:up` / `docker:down` | Start/stop local Postgres |

## Deploying

- **Client**: static build output in `client/dist` — deploy to Vercel,
  Netlify, or any static host. Set `VITE_API_URL` to your deployed API's
  origin.
- **Server**: deploy anywhere that runs Node (Render, Fly.io, Railway, a
  container host). Set `DATABASE_URL` to a managed Postgres instance and
  `CLIENT_ORIGIN` to your deployed client's origin, then run
  `npm run db:migrate:deploy -w server` before starting the server.
