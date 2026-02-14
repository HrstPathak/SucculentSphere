export const mockProducts = [
  {
    id: "gid://shopify/Product/1",
    title: "Echeveria Harmony",
    handle: "echeveria-harmony",
    price: "18.00",
    currency: "USD",
    image: "/assets/product-1.jpg",
    badge: "Best Seller",
    rating: 4.8,
    availability: "InStock",
    description:
      "A graceful rosette succulent with soft pastel tones. Echeveria Harmony thrives in bright light and minimal watering, making it perfect for beginners seeking effortless elegance."
  },
  {
    id: "gid://shopify/Product/2",
    title: "Geometric Planter",
    handle: "geometric-planter",
    price: "24.00",
    currency: "USD",
    image: "/assets/product-2.jpg",
    badge: "New",
    rating: 4.6,
    availability: "InStock",
    description:
      "A modern ceramic planter with clean geometric lines. Designed to elevate your succulents with a minimalist aesthetic while ensuring proper drainage and airflow."
  },
  {
    id: "gid://shopify/Product/3",
    title: "Luxury Succulent Set",
    handle: "luxury-succulent-set",
    price: "42.00",
    currency: "USD",
    image: "/assets/product-3.jpg",
    badge: "Limited",
    rating: 4.9,
    availability: "InStock",
    description:
      "A curated trio of premium succulents paired with elegant pots. This limited-edition set brings refined greenery and serene charm to any living or workspace."
  },
  {
    id: "gid://shopify/Product/4",
    title: "Haworthia Zebra",
    handle: "haworthia-zebra",
    price: "15.00",
    currency: "USD",
    image: "/assets/product-4.jpg",
    badge: "",
    rating: 4.5,
    availability: "InStock",
    description:
      "A striking low-maintenance succulent featuring bold white stripes. Haworthia Zebra thrives in low to moderate light and is ideal for compact indoor spaces."
  }
];

export type Product = typeof mockProducts[number];
