-- Run this in Supabase -> SQL Editor.
create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  stripe_session_id text unique not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id text not null,
  product_name text not null,
  amount_paid integer not null default 0,
  currency text not null default 'usd',
  status text not null default 'paid',
  created_at timestamptz not null default now()
);
create table if not exists public.custom_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  discord_username text not null,
  framework text not null,
  title text not null,
  details text not null,
  status text not null default 'submitted',
  created_at timestamptz not null default now()
);
alter table public.purchases enable row level security;
alter table public.custom_requests enable row level security;
drop policy if exists "Customers can view own purchases" on public.purchases;
create policy "Customers can view own purchases" on public.purchases
for select to authenticated using (auth.uid() = user_id);
drop policy if exists "Customers can create own requests" on public.custom_requests;
create policy "Customers can create own requests" on public.custom_requests
for insert to authenticated with check (auth.uid() = user_id);
drop policy if exists "Customers can view own requests" on public.custom_requests;
create policy "Customers can view own requests" on public.custom_requests
for select to authenticated using (auth.uid() = user_id);
-- Do not add public insert/update access to purchases. The webhook uses the service-role key.
