"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiArrowRight, FiClock, FiHeart, FiMapPin, FiStar } from "react-icons/fi";

const ExperienceCard = ({ experience }) => {
  const [saved, setSaved] = useState(false);

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray6 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[1.35] overflow-hidden">
        <Image src={experience.image} alt={`${experience.title} in ${experience.location}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <button type="button" onClick={() => setSaved((value) => !value)} aria-label={`${saved ? "Remove" : "Save"} ${experience.title}`} aria-pressed={saved} className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 ${saved ? "text-accent" : "text-dark hover:text-accent"}`}>
          <FiHeart className={saved ? "fill-current" : ""} />
        </button>
      </div>
      <div className="p-5">
        <p className="body5 font-medium uppercase tracking-[1px] text-accent">{experience.category}</p>
        <h3 className="title2 mt-2 line-clamp-2 min-h-[48px] text-dark">{experience.title}</h3>
        <p className="body4 mt-2 flex items-center gap-1.5 text-text-secondary"><FiMapPin className="text-accent" /> {experience.location}</p>
        <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 border-t border-gray6 pt-4">
          <span className="body5 flex items-center gap-1 text-text-secondary"><FiClock /> {experience.duration}</span>
          <span className="body5 text-text-secondary">{experience.group}</span>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="flex items-center gap-1 text-sm font-semibold text-dark"><FiStar className="fill-star-rating text-star-rating" /> {experience.rating}</span>
          <span className="body5 text-text-secondary">({experience.reviews} reviews)</span>
        </div>
        <div className="mt-4 flex items-end justify-between gap-3">
          <div><span className="body5 block text-text-secondary">From</span><span className="title1 text-dark">${experience.price}</span><span className="body5 text-text-secondary"> / person</span></div>
          <Link href={`/activities/${experience.id}`} className="title4 inline-flex items-center gap-1 rounded-xl bg-dark px-4 py-3 text-white hover:bg-accent">View experience <FiArrowRight /></Link>
        </div>
      </div>
    </article>
  );
};

export default ExperienceCard;
