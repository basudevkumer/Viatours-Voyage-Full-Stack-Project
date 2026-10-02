import { useId } from "react";
import { FiChevronDown } from "react-icons/fi";
import { cn } from "@/lib/cn";
export default function AccordionItem({ title, open, onToggle, children, className }) {
  const id = useId();
  return <div className={cn("border-b border-gray6 last:border-b-0", className)}><h3><button type="button" id={`${id}-trigger`} aria-expanded={open} aria-controls={`${id}-panel`} onClick={onToggle} className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left"><span className="title3 text-dark">{title}</span><FiChevronDown aria-hidden="true" className={cn("shrink-0 text-accent transition-transform", open && "rotate-180")} /></button></h3><div id={`${id}-panel`} role="region" aria-labelledby={`${id}-trigger`} hidden={!open} className="body3 px-5 pb-5 text-text-secondary">{children}</div></div>;
}
