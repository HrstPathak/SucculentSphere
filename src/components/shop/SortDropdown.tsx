"use client";
import { useState } from "react";
import Dropdown from "../ui/Dropdown";

export default function SortDropdown() {
  const [value, setValue] = useState("featured");
  const options = [
    { value: "featured", label: "Featured" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "newest", label: "Newest" },
    { value: "best_selling", label: "Best Selling" }
  ];

  return <Dropdown label="Sort products" options={options} value={value} onChange={setValue} />;
}

