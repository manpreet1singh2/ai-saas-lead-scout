create table if not exists products (
  id text primary key,
  name text not null,
  category text not null,
  finish text not null,
  description text not null,
  attributes text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists quotes (
  id text primary key,
  created_at timestamptz not null,
  name text not null,
  email text not null,
  phone text not null,
  company text not null default '',
  category text not null,
  quantity integer not null,
  notes text not null default ''
);
