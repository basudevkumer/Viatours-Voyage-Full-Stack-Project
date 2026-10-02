"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import allImages from "@/components/helper/imageProvider";
import { navLinks } from "@/components/helper/projectsData";
import Container from "../shared/Container";
import Button from "@/components/ui/Button";
import MobileNav from "@/components/layout/MobileNav";
import UserMenu from "@/components/layout/UserMenu";

const Navbar = () => {
  const pathname = usePathname();
  const { navlogo } = allImages;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isActive = (path) => path !== "/" && pathname.startsWith(path);

  return (
    <nav
      aria-label="Primary navigation"
      className={`fixed left-0 top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-white/10 bg-dark/90 backdrop-blur-md"
          : "border-white/20 bg-gray-400/50 backdrop-blur-md"
      }`}
    >
      <Container>
        <div className="flex min-h-[76px] items-center justify-between gap-4 py-4 sm:gap-6">
          <Link
            href="/"
            aria-label="Viatours Voyage home"
            className="shrink-0 rounded-sm"
          >
            <Image
              src={navlogo}
              width={167}
              height={32}
              alt="Viatours Voyage"
              priority
              className="h-auto w-[112px] sm:w-[167px]"
            />
          </Link>

          <div className="hidden flex-1 items-center justify-center lg:flex">
            <ul className="flex items-center gap-x-5 xl:gap-x-7">
              {navLinks.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.path}
                    aria-current={isActive(item.path) ? "page" : undefined}
                    className={`title4 whitespace-nowrap rounded-sm text-white transition-colors hover:text-accent focus-visible:text-accent ${
                      isActive(item.path) ? "text-accent" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <UserMenu />
            <Button
              href="/contact"
              size="md"
              data-analytics-id="navbar-plan-your-trip"
              className="px-2 hover:!bg-white hover:!text-accent sm:px-5"
            >
              PLAN YOUR TRIP
            </Button>

            <MobileNav />
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
