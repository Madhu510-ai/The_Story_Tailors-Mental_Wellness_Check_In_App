-- Auth metadata is written by Supabase Auth, so validate the display name at
-- the database boundary as well as in the browser. This checks a reasonable
-- name format only; verifying a person's real-world identity needs a separate
-- identity-verification process.
create or replace function public.validate_auth_username()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  username text := trim(coalesce(new.raw_user_meta_data ->> 'username', ''));
begin
  if username = ''
     or length(username) < 2
     or length(username) > 50
     or username !~ '^[A-Za-z]+([ ''-][A-Za-z]+)*$'
     or username !~* '[aeiouy]'
     or username ~* '(.)\1\1'
     or username ~* '^(asdf|qwerty|zxcv|test)' then
    raise exception 'Username must look like a real name (letters and spaces only).';
  end if;
  return new;
end;
$$;

drop trigger if exists validate_auth_username_before_write on auth.users;
create trigger validate_auth_username_before_write
  before insert or update of raw_user_meta_data on auth.users
  for each row execute procedure public.validate_auth_username();
