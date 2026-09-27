-- Persist wellness-timer awards on the existing check-in record.
alter table public.wellness_checkins
  add column if not exists coins_earned integer not null default 0;

alter table public.wellness_checkins
  add constraint wellness_checkins_coins_earned_nonnegative
  check (coins_earned >= 0) not valid;

alter table public.wellness_checkins
  validate constraint wellness_checkins_coins_earned_nonnegative;

-- The browser client can only update the signed-in user's own record.
do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'wellness_checkins'
      and policyname = 'Users can update their own check-ins'
  ) then
    create policy "Users can update their own check-ins"
      on public.wellness_checkins
      for update
      to authenticated
      using (auth.uid() = user_id)
      with check (auth.uid() = user_id);
  end if;
end
$$;
