import { cn } from "@/lib/cn";

const SectionHeading = ({ eyebrow, title, text, action, align = "left", tone = "dark", className }) => (
  <div className={cn("mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between", align === "center" && "text-center", className)}>
    <div className={cn(align === "center" && "mx-auto", tone === "light" && "text-white")}>{eyebrow && <p className={cn("caption", tone === "light" ? "text-white/70" : "text-accent")}>{eyebrow}</p>}<h2 className={cn("heading mt-2", tone === "light" ? "text-white" : "text-dark")}>{title}</h2>{text && <p className={cn("body3 mt-3 max-w-[600px]", tone === "light" ? "text-white/75" : "text-text-secondary")}>{text}</p>}</div>
    {action}
  </div>
);
export default SectionHeading;
