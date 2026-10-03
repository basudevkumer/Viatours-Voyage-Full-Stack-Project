"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiSearch, FiCalendar, FiX } from "react-icons/fi";
import { cn } from "@/lib/cn";

export default function StickyMobileBar({
  searchHref = "/tours",
  planHref = "#plan-my-trip",
  searchLabel = "Search tours",
  planLabel = "Plan my trip",
  className,
}) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return undefined;

    const handleScroll = () => {
      // Show when scrolled past hero (480px) and hide if near very bottom (near footer)
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const nearBottom = scrollHeight - (scrollY + clientHeight) < 220;

      if (scrollY > 480 && !nearBottom) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  if (!visible || dismissed) return null;

  return (
    <div
      role="region"
      aria-label="Quick mobile actions"
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-gray6 bg-white/95 px-4 py-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-2xl backdrop-blur-md transition-transform duration-300 lg:hidden",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2.5">
        <Link
          href={searchHref}
          data-analytics-id="mobile-sticky-search-cta"
          className="title4 flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-accent px-3 py-2.5 text-white shadow-sm transition-colors hover:bg-dark"
        >
          <FiSearch aria-hidden="true" size={16} />
          <span>{searchLabel}</span>
        </Link>

        <Link
          href={planHref}
          data-analytics-id="mobile-sticky-plan-cta"
          className="title4 flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-gray5 bg-bg-field px-3 py-2.5 text-dark transition-colors hover:bg-white"
        >
          <FiCalendar aria-hidden="true" size={16} className="text-accent" />
          <span>{planLabel}</span>
        </Link>

        <button
          type="button"
          aria-label="Dismiss quick mobile actions"
          onClick={() => setDismissed(true)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-text-secondary hover:bg-bg-field hover:text-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <FiX aria-hidden="true" size={18} />
        </button>
      </div>
    </div>
  );
}
