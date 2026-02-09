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
    availability: "InStock"
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
    availability: "InStock"
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
    availability: "InStock"
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
    availability: "InStock"
  }
];

export type Product = typeof mockProducts[number];
