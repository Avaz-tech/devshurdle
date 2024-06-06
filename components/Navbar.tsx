import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";

export default function Navbar() {
  const navigationData = [
    { title: "Home", href: "/" },
    { title: "Features", href: "/features" },
    { title: "About me", href: "/about" },
    { title: "Contact", href: "/contact" },
  ];

  return (
    <div className="w-full h-20 sticky top-0 backdrop-blur-2xl transition-colors z-10 border-b border-mainColor ">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 h-full">
        <Logo title="DH" className="" />
        <div className="hidden md:inline-flex items-center gap-7 text-gray-900 hover:text-black duration-200">
          {navigationData.map((item, index) => (
            <Link
              key={index}
              href={item?.href}
              className="text-sm uppercase font-semibold relative group overflow-hidden "
            >
              {item?.title}
              <span className="w-full h-[1px] bg-mainColor absolute inline-block left-0 bottom-0 -translate-x-[100%] group-hover:translate-x-0 transition-transform duration-200" />
            </Link>
          ))}
        </div>
        <div className="md:hidden">
          <FiMenu className="text-2xl" />
        </div>
      </div>
    </div>
  );
}
