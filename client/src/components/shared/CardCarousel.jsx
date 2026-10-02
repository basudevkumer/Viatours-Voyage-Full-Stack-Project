"use client";

import { Children } from "react";
import { A11y, Autoplay, EffectCards, FreeMode, Keyboard, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { cn } from "@/lib/cn";

export default function CardCarousel({ children, className, slidesPerView = 1.2, spaceBetween = 16, breakpoints, navigation = false, pagination = false, freeMode = false, autoplay = false, effect, ariaLabel = "Carousel", ...props }) {
  const modules = [A11y, Keyboard, ...(navigation ? [Navigation] : []), ...(pagination ? [Pagination] : []), ...(freeMode ? [FreeMode] : []), ...(autoplay ? [Autoplay] : []), ...(effect === "cards" ? [EffectCards] : [])];
  return <Swiper modules={modules} slidesPerView={effect === "cards" ? 1 : slidesPerView} spaceBetween={spaceBetween} breakpoints={breakpoints} navigation={navigation} pagination={pagination ? { clickable: true } : false} freeMode={freeMode} effect={effect} autoplay={autoplay ? { delay: 3000, disableOnInteraction: false } : false} keyboard={{ enabled: true }} a11y={{ containerMessage: ariaLabel, prevSlideMessage: "Previous slide", nextSlideMessage: "Next slide" }} className={cn("card-carousel", className)} {...props}>{Children.toArray(children).map((child, index) => <SwiperSlide key={child.key ?? index}>{child}</SwiperSlide>)}</Swiper>;
}
