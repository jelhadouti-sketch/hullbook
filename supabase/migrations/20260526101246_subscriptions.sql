alter table public.profiles add column if not exists stripe_customer_id text;
create index if not exists profiles_stripe_customer_id_idx on public.profiles (stripe_customer_id);

create table if not exists public.subscriptions (
  id                      uuid primary key default uuid_generate_v4(),
  user_id                 uuid not null references auth.users(id) on delete cascade,
  stripe_subscription_id  text not null unique,
  stripe_customer_id      text not null,
  status                  text not null,
  price_id                text,
  current_period_end      timestamptz,
  trial_end               timestamptz,
  cancel_at_period_end    boolean not null default false,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);
create index if not exists subscriptions_user_id_idx on public.subscriptions (user_id);
create index if not exists subscriptions_status_idx on public.subscriptions (status);
alter table public.subscriptions enable row level security;

create policy "Users read their own subscription"
  on public.subscriptions for select
  to authenticated
  using (auth.uid() = user_id);
