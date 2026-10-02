"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight, FiMaximize2 } from "react-icons/fi";
import Modal from "@/components/ui/Modal";
import { cn } from "@/lib/cn";

export default function ImageGallery({ images = [], title = "Image gallery", className }) {
  const validImages = images.filter((image) => image?.src && image?.alt?.trim());
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const current = validImages[active];
  const move = useCallback((direction) => setActive((index) => (index + direction + validImages.length) % validImages.length), [validImages.length]);
  useEffect(() => {
    if (!lightboxOpen || validImages.length < 2) return undefined;
    const onKeyDown = (event) => { if (event.key === "ArrowRight") move(1); if (event.key === "ArrowLeft") move(-1); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen, validImages.length, move]);
  if (!current) return null;
  return <div className={cn("grid gap-3", className)}>
    <button type="button" onClick={() => setLightboxOpen(true)} aria-label={`View larger: ${current.alt}`} className="group relative aspect-[1.45] overflow-hidden rounded-2xl bg-bg-field text-left"><Image src={current.src} alt={current.alt} fill priority sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" /><span className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white text-dark"><FiMaximize2 aria-hidden="true" /></span></button>
    {validImages.length > 1 && <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">{validImages.map((image, index) => <button type="button" key={`${image.alt}-${index}`} onClick={() => setActive(index)} aria-label={`Show image ${index + 1}: ${image.alt}`} aria-pressed={active === index} className={cn("relative aspect-[1.3] overflow-hidden rounded-xl border-2", active === index ? "border-accent" : "border-transparent")}><Image src={image.src} alt={image.alt} fill sizes="150px" className="object-cover" /></button>)}</div>}
    <Modal open={lightboxOpen} onClose={() => setLightboxOpen(false)} title={title} overlayClassName="!z-[90]" className="max-w-5xl p-3 sm:p-5"><div className="relative aspect-[1.4] overflow-hidden rounded-xl bg-dark"><Image src={current.src} alt={current.alt} fill sizes="90vw" className="object-contain" /></div>{validImages.length > 1 && <div className="mt-3 flex justify-between"><button type="button" onClick={() => move(-1)} aria-label="Previous image" className="flex h-11 w-11 items-center justify-center rounded-full border border-gray5"><FiChevronLeft /></button><p className="body4 self-center text-text-secondary">Image {active + 1} of {validImages.length}</p><button type="button" onClick={() => move(1)} aria-label="Next image" className="flex h-11 w-11 items-center justify-center rounded-full border border-gray5"><FiChevronRight /></button></div>}</Modal>
  </div>;
}
