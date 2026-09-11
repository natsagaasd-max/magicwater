"use client";
import { useEffect, useState } from "react";
import { initialProducts, type Product, type Order } from "./catalog";
const PRODUCTS = "magicwater.products.v1",
  ORDERS = "magicwater.orders.v1";
function read<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}
export function useDemoStore() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const sync = () => {
      setProducts(read(PRODUCTS, initialProducts));
      setOrders(read(ORDERS, []));
      setReady(true);
    };
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("magicwater-update", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("magicwater-update", sync);
    };
  }, []);
  function saveProducts(value: Product[]) {
    localStorage.setItem(PRODUCTS, JSON.stringify(value));
    setProducts(value);
    window.dispatchEvent(new Event("magicwater-update"));
  }
  function saveOrders(value: Order[]) {
    localStorage.setItem(ORDERS, JSON.stringify(value));
    setOrders(value);
    window.dispatchEvent(new Event("magicwater-update"));
  }
  function addOrder(value: Order) {
    saveOrders([value, ...read<Order[]>(ORDERS, [])]);
  }
  return { products, orders, ready, saveProducts, saveOrders, addOrder };
}
