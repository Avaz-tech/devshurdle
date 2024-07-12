"use client";

import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { ModeToggle } from "./ModeToggle";
// import Search from "./SearchBox";

export default function Navbar() {
  // const [pageIsScrolled, setPagesIsScrolled] = useState(false);

  const navigationData = [
    { title: "Home", href: "/" },
    { title: "Blog", href: "/blog" },
    { title: "About me", href: "/about" },
    { title: "Contact", href: "/contact" },
  ];

  // useEffect(() => {
  //   window.addEventListener("scroll", handlePageScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handlePageScroll);
  //   };
  // }, []);

  // const handlePageScroll = () => {
  //   const scrollLimit = 40;
  //   const actualScroll = document.documentElement.scrollTop;
  //   if (actualScroll >= scrollLimit) {
  //     setPagesIsScrolled(true);
  //   } else {
  //     setPagesIsScrolled(false);
  //   }
  // };

  return (
  <div
      className={`w-full h-20 shadow-custom-medium backdrop-blur-2xl transition-colors z-10 border-b border-primary 
         fixed top-0 max-w-none
      } `}
    >
      <div className="max-w-screen-xl flex items-center justify-between mx-4 xl:mx-auto h-full">
        <Logo title="DH" className="" />
        <div className="hidden md:inline-flex items-center gap-7 duration-200">
          {navigationData.map((item, index) => (
            <Link key={index} href={item?.href} className="text-sm uppercase font-semibold relative group overflow-hidden ">
              {item?.title}
              <span className="w-full h-[1px] bg-primary absolute inline-block left-0 bottom-0 -translate-x-[100%] group-hover:translate-x-0 transition-transform duration-200" />
            </Link>
          ))}
        </div>
          <ModeToggle />
          <div className="md:hidden">
            <FiMenu className="text-2xl" />
        </div>
      </div>
    </div>
  );
}
