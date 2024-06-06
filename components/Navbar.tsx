import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  const navigationData = [
    { title: "Home", href: "/" },
    { title: "Features", href: "/features" },
    { title: "About me", href: "/about" },
    { title: "Contact", href: "/contact" },
  ];

  return (
    <div className="w-full h-20 sticky top-0 backdrop-blur-2xl transition-colors z-10 border-b border-primary ">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-10 h-full">
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
