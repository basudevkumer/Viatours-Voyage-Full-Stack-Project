"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { subscribeToNewsletter } from "@/services/newsletterService";
import { cn } from "@/lib/cn";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export default function NewsletterForm({ layout = "inline", className, buttonLabel = "Subscribe", submitLabel, inputClassName }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [loading, setLoading] = useState(false);
  const submit = async (event) => {
    event.preventDefault();
    if (!emailPattern.test(email.trim())) { setStatus({ type: "error", message: "Enter a valid email address." }); return; }
    setLoading(true); setStatus({ type: "idle", message: "" });
    try {
      const result = await subscribeToNewsletter(email.trim());
      setStatus({ type: result.success ? "success" : "error", message: result.message });
      if (result.success) setEmail("");
    } catch { setStatus({ type: "error", message: "We could not process your request. Please try again." }); }
    finally { setLoading(false); }
  };
  const stacked = layout === "stacked";
  return <form onSubmit={submit} noValidate className={cn(stacked ? "grid gap-3" : "flex w-full gap-2", className)}>
    <Input label="Email address" labelClassName="sr-only" type="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email address" autoComplete="email" required error={status.type === "error" ? status.message : undefined} wrapperClassName={!stacked ? "min-w-0 flex-1" : undefined} className={cn("!bg-bg-field", inputClassName)} />
    <Button type="submit" loading={loading} disabled={!email.trim()} fullWidth={stacked} className={cn(!stacked && "shrink-0 px-4 sm:px-5")} data-analytics-id="newsletter-submit">{submitLabel || buttonLabel}</Button>
    {status.message && status.type !== "error" && <p role="status" aria-live="polite" className={cn("body5 text-success", stacked ? "" : "self-center")}>{status.message}</p>}
  </form>;
}
