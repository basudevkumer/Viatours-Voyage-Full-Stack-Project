import Container from "@/components/shared/Container";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const ToursFinalCTA = () => <section className="bg-dark py-16 text-center text-white sm:py-24"><Container><p className="caption text-white/60">YOUR NEXT ADVENTURE STARTS HERE</p><h2 className="heading mx-auto mt-4 max-w-[700px] !text-3xl sm:!text-5xl">Find a journey that feels like yours.</h2><p className="body1 mx-auto mt-5 max-w-[580px] text-white/70">Choose your travel style, discover somewhere new and start planning a story worth remembering.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="#discover" className="title4 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-4 text-white hover:bg-white hover:text-accent">Explore tours <FiArrowRight /></Link><Link href="/contact" className="title4 inline-flex items-center rounded-xl border border-white/35 px-6 py-4 text-white hover:bg-white hover:text-dark">Contact us</Link></div></Container></section>;
export default ToursFinalCTA;
