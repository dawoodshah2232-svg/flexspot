-- FlexSpot viral layer: referrals + rewards (apply after 20260919 migrations)
-- Run in Supabase SQL editor or via supabase db push.

-- Referral codes: one per spot, shareable as flexspot.lol/s/<slug>?ref=<code>
create table if not exists public.referral_codes (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  code text not null unique,
  clicks integer not null default 0,
  joined integer not null default 0,
  created_at timestamptz not null default now(),
  unique(business_id)
);

-- Raw referral click events (for analytics / fraud review)
create table if not exists public.referral_clicks (
  id uuid primary key default gen_random_uuid(),
  code_id uuid not null references public.referral_codes(id) on delete cascade,
  ip_hash text,
  user_agent text,
  created_at timestamptz not null default now()
);
create index if not exists referral_clicks_code_idx on public.referral_clicks(code_id, created_at desc);

-- Reward definitions (seeded by platform)
create table if not exists public.rewards (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null default '',
  icon text not null default '🏅',
  created_at timestamptz not null default now()
);

insert into public.rewards (slug, name, description, icon) values
  ('top-spot', 'Top Spot Holder', 'Currently sitting at #1 on the leaderboard.', '👑'),
  ('weekly-champion', 'Weekly Champion', 'Highest earner over the last 7 days.', '🏆'),
  ('fastest-climber', 'Fastest Climber', 'Biggest rank jump in the last 24 hours.', '🚀'),
  ('most-shared', 'Most Shared', 'Most referral clicks this week.', '📣'),
  ('community-favorite', 'Community Favorite', 'Most profile views in the last 7 days.', '❤️'),
  ('early-adopter', 'Early Adopter', 'One of the first 100 spots ever claimed.', '⚡')
on conflict (slug) do nothing;

-- Reward awards (period allows weekly re-evaluation, e.g. '2026-W38')
create table if not exists public.business_rewards (
  business_id uuid not null references public.businesses(id) on delete cascade,
  reward_id uuid not null references public.rewards(id) on delete cascade,
  period text not null default 'all-time',
  awarded_at timestamptz not null default now(),
  primary key (business_id, reward_id, period)
);

-- Public read access (mirrors 20260919_flexspot_public_read.sql pattern)
alter table public.referral_codes enable row level security;
alter table public.referral_clicks enable row level security;
alter table public.rewards enable row level security;
alter table public.business_rewards enable row level security;

drop policy if exists "public read referral_codes" on public.referral_codes;
create policy "public read referral_codes" on public.referral_codes for select using (true);

drop policy if exists "public read rewards" on public.rewards;
create policy "public read rewards" on public.rewards for select using (true);

drop policy if exists "public read business_rewards" on public.business_rewards;
create policy "public read business_rewards" on public.business_rewards for select using (true);

-- Clicks are insert-only from the public (rate-limited by edge function in production)
drop policy if exists "public insert referral_clicks" on public.referral_clicks;
create policy "public insert referral_clicks" on public.referral_clicks for insert with check (true);
