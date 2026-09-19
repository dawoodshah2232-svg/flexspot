-- FlexSpot.lol core schema
-- Production ranking is based only on verified donation ledger entries.

create extension if not exists pgcrypto;

create type public.business_status as enum ('pending','approved','rejected','suspended');
create type public.order_status as enum ('draft','awaiting_payment','confirming','verified','review','failed','expired','refunded','reversed');
create type public.destination_type as enum ('website','instagram','linkedin','x','tiktok','youtube','other');

create table public.businesses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null check (char_length(name) between 2 and 60),
  tagline text not null default '' check (char_length(tagline) <= 100),
  description text not null default '' check (char_length(description) <= 1000),
  destination_url text not null,
  destination_type public.destination_type not null default 'website',
  logo_url text,
  category text,
  status public.business_status not null default 'pending',
  management_token_hash text,
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  amount_cents integer not null check (amount_cents >= 100),
  currency text not null default 'USD' check (currency = 'USD'),
  provider text,
  provider_reference text unique,
  asset text,
  network text,
  quoted_crypto_amount numeric,
  payment_address text,
  status public.order_status not null default 'draft',
  expires_at timestamptz,
  verified_at timestamptz,
  proof_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.payment_events (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  provider_event_key text not null unique,
  provider text not null,
  network text,
  tx_hash text,
  status text not null,
  received_at timestamptz not null default now(),
  raw_reference jsonb not null default '{}'::jsonb
);

create table public.ledger_entries (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id),
  business_id uuid not null references public.businesses(id),
  amount_cents integer not null,
  entry_type text not null check (entry_type in ('donation','reversal','refund','adjustment')),
  eligible_at timestamptz not null,
  reversal_of uuid references public.ledger_entries(id),
  created_at timestamptz not null default now(),
  unique(order_id, entry_type)
);

create table public.rank_events (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  board text not null default 'all_time',
  old_rank integer,
  new_rank integer not null,
  event_key text not null unique,
  observed_at timestamptz not null default now()
);

create table public.outbound_clicks (
  id bigint generated always as identity primary key,
  business_id uuid not null references public.businesses(id) on delete cascade,
  referrer text,
  user_agent_hash text,
  created_at timestamptz not null default now()
);

create index businesses_status_idx on public.businesses(status);
create index ledger_business_eligible_idx on public.ledger_entries(business_id, eligible_at desc);
create index ledger_eligible_idx on public.ledger_entries(eligible_at desc);
create index orders_business_idx on public.orders(business_id, created_at desc);
create index rank_events_business_idx on public.rank_events(business_id, observed_at desc);

create or replace view public.leaderboard_all_time as
select
  b.id,
  b.slug,
  b.name,
  b.tagline,
  b.destination_url,
  b.destination_type,
  b.logo_url,
  coalesce(sum(l.amount_cents), 0)::bigint as total_cents,
  rank() over (
    order by coalesce(sum(l.amount_cents), 0) desc,
             min(l.eligible_at) asc nulls last,
             b.id asc
  )::integer as rank
from public.businesses b
left join public.ledger_entries l on l.business_id = b.id
where b.status = 'approved'
group by b.id;

create or replace view public.leaderboard_today as
select
  b.id,
  b.slug,
  b.name,
  b.tagline,
  b.destination_url,
  b.destination_type,
  b.logo_url,
  coalesce(sum(l.amount_cents) filter (where l.eligible_at >= date_trunc('day', now() at time zone 'utc')), 0)::bigint as total_cents,
  rank() over (
    order by coalesce(sum(l.amount_cents) filter (where l.eligible_at >= date_trunc('day', now() at time zone 'utc')), 0) desc,
             min(l.eligible_at) filter (where l.eligible_at >= date_trunc('day', now() at time zone 'utc')) asc nulls last,
             b.id asc
  )::integer as rank
from public.businesses b
left join public.ledger_entries l on l.business_id = b.id
where b.status = 'approved'
group by b.id;

create or replace view public.leaderboard_week as
select
  b.id,
  b.slug,
  b.name,
  b.tagline,
  b.destination_url,
  b.destination_type,
  b.logo_url,
  coalesce(sum(l.amount_cents) filter (where l.eligible_at >= date_trunc('week', now() at time zone 'utc')), 0)::bigint as total_cents,
  rank() over (
    order by coalesce(sum(l.amount_cents) filter (where l.eligible_at >= date_trunc('week', now() at time zone 'utc')), 0) desc,
             min(l.eligible_at) filter (where l.eligible_at >= date_trunc('week', now() at time zone 'utc')) asc nulls last,
             b.id asc
  )::integer as rank
from public.businesses b
left join public.ledger_entries l on l.business_id = b.id
where b.status = 'approved'
group by b.id;

alter table public.businesses enable row level security;
alter table public.orders enable row level security;
alter table public.payment_events enable row level security;
alter table public.ledger_entries enable row level security;
alter table public.rank_events enable row level security;
alter table public.outbound_clicks enable row level security;

create policy "public can read approved businesses"
on public.businesses for select
using (status = 'approved');

create policy "public can read rank events"
on public.rank_events for select
using (true);

-- Writes are intentionally not granted to anonymous clients.
-- Submission, order creation, payment verification, ledger writes and click tracking
-- must go through trusted server/Edge Function endpoints.
