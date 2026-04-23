-- ============================================================================
-- HullBook — initial schema
-- ============================================================================
-- This migration creates the full database schema. Run with:
--   supabase db reset
-- Or apply directly in the Supabase SQL editor.
-- ============================================================================

-- ---------- Extensions ----------
create extension if not exists "uuid-ossp";

-- ============================================================================
-- WAITLIST — pre-launch email signups (no auth required)
-- ============================================================================
create table public.waitlist (
  id          uuid primary key default uuid_generate_v4(),
  email       text not null,
  locale      text not null default 'en' check (locale in ('en','es','de','fr','nl','it')),
  currency    text not null default 'USD',
  source      text,                 -- e.g. 'hero', 'final_cta', 'referral'
  created_at  timestamptz not null default now(),
  unique (email)
);

create index waitlist_created_at_idx on public.waitlist (created_at desc);

-- Anyone can insert (pre-launch landing page). Nobody can read except service role.
alter table public.waitlist enable row level security;

create policy "Anyone can join the waitlist"
  on public.waitlist for insert
  to anon, authenticated
  with check (true);

-- No select policy on purpose — only the service-role key can read.

-- ============================================================================
-- PROFILES — one row per authenticated user, mirrors auth.users
-- ============================================================================
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text not null,
  full_name   text,
  locale      text not null default 'en' check (locale in ('en','es','de','fr','nl','it')),
  currency    text not null default 'USD',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can read their own profile"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Auto-create a profile row on user signup.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, locale, currency)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'locale', 'en'),
    coalesce(new.raw_user_meta_data->>'currency', 'USD')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================================
-- BOATS — each user can own multiple boats
-- ============================================================================
create table public.boats (
  id                  uuid primary key default uuid_generate_v4(),
  user_id             uuid not null references public.profiles(id) on delete cascade,
  name                text not null,
  type                text not null default 'other'
                        check (type in ('sailboat','powerboat','trawler','pontoon','jetski','other')),
  length_ft           numeric(5,2),
  year                smallint,
  make                text,
  model               text,
  purchase_value_minor bigint,
  purchase_date       date,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index boats_user_id_idx on public.boats (user_id);

alter table public.boats enable row level security;

create policy "Users can read their own boats"
  on public.boats for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert their own boats"
  on public.boats for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their own boats"
  on public.boats for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own boats"
  on public.boats for delete
  to authenticated
  using (auth.uid() = user_id);

-- ============================================================================
-- ENTRIES — expenses, trips, service records for each boat
-- ============================================================================
-- Amounts stored in minor units (cents) to avoid float errors.
create table public.entries (
  id                  uuid primary key default uuid_generate_v4(),
  boat_id             uuid not null references public.boats(id) on delete cascade,
  user_id             uuid not null references public.profiles(id) on delete cascade,
  kind                text not null check (kind in ('expense','trip','service')),
  occurred_on         date not null,
  category            text not null,
  merchant            text,
  note                text,
  amount_minor        bigint not null default 0,
  currency            text not null,
  engine_hours_delta  numeric(8,2),
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index entries_boat_id_idx on public.entries (boat_id);
create index entries_user_id_idx on public.entries (user_id);
create index entries_occurred_on_idx on public.entries (occurred_on desc);

alter table public.entries enable row level security;

create policy "Users can read their own entries"
  on public.entries for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert their own entries"
  on public.entries for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their own entries"
  on public.entries for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own entries"
  on public.entries for delete
  to authenticated
  using (auth.uid() = user_id);

-- ============================================================================
-- AUTO-UPDATE updated_at on every UPDATE
-- ============================================================================
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_touch before update on public.profiles
  for each row execute function public.touch_updated_at();
create trigger boats_touch before update on public.boats
  for each row execute function public.touch_updated_at();
create trigger entries_touch before update on public.entries
  for each row execute function public.touch_updated_at();
