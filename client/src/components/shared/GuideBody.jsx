import Image from "next/image";
import Button from "@/components/ui/Button";
import { FiCheckCircle, FiInfo, FiArrowRight } from "react-icons/fi";
import { cn } from "@/lib/cn";

export default function GuideBody({ blocks = [], destination, onCtaClick, className }) {
  if (!blocks || !blocks.length) return null;

  return (
    <div className={cn("prose-custom max-w-none space-y-6 text-dark", className)}>
      {blocks.map((block, idx) => {
        switch (block.type) {
          case "heading": {
            const Tag = block.level === 3 ? "h3" : "h2";
            const classes =
              block.level === 3
                ? "title2 text-dark mt-8 mb-3 scroll-mt-28"
                : "heading !text-2xl sm:!text-3xl text-dark mt-10 mb-4 scroll-mt-28 border-b border-gray6 pb-2";
            return (
              <Tag key={idx} id={block.id} className={classes}>
                {block.text}
              </Tag>
            );
          }

          case "paragraph":
            return (
              <p key={idx} className="body3 text-text-secondary leading-relaxed sm:text-lg">
                {block.text}
              </p>
            );

          case "list":
            return (
              <ul key={idx} className="my-4 space-y-2.5">
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-3 body3 text-dark">
                    <FiCheckCircle
                      className="mt-1 text-accent shrink-0"
                      size={18}
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );

          case "callout":
            return (
              <div
                key={idx}
                className="my-6 rounded-2xl border border-accent/25 bg-accent/5 p-5 sm:p-6"
                role="region"
                aria-label={block.title || "Key advice"}
              >
                <div className="flex items-start gap-3">
                  <FiInfo className="mt-0.5 text-accent shrink-0" size={20} aria-hidden="true" />
                  <div>
                    {block.title && (
                      <h4 className="title4 font-bold text-dark mb-1">{block.title}</h4>
                    )}
                    <p className="body4 text-text-secondary leading-relaxed">{block.text}</p>
                  </div>
                </div>
              </div>
            );

          case "quote":
            return (
              <blockquote
                key={idx}
                className="my-8 rounded-r-2xl border-l-4 border-accent bg-gray7/40 p-5 italic sm:p-6"
              >
                <p className="body3 sm:text-lg font-medium text-dark">&ldquo;{block.text}&rdquo;</p>
                {block.cite && (
                  <footer className="mt-2 caption not-italic font-semibold text-accent">
                    — {block.cite}
                  </footer>
                )}
              </blockquote>
            );

          case "image":
            return (
              <figure key={idx} className="my-8 overflow-hidden rounded-2xl border border-gray6">
                <div className="relative aspect-[16/9] w-full bg-gray5">
                  <Image
                    src={block.src}
                    alt={block.alt || "Guide illustration"}
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover"
                  />
                </div>
                {block.caption && (
                  <figcaption className="p-3 text-center caption text-text-secondary bg-gray7/30 border-t border-gray6">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case "cta":
            return (
              <div
                key={idx}
                className="my-10 rounded-2xl border border-gray6 bg-gradient-to-br from-dark to-dark/95 p-6 text-white sm:p-8 shadow-md"
              >
                <span className="caption mb-1 block uppercase tracking-wider text-accent font-semibold">
                  RECOMMENDED TRIP PLANNING
                </span>
                <h3 className="title2 text-white mb-2">{block.title}</h3>
                <p className="body4 text-white/80 mb-5 max-w-xl">{block.text}</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    href="#plan-this-trip"
                    variant="primary"
                    size="md"
                    onClick={onCtaClick}
                    rightIcon={<FiArrowRight aria-hidden="true" />}
                    data-analytics-id="in-article-plan-cta"
                  >
                    {block.actionLabel || "Plan this trip with our team"}
                  </Button>
                  {destination?.slug && (
                    <Button
                      href={`/destinations/${destination.slug}`}
                      variant="outline"
                      size="md"
                      className="border-white/30 text-white hover:bg-white/10"
                      data-analytics-id="in-article-destination-cta"
                    >
                      Explore {destination.name} guide
                    </Button>
                  )}
                </div>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
