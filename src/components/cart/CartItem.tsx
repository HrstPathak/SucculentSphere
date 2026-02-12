"use client";
import Image from "next/image";
import Link from "next/link";
import QuantitySelector from "../product/QuantitySelector";
import { useCallback } from "react";

type CartItemShape = {
  id: string;
  title: string;
  handle: string;
  price: string;
  image: string;
  quantity: number;
};

export default function CartItem({
  item,
  onChangeQty,
  onRemove
}: {
  item: CartItemShape;
  onChangeQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}) {
  const handleQty = useCallback((n: number) => onChangeQty(item.id, n), [item.id, onChangeQty]);

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm flex gap-4 items-start">
      <div className="w-24 h-24 relative flex-shrink-0 flex-shrink">
        <Link href={`/collections/succulents/${item.handle}`}>
          <Image src={item.image} alt={`${item.title} succulent`} fill style={{ objectFit: "cover" }} className="rounded" />
        </Link>
      </div>
      <div className="flex-1 min-w-0">
        <Link href={`/collections/succulents/${item.handle}`} className="text-sm font-semibold text-[var(--color-text)] block truncate">
          {item.title}
        </Link>
        <div className="text-sm text-gray-700 mt-2">${item.price}</div>
        <div className="mt-3 flex items-center gap-4">
          <QuantitySelector value={item.quantity} onChange={handleQty} />
          <button aria-label={`Remove ${item.title}`} onClick={() => onRemove(item.id)} className="text-sm text-red-600">
            Remove
          </button>
        </div>
      </div>
      <div className="text-sm font-medium ml-4 flex-shrink-0">${(Number(item.price) * item.quantity).toFixed(2)}</div>
    </div>
  );
}

