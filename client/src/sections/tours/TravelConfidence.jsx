import Container from "@/components/shared/Container";
import { FiCheck, FiHeart, FiShield, FiUsers } from "react-icons/fi";
import SectionHeading from "@/components/shared/SectionHeading";
import { benefits } from "./data";

const icons = [FiCheck, FiUsers, FiShield, FiHeart];
const TravelConfidence = () => <section className="bg-commonbg py-14 sm:py-20"><Container><SectionHeading eyebrow="WHY VIATOURS VOYAGE" title="Travel with confidence" text="The details matter. We make the important parts of planning feel simple." /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{benefits.map(([title, text], index) => { const Icon = icons[index]; return <div key={title} className="rounded-2xl bg-white p-6"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-commonbg text-xl text-accent"><Icon /></span><h3 className="title2 mt-5 text-dark">{title}</h3><p className="body3 mt-2 text-text-secondary">{text}</p></div>; })}</div></Container></section>;
export default TravelConfidence;
