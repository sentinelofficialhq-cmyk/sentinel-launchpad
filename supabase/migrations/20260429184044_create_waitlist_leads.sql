create extension if not exists pgcrypto;

create table if not exists public.waitlist_leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  phone text,
  first_name text,
  sms_consent boolean not null default false,
  email_consent boolean not null default true,
  consent_text text,
  source text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  user_agent text,
  ip_hash text,
  created_at timestamptz not null default now(),
  constraint waitlist_leads_email_key unique (email)
);

alter table public.waitlist_leads enable row level security;

grant all on table public.waitlist_leads to service_role;
revoke all on table public.waitlist_leads from anon, authenticated;

drop policy if exists "Service role can manage waitlist leads" on public.waitlist_leads;
create policy "Service role can manage waitlist leads"
on public.waitlist_leads
for all
to service_role
using (true)
with check (true);
