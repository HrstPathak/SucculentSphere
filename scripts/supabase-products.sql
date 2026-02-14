create table if not exists public.products (
  id text primary key,
  title text not null,
  handle text not null unique,
  price numeric(10,2) not null default 0,
  currency text not null default 'USD',
  image text,
  badge text,
  rating numeric(2,1) not null default 4.5,
  availability text not null default 'InStock',
  description text,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'products'
      and policyname = 'Allow read access to products'
  ) then
    create policy "Allow read access to products"
      on public.products
      for select
      using (true);
  end if;
end $$;

insert into public.products (id, title, handle, price, currency, image, badge, rating, availability, description)
values
  ('gid://shopify/Product/1', 'Echeveria Harmony', 'echeveria-harmony', 18.00, 'USD', '/assets/product-1.jpg', 'Best Seller', 4.8, 'InStock', 'A graceful rosette succulent with soft pastel tones. Echeveria Harmony thrives in bright light and minimal watering, making it perfect for beginners seeking effortless elegance.'),
  ('gid://shopify/Product/2', 'Geometric Planter', 'geometric-planter', 24.00, 'USD', '/assets/product-2.jpg', 'New', 4.6, 'InStock', 'A modern ceramic planter with clean geometric lines. Designed to elevate your succulents with a minimalist aesthetic while ensuring proper drainage and airflow.'),
  ('gid://shopify/Product/3', 'Luxury Succulent Set', 'luxury-succulent-set', 42.00, 'USD', '/assets/product-3.jpg', 'Limited', 4.9, 'InStock', 'A curated trio of premium succulents paired with elegant pots. This limited-edition set brings refined greenery and serene charm to any living or workspace.'),
  ('gid://shopify/Product/4', 'Haworthia Zebra', 'haworthia-zebra', 15.00, 'USD', '/assets/product-4.jpg', '', 4.5, 'InStock', 'A striking low-maintenance succulent featuring bold white stripes. Haworthia Zebra thrives in low to moderate light and is ideal for compact indoor spaces.')
on conflict (handle)
do update set
  title = excluded.title,
  price = excluded.price,
  currency = excluded.currency,
  image = excluded.image,
  badge = excluded.badge,
  rating = excluded.rating,
  availability = excluded.availability,
  description = excluded.description;
