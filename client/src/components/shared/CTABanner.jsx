import Button from "@/components/ui/Button";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import { contactUrl } from "@/lib/routes";
import { cn } from "@/lib/cn";

export default function CTABanner({ eyebrow, title, text, primaryAction, secondaryAction, variant = "dark", layout = "centered", className }) {
  const light = variant === "gradient";
  return <section className={cn(light ? "px-3 py-14 sm:px-4 sm:py-20 lg:px-8 lg:py-28" : "bg-dark py-16 text-white sm:py-24", className)}><div className={cn(light && "overflow-hidden rounded-[24px] bg-primary")}><Container><div className={cn("flex flex-col gap-8", layout === "split" ? "items-start justify-between lg:flex-row lg:items-center" : "mx-auto max-w-[800px] items-center text-center", light && "py-12 sm:py-16 lg:py-20")}>
    <SectionHeading eyebrow={eyebrow} title={title} text={text} tone="light" align={layout === "centered" ? "center" : "left"} className={cn("mb-0 w-full", layout === "split" && "sm:!flex-col lg:!flex-row", layout === "centered" && "!block")} />
    <div className="flex flex-wrap gap-3">{primaryAction || <Button href={contactUrl({ type: "trip", source: "cta-banner" })} variant={light ? "white" : "primary"}>Plan your trip</Button>}{secondaryAction}</div>
  </div></Container></div></section>;
}

