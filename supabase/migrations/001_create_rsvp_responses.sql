-- Creates a table for RSVP submissions.
-- The public website can INSERT only. It cannot read the guest list.

create table if not exists public.rsvp_responses (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null check (char_length(trim(guest_name)) between 2 and 100),
  attendance text not null check (attendance in ('attending', 'not_attending')),
  created_at timestamptz not null default now()
);

alter table public.rsvp_responses enable row level security;

-- Remove broad table permissions before granting the one operation needed.
revoke all on table public.rsvp_responses from anon;
revoke all on table public.rsvp_responses from authenticated;

-- Guests submitting the form need INSERT permission only.
grant insert on table public.rsvp_responses to anon;

drop policy if exists "Public can submit an RSVP" on public.rsvp_responses;

create policy "Public can submit an RSVP"
on public.rsvp_responses
for insert
to anon
with check (
  char_length(trim(guest_name)) between 2 and 100
  and attendance in ('attending', 'not_attending')
);
