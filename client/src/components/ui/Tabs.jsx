"use client";
import { useRef, useState } from "react";
import { cn } from "@/lib/cn";
export default function Tabs({ tabs = [], defaultValue, className }) {
  const [active, setActive] = useState(defaultValue || tabs[0]?.id);
  const buttons = useRef([]);
  const move = (event, index) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    setActive(tabs[next].id); buttons.current[next]?.focus();
  };
  const selected = tabs.find((tab) => tab.id === active) || tabs[0];
  if (!selected) return null;
  return <div className={className}><div role="tablist" className="flex border-b border-gray6">{tabs.map((tab, index) => <button key={tab.id} ref={(node) => { buttons.current[index] = node; }} type="button" role="tab" id={`tab-${tab.id}`} aria-selected={active === tab.id} aria-controls={`panel-${tab.id}`} tabIndex={active === tab.id ? 0 : -1} onClick={() => setActive(tab.id)} onKeyDown={(event) => move(event, index)} className={cn("title4 min-h-11 border-b-2 px-4", active === tab.id ? "border-accent text-accent" : "border-transparent text-text-secondary")}>{tab.label}</button>)}</div><div role="tabpanel" id={`panel-${selected.id}`} aria-labelledby={`tab-${selected.id}`} tabIndex={0} className="pt-4">{selected.content}</div></div>;
}
