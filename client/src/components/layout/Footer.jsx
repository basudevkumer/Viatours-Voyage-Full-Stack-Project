import React from "react";
import Container from "../shared/Container";
import { footerData } from "@/components/helper/projectsData";
import Link from "next/link";
import allImages from "@/components/helper/imageProvider";
import Image from "next/image";

const Footer = () => {
  const { paymentArry } = allImages;
  return (
    <footer>
      {/* ─── Main Footer Body ─── */}
      <div className="bg-commonbg rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] mx-3 sm:mx-4 lg:mx-[30px]">
        <Container>
          {/* ─── Top CTA Bar ─── */}
          <div className="pt-10 sm:pt-14 lg:pt-[95px] pb-6 sm:pb-8 lg:pb-[64px] flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 border-b border-[#eb652b42]">
            <p className="title2 sm:title1 !font-medium text-dark">
              Speak to our expert at{" "}
              <span className="text-accent block sm:inline">1-800-453-6744</span>
            </p>
            <button className="self-start sm:self-auto title4 sm:title1 !font-medium text-dark border border-accent/30 rounded-full px-5 py-2 hover:bg-accent hover:text-white transition duration-300">
              Follow Us
            </button>
          </div>

          {/* ─── Grid Section ─── */}
          <div className="py-8 sm:py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-x-6 lg:gap-x-[100px] gap-y-8 sm:gap-y-10 lg:gap-y-[50px]">

            {/* Contact */}
            <div className="sm:col-span-1 lg:col-span-2">
              <p className="title2 sm:title1 !font-medium mb-4 sm:mb-[30px] text-dark">
                Contact
              </p>
              <p className="body4 text-dark max-w-[260px]">
                328 Queensberry Street, North Melbourne VIC3051, Australia.
              </p>
              <p className="mt-4 sm:mt-[18px] title4 text-dark">
                hi@viatours.com
              </p>
            </div>

            {/* Company */}
            <div className="sm:col-span-1 lg:col-span-1">
              <p className="title2 sm:title1 !font-medium mb-4 sm:mb-[30px] text-dark">
                Company
              </p>
              <ul className="space-y-3 sm:space-y-[18px]">
                {footerData[0].links.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.path}
                      className="transition duration-300 ease-in-out hover:text-accent title4 text-dark"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="sm:col-span-1 lg:col-span-1">
              <p className="title2 sm:title1 !font-medium mb-4 sm:mb-[30px] text-dark">
                Support
              </p>
              <ul className="space-y-3 sm:space-y-[18px]">
                {footerData[1].links.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.path}
                      className="transition duration-300 ease-in-out hover:text-accent title4 text-dark"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter + Apps */}
            <div className="sm:col-span-2 lg:col-span-2">
              <p className="title2 sm:title1 !font-medium mb-4 sm:mb-[30px] text-dark">
                Newsletter
              </p>
              <p className="text-dark mb-3 sm:mb-[14px] body4">
                Subscribe to the free newsletter and stay up to date
              </p>

              {/* Email Input */}
              <div className="p-3 sm:p-4 lg:p-5 flex items-center bg-white rounded-[10px] sm:rounded-[12px] gap-2">
                <input
                  type="email"
                  className="w-full body4 text-text-primary placeholder:text-text-placeholder bg-transparent focus:outline-none"
                  placeholder="Your email address"
                />
                <button className="shrink-0 bg-primary text-white title4 px-4 py-2 rounded-full hover:opacity-90 transition duration-300">
                  Send
                </button>
              </div>

              {/* Mobile Apps */}
              <p className="title2 sm:title1 !font-medium mt-6 sm:mt-[30px] mb-2 sm:mb-[10px] text-dark">
                Mobile Apps
              </p>
              <div className="flex gap-3 sm:flex-col sm:items-start sm:gap-[10px] sm:ml-[10px]">
                <button className="body4 text-dark border border-accent/30 rounded-full px-4 py-1.5 hover:bg-accent hover:text-white transition duration-300">
                  iOS App
                </button>
                <button className="body4 text-dark border border-accent/30 rounded-full px-4 py-1.5 hover:bg-accent hover:text-white transition duration-300">
                  Android App
                </button>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* ─── Bottom Bar ─── */}
      <div>
        <Container>
          <div className="py-4 sm:py-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-3 sm:gap-0">
            <p className="text-dark body4 text-center sm:text-left">
              © Copyright Viatours 2024
            </p>
            <div className="flex items-center flex-wrap justify-center gap-1 sm:gap-0">
              {paymentArry.map((item) => (
                <Image
                  key={item.id}
                  src={item.img}
                  alt={item.alt ?? "Payment method"}
                  width={80}
                  height={25}
                  className="w-[60px] sm:w-[70px] lg:w-[80px] h-[22px] sm:h-[25px] object-contain"
                />
              ))}
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;