"use client";
import { useState } from "react";
import AccordionItem from "@/components/ui/AccordionItem";
import { cn } from "@/lib/cn";
export default function Accordion({ items = [], multiple = false, defaultOpen = 0, className }) {
  const [openItems, setOpenItems] = useState(multiple ? [defaultOpen].filter((item) => item >= 0) : defaultOpen);
  const toggle = (index) => setOpenItems((current) => {
    if (!multiple) return current === index ? -1 : index;
    return current.includes(index) ? current.filter((item) => item !== index) : [...current, index];
  });
  return <div className={cn("rounded-2xl border border-gray6 bg-white", className)}>{items.map(([question, answer], index) => <AccordionItem key={question} title={question} open={multiple ? openItems.includes(index) : openItems === index} onToggle={() => toggle(index)}>{answer}</AccordionItem>)}</div>;
}
