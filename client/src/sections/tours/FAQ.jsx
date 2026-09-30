"use client";
import Container from "@/components/shared/Container";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import SectionHeading from "@/components/shared/SectionHeading";
import { faqs } from "./data";

const FAQ = () => { const [open, setOpen] = useState(0); return <section className="py-14 sm:py-20"><Container><div className="mx-auto max-w-[820px]"><SectionHeading eyebrow="NEED TO KNOW" title="Frequently asked questions" text="A few quick answers before you start planning." /><div className="divide-y divide-gray6 rounded-2xl border border-gray6 bg-white">{faqs.map(([question, answer], index) => <div key={question}><button type="button" onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index} className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"><span className="title3 text-dark">{question}</span><FiChevronDown className={"shrink-0 text-accent transition-transform " + (open === index ? "rotate-180" : "")} /></button>{open === index && <p className="body3 px-5 pb-5 text-text-secondary">{answer}</p>}</div>)}</div></div></Container></section>; };
export default FAQ;
