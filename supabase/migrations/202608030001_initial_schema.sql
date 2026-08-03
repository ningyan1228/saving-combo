-- 省钱组合：P0 基础模型。所有用户数据默认受 RLS 保护。
create extension if not exists "pgcrypto";

create type public.opportunity_status as enum ('draft', 'needs_review', 'verified', 'expired');
create type public.notification_status as enum ('scheduled', 'sent', 'failed', 'cancelled');

create table public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  country text, default_currency text not null default 'CNY',
  notification_preferences jsonb not null default '{"in_app": true, "email": false}'::jsonb,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.services (
  id uuid primary key default gen_random_uuid(), slug text unique not null, name text not null, category text not null, official_url text not null, active boolean not null default true, created_at timestamptz not null default now()
);
create table public.service_plans (
  id uuid primary key default gen_random_uuid(), service_id uuid not null references public.services(id), name text not null, list_price numeric(12,2) not null check (list_price >= 0), currency text not null, billing_cycle text not null, source_url text not null, verified_at timestamptz, active boolean not null default true
);
create table public.payment_methods (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, network text, product_name text, issuer_region text, active boolean not null default true, created_at timestamptz not null default now()
);
create table public.subscriptions (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, service_plan_id uuid references public.service_plans(id), amount numeric(12,2) check (amount >= 0), currency text, renewal_date date, active boolean not null default true, created_at timestamptz not null default now()
);
create table public.opportunities (
  id uuid primary key default gen_random_uuid(), slug text unique not null, title text not null, type text not null, status public.opportunity_status not null default 'draft', start_at timestamptz, end_at timestamptz, source_url text not null, verified_at timestamptz, summary text not null, created_at timestamptz not null default now()
);
create table public.opportunity_rules (
  id uuid primary key default gen_random_uuid(), opportunity_id uuid not null references public.opportunities(id) on delete cascade, service_id uuid references public.services(id), regions text[] not null default '{}', card_networks text[] not null default '{}', min_spend numeric(12,2), cashback_type text, cashback_value numeric(12,2), cap_amount numeric(12,2)
);
create table public.source_registry (
  id uuid primary key default gen_random_uuid(), name text not null, url text unique not null, source_type text not null, check_interval text not null, last_checked_at timestamptz, status text not null default 'active'
);
create table public.source_snapshots (
  id uuid primary key default gen_random_uuid(), source_id uuid not null references public.source_registry(id) on delete cascade, content_hash text not null, captured_at timestamptz not null default now(), parsed_data jsonb, change_type text
);
create table public.opportunity_matches (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, opportunity_id uuid not null references public.opportunities(id) on delete cascade, status text not null default 'active', estimated_saving numeric(12,2), calculated_at timestamptz not null default now(), unique(user_id, opportunity_id)
);
create table public.notifications (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, type text not null, title text not null, body text not null, scheduled_at timestamptz not null, sent_at timestamptz, status public.notification_status not null default 'scheduled'
);
create table public.savings_entries (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, subscription_id uuid references public.subscriptions(id) on delete set null, opportunity_id uuid references public.opportunities(id) on delete set null, original_cost numeric(12,2) not null, actual_cost numeric(12,2) not null, saved_amount numeric(12,2) generated always as (original_cost - actual_cost) stored, occurred_at date not null, note text, verified boolean not null default false
);
create table public.user_reports (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, url text, content text not null, status public.opportunity_status not null default 'needs_review', reviewer_note text, created_at timestamptz not null default now()
);
create table public.audit_logs (
  id uuid primary key default gen_random_uuid(), actor_id uuid references auth.users(id) on delete set null, action text not null, entity_type text not null, entity_id uuid, before_data jsonb, after_data jsonb, created_at timestamptz not null default now()
);

create index subscriptions_renewal_date_idx on public.subscriptions (renewal_date) where active;
create index opportunities_status_end_at_idx on public.opportunities (status, end_at);
create index notifications_schedule_idx on public.notifications (status, scheduled_at);

alter table public.profiles enable row level security;
alter table public.payment_methods enable row level security;
alter table public.subscriptions enable row level security;
alter table public.opportunity_matches enable row level security;
alter table public.notifications enable row level security;
alter table public.savings_entries enable row level security;
alter table public.user_reports enable row level security;
alter table public.services enable row level security;
alter table public.service_plans enable row level security;
alter table public.opportunities enable row level security;
alter table public.opportunity_rules enable row level security;

create policy "own profile" on public.profiles for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own payment methods" on public.payment_methods for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own subscriptions" on public.subscriptions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own matches" on public.opportunity_matches for select using (auth.uid() = user_id);
create policy "own notifications" on public.notifications for select using (auth.uid() = user_id);
create policy "own savings" on public.savings_entries for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own reports" on public.user_reports for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "public verified services" on public.services for select using (active = true);
create policy "public verified plans" on public.service_plans for select using (active = true and verified_at is not null);
create policy "public verified opportunities" on public.opportunities for select using (status = 'verified');
create policy "public rules for verified opportunities" on public.opportunity_rules for select using (exists (select 1 from public.opportunities o where o.id = opportunity_id and o.status = 'verified'));
