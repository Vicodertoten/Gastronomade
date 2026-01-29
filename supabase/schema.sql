create extension if not exists "pgcrypto";

create table if not exists entitlements (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  pack_id text not null,
  stripe_session_id text,
  stripe_payment_intent_id text,
  created_at timestamptz not null default now(),
  revoked_at timestamptz
);

create unique index if not exists entitlements_unique on entitlements (email, pack_id);
create index if not exists entitlements_email on entitlements (email);
create index if not exists entitlements_payment_intent on entitlements (stripe_payment_intent_id);

create table if not exists access_tokens (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  token_hash text not null unique,
  expires_at timestamptz not null,
  used_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists sessions (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  session_hash text not null unique,
  created_at timestamptz not null default now(),
  last_seen timestamptz,
  revoked_at timestamptz
);

create index if not exists sessions_email on sessions (email);
