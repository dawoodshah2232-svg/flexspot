-- FlexSpot referral rewards: named referrers + $1-per-visit ledger
-- FUTURE PHASE: prepared for the live Supabase wiring. DO NOT apply until the
-- affiliate/login/wallet phase is approved. The demo preview runs on
-- localStorage (see src/lib/store.js referral rewards engine).

-- Named referral identities: one personal code per (person, spot)
create table if not exists public.referral_identities (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  code text not null unique,
  name text not null,
  visits integer not null default 0,
  earned numeric not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists referral_identities_business_idx on public.referral_identities(business_id, earned desc);

-- Immutable earning-events ledger: every $1 credit is a row. This becomes the
-- affiliate wallet balance source (balances, USDT withdrawals, 3-level splits).
create table if not exists public.referral_rewards (
  id uuid primary key default gen_random_uuid(),
  identity_id uuid not null references public.referral_identities(id) on delete cascade,
  business_id uuid not null references public.businesses(id) on delete cascade,
  amount numeric not null default 1,
  kind text not null default 'visit_reward',
  visitor_hash text,
  created_at timestamptz not null default now()
);
create index if not exists referral_rewards_identity_idx on public.referral_rewards(identity_id, created_at desc);

alter table public.referral_identities enable row level security;
alter table public.referral_rewards enable row level security;

drop policy if exists "public read referral_identities" on public.referral_identities;
create policy "public read referral_identities" on public.referral_identities for select using (true);
drop policy if exists "public read referral_rewards" on public.referral_rewards;
create policy "public read referral_rewards" on public.referral_rewards for select using (true);
-- inserts go through a privileged server function later (anti-fraud); open
-- insert is intentionally NOT granted here.
