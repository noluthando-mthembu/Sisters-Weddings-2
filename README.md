# Membeso RSVP

A mobile-friendly RSVP website for a family membeso event on 27 December 2026.

## Technology
- React + TypeScript + Vite
- Supabase PostgreSQL
- Git + GitHub
- Cloudflare Pages

## Important data handling
- Application source code belongs in GitHub.
- Guest responses belong in Supabase.
- Never commit `.env.local`, passwords, API tokens, or real guest records.
- The public form is configured to INSERT responses only. It cannot read the guest list.
- For the first release, view responses from the Supabase project dashboard (Table Editor). Do not expose guest records through a public page.

## Setup
See `docs/SETUP.md` for beginner-friendly Windows instructions.

## Event details
The event date is set to 27 December 2026. Venue, time, RSVP deadline and any guest-count rules have intentionally not been invented.
