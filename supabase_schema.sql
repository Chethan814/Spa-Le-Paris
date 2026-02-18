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

-- Policy: Allow public to insert (since the API handles validation)
create policy "Allow public insert on orders"
  on orders for insert
  with check (true);

create policy "Allow public insert on payments"
  on payments for insert
  with check (true);

create policy "Allow public insert on gift_cards"
  on gift_cards for insert
  with check (true);

-- Allow public read on gift_cards specifically for code verification
create policy "Allow public select on gift_cards"
  on gift_cards for select
  using (true);

-- Create Bookings Table
create table bookings (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  phone text not null,
  email text,
  service text,
  duration text,
  location text,
  preferred_date text,
  time_slot text,
  notes text,
  selected_packages jsonb,
  pricing jsonb,
  status text not null default 'PENDING',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Franchise Inquiries Table
create table franchise_inquiries (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  email text not null,
  phone text not null,
  city text not null,
  background text not null,
  interest text not null,
  status text not null default 'NEW',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for new tables
alter table bookings enable row level security;
alter table franchise_inquiries enable row level security;

-- Allow public inserts (anon key)
create policy "Allow public insert on bookings"
  on bookings for insert
  with check (true);

create policy "Allow public insert on franchise_inquiries"
  on franchise_inquiries for insert
  with check (true);
