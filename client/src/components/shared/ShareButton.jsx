"use client";

import { FiShare2 } from "react-icons/fi";
import IconButton from "@/components/ui/IconButton";
import { useToast } from "@/context/ToastContext";

export default function ShareButton({ title, text, className }) {
  const toast = useToast();
  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title, text, url });
      else if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(url); toast.success("Link copied."); }
      else throw new Error("Copy is unavailable in this browser.");
    } catch (error) { if (error.name !== "AbortError") toast.error(error.message || "Could not share this page."); }
  };
  return <IconButton icon={<FiShare2 aria-hidden="true" />} label="Share this experience" onClick={share} className={className} />;
}
