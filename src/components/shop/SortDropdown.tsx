"use client";
import { useEffect, useState } from "react";
import Dropdown from "../ui/Dropdown";

type Props = {
  value?: string;
  onChange?: (v: string) => void;
};

export default function SortDropdown({ value: externalValue, onChange: externalOnChange }: Props = {}) {
  const [value, setValue] = useState(externalValue ?? "featured");

  useEffect(() => {
    if (externalValue !== undefined && externalValue !== value) {
      setValue(externalValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalValue]);

  const options = [
    { value: "featured", label: "Featured" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "newest", label: "Newest" },
    { value: "best_selling", label: "Best Selling" }
  ];

  function handleChange(v: string) {
    setValue(v);
    externalOnChange?.(v);
  }

  return <Dropdown label="Sort products" options={options} value={value} onChange={handleChange} />;
}

