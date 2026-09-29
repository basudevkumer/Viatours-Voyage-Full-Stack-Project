"use client";

import React, { useState, useEffect } from "react";
import Container from "../shared/Container";
import allImages from "@/components/helper/imageProvider";
import Image from "next/image";
import Link from "next/link";
import { navLinks, navLinksleft } from "@/components/helper/projectsData";

const Navbar = () => {
  const { navlogo } = allImages;
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${scrolled
          ? "bg-dark/80 backdrop-blur-md border-b border-white/10"
          : "bg-gray-400/50 backdrop-blur-md border-b border-white/20"
        }`}
    >
      <Container>
        {/* ─── Desktop & Mobile Top Bar ─── */}
        <div className="flex items-center justify-between py-[18px]">
          {/* Left: Logo + Desktop Nav Links */}
          <div className="flex items-center gap-x-10 xl:gap-x-[50px]">
            <Link href="/" className="shrink-0">
              <Image
                src={navlogo}
                width={167}
                height={32}
                alt="logo"
                loading="eager"
                priority
              />
            </Link>

            {/* Desktop nav links — hidden on mobile/tablet */}
            <ul className="hidden lg:flex items-center gap-x-7 xl:gap-x-[39px]">
              {navLinks.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.path}
                    className="title4 text-white transition duration-300 ease-in-out hover:text-accent whitespace-nowrap"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Desktop actions + Avatar + Hamburger */}
          <div className="flex items-center gap-x-4 xl:gap-x-6">
            {/* Desktop right links — hidden on mobile/tablet */}
            <ul className="hidden lg:flex items-center gap-x-5 xl:gap-x-6">
              {navLinksleft.map((item) =>
                item.label === "Log in" ? (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className="px-5 py-[10px] border border-white/60 rounded-[200px] title4 text-white transition duration-300 ease-in-out hover:border-white hover:text-accent whitespace-nowrap"
                    >
                      {item.label}
                    </Link>
                  </li>
                ) : (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className="title4 text-white transition duration-300 ease-in-out hover:text-accent whitespace-nowrap"
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>

            {/* Avatar — always visible */}
            <div className="h-[38px] w-[38px] lg:h-[42px] lg:w-[42px] border border-white/60 rounded-full shrink-0" />

            {/* Hamburger button — visible only on mobile/tablet */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
              className="lg:hidden flex flex-col justify-center items-center gap-[5px] w-9 h-9 shrink-0"
            >
              <span
                className={`block h-[2px] bg-white rounded-full transition-all duration-300 origin-center
                  ${menuOpen ? "w-5 rotate-45 translate-y-[7px]" : "w-5"}`}
              />
              <span
                className={`block h-[2px] bg-white rounded-full transition-all duration-300
                  ${menuOpen ? "w-0 opacity-0" : "w-4"}`}
              />
              <span
                className={`block h-[2px] bg-white rounded-full transition-all duration-300 origin-center
                  ${menuOpen ? "w-5 -rotate-45 -translate-y-[7px]" : "w-5"}`}
              />
            </button>
          </div>
        </div>

        {/* ─── Mobile Dropdown Menu ─── */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${menuOpen ? "max-h-[500px] opacity-100 pb-5" : "max-h-0 opacity-0"}`}
        >
          <div className="border-t border-white/10 pt-4 flex flex-col gap-y-1">
            {/* Mobile nav links */}
            {navLinks.map((item) => (
              <Link
                key={item.id}
                href={item.path}
                onClick={() => setMenuOpen(false)}
                className="title4 text-white hover:text-accent transition duration-200 py-2 px-1 border-b border-white/10 last:border-0"
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile action links */}
            <div className="flex flex-wrap items-center gap-3 mt-4 pt-2">
              {navLinksleft.map((item) =>
                item.label === "Log in" ? (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="px-5 py-[10px] border border-white/60 rounded-[200px] title4 text-white hover:text-accent hover:border-white transition duration-200"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="title4 text-white hover:text-accent transition duration-200"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;