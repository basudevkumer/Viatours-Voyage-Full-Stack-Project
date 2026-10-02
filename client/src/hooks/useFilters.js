"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useFilters(defaults, { syncUrl = true } = {}) {
  const searchParams = useSearchParams();
  const [values, setValues] = useState(() => Object.fromEntries(Object.entries(defaults).map(([key, value]) => [key, searchParams.has(key) ? searchParams.get(key) : value])));
  const defaultsRef = useRef(defaults);
  const router = useRouter(); const pathname = usePathname();
  useEffect(() => {
    if (!syncUrl) return;
    const params = new URLSearchParams(window.location.search);
    Object.entries(values).forEach(([key, value]) => {
      if (value == null || value === "" || value === defaultsRef.current[key] || (Array.isArray(value) && !value.length)) params.delete(key);
      else params.set(key, Array.isArray(value) ? value.join(",") : String(value));
    });
    const query = params.toString();
    const nextUrl = `${pathname}${query ? `?${query}` : ""}${window.location.hash}`;
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (nextUrl !== currentUrl) router.replace(nextUrl, { scroll: false });
  }, [values, syncUrl, pathname, router]);
  const setFilter = useCallback((key, value) => setValues((current) => ({ ...current, [key]: value })), []);
  const clearFilters = useCallback(() => setValues(defaultsRef.current), []);
  return { values, setValues, setFilter, clearFilters };
}
