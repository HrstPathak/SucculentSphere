"use client";
import { ReactNode } from "react";
import { CartProvider } from "../context/CartContext";
import ToastProvider from "./ToastProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
      <ToastProvider />
    </CartProvider>
  );
}
