-- Run this in Supabase SQL Editor. Row Level Security keeps every account's
-- answers and scores private, even though the dashboard calls the REST API.
create table if not exists public.wellness_checkins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  genre text not null,
  story text not null,
  answers jsonb not null,
  results jsonb not null,
  submitted_at timestamptz not null default now()
);

alter table public.wellness_checkins enable row level security;

create policy "Users can read their own check-ins"
  on public.wellness_checkins for select to authenticated using (auth.uid() = user_id);
create policy "Users can save their own check-ins"
  on public.wellness_checkins for insert to authenticated with check (auth.uid() = user_id);

create index if not exists wellness_checkins_user_submitted_at_idx
  on public.wellness_checkins (user_id, submitted_at desc);
