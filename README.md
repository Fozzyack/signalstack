# SignalStack

A single full-stack Next.js app. UI and `/api/*` Route Handlers run together;
PostgreSQL is accessed through Drizzle on the server. The app supports Vercel or
a standard Node.js host; it does not depend on Vercel-specific services.

## Local development

Run these commands from `client/`:

```bash
bun install
cp .env.example .env.local
docker compose --env-file .env.local up -d
bun run db:migrate
bun run db:seed
bun run dev
```

Open http://localhost:3000. Demo login: `maya.chen@signalstack.test`, password
`signalstack-dev` (or `SEED_PASSWORD` when first seeding). Re-seeding updates demo
data but does not reset existing passwords. Seeding is disabled in production.

Docker only runs PostgreSQL and Mailpit. Mailpit's UI is http://localhost:8025
and SMTP is on port 1025. Email delivery is not implemented yet.

If port 5432 is occupied, change `POSTGRES_PORT` and the port in `DATABASE_URL`
in `.env.local`, then start Compose using `--env-file .env.local` as above.
This Compose project uses a new `signalstack_postgres_data` volume and does not
touch the old backend's database.

## Database workflow

- Schema: `lib/db/schema.ts`.
- Change the schema, run `bun run db:generate`, review and commit `drizzle/`.
- Apply migrations explicitly with `bun run db:migrate`.
- Optional schema browser: `bun run db:studio`.
- Do not edit applied migrations or run schema push against production.

This is a **fresh Drizzle migration baseline**. Do not point it at the old Go/Goose
database: use an empty database. No legacy data or migration history is imported.
Migration and seed commands must run from `client/`; they load Next.js env files.

## Authentication and API

Sessions last 24 hours, are stored in PostgreSQL, and use an HttpOnly, SameSite=Lax
cookie (Secure in production). Tokens are never exposed to client JavaScript.
Logging out invalidates the database session. Protected API routes validate the
session on every request; the dashboard layout also redirects unauthenticated users.

All mutations enforce same-origin requests. API clients must send `Origin` and
JSON requests must send `Content-Type: application/json`. If a reverse proxy
changes the request origin, configure `APP_URL` to the public origin.

| Route | Methods | Access |
| --- | --- | --- |
| `/api/health` | GET | Public |
| `/api/auth/login` | POST | Public |
| `/api/auth/logout` | POST | Same-origin |
| `/api/auth/check` | GET | Authenticated |
| `/api/requests` | GET / POST | Authenticated read / public submission |
| `/api/request-assignments` | GET / POST | Authenticated |
| `/api/users/me` | GET / PUT | Authenticated |
| `/api/users/me/requests` | GET | Authenticated |

## Deployment

For Vercel, set the project root to `client/`. Set server-only `DATABASE_URL`
to your PostgreSQL provider's **pooled** connection URL with the provider's
required TLS options. `DATABASE_MIGRATION_URL` can hold a direct connection URL
for migration jobs. Never use `NEXT_PUBLIC_` for database credentials.

Apply migrations once in a controlled deployment/CI step before deploying the
app. Neither builds nor requests run migrations. Preview deployments should
use separate databases, not production credentials. Do not seed production.

The runtime uses small, reused connection pools with short idle timeouts. A
provider pooler is still required for Vercel's horizontally scaling functions.
Place the app and database in nearby regions. For self-hosting, run
`bun run build` then `bun run start` behind HTTPS; secure production cookies
require HTTPS. Add shared rate limiting for login and public submissions before
opening the app to untrusted traffic; the UI cooldown is not server protection.

## Verification

```bash
bun run lint
bunx tsc --noEmit
bun run test
bun run build
```

Full-stack integration tests need a running app backed by a **dedicated database
whose name ends in `_test`**. Migrate that database first, start the app with
`DATABASE_URL` pointing to it, then run:

```bash
TEST_DATABASE_URL=postgresql://.../signalstack_test \
TEST_BASE_URL=http://localhost:3000 bun run test:integration
```

Tests cover auth, cookies, CSRF rejection, request submission, concurrent claims,
profile updates, session expiry and logout. They clean up their own records.

The sibling `backend/` directory is retained temporarily as a legacy reference;
the Next.js app does not call it and no Go process is required.
