"use client";

import { useEffect, useState } from "react";
import { FiList, FiChevronDown } from "react-icons/fi";
import { cn } from "@/lib/cn";

export default function TableOfContents({ headings = [], className }) {
  const [activeId, setActiveId] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!headings.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-90px 0% -65% 0%",
        threshold: 0,
      }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveId(id);
      setMobileOpen(false);
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <nav
      className={cn("rounded-2xl border border-gray6 bg-white p-5", className)}
      aria-label="Table of contents"
    >
      {/* Mobile Toggle Button */}
      <div className="flex items-center justify-between lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex w-full items-center justify-between title4 text-dark py-1 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-expanded={mobileOpen}
          aria-controls="mobile-toc-list"
        >
          <span className="flex items-center gap-2">
            <FiList className="text-accent" aria-hidden="true" />
            In this guide ({headings.length} sections)
          </span>
          <FiChevronDown
            className={cn("transition-transform duration-200", mobileOpen && "rotate-180")}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Desktop Heading */}
      <div className="hidden lg:flex items-center gap-2 border-b border-gray6 pb-3 mb-3">
        <FiList className="text-accent" aria-hidden="true" />
        <h3 className="title4 font-bold text-dark uppercase tracking-wider text-xs">
          TABLE OF CONTENTS
        </h3>
      </div>

      {/* Links List */}
      <ol
        id="mobile-toc-list"
        className={cn(
          "space-y-1 pt-2 lg:pt-0 lg:block",
          mobileOpen ? "block border-t border-gray6 mt-3 pt-3" : "hidden"
        )}
      >
        {headings.map((h, i) => {
          const isActive = activeId === h.id || (!activeId && i === 0);
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                onClick={(e) => handleLinkClick(e, h.id)}
                className={cn(
                  "block rounded-lg px-2.5 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                  h.level === 3 ? "pl-5 text-xs" : "",
                  isActive
                    ? "bg-accent/10 font-bold text-accent"
                    : "text-text-secondary hover:bg-gray7 hover:text-dark"
                )}
                data-analytics-id={`toc-link-${h.id}`}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
