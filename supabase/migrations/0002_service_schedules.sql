-- ============================================================================
-- HullBook — Service schedule
-- ============================================================================
-- Tracks maintenance intervals per boat, computed due dates from engine hours
-- or calendar time (whichever comes first).
-- ============================================================================

create table public.service_schedules (
  id                      uuid primary key default uuid_generate_v4(),
  boat_id                 uuid not null references public.boats(id) on delete cascade,
  user_id                 uuid not null references public.profiles(id) on delete cascade,

  -- What service this is ("Oil change", "Impeller", etc.)
  name                    text not null,
  category                text not null default 'Maintenance',

  -- Two triggers — either can fire the reminder
  interval_hours          numeric(8,2),         -- e.g. 100 engine hours
  interval_months         smallint,             -- e.g. 12 months

  -- When was it last performed
  last_performed_on       date,
  last_performed_hours    numeric(8,2),

  -- User-visible estimated cost
  expected_cost_minor     bigint,
  expected_cost_currency  text,

  notes                   text,
  archived                boolean not null default false,

  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);

create index service_schedules_boat_id_idx on public.service_schedules (boat_id);
create index service_schedules_user_id_idx on public.service_schedules (user_id);

alter table public.service_schedules enable row level security;

create policy "Users read own service schedules"
  on public.service_schedules for select to authenticated
  using (auth.uid() = user_id);

create policy "Users insert own service schedules"
  on public.service_schedules for insert to authenticated
  with check (auth.uid() = user_id);

create policy "Users update own service schedules"
  on public.service_schedules for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users delete own service schedules"
  on public.service_schedules for delete to authenticated
  using (auth.uid() = user_id);

create trigger service_schedules_touch
  before update on public.service_schedules
  for each row execute function public.touch_updated_at();
