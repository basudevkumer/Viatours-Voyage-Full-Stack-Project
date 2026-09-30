"use client";

import Container from "@/components/shared/Container";
import allImages from "@/components/helper/imageProvider";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCalendar, FiMapPin, FiPause, FiPlay, FiUsers } from "react-icons/fi";
import { useCallback, useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Settings                                                          */
/* ------------------------------------------------------------------ */
const AUTOPLAY_MS = 6000; // auto slide time (loop always on)
const NAV_HEIGHT = 76; // fixed navbar height (px). Tailwind class niche `lg:top-[calc(50%+38px)]` = NAV_HEIGHT / 2

// 5 ta slide dile image er moton 5 ta circle arc e dekhabe.
// 5th slide er image / text / location nijer moton change kore nio.
const slides = [
  { id: "alpine", image: allImages.banner, eyebrow: "Go somewhere that stays with you", title: "Find your next unforgettable journey.", description: "Discover considered trips, local experiences and the confidence to plan your way.", location: "Dolomites, Italy" },
  { id: "bali", image: allImages.trendingDestinations[4].image, eyebrow: "Travel deeper, feel more", title: "Slow down in beautiful Bali.", description: "Trade busy itineraries for hidden temples, warm welcomes and days that feel entirely yours.", location: "Bali, Indonesia" },
  { id: "santorini", image: allImages.trendingDestinations[15].image, eyebrow: "Your next story starts here", title: "Make room for a little wonder.", description: "From golden sunsets to local tables, find experiences that stay with you long after you return.", location: "Santorini, Greece" },
  { id: "maldives", image: allImages.trendingDestinations[14].image, eyebrow: "Escape the expected", title: "A world of blue is waiting.", description: "Find your perfect balance of adventure and stillness beside the clearest water on earth.", location: "Maldives" },
  { id: "featured", image: allImages.trendingDestinations[0].image, eyebrow: "Made for curious travelers", title: "Every great trip begins with one step.", description: "Pick a place, pick your pace and let us handle the details that make it effortless.", location: "Featured destination" },
];

const TOTAL = slides.length;
const HALF_VISIBLE = TOTAL >= 5 ? 2 : 1; // koyta circle center er dui pashe dekhabe

/*
  Wheel (arc) config
  - vertical: true  => desktop, circles dan pashe upor-niche arc e
  - vertical: false => mobile/tablet, circles niche ek line e arch e
  size   = normal circle size (px)
  active = active circle size (px)
  radius = arc er radius (px)
  gap    = duita circle er majher faka jayga (px) -> circle kokhono overlap korbe na
  Circle er position ekhon size + gap theke auto calculate hoy, tai size bodlale o overlap hoy na.
*/
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

// Center theke koto angle e prottek circle boshbe (circle er majhe exact gap rekhe)
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

// Screen size + height onujayi final wheel config (height kom hole circle gulo auto choto hoy)
const buildWheel = () => {
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
    // desktop e active circle jeno screen er dhar e lege na thake
    right: Math.round(cfg.active / 2 + Math.max(24, width * 0.03)),
  };
};

// active slide theke i-th slide er signed distance (-2 ... 0 ... +2)
const getOffset = (index, active) => {
  let diff = (index - active + TOTAL) % TOTAL;
  if (diff > TOTAL / 2) diff -= TOTAL;
  return diff;
};

const bannerCss = `
@keyframes bn-up{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
@keyframes bn-fade{from{opacity:0}}
@media (prefers-reduced-motion:reduce){[data-banner] *{animation:none !important;transition-duration:.01ms !important}}
`;

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
const Bannar = () => {
  // prev rakhi jate bujhte pari kon circle arc er ek matha theke onno matha e jump korche
  const [slide, setSlide] = useState({ index: 0, prev: 0 });
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [typing, setTyping] = useState(false);
  const [wheel, setWheel] = useState(null);

  const touchRef = useRef(null);

  const activeIndex = slide.index;
  const paused = userPaused || hovered || typing;
  const activeSlide = slides[activeIndex];

  const goToSlide = useCallback(
    (index) => setSlide((current) => ({ prev: current.index, index: ((index % TOTAL) + TOTAL) % TOTAL })),
    [],
  );

  // Autoplay + loop (page load hoyei start hoy, last er por abar first e ghure)
  useEffect(() => {
    if (paused) return undefined;
    const timer = window.setTimeout(
      () => setSlide((current) => ({ prev: current.index, index: (current.index + 1) % TOTAL })),
      AUTOPLAY_MS,
    );
    return () => window.clearTimeout(timer);
  }, [activeIndex, paused]);

  // screen size onujayi wheel config
  useEffect(() => {
    const update = () => setWheel(buildWheel());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Mobile swipe
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
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) goToSlide(activeIndex + (dx < 0 ? 1 : -1));
  };

  const getItemStyle = (index) => {
    const offset = getOffset(index, activeIndex);
    const prevOffset = getOffset(index, slide.prev);
    const wrapped = Math.abs(offset - prevOffset) > TOTAL / 2; // arc er ek matha theke onno matha e jump
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
        // wrap hole arc er moddhe diye ure na giye, sarasori notun jaygay fade-in hobe
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
      aria-roledescription="carousel"
      aria-label="Featured travel destinations"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#18352f] text-white"
      onPointerEnter={(event) => event.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <style>{bannerCss}</style>

      {/* Full background slides (crossfade) */}
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
            className={`object-cover object-[62%_center] transition-[opacity,transform] duration-[1400ms] ease-out lg:object-center ${index === activeIndex ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"}`}
          />
        ))}
      </div>

      {/* Readability overlay: mobile e niche dark, desktop e left dark */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(7,30,27,.55)_0%,rgba(7,30,27,.2)_28%,rgba(7,30,27,.62)_62%,rgba(7,30,27,.94)_100%)] lg:bg-[linear-gradient(90deg,rgba(7,30,27,.92)_0%,rgba(7,30,27,.68)_34%,rgba(7,30,27,.12)_66%,rgba(7,30,27,.28)_100%)]" />

      <Container>
        <div className="relative flex min-h-[calc(100svh-76px)] flex-col justify-end pb-6 pt-28 sm:pb-10 sm:pt-32 lg:justify-center lg:pb-20 lg:pt-28">
          <div className="relative z-10 w-full max-w-[620px]">
            <p key={`${activeSlide.id}-eyebrow`} className="caption text-white/80 animate-[bn-up_.7s_ease_both]">{activeSlide.eyebrow}</p>
            <h1 key={`${activeSlide.id}-title`} className="heading mt-3 max-w-[620px] !text-[32px] !leading-[1.15] text-white animate-[bn-up_.7s_.08s_ease_both] sm:mt-4 sm:!text-5xl lg:!text-6xl">{activeSlide.title}</h1>
            <p key={`${activeSlide.id}-description`} className="body1 mt-4 max-w-[530px] text-white/85 animate-[bn-up_.7s_.16s_ease_both] sm:mt-5">{activeSlide.description}</p>

            <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
              <Link href="/tours" className="title4 inline-flex items-center gap-2 rounded-[12px] bg-accent px-5 py-3.5 text-white transition-colors hover:bg-white hover:text-accent sm:py-4">Explore tours <FiArrowRight aria-hidden="true" /></Link>
              <Link href="/contact" className="title4 inline-flex items-center rounded-[12px] border border-white/60 px-5 py-3.5 text-white transition-colors hover:border-white hover:bg-white hover:text-dark sm:py-4">Plan your trip</Link>
            </div>

            <form
              action="/tours"
              method="get"
              onFocus={() => setTyping(true)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setTyping(false);
              }}
              className="mt-7 grid w-full max-w-[820px] gap-1 rounded-2xl bg-white p-2.5 shadow-xl sm:mt-10 sm:grid-cols-[1.4fr_1fr_1fr_auto] sm:gap-2 sm:rounded-full sm:p-2"
            >
              <label className="flex items-center gap-3 rounded-xl px-3 py-2 sm:rounded-full" htmlFor="hero-destination">
                <FiMapPin aria-hidden="true" className="shrink-0 text-accent" />
                <span className="sr-only">Destination</span>
                <input id="hero-destination" name="destination" placeholder="Where do you want to go?" className="body4 w-full min-w-0 bg-transparent text-dark placeholder:text-text-secondary focus:outline-none" />
              </label>
              <label className="flex items-center gap-3 border-t border-gray6 px-3 py-2 sm:border-l sm:border-t-0">
                <FiCalendar aria-hidden="true" className="shrink-0 text-accent" />
                <span className="sr-only">Travel dates</span>
                <input name="date" type="text" placeholder="When" className="body4 w-full min-w-0 bg-transparent text-dark placeholder:text-text-secondary focus:outline-none" />
              </label>
              <label className="flex items-center gap-3 border-t border-gray6 px-3 py-2 sm:border-l sm:border-t-0">
                <FiUsers aria-hidden="true" className="shrink-0 text-accent" />
                <span className="sr-only">Travelers</span>
                <input name="travelers" type="text" placeholder="Travelers" className="body4 w-full min-w-0 bg-transparent text-dark placeholder:text-text-secondary focus:outline-none" />
              </label>
              <button type="submit" className="title4 mt-1 rounded-xl bg-dark px-5 py-3 text-white transition-colors hover:bg-accent sm:mt-0 sm:rounded-full">Search</button>
            </form>
          </div>

          {/* Controls: play/pause, slide lines, location */}
          <div className="relative z-10 mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 lg:absolute lg:bottom-8 lg:left-0 lg:mt-0">
            <button
              type="button"
              aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
              onClick={() => setUserPaused((value) => !value)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white hover:text-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {userPaused ? <FiPlay aria-hidden="true" /> : <FiPause aria-hidden="true" />}
            </button>
            <div className="flex items-center" role="group" aria-label="Slide navigation">
              {slides.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  onClick={() => goToSlide(index)}
                  className="group px-[3px] py-3"
                >
                  <span className={`block h-1 rounded-full transition-all duration-500 ${index === activeIndex ? "w-8 bg-white" : "w-2 bg-white/45 group-hover:bg-white/80"}`} />
                </button>
              ))}
            </div>
            <p className="body5 flex items-center gap-1.5 whitespace-nowrap text-white/90" aria-live="off">
              <FiMapPin aria-hidden="true" />
              {activeSlide.location}
            </p>
          </div>
        </div>
      </Container>

      {/* Arc thumbnail wheel (desktop: right side vertical arc, mobile/tablet: bottom arch) */}
      <div className="relative z-10 h-[150px] sm:h-[190px] lg:pointer-events-none lg:absolute lg:inset-0 lg:h-auto" role="group" aria-label="Choose a destination">
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
                  className={`absolute left-0 top-0 aspect-square overflow-hidden rounded-full bg-white/10 shadow-2xl will-change-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                    thumb.isActive ? "border-[5px] border-white/40 sm:border-[6px]" : "border-2 border-white/60 hover:border-white"
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