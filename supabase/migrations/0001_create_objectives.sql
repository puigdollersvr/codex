create extension if not exists "pgcrypto";

create table if not exists public.objectives (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  type text not null,
  description text,
  metric text,
  target text,
  due_date date,
  progress integer not null default 0,
  strategies text[] not null default '{}',
  milestones jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.objectives enable row level security;

create policy "Allow read objectives" on public.objectives
  for select
  using (true);

create policy "Allow insert objectives" on public.objectives
  for insert
  with check (true);
