"use client";

import { createContext, useCallback, useMemo, useSyncExternalStore } from "react";

export const WishlistContext = createContext(null);
const STORAGE_KEY = "viatours-wishlist";
const EMPTY_ITEMS = [];
let cachedItems = [];
let loaded = false;
const subscribers = new Set();

function readItems() {
  if (!loaded && typeof window !== "undefined") {
    loaded = true;
    try { const value = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]"); cachedItems = Array.isArray(value) ? value : []; } catch { cachedItems = []; }
  }
  return cachedItems;
}
function subscribe(callback) {
  subscribers.add(callback);
  const onStorage = (event) => { if (event.key !== STORAGE_KEY) return; loaded = false; readItems(); subscribers.forEach((notify) => notify()); };
  window.addEventListener("storage", onStorage);
  readItems();
  callback();
  return () => { subscribers.delete(callback); window.removeEventListener("storage", onStorage); };
}
function setItems(update) {
  const nextItems = typeof update === "function" ? update(readItems()) : update;
  cachedItems = nextItems;
  loaded = true;
  try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cachedItems)); } catch { /* Storage may be disabled. */ }
  subscribers.forEach((notify) => notify());
}
const getServerSnapshot = () => EMPTY_ITEMS;

export function WishlistProvider({ children }) {
  const items = useSyncExternalStore(subscribe, readItems, getServerSnapshot);
  const isSaved = useCallback((id, type) => items.some((item) => item.id === id && item.type === type), [items]);
  const toggleItem = useCallback((id, type, label = "Saved item") => setItems((current) => current.some((item) => item.id === id && item.type === type) ? current.filter((item) => item.id !== id || item.type !== type) : [...current, { id, type, label }]), []);
  const value = useMemo(() => ({ items, hydrated: typeof window !== "undefined" && loaded, isSaved, toggleItem }), [items, isSaved, toggleItem]);
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}
