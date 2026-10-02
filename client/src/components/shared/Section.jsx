import Container from "@/components/shared/Container";
import { cn } from "@/lib/cn";

const backgrounds = {
  white: "bg-white",
  grey: "bg-bg-grey",
  cream: "bg-bg-cream",
  dark: "bg-dark",
};
const spacing = {
  sm: "py-8 sm:py-12",
  md: "py-14 sm:py-20",
  lg: "py-16 sm:py-24",
};
export default function Section({
  bg,
  spacing: size = "md",
  id,
  className,
  containerClassName,
  children,
  ...props
}) {
  return (
    <section
      id={id}
      className={cn(spacing[size] || spacing.md, backgrounds[bg], className)}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
