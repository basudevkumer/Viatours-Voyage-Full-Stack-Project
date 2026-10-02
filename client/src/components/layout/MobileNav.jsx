"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/components/helper/projectsData";
import { ROUTES } from "@/lib/routes";

export default function MobileNav({ links = navLinks }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);
  const pathname = usePathname();
  useEffect(() => {
    if (!open) return undefined;
    panelRef.current?.querySelector("a")?.focus();
    const handleKey = (event) => { if (event.key === "Escape") { setOpen(false); triggerRef.current?.focus(); } };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);
  const active = (href) => href !== "#" && href !== ROUTES.home && pathname.startsWith(href);
  return <div className="lg:hidden">
    <button ref={triggerRef} type="button" aria-controls="mobile-navigation" aria-expanded={open} aria-label={open ? "Close navigation menu" : "Open navigation menu"} onClick={() => setOpen((value) => !value)} className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-[12px] border border-white/30 text-white transition-colors hover:border-white">
      <span className={`block h-0.5 w-5 bg-current transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} /><span className={`block h-0.5 w-4 bg-current transition-opacity ${open ? "opacity-0" : ""}`} /><span className={`block h-0.5 w-5 bg-current transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
    </button>
    <div ref={panelRef} id="mobile-navigation" hidden={!open} className="absolute left-0 top-full w-full border-t border-white/10 bg-dark/95 px-4 pb-5 pt-3 backdrop-blur-md">
      <ul className="mx-auto flex max-w-[1320px] flex-col">{links.map((item) => <li key={item.id}><Link href={item.path} aria-current={active(item.path) ? "page" : undefined} onClick={() => setOpen(false)} className={`title4 block min-h-11 border-b border-white/10 py-3 text-white transition-colors hover:text-accent ${active(item.path) ? "text-accent" : ""}`}>{item.label}</Link></li>)}</ul>
    </div>
  </div>;
}
