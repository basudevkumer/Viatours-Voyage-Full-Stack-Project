import Container from "@/components/shared/Container";
import Image from "next/image";
import { FiStar } from "react-icons/fi";
import SectionHeading from "@/components/shared/SectionHeading";
import { reviews } from "./data";

const TravelerReviews = () => <section className="py-14 sm:py-20"><Container><SectionHeading eyebrow="TRAVELER STORIES" title="Loved by travelers" text="Inspiration from the people who make every journey worth it." /><div className="grid gap-5 md:grid-cols-3">{reviews.map((review, index) => <article key={review.quote} className="rounded-2xl border border-gray6 bg-white p-6"><div className="flex items-center gap-3"><Image src={review.person.img} alt="Traveler avatar" width={48} height={48} className="h-12 w-12 rounded-full object-cover" /><div><h3 className="title3 text-dark">Traveler {index + 1}</h3><p className="body5 text-text-secondary">Review placeholder</p></div></div><div className="mt-5 flex gap-1 text-[#f5b544]">{[1, 2, 3, 4, 5].map((star) => <FiStar key={star} className="fill-current" />)}</div><p className="body3 mt-4 text-gray2">“{review.quote}”</p><p className="body5 mt-4 text-text-secondary">Replace with API review data</p></article>)}</div></Container></section>;
export default TravelerReviews;
