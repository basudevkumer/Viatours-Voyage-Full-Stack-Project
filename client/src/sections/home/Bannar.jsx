"use client";

import Container from "@/components/shared/Container";
import allImages from "@/components/helper/imageProvider";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCalendar, FiMapPin, FiPause, FiPlay, FiUsers } from "react-icons/fi";
import { useCallback, useEffect, useRef, useState } from "react";
import { heroReassurance } from "./data";

/* ------------------------------------------------------------------ */
/*  Settings                                                          */
/* ------------------------------------------------------------------ */
const AUTOPLAY_MS = 6500;
const NAV_HEIGHT = 76;

const slides = [
  {
    id: "alpine",
    image: allImages.banner,
    eyebrow: "CURATED JOURNEYS & EXPERIENCES",
    title: "Find your next unforgettable journey.",
    description: "Handcrafted itineraries, verified native guides, and flexible booking across the world's most captivating destinations.",
    location: "Dolomites, Italy",
  },
  {
    id: "bali",
    image: allImages.trendingDestinations[4]?.image || allImages.banner,
    eyebrow: "MINDFUL CULTURAL DISCOVERY",
    title: "Slow down in the heart of Bali.",
    description: "Exchange rushed tour buses for hidden jungle temples, emerald terraces, and warm local hospitality.",
    location: "Bali, Indonesia",
  },
  {
    id: "santorini",
    image: allImages.trendingDestinations[15]?.image || allImages.banner,
    eyebrow: "TIMELESS MEDITERRANEAN ESCAPES",
    title: "Make room for genuine wonder.",
    description: "From cliffside caldera sunsets to boutique volcanic vineyards, travel with verified hosts who know the secret spots.",
    location: "Santorini, Greece",
  },
  {
    id: "maldives",
    image: allImages.trendingDestinations[14]?.image || allImages.banner,
    eyebrow: "COASTAL & ISLAND SANCTUARIES",
    title: "A world of clear water is waiting.",
    description: "Find your balance of reef adventures, marine exploration, and peaceful ocean living.",
    location: "Maldives",
  },
  {
    id: "cappadocia",
    image: allImages.trendingDestinations[0]?.image || allImages.banner,
    eyebrow: "AUTHENTIC TRAVEL EXPERIENCES",
    title: "Every remarkable trip begins here.",
    description: "Choose your destination, travel at your own pace, and let our specialists orchestrate the seamless details.",
    location: "Cappadocia, Turkey",
  },
];

const TOTAL = slides.length;
const HALF_VISIBLE = TOTAL >= 5 ? 2 : 1;

const WHEEL = {
  mobile: { vertical: false, size: 52, active: 70, radius: 170, gap: 8 },
  tablet: { vertical: false, size: 70, active: 94, radius: 260, gap: 10 },
  desktop: { vertical: true, size: 108, active: 150, radius: 320, gap: 14 },
  wide: { vertical: true, size: 130, active: 180, radius: 380, gap: 16 },
};

const getWheelConfig = (width) => {
  if (width >= 1536) return WHEEL.wide;
  if (width >= 1024) return WHEEL.desktop;
  if (width >= 640) return WHEEL.tablet;
  return WHEEL.mobile;
};

const getAngles = (cfg) => {
  const angles = [0];
  let total = 0;
  for (let step = 1; step <= HALF_VISIBLE; step += 1) {
    const distance = step === 1 ? cfg.active / 2 + cfg.size / 2 + cfg.gap : cfg.size + cfg.gap;
    total += 2 * Math.asin(Math.min(1, distance / (2 * cfg.radius)));
    angles[step] = total;
  }
  return angles;
};

const buildWheel = () => {
  if (typeof window === "undefined") return null;
  const width = window.innerWidth;
  const height = window.innerHeight;
  const base = getWheelConfig(width);

  let scale = 1;
  if (base.vertical) {
    const angles = getAngles(base);
    const needed = 2 * (base.radius * Math.sin(angles[HALF_VISIBLE]) + base.size / 2);
    const available = height - NAV_HEIGHT - 32;
    scale = Math.min(1, Math.max(0.6, available / needed));
  }

  const cfg = {
    vertical: base.vertical,
    size: Math.round(base.size * scale),
    active: Math.round(base.active * scale),
    radius: Math.round(base.radius * scale),
    gap: Math.round(base.gap * scale),
  };

  return {
    ...cfg,
    angles: getAngles(cfg),
    right: Math.round(cfg.active / 2 + Math.max(24, width * 0.03)),
  };
};

const getOffset = (index, active) => {
  let diff = (index - active + TOTAL) % TOTAL;
  if (diff > TOTAL / 2) diff -= TOTAL;
  return diff;
};

const bannerCss = `
@keyframes bn-up{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
@keyframes bn-fade{from{opacity:0}}
@media (prefers-reduced-motion:reduce){[data-banner] *{animation:none !important;transition-duration:.01ms !important}}
`;

const Bannar = () => {
  const [slide, setSlide] = useState({ index: 0, prev: 0 });
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [typing, setTyping] = useState(false);
  const [wheel, setWheel] = useState(null);

  const touchRef = useRef(null);

  const activeIndex = slide.index;
  const paused = userPaused || hovered || typing;
  const activeSlide = slides[activeIndex];

  const goToSlide = useCallback((index) => {
    setSlide((current) => ({ prev: current.index, index: ((index % TOTAL) + TOTAL) % TOTAL }));
  }, []);

  useEffect(() => {
    if (paused) return undefined;
    const timer = window.setTimeout(() => {
      setSlide((current) => ({ prev: current.index, index: (current.index + 1) % TOTAL }));
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [activeIndex, paused]);

  useEffect(() => {
    const update = () => setWheel(buildWheel());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const onTouchStart = (event) => {
    const touch = event.touches[0];
    touchRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event) => {
    const start = touchRef.current;
    touchRef.current = null;
    if (!start) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      goToSlide(activeIndex + (dx < 0 ? 1 : -1));
    }
  };

  const getItemStyle = (index) => {
    const offset = getOffset(index, activeIndex);
    const prevOffset = getOffset(index, slide.prev);
    const wrapped = Math.abs(offset - prevOffset) > TOTAL / 2;
    const visible = Math.abs(offset) <= HALF_VISIBLE;
    const isActive = offset === 0;
    const angle = Math.sign(offset) * wheel.angles[Math.min(Math.abs(offset), HALF_VISIBLE)];
    const x = wheel.vertical ? wheel.radius * (Math.cos(angle) - 1) : wheel.radius * Math.sin(angle);
    const y = wheel.vertical ? wheel.radius * Math.sin(angle) : wheel.radius * (1 - Math.cos(angle));
    const size = isActive ? wheel.active : wheel.size;

    return {
      visible,
      isActive,
      style: {
        width: size,
        height: size,
        transform: `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`,
        opacity: visible ? (isActive ? 1 : 0.95) : 0,
        pointerEvents: visible ? "auto" : "none",
        zIndex: isActive ? 20 : 10,
        transition: wrapped
          ? "none"
          : "transform 800ms cubic-bezier(.22,1,.36,1), width 800ms cubic-bezier(.22,1,.36,1), height 800ms cubic-bezier(.22,1,.36,1), opacity 600ms ease",
        animation: wrapped && visible ? "bn-fade 700ms ease both" : undefined,
      },
    };
  };

  return (
    <section
      data-banner
      data-home-hero
      aria-roledescription="carousel"
      aria-label="Featured travel destinations"
      className="relative isolate min-h-[100svh] overflow-hidden bg-dark text-white"
      onPointerEnter={(event) => event.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <style>{bannerCss}</style>

      {/* Crossfade background slides */}
      <div className="absolute inset-0 -z-20" aria-hidden="true">
        {slides.map((item, index) => (
          <Image
            key={item.id}
            src={item.image}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            quality={85}
            className={`object-cover object-[62%_center] transition-[opacity,transform] duration-[1400ms] ease-out lg:object-center ${
              index === activeIndex ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Cinematic Gradient Readability overlay */}
      <div
        data-hero-background
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,7,60,.55)_0%,rgba(5,7,60,.25)_28%,rgba(5,7,60,.68)_62%,rgba(5,7,60,.95)_100%)] lg:bg-[linear-gradient(90deg,rgba(5,7,60,.94)_0%,rgba(5,7,60,.75)_36%,rgba(5,7,60,.18)_68%,rgba(5,7,60,.35)_100%)]"
      />

      <Container>
        <div className="relative flex min-h-[calc(100svh-76px)] flex-col justify-end pb-8 pt-28 sm:pb-12 sm:pt-32 lg:justify-center lg:pb-20 lg:pt-28">
          <div data-hero-copy className="relative z-10 w-full max-w-[650px]">
            <p key={`${activeSlide.id}-eyebrow`} className="caption text-white/80 animate-[bn-up_.6s_ease_both]">
              {activeSlide.eyebrow}
            </p>

            <h1
              key={`${activeSlide.id}-title`}
              className="heading mt-3 max-w-[620px] !text-[34px] !leading-[1.12] text-white animate-[bn-up_.6s_.06s_ease_both] sm:mt-4 sm:!text-5xl lg:!text-6xl"
            >
              {activeSlide.title}
            </h1>

            <p
              key={`${activeSlide.id}-description`}
              className="body1 mt-3.5 max-w-[540px] text-white/90 animate-[bn-up_.6s_.12s_ease_both] sm:mt-4"
            >
              {activeSlide.description}
            </p>

            {/* Quiet secondary link beside headline */}
            <div className="mt-4 flex items-center gap-4">
              <Link
                href="/destinations"
                data-analytics-id="hero-explore-destinations"
                className="title4 inline-flex items-center gap-1.5 text-white/90 underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-white"
              >
                Or browse all 50+ destinations <FiArrowRight aria-hidden="true" className="text-accent" />
              </Link>
            </div>

            {/* ONE PRIMARY ACTION: The SearchBar */}
            <form
              action="/tours"
              method="get"
              onFocus={() => setTyping(true)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setTyping(false);
              }}
              className="mt-6 grid w-full max-w-[800px] gap-1 rounded-2xl bg-white p-2.5 shadow-2xl sm:mt-8 sm:grid-cols-[1.4fr_1fr_1fr_auto] sm:gap-2 sm:rounded-full sm:p-2"
            >
              <label className="flex items-center gap-2.5 rounded-xl px-3 py-2 sm:rounded-full" htmlFor="hero-search-dest">
                <FiMapPin aria-hidden="true" className="shrink-0 text-accent text-lg" />
                <span className="sr-only">Where do you want to go?</span>
                <input
                  id="hero-search-dest"
                  name="destination"
                  placeholder="Where to? (e.g. Bali, Paris)"
                  className="body4 w-full min-w-0 bg-transparent text-dark placeholder:text-text-secondary focus:outline-none"
                />
              </label>

              <label className="flex items-center gap-2.5 border-t border-gray6 px-3 py-2 sm:border-l sm:border-t-0" htmlFor="hero-search-date">
                <FiCalendar aria-hidden="true" className="shrink-0 text-accent text-lg" />
                <span className="sr-only">When do you want to travel?</span>
                <input
                  id="hero-search-date"
                  name="date"
                  type="text"
                  placeholder="When? (Month/Season)"
                  className="body4 w-full min-w-0 bg-transparent text-dark placeholder:text-text-secondary focus:outline-none"
                />
              </label>

              <label className="flex items-center gap-2.5 border-t border-gray6 px-3 py-2 sm:border-l sm:border-t-0" htmlFor="hero-search-travelers">
                <FiUsers aria-hidden="true" className="shrink-0 text-accent text-lg" />
                <span className="sr-only">How many travelers?</span>
                <input
                  id="hero-search-travelers"
                  name="travelers"
                  type="text"
                  placeholder="Travelers"
                  className="body4 w-full min-w-0 bg-transparent text-dark placeholder:text-text-secondary focus:outline-none"
                />
              </label>

              <button
                type="submit"
                data-analytics-id="hero-search-submit"
                className="title4 mt-1 inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3 text-white transition-colors hover:bg-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:mt-0 sm:rounded-full"
              >
                Search tours
              </button>
            </form>

            {/* 3 Short Factual Reassurance Items under Search */}
            <ul className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-white/80" aria-label="Booking reassurances">
              {heroReassurance.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id} className="body5 flex items-center gap-1.5 font-medium">
                    <Icon aria-hidden="true" className="text-accent shrink-0" />
                    <span>{item.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Controls: Play/Pause, slide dots, current location */}
          <div className="relative z-10 mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 lg:absolute lg:bottom-8 lg:left-0 lg:mt-0">
            <button
              type="button"
              aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
              onClick={() => setUserPaused((value) => !value)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white hover:text-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              {userPaused ? <FiPlay aria-hidden="true" /> : <FiPause aria-hidden="true" />}
            </button>

            <div className="flex items-center" role="group" aria-label="Slide navigation">
              {slides.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Go to slide ${index + 1}: ${item.location}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  onClick={() => goToSlide(index)}
                  className="group px-[3px] py-3"
                >
                  <span
                    className={`block h-1 rounded-full transition-all duration-500 ${
                      index === activeIndex ? "w-8 bg-white" : "w-2 bg-white/45 group-hover:bg-white/80"
                    }`}
                  />
                </button>
              ))}
            </div>

            <p className="body5 flex items-center gap-1.5 whitespace-nowrap text-white/90" aria-live="off">
              <FiMapPin aria-hidden="true" className="text-accent" />
              {activeSlide.location}
            </p>
          </div>
        </div>
      </Container>

      {/* Arc thumbnail wheel */}
      <div
        className="relative z-10 h-[150px] sm:h-[190px] lg:pointer-events-none lg:absolute lg:inset-0 lg:h-auto"
        role="group"
        aria-label="Choose a destination"
      >
        <div
          className="absolute left-1/2 top-[48px] h-0 w-0 sm:top-[62px] lg:left-auto lg:top-[calc(50%+38px)]"
          style={wheel?.vertical ? { right: wheel.right } : undefined}
        >
          {wheel &&
            slides.map((item, index) => {
              const thumb = getItemStyle(index);
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Show ${item.location}`}
                  aria-current={thumb.isActive ? "true" : undefined}
                  tabIndex={thumb.visible ? 0 : -1}
                  onClick={() => goToSlide(index)}
                  style={thumb.style}
                  className={`absolute left-0 top-0 aspect-square overflow-hidden rounded-full bg-white/10 shadow-2xl will-change-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${
                    thumb.isActive ? "border-[5px] border-white/50 sm:border-[6px]" : "border-2 border-white/60 hover:border-white"
                  }`}
                >
                  <Image src={item.image} alt="" fill sizes="210px" className="object-cover" />
                </button>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Bannar;