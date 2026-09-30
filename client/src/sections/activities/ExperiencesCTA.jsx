import Container from "@/components/shared/Container";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const ExperiencesCTA = () => <section className="bg-dark py-16 text-center text-white sm:py-24"><Container><p className="caption text-white/60">TURN YOUR DESTINATION INTO AN EXPERIENCE</p><h2 className="heading mx-auto mt-4 max-w-[700px] !text-3xl sm:!text-5xl">Find something memorable to do.</h2><p className="body1 mx-auto mt-5 max-w-[600px] text-white/70">From local food and culture to adventure, nature and everything in between.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="#discover" className="title4 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-4 text-white hover:bg-white hover:text-accent">Explore experiences <FiArrowRight /></Link><Link href="/tours" className="title4 inline-flex items-center rounded-xl border border-white/35 px-6 py-4 text-white hover:bg-white hover:text-dark">Browse tours</Link></div></Container></section>;
export default ExperiencesCTA;
