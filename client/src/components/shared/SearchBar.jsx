"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const defaultFields = [
  { name: "keyword", label: "What are you looking for?", placeholder: "What do you want to do?", type: "search" },
  { name: "destination", label: "Destination", placeholder: "Where?", type: "text" },
  { name: "date", label: "Date", placeholder: "When?", type: "text" },
];
export default function SearchBar({ fields = defaultFields, onSubmit, targetPath, submitLabel = "Search", className, buttonClassName }) {
  const router = useRouter(); const pathname = usePathname();
  const [values, setValues] = useState(() => Object.fromEntries(fields.map((field) => [field.name, ""])));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const submit = async (event) => {
    event.preventDefault(); setError(""); setLoading(true);
    try {
      if (onSubmit) await onSubmit(values);
      else {
        const params = new URLSearchParams();
        Object.entries(values).forEach(([key, value]) => { if (value.trim()) params.set(key, value.trim()); });
        router.push(`${targetPath || pathname}${params.size ? `?${params.toString()}` : ""}#discover`);
      }
    } catch { setError("Search could not be completed. Please try again."); }
    finally { setLoading(false); }
  };
  return <form onSubmit={submit} className={cn("grid max-w-[760px] gap-1 rounded-2xl bg-white p-2.5 sm:grid-cols-[1.5fr_1fr_1fr_auto] sm:rounded-full", className)}>
    {fields.map((field, index) => <label key={field.name} className={cn("flex min-h-11 items-center gap-2 rounded-xl px-3 py-2 sm:rounded-full", index > 0 && "border-t border-gray6 sm:border-l sm:border-t-0")}><span className="sr-only">{field.label}</span><input type={field.type || "text"} name={field.name} value={values[field.name] ?? ""} onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))} placeholder={field.placeholder} autoComplete={field.autoComplete} className="body4 w-full min-w-0 bg-transparent text-dark outline-none placeholder:text-text-secondary" /></label>)}
    <Button type="submit" loading={loading} size="md" className={cn("sm:rounded-full", buttonClassName)} data-analytics-id="search-submit">{submitLabel}</Button>
    {error && <p role="alert" className="body5 text-error sm:col-span-full">{error}</p>}
  </form>;
}
