import Image from "next/image";
import Container from "@/components/shared/Container";
import { cn } from "@/lib/cn";

export default function PageHero({
  eyebrow,
  title,
  text,
  actions,
  media,
  children,
  className,
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-dark pt-32 text-white sm:pt-36 lg:pt-40",
        className,
      )}
    >
      <div aria-hidden="true" className="hero-gradient absolute inset-0" />
      <Container>
        <div
          className={cn(
            "relative grid items-center gap-10 pb-14 lg:grid-cols-[1fr_430px] lg:pb-20",
            !media && "lg:grid-cols-1",
          )}
        >
          <div className="max-w-[720px]">
            {eyebrow && <p className="caption text-white/60">{eyebrow}</p>}
            <h1 className="heading mt-4 max-w-[650px] !text-4xl sm:!text-5xl lg:!text-6xl">
              {title}
            </h1>
            {text && (
              <p className="body1 mt-5 max-w-[610px] text-white/75">{text}</p>
            )}
            {children}
            {actions && (
              <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
            )}
          </div>
          {media && (
            <div
              className={cn(
                "relative hidden aspect-square overflow-hidden rounded-[32px] border border-white/20 lg:block",
                media.aspect,
              )}
            >
              <Image
                src={media.src}
                alt={media.alt || ""}
                fill
                priority
                sizes="(max-width: 1024px) 0px, 430px"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-dark/75 to-transparent"
              />
              {media.caption && (
                <p className="title2 absolute bottom-6 left-6 max-w-[260px]">
                  {media.caption}
                </p>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
