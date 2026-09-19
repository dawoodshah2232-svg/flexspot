-- Public reads are limited to approved business/profile data and leaderboard views.
grant usage on schema public to anon;
grant select on public.leaderboard_all_time to anon;
grant select on public.leaderboard_today to anon;
grant select on public.leaderboard_week to anon;
grant select on public.businesses to anon;
grant select on public.rank_events to anon;
