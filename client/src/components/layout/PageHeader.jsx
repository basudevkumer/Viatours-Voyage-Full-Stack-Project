import Container from "@/components/shared/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { cn } from "@/lib/cn";

export default function PageHeader({ title, breadcrumbs = [], className }) {
  return <header className={cn("bg-bg-grey pb-10 pt-32 sm:pb-14 sm:pt-36", className)}><Container>{breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} className="mb-4" />}<h1 className="heading text-dark">{title}</h1></Container></header>;
}
