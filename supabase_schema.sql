-- Create Orders Table
create table orders (
  id text primary key,
  amount numeric not null,
  currency text not null,
  status text not null check (status in ('CREATED', 'PAYMENT_INITIATED', 'PAID', 'FAILED')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  receipt text,
  notes jsonb
);

-- Create Payments Table
create table payments (
  id uuid default gen_random_uuid() primary key,
  order_id text not null references orders(id),
  payment_id text not null,
  signature text not null,
  status text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Gift Cards Table
create table gift_cards (
  id uuid default gen_random_uuid() primary key,
  code text not null unique,
  value numeric not null,
  balance numeric not null,
  status text not null check (status in ('ACTIVE', 'PARTIALLY_USED', 'USED', 'EXPIRED')),
  expiry_date timestamp with time zone not null,
  recipient_email text,
  sender_name text,
  order_id text references orders(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Recommended: Enable Row Level Security (RLS)
alter table orders enable row level security;
alter table payments enable row level security;
alter table gift_cards enable row level security;

-- Policy: Allow public to insert (for callback/webhook purposes if needed, though strictly our API handles it)
-- Since we are using service role or anon key with custom logic, adjust policies as needed.
-- For now, if using standard client, you might want to restrict read access.
